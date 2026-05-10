"""Backend tests for Zaeem Afzal portfolio API."""
import os
import time
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://zaeem-editorial.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


# --- Health / root ---
def test_root_welcome():
    r = requests.get(f"{API}/", timeout=20)
    assert r.status_code == 200
    data = r.json()
    assert "message" in data
    assert "Zaeem" in data["message"] or "live" in data["message"].lower()


# --- Status legacy endpoints ---
def test_status_post_and_get():
    name = f"TEST_client_{int(time.time())}"
    r = requests.post(f"{API}/status", json={"client_name": name}, timeout=20)
    assert r.status_code == 200
    body = r.json()
    assert body["client_name"] == name
    assert "id" in body and "timestamp" in body

    g = requests.get(f"{API}/status", timeout=20)
    assert g.status_code == 200
    rows = g.json()
    assert any(row.get("client_name") == name for row in rows)


# --- Contact endpoint ---
def test_contact_valid_payload_returns_200():
    payload = {
        "name": "TEST_Aurora",
        "email": "TEST_aurora@example.com",
        "subject": "TEST_subject_smoke",
        "message": "TEST_pytest_message_valid",
    }
    r = requests.post(f"{API}/contact", json=payload, timeout=60)
    assert r.status_code == 200, r.text
    data = r.json()
    assert "id" in data and isinstance(data["id"], str) and len(data["id"]) > 0
    assert data["email"] == payload["email"]
    assert data["name"] == payload["name"]
    assert data["subject"] == payload["subject"]
    assert data["message"] == payload["message"]
    assert "created_at" in data
    assert isinstance(data["email_sent"], bool)
    # whatever resend returns, persistence + 200 must hold
    return data["id"]


def test_contact_persisted_in_mongo_via_get_contacts():
    marker = f"TEST_persist_{int(time.time())}"
    payload = {
        "name": marker,
        "email": "TEST_persist@example.com",
        "subject": None,
        "message": f"persistence-check-{marker}",
    }
    p = requests.post(f"{API}/contact", json=payload, timeout=60)
    assert p.status_code == 200
    created_id = p.json()["id"]

    g = requests.get(f"{API}/contacts", timeout=30)
    assert g.status_code == 200
    rows = g.json()
    assert isinstance(rows, list)
    # Most recent first - find our record
    found = next((row for row in rows if row.get("id") == created_id), None)
    assert found is not None, "Contact not persisted/returned via /api/contacts"
    assert found["name"] == marker
    assert found["email"] == "TEST_persist@example.com"
    # _id from mongo must NOT leak
    assert "_id" not in found


def test_contacts_sorted_recent_first():
    # add two contacts and ensure ordering
    a = requests.post(f"{API}/contact", json={
        "name": "TEST_order_A", "email": "TEST_a@example.com", "message": "first"
    }, timeout=60).json()
    time.sleep(1.1)
    b = requests.post(f"{API}/contact", json={
        "name": "TEST_order_B", "email": "TEST_b@example.com", "message": "second"
    }, timeout=60).json()

    rows = requests.get(f"{API}/contacts", timeout=30).json()
    ids = [r["id"] for r in rows]
    # b should appear before a
    assert ids.index(b["id"]) < ids.index(a["id"])


def test_contact_invalid_email_returns_422():
    r = requests.post(f"{API}/contact", json={
        "name": "TEST_bad_email",
        "email": "not-an-email",
        "message": "hi",
    }, timeout=20)
    assert r.status_code == 422


def test_contact_missing_name_returns_422():
    r = requests.post(f"{API}/contact", json={
        "email": "TEST_x@example.com",
        "message": "hi",
    }, timeout=20)
    assert r.status_code == 422


def test_contact_missing_email_returns_422():
    r = requests.post(f"{API}/contact", json={
        "name": "TEST_no_email",
        "message": "hi",
    }, timeout=20)
    assert r.status_code == 422


def test_contact_missing_message_returns_422():
    r = requests.post(f"{API}/contact", json={
        "name": "TEST_no_msg",
        "email": "TEST_x@example.com",
    }, timeout=20)
    assert r.status_code == 422


def test_contact_empty_strings_return_422():
    r = requests.post(f"{API}/contact", json={
        "name": "",
        "email": "TEST_x@example.com",
        "message": "",
    }, timeout=20)
    assert r.status_code == 422
