import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Gallery() {
  const { lang } = useLanguage();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const images = wedding.gallery;

  const handleOpen = (index: number) => {
    setSelectedIndex(index);
  };

  const handleClose = () => {
    setSelectedIndex(null);
  };

  const handlePrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
  }, [images.length]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % images.length : null));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, handlePrev, handleNext]);

  return (
    <section id="gallery" className="bg-cream-deep px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={lang === "vi" ? "Khoảnh khắc" : "Gallery"}
          title={lang === "vi" ? "Album ảnh cưới" : "Our Moments"}
          desc={
            lang === "vi"
              ? "Tình yêu được đong đếm bằng những nụ cười, ánh mắt và những chuyến đi cùng nhau."
              : "Love measured in shared laughter, gentle glances, and quiet moments together."
          }
        />

        {/* Dynamic Bento Gallery Grid */}
        <div className="mt-14 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4 md:auto-rows-[220px]">
          {images.map((src, idx) => {
            // Define varied dimensions and spans for each photo
            const bentoStyles = [
              "col-span-2 row-span-2", // 0: Big featured moment
              "col-span-1 row-span-1", // 1: Detail shot (square)
              "col-span-1 row-span-2", // 2: Tall portrait
              "col-span-1 row-span-1", // 3: Ring / Hands
              "col-span-1 row-span-2", // 4: Tall bride portrait
              "col-span-2 row-span-1", // 5: Wide confetti celebration
              "col-span-1 row-span-1", // 6: Groom portrait
              "col-span-2 row-span-1", // 7: Wide landscape panorama
            ];

            const spanClass = bentoStyles[idx % bentoStyles.length];

            return (
              <Reveal
                key={idx}
                delay={(idx % 4) * 0.07}
                className={cn(
                  "group relative cursor-pointer overflow-hidden rounded-xl border border-eucalyptus/60 bg-cream shadow-2xs transition-all duration-300 hover:shadow-md hover:border-olive/60",
                  spanClass,
                )}
              >
                <button
                  type="button"
                  onClick={() => handleOpen(idx)}
                  aria-label={`${lang === "vi" ? "Xem ảnh" : "View photo"} ${idx + 1}`}
                  className="relative block size-full min-h-[160px] focus:outline-none focus:ring-2 focus:ring-olive"
                >
                  <img
                    src={src}
                    alt={`${lang === "vi" ? "Ảnh cưới" : "Wedding photo"} ${idx + 1}`}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-3 right-3 rounded-full bg-cream/90 px-2.5 py-1 text-[0.625rem] font-medium uppercase tracking-[0.14em] text-olive-deep opacity-0 backdrop-blur-xs transition-opacity duration-300 group-hover:opacity-100">
                    {lang === "vi" ? "Phóng to" : "Enlarge"}
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md"
          onClick={handleClose}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={handleClose}
            aria-label={lang === "vi" ? "Đóng" : "Close"}
            className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:top-6"
          >
            <X className="size-6" />
          </button>

          {/* Counter */}
          <div className="absolute top-5 left-6 z-10 font-sans text-xs tracking-[0.2em] text-white/80">
            {selectedIndex + 1} / {images.length}
          </div>

          {/* Prev button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            aria-label={lang === "vi" ? "Ảnh trước" : "Previous photo"}
            className="absolute left-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6 sm:size-12"
          >
            <ChevronLeft className="size-6 sm:size-7" />
          </button>

          {/* Main Image */}
          <div
            className="relative max-h-[85vh] max-w-[90vw] overflow-hidden rounded-md shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={images[selectedIndex]}
              alt={`${lang === "vi" ? "Ảnh cưới" : "Wedding photo"} ${selectedIndex + 1}`}
              className="max-h-[85vh] max-w-full object-contain"
            />
          </div>

          {/* Next button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            aria-label={lang === "vi" ? "Ảnh tiếp theo" : "Next photo"}
            className="absolute right-2 top-1/2 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6 sm:size-12"
          >
            <ChevronRight className="size-6 sm:size-7" />
          </button>
        </div>
      )}
    </section>
  );
}
