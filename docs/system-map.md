# The 808 Academy — System Map

## Top-level flow
```mermaid
flowchart LR
  U[User] --> N[Next.js App Router\n(/, /courses, /courses/music-production, /apply, /apply/schedule)]
  N --> ApplyAPI[/api/apply\ncollects application\nsends Resend email + optional Zapier]
  N --> Sched[/apply/schedule\nCalendly onboarding UI]
  Sched --> CheckoutAPI[/api/checkout\ncreates Stripe Checkout session]
  ApplyAPI -->|on success| Sched
  CheckoutAPI --> Stripe[Stripe Checkout]
  Stripe --> Webhook[/api/stripe-webhook\nruntime=nodejs]
  Webhook --> Supa[(Supabase\npending_enrollments\npending_memberships)]
  Webhook --> Sheets[postToSheets(type)\nApps Script Web App]
  Sheets --> SheetsTabs[Google Sheets tabs\nactive_user, crm, abandoned_cart, admin_alert]
  Sheets --> Gmail[(Gmail welcome emails - planned via Apps Script)]
  Sheets --> Admin[(Admin alerts rows)]
  Webhook --> Discord[(Discord onboarding - planned)]
  N --> AuthFlow[/auth/confirm → /auth/set-password\nSupabase verifyOtp + updateUser]
  AuthFlow --> Lounge[/students (Student Lounge)\nSupabase client auth]
```

## Apply flow (Course / Tutoring / Membership)
```mermaid
flowchart TD
  Entry[Entry points:\n/ (demo CTA)\n/courses\n/courses/music-production] --> Apply[/apply (Step 1)\ncohort derived from URL param]
  Apply -->|POST application\nrequired: program, name, email, phone| ApplyAPI[/api/apply]
  ApplyAPI -->|ok| Schedule[/apply/schedule (Step 2)\nCalendly embed]
  ApplyAPI -->|Resend email + optional Zapier| Ops[Ops inbox/Zapier (optional)]

  subgraph Checkout Paths (Step 3)
    Schedule -->|Course\ncohort=paid| CohortPaid[/api/checkout\nmode=paid]
    Schedule -->|Course\ncohort=demo (from URL)| CohortDemo[/api/checkout\nmode=demo]
    Schedule -->|Tutoring\npackage -> priceId| Tutoring[/api/checkout\npriceId branch]
    Schedule -->|Membership| Membership[/api/checkout\nmode=membership]
  end

  CohortPaid --> Stripe[Stripe Checkout]
  CohortDemo --> Stripe
  Tutoring --> Stripe
  Membership --> Stripe
  Stripe --> Webhook[/api/stripe-webhook]
  Webhook --> Supa[(Supabase pending_enrollments\nor pending_memberships)]
  Webhook --> Sheets[postToSheets(type)\nApps Script]
```

## Stripe webhook → downstream actions
```mermaid
flowchart TD
  Completed[checkout.session.completed] --> WH[/api/stripe-webhook]
  WH --> Retrieve[Retrieve session\nexpand line_items/subscription/customer]
  Retrieve --> Decide{Is membership\n(mode=subscription\nor membership price)?}
  Decide -->|Yes| UpsertMem[Upsert pending_memberships\nemail + sub ids + status]
  UpsertMem --> SheetsActive[postToSheets('active_user')]
  Decide -->|No (cohort)| InsertEnroll[Insert pending_enrollments\nemail + course_slug + cohort_type]
  InsertEnroll --> SheetsActive

  Expired[checkout.session.expired\nor async_payment_failed] --> WH
  WH --> SheetsAbandoned[postToSheets('abandoned_cart')]

  SubEvents[customer.subscription.created/updated/deleted] --> WH
  WH --> SyncMem[Upsert pending_memberships\n(status/current_period_end)]

  WH --> OnError[postToSheets('admin_alert') on handler errors]

  SheetsActive --> AppsScript[Apps Script Web App\ndoPost {type, payload}]
  SheetsAbandoned --> AppsScript
  OnError --> AppsScript
  AppsScript --> SheetsTabs[Sheets rows per type\n(active_user, abandoned_cart, admin_alert, crm)]
```

## Quick reference
- **Routes**: `/`, `/courses`, `/courses/music-production`, `/apply`, `/apply/schedule`, `/auth/confirm`, `/auth/set-password`, `/students`
- **APIs**: `/api/apply`, `/api/checkout`, `/api/stripe-webhook`
- **Data stores**: Supabase tables `pending_enrollments`, `pending_memberships`; Google Sheets via `GOOGLE_SHEETS_WEBHOOK_URL` Apps Script Web App; Stripe Checkout sessions/subscriptions (source of truth for payments)
- **Env vars (names only)**: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PRICE_MEMBERSHIP`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_SHEETS_WEBHOOK_URL`, `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `RESEND_API_KEY`, `ENROLLMENT_FROM`, `ENROLLMENT_INBOX`, `ZAPIER_ENROLL_WEBHOOK_URL`, `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- **Other services**: Resend (admin emails from apply form), Zapier (optional application payload), Calendly embeds on `/apply/schedule`, Supabase auth (invite/verifyOtp + updateUser for Student Lounge), Discord/Gmail onboarding (planned via Apps Script)

## Debug checklist
- Google Apps Script responds 302→405: ensure Web App is deployed as “Anyone”/latest version; allow redirects or set `redirect: "manual"` (already in webhook); test direct POST to `GOOGLE_SHEETS_WEBHOOK_URL`.
- Missing `GOOGLE_SHEETS_WEBHOOK_URL` in Vercel/env: postToSheets silently no-ops; set value in project env.
- Stripe webhook signature mismatch: confirm `STRIPE_WEBHOOK_SECRET` matches Stripe dashboard; raw body (`req.text()`) must reach `stripe.webhooks.constructEvent`.
- Stripe events not firing: verify dashboard webhook endpoint has `checkout.session.completed`, `checkout.session.expired`, `checkout.session.async_payment_failed`, `customer.subscription.*` enabled and not paused.
- Webhook writes work with `testActiveUser` but not Stripe: likely env/network from Vercel to Apps Script; test curl from runtime or add logging around fetch errors.
- Vercel runtime/edge mismatch: `/api/stripe-webhook` and `/api/checkout` set `runtime = "nodejs"`; ensure not deployed as Edge (raw body + Stripe requires Node).
- Checkout created but no Supabase rows: confirm `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` present; membership vs cohort path determines `pending_memberships` vs `pending_enrollments`.
- Apply form not forwarding to schedule: `/api/apply` requires program, name, email, phone; program=Course also needs `course`, Tutoring needs `tutoringSubject`.
