"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import type { GalleryPhoto, GalleryCategory } from "@/lib/gallery";
import { Icon } from "./Icon";

export function GalleryGrid({
  photos,
  categories,
}: {
  photos: GalleryPhoto[];
  categories: GalleryCategory[];
}) {
  const [cat, setCat] = useState("all");
  const [index, setIndex] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastTrigger = useRef<HTMLButtonElement | null>(null);

  const tabs = [{ id: "all", label: "All" }, ...categories.map((c) => ({ id: c.id, label: c.label }))];
  const visible = cat === "all" ? photos : photos.filter((p) => p.categoryId === cat);

  const open = useCallback((i: number, el: HTMLButtonElement) => {
    lastTrigger.current = el;
    setIndex(i);
  }, []);
  const close = useCallback(() => {
    setIndex(null);
    lastTrigger.current?.focus();
  }, []);
  const step = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + visible.length) % visible.length)),
    [visible.length]
  );

  useEffect(() => {
    if (index === null) return;
    closeRef.current?.focus();
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, close, step]);

  const current = index === null ? null : visible[index];

  return (
    <div>
      <div role="group" aria-label="Filter photos" className="flex flex-wrap gap-3 mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            aria-pressed={cat === t.id}
            onClick={() => setCat(t.id)}
            className={`px-5 py-2.5 rounded-full font-label-lg text-label-lg border transition-colors ${
              cat === t.id
                ? "bg-primary text-on-primary border-primary"
                : "bg-surface-white text-on-surface border-outline-variant/50 hover:border-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {visible.map((photo, i) => (
          <li key={photo.src}>
            <button
              type="button"
              onClick={(e) => open(i, e.currentTarget)}
              className="group relative block w-full aspect-[4/3] rounded-xl overflow-hidden bg-surface-container"
              aria-label={`${photo.alt} — view larger`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close photo viewer"
            className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
          >
            <Icon name="close" className="text-2xl" />
          </button>
          <button
            type="button"
            onClick={() => step(-1)}
            aria-label="Previous photo"
            className="absolute left-2 sm:left-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
          >
            <Icon name="chevron_left" className="text-3xl" />
          </button>
          <div className="relative w-full max-w-5xl h-[80vh]">
            <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
          </div>
          <button
            type="button"
            onClick={() => step(1)}
            aria-label="Next photo"
            className="absolute right-2 sm:right-6 w-12 h-12 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"
          >
            <Icon name="chevron_right" className="text-3xl" />
          </button>
          <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/80 text-sm">
            {index! + 1} / {visible.length}
          </p>
        </div>
      )}
    </div>
  );
}
