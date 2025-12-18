// src/lib/mailer.server.ts
import nodemailer from "nodemailer";

export type EmailPayload = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env var: ${name}`);
  return v;
}

const transporter = nodemailer.createTransport({
  host: required("SMTP_HOST"),
  port: Number(required("SMTP_PORT")),
  secure: Number(process.env.SMTP_PORT || 465) === 465,
  auth: {
    user: required("SMTP_USER"),
    pass: required("SMTP_PASS"),
  },
});

export async function sendEmail(payload: EmailPayload) {
  const from = required("SMTP_USER");
  await transporter.sendMail({
    from: `"808 Academy" <${from}>`,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
    ...(payload.replyTo ? { replyTo: payload.replyTo } : {}),
  });
}
