// src/app/api/apply/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // prevent build-time evaluation

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    const {
      firstName,
      lastName,
      email,
      phone,
      program,
      course,
      sessionMonth,
      experience,
      goals,
      consentEmail,
      consentSMS,
    } = body;

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { ok: false, error: "Missing firstName/lastName/email" },
        { status: 400 }
      );
    }

    // Build email
    const subject = `New Application: ${firstName} ${lastName} • ${program ?? "Program"}`;
    const html = `
      <h2>New Application</h2>
      <p><b>Name:</b> ${firstName} ${lastName}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone || "-"}</p>
      <p><b>Program:</b> ${program || "-"}</p>
      <p><b>Course:</b> ${course || "-"}</p>
      <p><b>Session:</b> ${sessionMonth || "-"}</p>
      <p><b>Experience:</b> ${experience || "-"}</p>
      <p><b>Goals:</b> ${goals || "-"}</p>
      <p><b>Consent Email:</b> ${Boolean(consentEmail)}</p>
      <p><b>Consent SMS:</b> ${Boolean(consentSMS)}</p>
      <p style="margin-top:12px;color:#888">Submitted: ${new Date().toISOString()}</p>
    `;

    // Safe Resend usage: only init inside the handler and only if configured
    const key = process.env.RESEND_API_KEY;
    const toAdmin = process.env.ENROLLMENT_INBOX || "admin@the808academy.com";
    const from = process.env.ENROLLMENT_FROM || "808 Academy <admin@the808academy.com>";

    if (key) {
      const resend = new Resend(key);
      await resend.emails.send({ from, to: toAdmin, subject, html });
    }

    // Optional Zapier hook (fire-and-forget)
    const zap = process.env.ZAPIER_ENROLL_WEBHOOK_URL;
    if (zap) {
      fetch(zap, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, createdAt: new Date().toISOString() }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
