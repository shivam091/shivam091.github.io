import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";

const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const RECAPTCHA_SCORE_THRESHOLD = 0.5;

interface ContactPayload {
  name: string;
  email: string;
  message: string;
  token: string;
}

async function verifyRecaptcha(token: string): Promise<boolean> {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) return true; // skip verification in dev when key is absent

  const res = await fetch(RECAPTCHA_VERIFY_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ secret, response: token }),
  });

  if (!res.ok) return false;

  const data = await res.json() as { success: boolean; score?: number };
  return data.success && (data.score ?? 1) >= RECAPTCHA_SCORE_THRESHOLD;
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  let body: Partial<ContactPayload>;

  try {
    body = await req.json() as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message, token } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required" }, { status: 422 });
  }

  if (!token) {
    return NextResponse.json({ error: "reCAPTCHA token missing" }, { status: 422 });
  }

  const isHuman = await verifyRecaptcha(token);
  if (!isHuman) {
    return NextResponse.json({ error: "reCAPTCHA verification failed" }, { status: 403 });
  }

  try {
    const db = await getDb();
    await db.collection("contact_submissions").insertOne({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: new Date(),
    });
  } catch (err) {
    console.error("MongoDB insert error:", err);
    return NextResponse.json({ error: "Failed to save message" }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 200 });
}
