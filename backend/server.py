import asyncio
import logging
import os
import uuid
from datetime import datetime, timezone
from pathlib import Path
from typing import List, Optional

import resend
from dotenv import load_dotenv
from fastapi import APIRouter, FastAPI, HTTPException
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from starlette.middleware.cors import CORSMiddleware

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / ".env")

# MongoDB connection
mongo_url = os.environ["MONGO_URL"]
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ["DB_NAME"]]

# Resend setup
resend.api_key = os.environ.get("RESEND_API_KEY", "")
SENDER_EMAIL = os.environ.get("SENDER_EMAIL", "onboarding@resend.dev")
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "zaeeemafzal@gmail.com")

app = FastAPI(title="Zaeem Afzal Portfolio API")
api_router = APIRouter(prefix="/api")

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s - %(name)s - %(levelname)s - %(message)s",
)
logger = logging.getLogger(__name__)


# ----------- Models -----------
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ContactCreate(BaseModel):
    name: str = Field(min_length=1, max_length=120)
    email: EmailStr
    subject: Optional[str] = Field(default=None, max_length=160)
    message: str = Field(min_length=1, max_length=4000)


class ContactResponse(BaseModel):
    id: str
    name: str
    email: EmailStr
    subject: Optional[str] = None
    message: str
    created_at: datetime
    email_sent: bool


# ----------- Routes -----------
@api_router.get("/")
async def root():
    return {"message": "Zaeem Afzal portfolio API is live"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(payload: StatusCheckCreate):
    obj = StatusCheck(client_name=payload.client_name)
    doc = obj.model_dump()
    doc["timestamp"] = doc["timestamp"].isoformat()
    await db.status_checks.insert_one(doc)
    return obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    rows = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for r in rows:
        if isinstance(r.get("timestamp"), str):
            r["timestamp"] = datetime.fromisoformat(r["timestamp"])
    return rows


def _build_owner_email_html(name: str, email: str, subject: Optional[str], message: str) -> str:
    safe_subject = subject or "(no subject)"
    return f"""
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#0a0a0a;font-family:Arial,Helvetica,sans-serif;color:#f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a0a0a;padding:32px 0;">
          <tr><td align="center">
            <table width="560" cellpadding="0" cellspacing="0" border="0" style="background:#111111;border:1px solid #262626;border-radius:12px;overflow:hidden;">
              <tr><td style="padding:28px 32px;border-bottom:1px solid #262626;">
                <div style="font-size:11px;letter-spacing:3px;color:#737373;text-transform:uppercase;">New Inquiry</div>
                <div style="font-size:22px;font-weight:600;color:#fafafa;margin-top:6px;">Portfolio Contact Form</div>
              </td></tr>
              <tr><td style="padding:24px 32px;">
                <p style="margin:0 0 6px;font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:2px;">From</p>
                <p style="margin:0 0 18px;font-size:16px;color:#fafafa;">{name} &lt;{email}&gt;</p>
                <p style="margin:0 0 6px;font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:2px;">Subject</p>
                <p style="margin:0 0 18px;font-size:16px;color:#fafafa;">{safe_subject}</p>
                <p style="margin:0 0 6px;font-size:12px;color:#737373;text-transform:uppercase;letter-spacing:2px;">Message</p>
                <p style="margin:0;font-size:15px;color:#d4d4d4;line-height:1.6;white-space:pre-wrap;">{message}</p>
              </td></tr>
              <tr><td style="padding:18px 32px;border-top:1px solid #262626;font-size:12px;color:#525252;">
                Sent from zaeem-afzal.dev
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
    </html>
    """


@api_router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactCreate):
    contact_id = str(uuid.uuid4())
    created_at = datetime.now(timezone.utc)

    doc = {
        "id": contact_id,
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message,
        "created_at": created_at.isoformat(),
        "email_sent": False,
    }

    email_sent = False
    if resend.api_key:
        try:
            params = {
                "from": SENDER_EMAIL,
                "to": [OWNER_EMAIL],
                "reply_to": payload.email,
                "subject": f"Portfolio inquiry from {payload.name}",
                "html": _build_owner_email_html(
                    payload.name, payload.email, payload.subject, payload.message
                ),
            }
            result = await asyncio.to_thread(resend.Emails.send, params)
            logger.info("Resend email sent: %s", result.get("id") if isinstance(result, dict) else result)
            email_sent = True
        except Exception as exc:  # noqa: BLE001
            logger.error("Failed to send contact email: %s", exc)
            email_sent = False
    else:
        logger.warning("RESEND_API_KEY missing - contact stored only.")

    doc["email_sent"] = email_sent
    await db.contacts.insert_one(doc)

    return ContactResponse(
        id=contact_id,
        name=payload.name,
        email=payload.email,
        subject=payload.subject,
        message=payload.message,
        created_at=created_at,
        email_sent=email_sent,
    )


@api_router.get("/contacts", response_model=List[ContactResponse])
async def list_contacts():
    rows = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    out: List[ContactResponse] = []
    for r in rows:
        ts = r.get("created_at")
        if isinstance(ts, str):
            ts = datetime.fromisoformat(ts)
        out.append(
            ContactResponse(
                id=r["id"],
                name=r["name"],
                email=r["email"],
                subject=r.get("subject"),
                message=r["message"],
                created_at=ts,
                email_sent=bool(r.get("email_sent", False)),
            )
        )
    return out


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get("CORS_ORIGINS", "*").split(","),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
