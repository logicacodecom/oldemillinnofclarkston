"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bookingUrl } from "@/lib/property";
import { EVENTS, track } from "@/lib/analytics";
import { localePath, type Lang } from "@/lib/i18n";
import type { Dict } from "@/lib/dictionaries/en";
import { Icon } from "./Icon";

type Room = {
  roomTypeID: string;
  slug: string | null;
  name: string;
  category: string | null;
  available: number;
  ratePerNight: number;
  rateTotal: number;
};
type Result = {
  configured: boolean;
  currency?: string;
  nights?: number;
  checkin?: string;
  checkout?: string;
  rooms?: Room[];
  error?: string;
  code?: keyof Dict["availability"]["errors"];
};

const iso = (d: Date) => {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
};
const field =
  "w-full rounded-lg border border-outline-variant bg-surface-white px-3 py-2.5 text-on-surface focus:border-primary focus:ring-0";
const labelCls = "block text-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-1";

const fill = (s: string, n: number) => s.replace("{n}", String(n));

export function AvailabilityWidget({ lang, t }: { lang: Lang; t: Dict["availability"] }) {
  const [today, setToday] = useState("");
  const [checkin, setCheckin] = useState("");
  const [checkout, setCheckout] = useState("");
  const [adults, setAdults] = useState(2);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");

  // Defaults set client-side to avoid SSR/CSR hydration mismatch.
  useEffect(() => {
    setToday(iso(new Date()));
    setCheckin(iso(new Date()));
    setCheckout(iso(new Date(Date.now() + 86_400_000)));
  }, []);

  // Keep checkout after checkin.
  useEffect(() => {
    if (checkin && checkout && checkout <= checkin) {
      const [y, m, d] = checkin.split("-").map(Number);
      setCheckout(iso(new Date(y, m - 1, d + 1)));
    }
  }, [checkin, checkout]);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!checkin || !checkout || checkout <= checkin) {
      setError(t.errors.order);
      return;
    }
    setLoading(true);
    track(EVENTS.availabilitySearch, { checkin, checkout, adults });
    try {
      const r = await fetch(`/api/availability?checkin=${checkin}&checkout=${checkout}&adults=${adults}`);
      const data: Result = await r.json();
      if (!r.ok) setError(t.errors[data.code ?? "generic"] ?? t.errors.generic);
      else setResult(data);
    } catch {
      setError(t.errors.network);
    } finally {
      setLoading(false);
    }
  }

  const available = result?.rooms?.filter((r) => r.available > 0) ?? [];
  const cur = result?.currency ?? "$";

  return (
    <div className="bg-surface-white rounded-2xl shadow-lg border border-outline-variant/30 p-6 md:p-8">
      <form onSubmit={search} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-end">
        <div className="col-span-1">
          <label className={labelCls} htmlFor="av-checkin">{t.checkin}</label>
          <input id="av-checkin" type="date" className={field} value={checkin} min={today}
            onChange={(e) => setCheckin(e.target.value)} />
        </div>
        <div className="col-span-1">
          <label className={labelCls} htmlFor="av-checkout">{t.checkout}</label>
          <input id="av-checkout" type="date" className={field} value={checkout} min={checkin || today}
            onChange={(e) => setCheckout(e.target.value)} />
        </div>
        <div className="col-span-1">
          <label className={labelCls} htmlFor="av-adults">{t.guests}</label>
          <select id="av-adults" className={field} value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? t.guest1 : t.guestN}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          data-analytics-event={EVENTS.availabilitySearch}
          className="col-span-2 md:col-span-1 inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg text-label-lg hover:bg-primary-container transition-colors disabled:opacity-60"
        >
          {loading ? t.searching : t.search}
          {!loading && <Icon name="search" className="text-lg" />}
        </button>
      </form>

      <div aria-live="polite" className="mt-6">
        {error && (
          <div className="text-error text-sm">
            {error}{" "}
            <a href={bookingUrl()} target="_blank" rel="noopener noreferrer"
              data-analytics-event={EVENTS.bookingClick} className="underline text-primary">
              {t.bookSecure}
            </a>.
          </div>
        )}

        {result && result.configured === false && (
          <div className="text-on-surface-variant text-sm">
            {t.notConfigured}{" "}
            <a href={bookingUrl()} target="_blank" rel="noopener noreferrer"
              data-analytics-event={EVENTS.bookingClick} className="underline text-primary">
              {t.notConfiguredLink}
            </a>.
          </div>
        )}

        {result?.configured && (
          <>
            <p className="text-sm text-on-surface-variant mb-4">
              {available.length > 0
                ? fill(result.nights === 1 ? t.night1 : t.nightN, result.nights ?? 0)
                : ""}
            </p>
            {available.length === 0 ? (
              <div className="text-on-surface-variant text-sm">
                {t.noRooms}{" "}
                <a href={bookingUrl({ checkin: result.checkin, checkout: result.checkout, adults })} target="_blank" rel="noopener noreferrer"
                  data-analytics-event={EVENTS.bookingClick} className="underline text-primary">
                  {t.noRoomsLink}
                </a>.
              </div>
            ) : (
              <ul className="divide-y divide-outline-variant/40">
                {available.map((room) => (
                  <li key={room.roomTypeID} className="flex flex-wrap items-center justify-between gap-3 py-4">
                    <div className="min-w-0">
                      <p className="font-headline-md text-on-surface">
                        {room.slug ? (
                          <Link href={localePath(lang, `/rooms/${room.slug}`)} className="hover:text-primary underline-offset-2 hover:underline">
                            {room.name}
                          </Link>
                        ) : room.name}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {room.category === "lakefront" ? t.lakefront : t.offWater}
                        {room.available <= 3 ? fill(t.onlyLeft, room.available) : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-headline-md text-primary leading-none">{cur}{room.ratePerNight}</p>
                        <p className="text-[11px] text-on-surface-variant">{t.perNight} · {cur}{room.rateTotal} {t.total}</p>
                      </div>
                      <a
                        href={bookingUrl({
                          checkin: result.checkin,
                          checkout: result.checkout,
                          adults,
                          roomTypeID: room.roomTypeID,
                        })}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-analytics-event={EVENTS.bookingClick}
                        className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-lg text-label-lg hover:bg-primary-container transition-colors whitespace-nowrap"
                      >
                        {t.book}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-[11px] text-on-surface-variant">
              {t.disclaimer}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
