import { Resend } from "resend";

export function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  return new Resend(apiKey);
}

export function getContactEmail() {
  const email = process.env.CONTACT_EMAIL;

  if (!email) {
    throw new Error("CONTACT_EMAIL is not configured.");
  }

  return email;
}
