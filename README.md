# Aleef Veterinary Clinic Website

A production-ready veterinary clinic website built with Next.js App Router, TypeScript, and Tailwind CSS.

---

## Project Overview

This is the official website for **Aleef Veterinary Clinic**, a modern pet-care clinic based in Abu Dhabi. The site communicates trust, professionalism, and compassionate pet care across the following sections:

- **Hero** — headline, CTAs, and trust indicators
- **Comprehensive Care** — four service cards (Grooming, Check-up, Surgery, Ultrasound)
- **About Aleef Veterinary** — clinic story, features, and experience badge
- **Why Choose Aleef Veterinary** — four feature cards
- **Meet Our Veterinary Team** — Dr. Sarah Jenkins, Dr. Michael Chen, Dr. Emily Roberts
- **What Pet Owners Say** — three testimonials
- **CTA Banner** — appointment booking prompt
- **Find Us** — map, contact info, opening hours
- **Contact Form** — validated form with server-side processing
- **Footer** — contact, hours, quick links, copyright
- **Informational pages** — Privacy Policy, Terms of Service, FAQ

---

## Technology Stack

| Technology | Version | Purpose |
|---|---|---|
| Next.js App Router | 16.x | Framework, routing, SSR, API routes |
| React | 19.x | UI components |
| TypeScript | 5.x | Static typing |
| Tailwind CSS | 4.x | Responsive styling |
| React Hook Form | latest | Form state management |
| Zod | latest | Schema validation (client + server) |
| Resend | latest | Transactional email delivery |
| @hookform/resolvers | latest | Zod–React Hook Form integration |
| Lucide React | latest | Icons |

---

## Local Setup

### Prerequisites

- **Node.js** 18.x or later (22.x recommended)
- **npm** 9.x or later

### Installation

```bash
# 1. Navigate to the project directory
cd aleef-vet

# 2. Install dependencies
npm install

# 3. Copy the environment file and fill in your values
cp .env.example .env.local
```

### Environment Setup

Edit `.env.local` with your real values (see **Environment Configuration** below).

### Development Server

```bash
npm run dev
```

Opens at **http://localhost:3000**

### Production Build

```bash
npm run build
npm start
```

---

## Environment Configuration

All sensitive values must be configured as environment variables. **Never commit real values to version control.**

