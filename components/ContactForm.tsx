"use client";

import { useState } from "react";
import { property } from "@/lib/property";
import { EVENTS, track } from "@/lib/analytics";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full rounded-lg border border-outline-variant bg-surface-white px-4 py-3 text-on-surface focus:border-primary focus:ring-0";
const labelCls = "block font-label-md text-label-md uppercase tracking-wide text-on-surface-variant mb-1";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    track(EVENTS.contactFormSubmit);
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="bg-tertiary-container text-on-tertiary-container rounded-2xl p-8">
        <p className="font-headline-md text-headline-md mb-2">Thanks — your message is on its way.</p>
        <p>
          We&apos;ll follow up as soon as we can. For anything time-sensitive, please call{" "}
          <a className="underline" href={property.phone.href}>
            {property.phone.display}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5" noValidate>
      <p className="rounded-lg bg-surface-container-low p-4 text-sm text-on-surface-variant">
        Submitting this form does not confirm a reservation. For current availability, use the booking
        system or call the inn.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="name">Name</label>
          <input className={field} id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">Email</label>
          <input className={field} id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">Phone (optional)</label>
          <input className={field} id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelCls} htmlFor="arrival">Arrival (optional)</label>
            <input className={field} id="arrival" name="arrival" type="date" />
          </div>
          <div>
            <label className={labelCls} htmlFor="departure">Departure (optional)</label>
            <input className={field} id="departure" name="departure" type="date" />
          </div>
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="message">Message</label>
        <textarea className={field} id="message" name="message" rows={5} required />
      </div>

      <p className="text-xs text-on-surface-variant">
        By submitting, you agree we may use the details above to respond to your inquiry. We don&apos;t
        sell your information.
      </p>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-error-container text-on-error-container p-4 text-sm">
          Sorry — we couldn&apos;t send your message right now. Please call{" "}
          <a className="underline" href={property.phone.href}>{property.phone.display}</a> or text{" "}
          <a className="underline" href={property.text.href}>{property.text.display}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-lg text-label-lg hover:bg-primary-container transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
