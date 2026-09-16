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
    title: { vi: "Hạnh phúc ngập tràn", en: "Under the Petals" },
    subtitle: { vi: "Nụ hôn trong sự chúc phúc của gia đình", en: "A tender kiss sealed with love" },
    aspect: "aspect-[16/10]",
    spanMobile: "col-span-12",
    spanDesktop: "md:col-span-7 lg:col-span-8",
  },
  {
    title: { vi: "Kỷ vật trăm năm", en: "The Eternal Rings" },
    subtitle: { vi: "Trọn đời gắn kết, son sắt yêu thương", en: "Two rings, one everlasting promise" },
    aspect: "aspect-[4/3] sm:aspect-square",
    spanMobile: "col-span-6",
    spanDesktop: "md:col-span-5 lg:col-span-4",
  },
  {
    title: { vi: "Tà voan hẹn ước", en: "The Cathedral Veil" },
    subtitle: { vi: "Nụ cười rạng ngời bên bờ sóng", en: "Pure romance by the ocean breeze" },
    aspect: "aspect-[3/4]",
    spanMobile: "col-span-6",
    spanDesktop: "md:col-span-4 lg:col-span-4",
  },
  {
    title: { vi: "Hương hoa ngày vui", en: "Floral Romance" },
    subtitle: { vi: "Mẫu đơn e ấp và sắc hoa ngọt ngào", en: "Soft pastel blooms of devotion" },
    aspect: "aspect-[16/11] sm:aspect-[4/3]",
    spanMobile: "col-span-12",
    spanDesktop: "md:col-span-4 lg:col-span-4",
  },
  {
    title: { vi: "Ánh nhìn trao nhau", en: "Tender Glance" },
    subtitle: { vi: "Ánh hoàng hôn dịu dàng ấm áp", en: "Bathed in warm golden hour light" },
    aspect: "aspect-[3/4]",
    spanMobile: "col-span-6",
    spanDesktop: "md:col-span-4 lg:col-span-4",
  },
  {
    title: { vi: "Dạ tiệc lung linh", en: "JW Marriott Ballroom" },
    subtitle: { vi: "Ánh nến ấm áp và ly pha lê trang trọng", en: "An evening of timeless celebration" },
    aspect: "aspect-[4/3] sm:aspect-[16/11]",
    spanMobile: "col-span-6",
    spanDesktop: "md:col-span-6 lg:col-span-6",
  },
  {
    title: { vi: "Bình yên bên anh", en: "By the Lake" },
    subtitle: { vi: "Cùng nhìn về tương lai êm đềm", en: "Finding peace in your gentle embrace" },
    aspect: "aspect-[16/11]",
    spanMobile: "col-span-12",
    spanDesktop: "md:col-span-6 lg:col-span-6",
  },
  {
    title: { vi: "Chung lối tương lai", en: "Walking into Tomorrow" },
    subtitle: { vi: "Tay nắm chặt tay qua muôn dặm đường dài", en: "Hand in hand towards the golden horizon" },
    aspect: "aspect-[16/9] sm:aspect-[21/9]",
    spanMobile: "col-span-12",
    spanDesktop: "col-span-12",
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
          label={lang === "vi" ? "Khoảnh Khắc" : "Moments"}
          title={lang === "vi" ? "Phòng Trưng Bày Kỷ Niệm" : "Fine Art Gallery"}
          desc={
            lang === "vi"
              ? "Từng khoảnh khắc đong đầy yêu thương được nâng niu trong từng khung hình nghệ thuật."
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
                  className="group relative h-full cursor-zoom-in text-left transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#610401]"
                >
                  {/* Fine Art Museum Mat Board Container */}
                  <div className={cn(
                    "flex h-full flex-col justify-between rounded-xs border border-[#2d081d]/15 bg-[#fffdfa] shadow-[0_8px_24px_-8px_rgba(45,8,29,0.12)] transition-all duration-500 group-hover:-translate-y-1 group-hover:border-[#610401]/35 group-hover:shadow-[0_18px_36px_-10px_rgba(45,8,29,0.22)]",
                    isDualCard ? "p-2 sm:p-3" : "p-2.5 sm:p-4"
                  )}>
                    {/* Inner hairline border around the photo */}
                    <div className="relative overflow-hidden rounded-2xs border border-[#2d081d]/12 bg-[#faf7f2]">
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
                      "flex items-center justify-between border-t border-[#2d081d]/10",
                      isDualCard ? "mt-2 pt-2 sm:mt-3 sm:pt-2.5" : "mt-3 pt-2.5 sm:mt-3.5 sm:pt-3"
                    )}>
                      <div className="min-w-0 flex-1 pr-2">
                        <span className={cn(
                          "font-mono font-semibold uppercase tracking-[0.22em] text-[#610401]",
                          isDualCard ? "text-[0.5625rem] sm:text-[0.625rem]" : "text-[0.625rem] sm:text-xs"
                        )}>
                          NO. {String(idx + 1).padStart(2, "0")}
                        </span>
                        <h4 className={cn(
                          "mt-0.5 font-serif font-normal text-[#2d081d] leading-tight transition-colors group-hover:text-[#610401]",
                          isDualCard ? "text-[0.8125rem] sm:text-base truncate" : "text-sm sm:text-lg md:text-xl"
                        )}>
                          {t(art.title)}
                        </h4>
                        <p className={cn(
                          "mt-0.5 font-serif italic text-[#3d271d]/70",
                          isDualCard ? "text-[0.625rem] sm:text-xs truncate" : "text-xs sm:text-sm"
                        )}>
                          {t(art.subtitle)}
                        </p>
                      </div>

                      {/* View Action Pill */}
                      <div className={cn(
                        "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-[#2d081d]/15 bg-[#faf7f2] font-display uppercase tracking-[0.14em] text-[#2d081d] shadow-2xs transition-all group-hover:bg-[#610401] group-hover:text-[#faf6f0] group-hover:border-[#610401]",
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

            {/* Caption in lightbox using elegant Cormorant Garamond */}
            <div className="mt-3.5 text-center px-4 max-w-xl">
              <p className="font-mono text-[0.6875rem] font-semibold uppercase tracking-[0.24em] text-[#dfd5c6]">
                NO. {String(selectedIndex + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 font-serif text-lg sm:text-2xl font-light text-[#faf6f0] tracking-wide">
                {t(ARTWORKS[selectedIndex % ARTWORKS.length].title)}
              </h3>
              <p className="mt-1 font-serif text-xs sm:text-sm italic text-[#faf6f0]/75">
                {t(ARTWORKS[selectedIndex % ARTWORKS.length].subtitle)}
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
