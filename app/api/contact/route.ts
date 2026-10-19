import { NextResponse } from "next/server";
import { property } from "@/lib/property";
import { gmailConfigured, sendGmail } from "@/lib/mail";

// Contact handler (§25): never accepts-and-drops a message.
// Delivery order: Gmail (GMAIL_USER + GMAIL_APP_PASSWORD) → webhook (CONTACT_WEBHOOK_URL)
// → 501 so the form shows a clear error and directs the guest to call/text.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const arrival = String(body.arrival ?? "").trim();
  const departure = String(body.departure ?? "").trim();
  const message = String(body.message ?? "").trim();
  if (!name || !email || !message || !email.includes("@")) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;

  // Preferred: email it through Gmail.
  if (gmailConfigured()) {
    const text = [
      "New inquiry from oldemillinnofclarkston.com",
      "",
      `Name: ${name}`,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : "",
      arrival ? `Arrival: ${arrival}` : "",
      departure ? `Departure: ${departure}` : "",
      "",
      "Message:",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    try {
      await sendGmail(
        {
          to: property.inquiryEmail,
          replyTo: email,
          subject: `Website inquiry — ${name}`,
          text,
        },
        "Olde Mill Inn Website"
      );
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "Could not deliver message." }, { status: 502 });
    }
  }

  // Fallback: forward the raw submission to a configured webhook.
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...body, source: "oldemillinnofclarkston.com/contact" }),
      });
      if (!res.ok) throw new Error(`Webhook ${res.status}`);
      return NextResponse.json({ ok: true });
    } catch {
      return NextResponse.json({ error: "Could not deliver message." }, { status: 502 });
    }
  }

  // Nothing wired yet — fail loudly rather than silently discarding.
  return NextResponse.json({ error: "Contact backend is not configured." }, { status: 501 });
}
