"use client";

import { useState } from "react";
import { property } from "@/lib/property";
import { careersEmail, isResumeFile, positions, resumeMaxBytes } from "@/lib/careers";
import { EVENTS, track } from "@/lib/analytics";
import type { Dict } from "@/lib/dictionaries/en";

type Status = "idle" | "submitting" | "success" | "error";

const field =
  "w-full rounded-lg border border-outline-variant bg-surface-white px-4 py-3 text-on-surface focus:border-primary focus:ring-0";
const labelCls = "block font-label-md text-label-md uppercase tracking-wide text-on-surface-variant mb-1";

export function CareersForm({
  t,
  positionTitles,
  lang,
}: {
  t: Dict["careersForm"];
  positionTitles: Record<(typeof positions)[number], string>;
  lang: string;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [fileError, setFileError] = useState<string | null>(null);

  // Check the résumé before upload so a too-large file fails here, not at Vercel's body limit.
  function checkFile(file: File | undefined): boolean {
    let error: string | null = null;
    if (file && file.size > 0) {
      if (!isResumeFile(file.name)) error = t.resumeWrongType;
      else if (file.size > resumeMaxBytes) error = t.resumeTooLarge;
    }
    setFileError(error);
    return !error;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const file = data.get("resume");
    if (!checkFile(file instanceof File ? file : undefined)) return;
    setStatus("submitting");
    track(EVENTS.careersFormSubmit);
    try {
      const res = await fetch("/api/careers", { method: "POST", body: data });
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
        <p className="font-headline-md text-headline-md mb-2">{t.successTitle}</p>
        <p>{t.successText}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <p className="rounded-lg bg-surface-container-low p-4 text-sm text-on-surface-variant">{t.intro}</p>
      <input type="hidden" name="lang" value={lang} />
      {/* Honeypot for bots: hidden from people and assistive tech. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className={labelCls} htmlFor="name">{t.name}</label>
          <input className={field} id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div>
          <label className={labelCls} htmlFor="email">{t.email}</label>
          <input className={field} id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div>
          <label className={labelCls} htmlFor="phone">{t.phone}</label>
          <input className={field} id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
        <div>
          <label className={labelCls} htmlFor="position">{t.position}</label>
          <select className={field} id="position" name="position" required defaultValue="">
            <option value="" disabled>{t.positionPlaceholder}</option>
            {positions.map((p) => (
              <option key={p} value={p}>{positionTitles[p]}</option>
            ))}
            <option value="general">{t.general}</option>
          </select>
        </div>
      </div>

      <div>
        <label className={labelCls} htmlFor="availability">{t.availability}</label>
        <input className={field} id="availability" name="availability" type="text" placeholder={t.availabilityHint} />
      </div>

      <div>
        <label className={labelCls} htmlFor="message">{t.message}</label>
        <textarea className={field} id="message" name="message" rows={5} />
      </div>

      <div>
        <label className={labelCls} htmlFor="resume">{t.resume}</label>
        <input
          className="block w-full text-sm text-on-surface-variant file:mr-4 file:rounded-full file:border-0 file:bg-surface-container file:px-5 file:py-2 file:font-label-lg file:text-primary hover:file:bg-surface-container-high"
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          aria-describedby="resume-hint"
          onChange={(e) => checkFile(e.currentTarget.files?.[0])}
        />
        <p id="resume-hint" className="mt-1 text-xs text-on-surface-variant">{t.resumeHint}</p>
        {fileError && (
          <p role="alert" className="mt-2 text-sm text-error">{fileError}</p>
        )}
      </div>

      <p className="text-xs text-on-surface-variant">{t.consent}</p>

      {status === "error" && (
        <p role="alert" className="rounded-lg bg-error-container text-on-error-container p-4 text-sm">
          {t.errorPrefix}{" "}
          <a className="underline break-all" href={`mailto:${careersEmail}`}>{careersEmail}</a> {t.errorOr}{" "}
          <a className="underline" href={property.phone.href}>{property.phone.display}</a>.
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-primary text-on-primary px-8 py-4 rounded-full font-label-lg text-label-lg hover:bg-primary-container transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? t.sending : t.submit}
      </button>
    </form>
  );
}
