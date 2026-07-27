import "server-only";
import { roomByCloudbedsId } from "./rooms";

// Server-side Cloudbeds access. The API key lives in env and never reaches the
// client. Two consumers: the live /api/availability route (fresh) and the
// hourly-cached "from" rates shown on room cards/detail pages.

const ENDPOINT = "https://api.cloudbeds.com/api/v1.3/getAvailableRoomTypes";
const DAY = 86_400_000;

export type AvailRoom = {
  roomTypeID: string;
  slug: string | null;
  name: string;
  category: string | null;
  available: number;
  ratePerNight: number;
  rateTotal: number;
};
export type AvailResult = { configured: true; currency: string; nights: number; rooms: AvailRoom[] };
type NotConfigured = { configured: false };

type CbRoom = { roomTypeID: string | number; roomTypeName: string; roomRate: number | string; roomsAvailable: number | string };

export async function getAvailability(opts: {
  checkin: string;
  checkout: string;
  adults?: number;
  children?: number;
  revalidate?: number; // when set, cache upstream this many seconds; else no-store
}): Promise<AvailResult | NotConfigured> {
  const key = process.env.CLOUDBEDS_API_KEY;
  const propertyID = process.env.CLOUDBEDS_PROPERTY_ID;
  if (!key || !propertyID) return { configured: false };

  const adults = opts.adults ?? 2;
  const children = opts.children ?? 0;
  const nights = Math.max(1, Math.round((Date.parse(opts.checkout) - Date.parse(opts.checkin)) / DAY));
  const url = `${ENDPOINT}?propertyID=${propertyID}&startDate=${opts.checkin}&endDate=${opts.checkout}&rooms=1&adults=${adults}&children=${children}`;

  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${key}` },
    ...(opts.revalidate != null ? { next: { revalidate: opts.revalidate } } : { cache: "no-store" }),
  });
  if (!res.ok) throw new Error(`cloudbeds ${res.status}`);
  const payload = (await res.json()) as { data?: Array<{ propertyCurrency?: { currencySymbol?: string }; propertyRooms?: CbRoom[] }> };

  const block = Array.isArray(payload.data) ? payload.data[0] : undefined;
  const currency = block?.propertyCurrency?.currencySymbol ?? "$";
  const rooms: AvailRoom[] = (block?.propertyRooms ?? []).map((r) => {
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
  rooms.sort((a, b) => Number(b.available > 0) - Number(a.available > 0) || a.ratePerNight - b.ratePerNight);
  return { configured: true, currency, nights, rooms };
}
