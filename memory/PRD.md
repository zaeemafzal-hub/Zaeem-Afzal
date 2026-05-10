# Zaeem Afzal — Cinematic Developer Portfolio

## Original Problem Statement
Premium dark-mode cinematic developer portfolio for Zaeem Afzal (frontend & full-stack
developer). Editorial agency aesthetic similar to AerukArt. Matte black, soft gray surfaces,
clean white typography, single subtle accent color. Large bold typography (Clash Display +
General Sans). Broken grid layouts, asymmetrical composition, smooth Lenis scrolling, custom
cursor glow dot, fade-up reveals, parallax. Sections: Hero, Projects, About, Tech Stack,
Contact (with email sending).

## Architecture
- **Frontend**: React 19 + Tailwind + Framer Motion + Lenis + Sonner toasts
- **Backend**: FastAPI + Motor (MongoDB) + Resend (transactional email)
- **DB**: MongoDB collections: `contacts`, `status_checks`
- Single-page app with smooth-scroll anchor sections (#hero, #about, #work, #stack, #contact)

## User Persona
Recruiters, agency leads, prospective clients evaluating Zaeem for frontend / full-stack
engagements — they need to feel quality in 5 seconds and reach him in <30 seconds.

## Core Requirements (static)
- Cinematic hero with Zaeem Afzal name, role, intro, CTAs
- 6 real projects with live + GitHub links (React E-commerce, Travel Dashboard, Learning
  Center, Todo, Phone E-commerce, Property Hub)
- About section with profile photo + philosophy
- Tech Stack interactive grid (no progress bars)
- Working contact form (Resend email + MongoDB persistence)
- Custom cursor, smooth scrolling, fade-up reveals, parallax

## Implemented (2026-12)
- ✅ Full editorial agency layout with broken grid + asymmetric composition
- ✅ Hero with parallax background + masked text reveal + magnetic CTAs
- ✅ Marquee tech ribbon
- ✅ About with profile image (provided by user) + parallax + stats grid
- ✅ Projects: 6 case-study cards with image zoom on hover, live + source links
- ✅ Tech Stack: 12 cards with mouse-tracked radial glow on hover
- ✅ Contact: borderless editorial form, Resend email send, Mongo persistence
- ✅ Footer with all social links + back-to-top
- ✅ Custom glow-dot cursor + lerped ring follower
- ✅ Lenis smooth scroll
- ✅ Backend `/api/contact`, `/api/contacts`, `/api/status` all tested at 100%
- ✅ Frontend Playwright tests at 100%

## Backlog (P1 / P2)
- P1: Verify a custom domain in Resend so emails actually deliver to zaeeemafzal@gmail.com
  (currently email_sent=false in test mode for non-verified recipients)
- P1: Replace stock project images with real screenshots/videos of Zaeem's projects
  (user offered to provide videos)
- P2: Add a `/uses` or blog page
- P2: Add OpenGraph meta + favicon
- P2: Add 3D floating object in hero (Three.js) for extra immersion
- P2: Resume PDF download CTA in hero / nav
- P2: Visitor analytics (Vercel Analytics or Plausible)

## Test Credentials
N/A — no authentication in this app.

## Resend Notes
RESEND_API_KEY configured. SENDER_EMAIL=onboarding@resend.dev (Resend's shared sandbox).
OWNER_EMAIL=zaeeemafzal@gmail.com. To go live, verify a domain at resend.com/domains
and replace SENDER_EMAIL with from@yourdomain.com.
