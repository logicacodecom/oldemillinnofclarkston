import { NextResponse } from "next/server";
import { getAvailability } from "@/lib/cloudbeds";

// Live availability + rates. Validates input, then delegates to the shared
// Cloudbeds module. Responses are CDN-cached 5 min per date/guest combination.

const DAY = 86_400_000;
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams;
  const checkin = q.get("checkin") ?? "";
  const checkout = q.get("checkout") ?? "";
  const adults = Math.min(Math.max(parseInt(q.get("adults") ?? "2", 10) || 2, 1), 10);
  const children = Math.min(Math.max(parseInt(q.get("children") ?? "0", 10) || 0, 0), 10);

  if (!isDate(checkin) || !isDate(checkout)) {
    return NextResponse.json({ error: "Please choose valid dates." }, { status: 400 });
  }
  const nights = Math.round((Date.parse(checkout) - Date.parse(checkin)) / DAY);
  if (nights < 1 || nights > 30) {
    return NextResponse.json({ error: "Choose a stay of 1–30 nights." }, { status: 400 });
  }
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (Date.parse(checkin) < today.getTime()) {
    return NextResponse.json({ error: "Check-in can't be in the past." }, { status: 400 });
  }

  try {
    const result = await getAvailability({ checkin, checkout, adults, children });
    if (!result.configured) return NextResponse.json({ configured: false });
    return NextResponse.json(
      { ...result, checkin, checkout, adults, children },
      { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
    );
  } catch {
    return NextResponse.json({ error: "Availability is temporarily unavailable." }, { status: 502 });
  }
}
