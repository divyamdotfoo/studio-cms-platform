"use server";

import { Resend } from "resend";

interface ContactData {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
}

interface ContactResult {
  success: boolean;
  error?: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\d{10}$/;

export async function submitContact(data: ContactData): Promise<ContactResult> {
  const name = data.name?.trim();
  const email = data.email?.trim() || undefined;
  const phone = data.phone?.trim() || undefined;
  const message = data.message?.trim() || undefined;

  if (!name) {
    return { success: false, error: "Name is required." };
  }

  if (!email && !phone) {
    return {
      success: false,
      error: "Please provide at least an email or phone number.",
    };
  }

  if (email && !EMAIL_RE.test(email)) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (phone && !PHONE_RE.test(phone)) {
    return {
      success: false,
      error: "Phone number must be exactly 10 digits (without +91).",
    };
  }

  const adEmail = process.env.ad_email;
  const resendKey = process.env.resend;

  if (!adEmail || !resendKey) {
    console.error("Missing env vars: ad_email or resend");
    return { success: false, error: "Server misconfigured." };
  }

  const resend = new Resend(resendKey);

  const contactLines = [
    `<p><strong>Name:</strong> ${name}</p>`,
    email ? `<p><strong>Email:</strong> ${email}</p>` : "",
    phone ? `<p><strong>Phone:</strong> ${phone}</p>` : "",
    message ? `<p><strong>Message:</strong> ${message}</p>` : "",
  ]
    .filter(Boolean)
    .join("");

  const { error } = await resend.emails.send({
    from: "Divyam <onboarding@resend.dev>",
    to: adEmail,
    subject: "New Contact Enquiry — Vision Architect",
    html: `
      <div style="font-family:sans-serif;max-width:520px;margin:0 auto;">
        <h2>New Contact Enquiry</h2>
        <p>Someone reached out through the website:</p>
        ${contactLines}
        <p style="color:#9ca3af;font-size:11px;margin-top:32px;">this email is automated by the site manager</p>
      </div>
    `,
  });

  if (error) {
    console.error("Failed to send contact email:", error);
    return {
      success: false,
      error: "Failed to send your message. Please try again.",
    };
  }

  return { success: true };
}
