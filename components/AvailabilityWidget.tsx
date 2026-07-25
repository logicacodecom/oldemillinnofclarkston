"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { bookingUrl } from "@/lib/property";
import { EVENTS, track } from "@/lib/analytics";
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
};

const iso = (d: Date) => d.toISOString().slice(0, 10);
const field =
  "w-full rounded-lg border border-outline-variant bg-surface-white px-3 py-2.5 text-on-surface focus:border-primary focus:ring-0";
const labelCls = "block text-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-1";

export function AvailabilityWidget() {
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
      setCheckout(iso(new Date(Date.parse(checkin) + 86_400_000)));
    }
  }, [checkin, checkout]);

  async function search(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setResult(null);
    if (!checkin || !checkout || checkout <= checkin) {
      setError("Please choose a check-out date after check-in.");
      return;
    }
    setLoading(true);
    track(EVENTS.availabilitySearch, { checkin, checkout, adults });
    try {
      const r = await fetch(`/api/availability?checkin=${checkin}&checkout=${checkout}&adults=${adults}`);
      const data: Result = await r.json();
      if (!r.ok) setError(data.error || "Something went wrong. Please try again.");
      else setResult(data);
    } catch {
      setError("Network error. Please try again, or book on our secure system.");
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
          <label className={labelCls} htmlFor="av-checkin">Check-in</label>
          <input id="av-checkin" type="date" className={field} value={checkin} min={today}
            onChange={(e) => setCheckin(e.target.value)} />
        </div>
        <div className="col-span-1">
          <label className={labelCls} htmlFor="av-checkout">Check-out</label>
          <input id="av-checkout" type="date" className={field} value={checkout} min={checkin || today}
            onChange={(e) => setCheckout(e.target.value)} />
        </div>
        <div className="col-span-1">
          <label className={labelCls} htmlFor="av-adults">Guests</label>
          <select id="av-adults" className={field} value={adults} onChange={(e) => setAdults(Number(e.target.value))}>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          disabled={loading}
          data-analytics-event={EVENTS.availabilitySearch}
          className="col-span-2 md:col-span-1 inline-flex items-center justify-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-lg font-label-lg text-label-lg hover:bg-primary-container transition-colors disabled:opacity-60"
        >
          {loading ? "Checking…" : "Check availability"}
          {!loading && <Icon name="search" className="text-lg" />}
        </button>
      </form>

      <div aria-live="polite" className="mt-6">
        {error && (
          <div className="text-error text-sm">
            {error}{" "}
            <a href={bookingUrl()} target="_blank" rel="noopener noreferrer"
              data-analytics-event={EVENTS.bookingClick} className="underline text-primary">
              Book on our secure system
            </a>.
          </div>
        )}

        {result && result.configured === false && (
          <div className="text-on-surface-variant text-sm">
            Live availability isn’t available right now.{" "}
            <a href={bookingUrl()} target="_blank" rel="noopener noreferrer"
              data-analytics-event={EVENTS.bookingClick} className="underline text-primary">
              Check availability on our secure booking system
            </a>.
          </div>
        )}

        {result?.configured && (
          <>
            <p className="text-sm text-on-surface-variant mb-4">
              {available.length > 0
                ? `${result.nights} night${result.nights === 1 ? "" : "s"} · rates shown per night`
                : ""}
            </p>
            {available.length === 0 ? (
              <div className="text-on-surface-variant text-sm">
                No rooms available for those dates. Try different dates, or{" "}
                <a href={bookingUrl(result.checkin, result.checkout)} target="_blank" rel="noopener noreferrer"
                  data-analytics-event={EVENTS.bookingClick} className="underline text-primary">
                  check our booking system
                </a>.
              </div>
            ) : (
              <ul className="divide-y divide-outline-variant/40">
                {available.map((room) => (
                  <li key={room.roomTypeID} className="flex flex-wrap items-center justify-between gap-3 py-4">
                    <div className="min-w-0">
                      <p className="font-headline-md text-on-surface">
                        {room.slug ? (
                          <Link href={`/rooms/${room.slug}`} className="hover:text-primary underline-offset-2 hover:underline">
                            {room.name}
                          </Link>
                        ) : room.name}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-0.5">
                        {room.category === "lakefront" ? "Lakefront" : "Off-water"}
                        {room.available <= 3 ? ` · only ${room.available} left` : ""}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="font-headline-md text-primary leading-none">{cur}{room.ratePerNight}</p>
                        <p className="text-[11px] text-on-surface-variant">/night · {cur}{room.rateTotal} total</p>
                      </div>
                      <a
                        href={bookingUrl(result.checkin, result.checkout)}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-analytics-event={EVENTS.bookingClick}
                        className="bg-primary text-on-primary px-5 py-2.5 rounded-full font-label-lg text-label-lg hover:bg-primary-container transition-colors whitespace-nowrap"
                      >
                        Book
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-[11px] text-on-surface-variant">
              Live rates from our booking system. Final price and taxes are confirmed at checkout.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