### `.env.local` variables

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | ✅ For email | Your Resend API key. Obtain from [resend.com](https://resend.com). |
| `CONTACT_TO_EMAIL` | ✅ For email | The email address that receives contact form submissions (e.g. `hello@aleefvet.com`). |
| `CONTACT_FROM_EMAIL` | Optional | The sender email address shown in the from-field. Must be from a domain verified in Resend. Defaults to `noreply@aleefvet.com`. |

### Resend configuration steps

1. Create a free account at [resend.com](https://resend.com).
2. Add and **verify** your sending domain (e.g. `aleefvet.com`) in the Resend dashboard. DNS verification is required.
3. Create an API key with "Sending access".
4. Set `RESEND_API_KEY` in your environment.
5. Set `CONTACT_FROM_EMAIL` to an address on your verified domain.

> **Important:** If Resend is not configured, the contact form will still accept submissions but email delivery will fail. The API returns a clear error to the user and logs a warning server-side. The form will never falsely report success.

---

## Architecture

### Routes

| Route | File | Type |
|---|---|---|
| `/` | `app/page.tsx` | Server Component (homepage) |
| `/privacy-policy` | `app/privacy-policy/page.tsx` | Server Component |
| `/terms` | `app/terms/page.tsx` | Server Component |
| `/faq` | `app/faq/page.tsx` | Server Component |
| `POST /api/contact` | `app/api/contact/route.ts` | Route Handler |

### Component Structure

```
components/
  layout/
    Header.tsx      — Sticky responsive header with mobile menu (Client)
    Footer.tsx      — Footer with contact, hours, links (Server)
  sections/
    Hero.tsx        — Hero with gradient, headline, trust badges (Server)
    Services.tsx    — Four service cards with images (Server)
    About.tsx       — Two-column about section (Server)
    WhyChooseUs.tsx — Four feature cards (Server)
    Team.tsx        — Three team member cards (Server)
    Testimonials.tsx — Three testimonial cards (Server)
    CTA.tsx         — CTA banner (Server)
    ClinicInfo.tsx  — Map, contact cards, hours (Server)
    Contact.tsx     — Validated contact form (Client)
lib/
  validation.ts     — Zod schema shared between client and server
  email.ts          — Resend email integration module
```

### Contact Form Flow

1. User fills and submits the form on the client.
2. React Hook Form + Zod validate inputs locally (inline errors shown).
3. On submission, a `POST` request is sent to `/api/contact` with JSON payload.
4. The Route Handler:
   - Checks `Content-Type` header.
   - Applies in-memory rate limiting (5 submissions per IP per hour).
   - Re-validates all input with Zod server-side.
   - Checks honeypot field for bot detection.
   - Calls `sendContactEmail()` in `lib/email.ts`.
5. If Resend is configured: sends an HTML email to `CONTACT_TO_EMAIL`.
6. Returns `200 success` or an appropriate error response.
7. The form displays success or error feedback to the user.

---

## Deployment

### Recommended Platform: Vercel

1. Push the repository to GitHub / GitLab / Bitbucket.
2. Import the project in [vercel.com](https://vercel.com).
3. Set the **root directory** to `aleef-vet` if deploying from the parent folder.
4. Add all required environment variables in the Vercel dashboard under **Settings → Environment Variables**.
5. Deploy. Vercel will run `npm run build` automatically.

### Post-Deployment Verification

- [ ] Homepage loads correctly on desktop and mobile
- [ ] All navigation links scroll to the correct sections
- [ ] Contact form validates and submits
- [ ] Email delivery is confirmed (send a test message)
- [ ] `/privacy-policy`, `/terms`, `/faq` pages load
- [ ] No browser console errors

---

## Testing

### Commands run during development

| Command | Result |
|---|---|
| `npm run lint` | Linting with ESLint (Next.js config) |
| `npx tsc --noEmit` | TypeScript type checking |
| `npm run build` | Production build |
| `npm run dev` | Development server |

> **Note:** Run `npm run build` and check the output for any type or build errors before deploying.

---

## Client Handover Checklist

| # | Item | Status |
|---|---|---|
| 1 | Final clinic address confirmed (currently: 123 Pet Lane, Abu Dhabi) | ⏳ Pending client confirmation |
| 2 | Phone number confirmed (currently: 02 674 7484) | ⏳ Pending client confirmation |
| 3 | Email address confirmed (currently: hello@aleefvet.com) | ⏳ Pending client confirmation |
| 4 | Opening hours confirmed | ⏳ Pending client confirmation |
| 5 | Staff names and bios approved (Dr. Jenkins, Dr. Chen, Dr. Roberts) | ⏳ Pending client approval |
| 6 | Testimonials approved by clients cited | ⏳ Pending client approval |
| 7 | Business claims approved (15+ years, 500+ reviews, certifications) | ⏳ Pending client approval |
| 8 | Original branding assets / logo provided | ⏳ Pending — placeholder logo in use |
| 9 | Approved photography provided | ⏳ Pending — Unsplash placeholders in use |
| 10 | Privacy Policy reviewed and approved | ⏳ Draft template — requires legal review |
| 11 | Terms of Service reviewed and approved | ⏳ Draft template — requires legal review |
| 12 | FAQ content approved | ⏳ Pending client review |
| 13 | Emergency care information provided | 🚫 Blocked — placeholder in FAQ pending client |
| 14 | RESEND_API_KEY configured and domain verified | ⏳ Pending — client to configure |
| 15 | CONTACT_TO_EMAIL configured | ⏳ Pending — client to configure |
| 16 | Production domain and DNS configured | ⏳ Pending deployment |
| 17 | Email delivery end-to-end tested in production | ⏳ Blocked until Resend configured |
| 18 | Client signed off on responsive design (desktop + mobile) | ⏳ Pending review |
| 19 | Git repository transferred to client | ⏳ Pending |
| 20 | Vercel / hosting account transferred to client | ⏳ Pending |

---

## Known Limitations

- **Photography**: Placeholder images from Unsplash are used throughout. These must be replaced with client-approved, licensed photographs before production launch.
- **Logo**: A programmatic logo (PawPrint icon + text) is used. Replace with the client's official SVG/PNG logo.
- **Rate limiting**: In-memory rate limiting resets on each serverless cold start. For high-traffic production use, replace with a Redis-backed solution (e.g., Upstash).
- **Emergency care**: No emergency out-of-hours contact information has been supplied. A placeholder is shown in the FAQ.
- **Legal pages**: Privacy Policy and Terms of Service are template drafts. They require legal review and client approval.
- **Map**: An OpenStreetMap embed approximates the Abu Dhabi area. The embed should be updated with the exact clinic coordinates once confirmed.

---

## Copyright

&copy; 2026 Aleef Veterinary Clinic. All rights reserved.
