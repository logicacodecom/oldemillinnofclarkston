import { NextResponse } from "next/server";
import { roomByCloudbedsId } from "@/lib/rooms";

// Live availability + rates via Cloudbeds getAvailableRoomTypes.
// The API key stays server-side (env). Responses are CDN-cached for 5 minutes
// per date/guest combination. If the integration isn't configured, we return
// { configured: false } so the widget falls back to the plain booking link.

const ENDPOINT = "https://api.cloudbeds.com/api/v1.3/getAvailableRoomTypes";
const DAY = 86_400_000;

const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));

type CbRoom = {
  roomTypeID: string | number;
  roomTypeName: string;
  roomRate: number | string;
  roomsAvailable: number | string;
  maxGuests?: number | string;
};

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

  const key = process.env.CLOUDBEDS_API_KEY;
  const propertyID = process.env.CLOUDBEDS_PROPERTY_ID;
  if (!key || !propertyID) {
    return NextResponse.json({ configured: false });
  }

  const url = `${ENDPOINT}?propertyID=${propertyID}&startDate=${checkin}&endDate=${checkout}&rooms=1&adults=${adults}&children=${children}`;
  let payload: { data?: Array<{ propertyCurrency?: { currencySymbol?: string }; propertyRooms?: CbRoom[] }> };
  try {
    const res = await fetch(url, { headers: { Authorization: `Bearer ${key}` }, cache: "no-store" });
    if (!res.ok) throw new Error(`upstream ${res.status}`);
    payload = await res.json();
  } catch {
    return NextResponse.json({ error: "Availability is temporarily unavailable." }, { status: 502 });
  }

  const block = Array.isArray(payload.data) ? payload.data[0] : undefined;
  const currency = block?.propertyCurrency?.currencySymbol ?? "$";
  const rooms = (block?.propertyRooms ?? []).map((r) => {
    const total = Number(r.roomRate) || 0;
    const mapped = roomByCloudbedsId.get(String(r.roomTypeID));
    return {
      roomTypeID: String(r.roomTypeID),
      slug: mapped?.slug ?? null,
      name: mapped?.name ?? r.roomTypeName,
      category: mapped?.category ?? null,
      available: Number(r.roomsAvailable) || 0,
      ratePerNight: Math.round(total / nights),
      rateTotal: total,
    };
  });
  // available first, then cheapest per night
  rooms.sort((a, b) => Number(b.available > 0) - Number(a.available > 0) || a.ratePerNight - b.ratePerNight);

  return NextResponse.json(
    { configured: true, currency, nights, checkin, checkout, adults, children, rooms },
    { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }
  );
}
