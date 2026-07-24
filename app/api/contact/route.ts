import { NextResponse } from "next/server";

// Honest contact handler (§25): it never accepts-and-drops a message.
// If CONTACT_WEBHOOK_URL is configured, the submission is forwarded there.
// If it is NOT configured, the endpoint returns 501 so the form surfaces a
// clear error and directs the guest to call/text — see docs/OWNER-CONFIRMATION.md.
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  if (!name || !email || !message || !email.includes("@")) {
    return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    // No backend wired yet. Fail loudly rather than silently discarding.
    return NextResponse.json(
      { error: "Contact backend is not configured." },
      { status: 501 }
    );
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, source: "oldemillinnofclarkston.com/contact" }),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  } catch {
    return NextResponse.json({ error: "Could not deliver message." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
