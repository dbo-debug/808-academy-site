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
  // Program choices (updated)
  program?: "Course" | "Tutoring" | "Membership" | string;

  // when program === "Course"
  course?: string | null;
  classTime?: string | null;
  // when program === "Tutoring"
  tutoringSubject?: string | null;

  // contact
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;

  // address (optional for digital)
  address?: Address;

  // legacy flat fields (ApplyClient previously sent these)
  street?: string;
  city?: string;
  state?: string;
  stateRegion?: string;
  postalCode?: string;
  country?: string;

  // misc
  daw?: string;
  experience?: string;
  goals?: string;
  sessionMonth?: string;

  consentEmail?: boolean;
  consentSMS?: boolean;

  // socials (new)
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  soundcloud?: string;
  discord?: string;
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
      classTime,
      tutoringSubject,
      firstName,
      lastName,
      email,
      phone,
      experience,
      goals,
      sessionMonth,
      consentEmail,
      consentSMS,
      daw,
      instagram,
      tiktok,
      youtube,
      soundcloud,
      discord,
    } = body;

    // --- Normalize address (support BOTH nested and old flat shape) ---
    const address: Address = {
      address1: body.address?.address1 ?? body.street ?? "",
      address2: body.address?.address2 ?? "",
      city: body.address?.city ?? body.city ?? "",
      region: body.address?.region ?? body.stateRegion ?? body.state ?? "",
      postalCode: body.address?.postalCode ?? body.postalCode ?? "",
      country: body.address?.country ?? body.country ?? "",
    };

    // --- Basic validation (don’t hard-block on address for digital products) ---
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phone?.trim() || !program) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    if (program === "Course" && !course) {
      return NextResponse.json(
        { ok: false, error: "Please select a course." },
        { status: 400 }
      );
    }

    if (program === "Tutoring" && (!tutoringSubject || tutoringSubject.trim().length < 3)) {
      return NextResponse.json(
        { ok: false, error: "Please describe what you’d like help with." },
        { status: 400 }
      );
    }

    // Address is OPTIONAL now.
    // If they entered some address fields but not all, we still accept it.
    const hasAnyAddress =
      !!address.address1 || !!address.city || !!address.region || !!address.postalCode || !!address.country;

    const addressLine = hasAnyAddress
      ? `
        <h3 style="margin:16px 0 8px;">Address (optional)</h3>
        <p>
          ${escapeHtml(address.address1 || "—")}
          ${address.address2 ? `<br>${escapeHtml(address.address2)}` : ""}<br>
          ${escapeHtml(address.city || "—")} , ${escapeHtml(address.region || "—")} ${escapeHtml(address.postalCode || "—")}<br>
          ${escapeHtml(address.country || "—")}
        </p>
      `
      : "";

    const socialsLine = `
      <h3 style="margin:16px 0 8px;">Socials</h3>
      <p>
        <strong>Instagram:</strong> ${escapeHtml(instagram || "—")}<br>
        <strong>TikTok:</strong> ${escapeHtml(tiktok || "—")}<br>
        <strong>YouTube:</strong> ${escapeHtml(youtube || "—")}<br>
        <strong>SoundCloud:</strong> ${escapeHtml(soundcloud || "—")}<br>
        <strong>Discord:</strong> ${escapeHtml(discord || "—")}
      </p>
    `;

    // Build email HTML
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;line-height:1.45;">
        <h2 style="margin:0 0 12px;">New Application — ${escapeHtml(program)}</h2>
        <p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone)}</p>

        <p><strong>Session Month:</strong> ${escapeHtml(sessionMonth || "TBD")}</p>

        ${
  program === "Course"
    ? `
        <p><strong>Course:</strong> ${escapeHtml(String(course))}</p>
        ${
          classTime
            ? `<p><strong>Class Time:</strong> ${escapeHtml(String(classTime))}</p>`
            : ""
        }
      `
    : program === "Tutoring"
    ? `<p><strong>Tutoring Subject:</strong> ${escapeHtml(tutoringSubject || "")}</p>`
    : program === "Membership"
    ? `<p><strong>Program:</strong> Membership</p>`
    : ""
}

        ${daw ? `<p><strong>DAW:</strong> ${escapeHtml(daw)}</p>` : ""}
        ${experience ? `<p><strong>Experience:</strong> ${escapeHtml(experience)}</p>` : ""}

        ${addressLine}

        ${socialsLine}

        ${goals ? `<p><strong>Goals:</strong><br>${nl2br(escapeHtml(goals))}</p>` : ""}

        <p><strong>Consent (Email):</strong> ${consentEmail ? "Yes" : "No"}<br>
        <strong>Consent (SMS):</strong> ${consentSMS ? "Yes" : "No"}</p>

        <hr style="margin:16px 0;">
        <p style="color:#888;">Submitted: ${new Date().toLocaleString()}</p>
      </div>
    `;

    // Send with Resend (optional)
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

    // Zapier (optional)
    const zapUrl = process.env.ZAPIER_ENROLL_WEBHOOK_URL;
    if (zapUrl) {
      fetch(zapUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...body,
          // normalized address for downstream tools
          address,
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
