import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLanguage, useT } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

interface ArtworkItem {
  title: { vi: string; en: string };
  subtitle: { vi: string; en: string };
  aspect: string;
  spanMobile: string;
  spanDesktop: string;
}

const ARTWORKS: ArtworkItem[] = [
  {
    title: { vi: "Giữa hàng tùng xanh", en: "Among the Cypress" },
    subtitle: { vi: "Bình yên bên nhau giữa khu vườn cổ điển", en: "Side by side in the evergreen garden" },
    aspect: "aspect-[2/3]",
    spanMobile: "col-span-12",
    spanDesktop: "md:col-span-4",
  },
  {
    title: { vi: "Bên đài phun nước", en: "By the Fountain" },
    subtitle: { vi: "Tựa vai nhau bên lan can đá dưới bầu trời xanh", en: "Together on the stone balustrade under blue skies" },
    aspect: "aspect-[2/3]",
    spanMobile: "col-span-12",
    spanDesktop: "md:col-span-4",
  },
  {
    title: { vi: "Nụ hôn dưới tà voan", en: "A Kiss Beneath the Veil" },
    subtitle: { vi: "Khoảnh khắc dịu dàng giữa khu vườn Jardin", en: "A tender moment in the Jardin garden" },
    aspect: "aspect-[2/3]",
    spanMobile: "col-span-12",
    spanDesktop: "md:col-span-4",
  },
];

export function Gallery() {
  const { lang } = useLanguage();
  const t = useT();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

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

  // Touch swipe support for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

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
    <section id="gallery" className="relative bg-[#f4efe6] px-4 py-20 sm:px-6 sm:py-28 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title={lang === "vi" ? "Phòng Trưng Bày Kỷ Niệm" : "Fine Art Gallery"}
          desc={
            lang === "vi"
              ? "Từng khoảnh khắc đong đầy yêu thương được nâng niu trong từng khung hình."
              : "Love measured in shared laughter, gentle glances, and quiet moments together."
          }
        />

        {/* Curated Fine-Art Exhibition Grid */}
        <div className="mt-12 sm:mt-16 grid grid-cols-12 gap-3 sm:gap-5 md:gap-7">
          {images.map((src, idx) => {
            const art = ARTWORKS[idx % ARTWORKS.length];
            const isDualCard = art.spanMobile === "col-span-6";

            return (
              <Reveal
                key={idx}
                delay={(idx % 3) * 0.08}
                className={cn(art.spanMobile, art.spanDesktop)}
              >
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => handleOpen(idx)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleOpen(idx);
                    }
                  }}
                  className="group relative h-full cursor-zoom-in text-left transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#451020]"
                >
                  {/* Fine Art Museum Mat Board Container */}
                  <div className={cn(
                    "flex h-full flex-col rounded-xs border border-[#2d081d]/15 bg-[#fffdfa] shadow-[0_8px_24px_-8px_rgba(45,8,29,0.12)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#451020]/35 group-hover:shadow-[0_18px_36px_-10px_rgba(45,8,29,0.22)]",
                    isDualCard ? "p-2 sm:p-3" : "p-2.5 sm:p-4"
                  )}>
                    {/* Inner hairline border around the photo */}
                    <div className="relative mb-2 sm:mb-3 overflow-hidden rounded-2xs border border-[#2d081d]/12 bg-[#faf7f2]">
                      <div className={cn("relative w-full overflow-hidden", art.aspect)}>
                        <img
                          src={src}
                          alt={t(art.title)}
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    </div>

                    {/* Exhibition Placard / Mat Label */}
                    <div className={cn(
                      "mt-auto flex items-center justify-between border-t border-[#2d081d]/10",
                      isDualCard ? "pt-2 sm:pt-2.5" : "pt-2.5 sm:pt-3"
                    )}>
                      <span className={cn(
                        "font-mono font-semibold uppercase tracking-[0.22em] text-[#451020]",
                        isDualCard ? "text-[0.625rem] sm:text-xs" : "text-xs sm:text-sm"
                      )}>
                        NO. {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* View Action Pill */}
                      <div className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2d081d]/15 bg-[#faf7f2] font-serif font-semibold uppercase tracking-[0.14em] text-[#2d081d] shadow-2xs transition-all group-hover:bg-[#451020] group-hover:text-[#faf6f0] group-hover:border-[#451020]",
                        isDualCard ? "p-1.5 sm:px-2.5 sm:py-1 text-[0.5625rem]" : "px-2.5 py-1 sm:px-3 sm:py-1.5 text-[0.625rem]"
                      )}>
                        <Maximize2 className={isDualCard ? "size-2.5 sm:size-3" : "size-3 sm:size-3.5"} />
                        <span className={cn(
                          "font-medium",
                          isDualCard ? "hidden md:inline" : "hidden sm:inline"
                        )}>
                          {lang === "vi" ? "Chiêm ngưỡng" : "View"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md select-none"
          onClick={handleClose}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
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
          <div className="absolute top-5 left-6 z-10 font-mono text-xs tracking-[0.2em] text-white/80">
            {String(selectedIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
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

          {/* Main Image & Caption */}
          <div
            className="relative flex flex-col items-center max-h-[90vh] max-w-[92vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="overflow-hidden rounded-xs border border-white/20 bg-black/40 shadow-2xl">
              <img
                src={images[selectedIndex]}
                alt={t(ARTWORKS[selectedIndex % ARTWORKS.length].title)}
                className="max-h-[72vh] max-w-full object-contain"
              />
            </div>

            {/* Caption in lightbox */}
            <div className="mt-3.5 text-center px-4 max-w-xl">
              <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.24em] text-[#dfd5c6]">
                NO. {String(selectedIndex + 1).padStart(2, "0")}
              </p>
            </div>
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
