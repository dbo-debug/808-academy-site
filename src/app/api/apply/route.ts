// src/app/api/apply/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";
export const dynamic = "force-dynamic"; // avoid pre-evaluation during build

type Address = {
  address1?: string;
  address2?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
};

type ApplyBody = {
  program?: string;        // "Course" | "Tutoring" | "VIP"
  course?: string | null;  // required when program === "Course"
  tutoringFocus?: string | null;

  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;

  address?: Address;

  experience?: string;
  goals?: string;
  sessionMonth?: string;
  consentEmail?: boolean;
  consentSMS?: boolean;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => null)) as ApplyBody | null;
    if (!body) {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    const {
      program,
      course,
      tutoringFocus,
      firstName,
      lastName,
      email,
      phone,
      address,
      experience,
      goals,
      sessionMonth,
      consentEmail,
      consentSMS,
    } = body;

    // Basic validation
    if (!firstName || !lastName || !email || !program) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }
    if (program === "Course" && !course) {
      return NextResponse.json(
        { ok: false, error: "Course is required for Program: Course." },
        { status: 400 }
      );
    }
    if (program === "Tutoring" && (!tutoringFocus || tutoringFocus.trim().length < 5)) {
      return NextResponse.json(
        { ok: false, error: "Please describe your tutoring focus." },
        { status: 400 }
      );
    }
    if (
      !address?.address1 ||
      !address?.city ||
      !address?.region ||
      !address?.postalCode ||
      !address?.country
    ) {
      return NextResponse.json(
        { ok: false, error: "Complete mailing address is required." },
        { status: 400 }
      );
    }

    // Build email HTML
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.45;">
        <h2 style="margin:0 0 12px;">New Application — ${escapeHtml(program)}</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${phone ? `<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>` : ""}

        <p><strong>Session Month:</strong> ${escapeHtml(sessionMonth || "TBD")}</p>
        ${
          program === "Course"
            ? `<p><strong>Course:</strong> ${escapeHtml(String(course))}</p>`
            : program === "Tutoring"
            ? `<p><strong>Tutoring Focus:</strong> ${escapeHtml(tutoringFocus || "")}</p>`
            : ""
        }

        <h3 style="margin:16px 0 8px;">Address</h3>
        <p>
          ${escapeHtml(address.address1!)}
          ${address.address2 ? `<br>${escapeHtml(address.address2)}` : ""}<br>
          ${escapeHtml(address.city!)} , ${escapeHtml(address.region!)} ${escapeHtml(address.postalCode!)}<br>
          ${escapeHtml(address.country!)}
        </p>

        ${experience ? `<p><strong>Experience:</strong><br>${nl2br(escapeHtml(experience))}</p>` : ""}
        ${goals ? `<p><strong>Goals:</strong><br>${nl2br(escapeHtml(goals))}</p>` : ""}

        <p><strong>Consent (Email):</strong> ${consentEmail ? "Yes" : "No"}<br>
        <strong>Consent (SMS):</strong> ${consentSMS ? "Yes" : "No"}</p>

        <hr style="margin:16px 0;">
        <p style="color:#888;">Submitted: ${new Date().toLocaleString()}</p>
      </div>
    `;

    // Send with Resend (safe: init inside handler, and only if key + inbox are configured)
    const resendKey = process.env.RESEND_API_KEY;
    const inbox = process.env.ENROLLMENT_INBOX;
    if (resendKey && inbox) {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.ENROLLMENT_FROM || "808 Academy <admin@the808academy.com>",
        to: [inbox],
        subject: `New ${program} Application — ${firstName} ${lastName}`,
        html,
      });
    }

    // Fire-and-forget Zapier (optional)
    const zapUrl = process.env.ZAPIER_ENROLL_WEBHOOK_URL;
    if (zapUrl) {
      // purposely not awaited
      fetch(zapUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          program,
          course,
          tutoringFocus,
          firstName,
          lastName,
          email,
          phone,
          address,
          experience,
          goals,
          sessionMonth,
          consentEmail,
          consentSMS,
          createdAt: new Date().toISOString(),
          source: "apply-form",
        }),
      }).catch(() => {});
    }

    return NextResponse.json({ ok: true });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Server error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

/* util */
function escapeHtml(s: string) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function nl2br(s: string) {
  return String(s).replace(/\n/g, "<br>");
}
