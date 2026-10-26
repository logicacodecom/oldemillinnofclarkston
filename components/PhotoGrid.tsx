import Image from "next/image";

// Six photos: one large plus five. On phones (two columns) the sixth is hidden
// so the grid has no gap.
export function PhotoGrid({ title, photos, alt }: { title: string; photos: readonly string[]; alt: string }) {
  return (
    <div>
      <h3 className="font-headline-md text-headline-md text-on-surface mb-5">{title}</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {photos.map((src, i) => (
          <div
            key={src}
            className={`relative overflow-hidden rounded-xl bg-surface-container ${
              i === 0 ? "col-span-2 aspect-[16/9] md:aspect-auto md:row-span-2" : "aspect-[4/3]"
            } ${i === 5 ? "hidden md:block" : ""}`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes={i === 0 ? "(min-width: 768px) 66vw, 100vw" : "(min-width: 768px) 33vw, 50vw"}
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
