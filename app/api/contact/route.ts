import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/email";

// Basic in-memory rate limiting (resets per serverless cold start)
// For production, replace with Redis-backed or Upstash rate limiting.
const rateLimitMap = new Map<string, { count: number; firstRequest: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now - record.firstRequest > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return false;
  }

  if (record.count >= RATE_LIMIT_MAX) {
    return true;
  }

  record.count += 1;
  return false;
}

export async function POST(request: NextRequest) {
  // Only accept JSON
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return NextResponse.json(
      { success: false, message: "Unsupported content type." },
      { status: 415 }
    );
  }

  // Rate limiting
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        success: false,
        message: "Too many requests. Please wait a while before trying again.",
      },
      { status: 429 }
    );
  }

  // Parse body
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 }
    );
  }

  // Validate input
  const result = contactSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      {
        success: false,
        message: "Please check your input and try again.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const data = result.data;

  // Honeypot check — reject if filled
  if (data.website && data.website.length > 0) {
    // Return success to fool bots
    return NextResponse.json({ success: true }, { status: 200 });
  }

  // Send email
  const emailResult = await sendContactEmail({
    ownerName: data.ownerName,
    email: data.email,
    petName: data.petName,
    service: data.service,
    message: data.message,
  });

  if (!emailResult.success) {
    return NextResponse.json(
      {
        success: false,
        message:
          emailResult.error ??
          "We could not process your request. Please try again later.",
      },
      { status: 503 }
    );
  }

  return NextResponse.json(
    {
      success: true,
      message:
        "Thank you! Your message has been received. We will be in touch shortly.",
    },
    { status: 200 }
  );
}

// Reject all other methods
export async function GET() {
  return NextResponse.json({ message: "Method not allowed." }, { status: 405 });
}
