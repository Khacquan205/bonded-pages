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
  span: string;
}

const ARTWORKS: ArtworkItem[] = [
  {
    title: { vi: "Hạnh phúc ngập tràn", en: "Under the Petals" },
    subtitle: { vi: "Nụ hôn trong sự chúc phúc của gia đình", en: "A tender kiss sealed with love" },
    aspect: "aspect-[16/11]",
    span: "col-span-12 md:col-span-7",
  },
  {
    title: { vi: "Kỷ vật trăm năm", en: "The Eternal Rings" },
    subtitle: { vi: "Trọn đời gắn kết, son sắt yêu thương", en: "Two rings, one everlasting promise" },
    aspect: "aspect-[4/3]",
    span: "col-span-12 md:col-span-5",
  },
  {
    title: { vi: "Tà voan hẹn ước", en: "The Cathedral Veil" },
    subtitle: { vi: "Nụ cười rạng ngời bên bờ sóng", en: "Pure romance by the ocean breeze" },
    aspect: "aspect-[3/4]",
    span: "col-span-12 sm:col-span-6 md:col-span-4",
  },
  {
    title: { vi: "Hương hoa ngày vui", en: "Floral Romance" },
    subtitle: { vi: "Mẫu đơn e ấp và sắc hoa ngọt ngào", en: "Soft pastel blooms of devotion" },
    aspect: "aspect-[4/3]",
    span: "col-span-12 sm:col-span-6 md:col-span-4",
  },
  {
    title: { vi: "Ánh nhìn trao nhau", en: "Tender Glance" },
    subtitle: { vi: "Ánh hoàng hôn dịu dàng ấm áp", en: "Bathed in warm golden hour light" },
    aspect: "aspect-[3/4]",
    span: "col-span-12 sm:col-span-6 md:col-span-4",
  },
  {
    title: { vi: "Dạ tiệc lung linh", en: "JW Marriott Ballroom" },
    subtitle: { vi: "Ánh nến ấm áp và ly pha lê trang trọng", en: "An evening of timeless celebration" },
    aspect: "aspect-[16/10]",
    span: "col-span-12 md:col-span-7",
  },
  {
    title: { vi: "Bình yên bên anh", en: "By the Lake" },
    subtitle: { vi: "Cùng nhìn về tương lai êm đềm", en: "Finding peace in your gentle embrace" },
    aspect: "aspect-[4/3]",
    span: "col-span-12 md:col-span-5",
  },
  {
    title: { vi: "Chung lối tương lai", en: "Walking into Tomorrow" },
    subtitle: { vi: "Tay nắm chặt tay qua muôn dặm đường dài", en: "Hand in hand towards the golden horizon" },
    aspect: "aspect-[16/9] sm:aspect-[21/9]",
    span: "col-span-12",
  },
];

export function Gallery() {
  const { lang } = useLanguage();
  const t = useT();
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
    <section id="gallery" className="bg-cream-deep/70 px-6 py-20 sm:py-28 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={lang === "vi" ? "Khoảnh khắc" : "Gallery"}
          title={lang === "vi" ? "Phòng trưng bày kỷ niệm" : "Fine Art Gallery"}
          desc={
            lang === "vi"
              ? "Từng khoảnh khắc đong đầy yêu thương được nâng niu trong từng khung hình nghệ thuật."
              : "Love measured in shared laughter, gentle glances, and quiet moments together."
          }
        />

        {/* Fine Art Exhibition Grid */}
        <div className="mt-14 grid grid-cols-12 gap-6 sm:gap-8">
          {images.map((src, idx) => {
            const art = ARTWORKS[idx % ARTWORKS.length];

            return (
              <Reveal
                key={idx}
                delay={(idx % 3) * 0.08}
                className={cn("col-span-12", art.span)}
              >
                <div
                  onClick={() => handleOpen(idx)}
                  className="group relative cursor-pointer transition-all duration-500"
                >
                  {/* Fine Art Museum Mat Board */}
                  <div className="relative rounded-xs border border-maroon/20 bg-[#fffefc] p-3 shadow-[0_8px_24px_-8px_rgba(74,21,33,0.1)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:border-maroon/40 group-hover:shadow-[0_18px_36px_-10px_rgba(74,21,33,0.18)] sm:p-4">
                    {/* Inner hairline border around the photo */}
                    <div className="relative overflow-hidden rounded-xs border border-maroon/15 bg-cream/40">
                      <div className={cn("relative w-full overflow-hidden", art.aspect)}>
                        <img
                          src={src}
                          alt={t(art.title)}
                          loading="lazy"
                          decoding="async"
                          className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                      </div>
                    </div>

                    {/* Exhibition Placard / Mat Label */}
                    <div className="mt-3.5 flex items-center justify-between border-t border-maroon/10 pt-3 sm:mt-4 sm:pt-3.5">
                      <div className="flex flex-col">
                        <span className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.28em] text-maroon/75">
                          NO. {String(idx + 1).padStart(2, "0")}
                        </span>
                        <h4 className="mt-0.5 font-display text-base font-normal text-maroon sm:text-lg">
                          {t(art.title)}
                        </h4>
                        <p className="font-serif text-xs italic text-walnut/70">
                          {t(art.subtitle)}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 rounded-full border border-maroon/20 bg-cream px-3 py-1 font-display text-[0.625rem] font-medium uppercase tracking-[0.14em] text-maroon transition-all group-hover:bg-maroon group-hover:text-cream shadow-2xs">
                        <Maximize2 className="size-3" />
                        <span className="hidden sm:inline">
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/92 p-4 backdrop-blur-md"
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
            <div className="mt-3.5 text-center">
              <p className="font-display text-[0.6875rem] font-semibold uppercase tracking-[0.26em] text-cream/75">
                NO. {String(selectedIndex + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-0.5 font-display text-base text-cream sm:text-xl">
                {t(ARTWORKS[selectedIndex % ARTWORKS.length].title)}
              </h3>
              <p className="mt-0.5 font-serif text-xs italic text-cream/70 sm:text-sm">
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
