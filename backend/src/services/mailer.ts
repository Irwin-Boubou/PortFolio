import nodemailer from 'nodemailer';
import { env } from '../config/env';

const transporter = env.smtp.host
  ? nodemailer.createTransport({
      host: env.smtp.host,
      port: env.smtp.port,
      secure: env.smtp.port === 465,
      auth: { user: env.smtp.user, pass: env.smtp.pass },
    })
  : null;

/** Sends the contact-form email; silently no-ops if SMTP isn't configured (dev). */
export async function sendContactEmail(data: {
  name: string; email: string; subject?: string; message: string; locale: string;
}) {
  if (!transporter || !env.smtp.to) {
    console.warn('[mailer] SMTP/OWNER_EMAIL not configured, message stored in DB only.');
    return;
  }
  const subject = `[Portfolio] ${data.subject ?? 'New message'} — from ${data.name}`;
  await transporter.sendMail({
    from: `"Portfolio Contact" <${env.smtp.user}>`,
    to: env.smtp.to,
    replyTo: data.email,
    subject,
    text: `New contact message (${data.locale})\n\nFrom: ${data.name} <${data.email}>\nSubject: ${data.subject ?? '(none)'}\n\n${data.message}`,
    html: `
      <div style="font-family:system-ui,sans-serif;max-width:560px;margin:0 auto">
        <h2 style="color:#6C63FF;margin:0 0 16px">New contact message</h2>
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:6px 0;color:#666;width:90px">Name</td><td style="padding:6px 0"><strong>${data.name}</strong></td></tr>
          <tr><td style="padding:6px 0;color:#666">Email</td><td style="padding:6px 0"><a href="mailto:${data.email}">${data.email}</a></td></tr>
          <tr><td style="padding:6px 0;color:#666">Subject</td><td style="padding:6px 0">${data.subject ?? '(none)'}</td></tr>
          <tr><td style="padding:6px 0;color:#666">Language</td><td style="padding:6px 0">${data.locale}</td></tr>
        </table>
        <div style="margin-top:16px;padding:16px;background:#f5f5fa;border-radius:12px;white-space:pre-wrap;font-size:14px;line-height:1.6">${data.message}</div>
      </div>`,
  });
}
