import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact";
import { getContactEmail, getResendClient } from "@/lib/resend";

export const runtime = "nodejs";

const WINDOW_MS = 60 * 1000;
const MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: NextRequest) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0]?.trim() || "unknown";

  return request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateLimitStore.get(ip);

  if (!entry || entry.resetAt <= now) {
    rateLimitStore.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  if (entry.count >= MAX_REQUESTS) return true;

  entry.count += 1;
  return false;
}

function buildEmailBody({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  return `Name: ${name}
Email: ${email}

Message:
${message}`;
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { message: "Too many messages. Please try again in a minute." },
        { status: 429 },
      );
    }

    const payload = await request.json();
    const parsed = contactSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Please check the form and try again.",
          errors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const { name, email, subject, message, website, startedAt } = parsed.data;
    const submittedTooFast = startedAt ? Date.now() - startedAt < 800 : false;

    if (website || submittedTooFast) {
      return NextResponse.json(
        { message: "Message submitted successfully." },
        { status: 200 },
      );
    }

    const resend = getResendClient();
    const contactEmail = getContactEmail();

    const { error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `Portfolio Contact - ${subject}`,
      text: buildEmailBody({ name, email, message }),
    });

    if (error) {
      return NextResponse.json(
        { message: "Unable to send your message right now. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully." },
      { status: 200 },
    );
  } catch (error) {
    const message =
      error instanceof Error &&
      (error.message.includes("RESEND_API_KEY") ||
        error.message.includes("CONTACT_EMAIL"))
        ? "Email service is not configured."
        : "Something went wrong. Please try again later.";

    return NextResponse.json({ message }, { status: 500 });
  }
}
