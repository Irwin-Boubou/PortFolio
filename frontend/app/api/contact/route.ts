import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { z } from 'zod';

export const runtime = 'nodejs';

const contactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Valid email required'),
  subject: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  locale: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: 'Invalid input', details: parsed.error.flatten() }, { status: 400 });
    }
    const { name, email, subject, message } = parsed.data;

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
      console.error('[contact] GMAIL_USER / GMAIL_PASS not configured');
      return NextResponse.json({ error: 'Email is not configured on the server.' }, { status: 500 });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_PASS },
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.OWNER_EMAIL || process.env.GMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] ${subject || `Message from ${name}`}`,
      text: `Name: ${name}\nEmail: ${email}\n${subject ? `Subject: ${subject}\n` : ''}\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;max-width:600px">
          <h2 style="color:#6C63FF">New portfolio message</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
          <hr/>
          <p style="white-space:pre-wrap">${message.replace(/</g, '&lt;')}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message. Please try again.' }, { status: 500 });
  }
}
