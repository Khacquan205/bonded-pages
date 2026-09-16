import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, X, Maximize2 } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLanguage, useT } from "@/context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

interface GalleryItem {
  title: { vi: string; en: string };
  subtitle: { vi: string; en: string };
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    title: { vi: "Hạnh phúc ngập tràn", en: "Under the Petals" },
    subtitle: { vi: "Nụ hôn trong sự chúc phúc của gia đình", en: "A tender kiss sealed with love" },
  },
  {
    title: { vi: "Kỷ vật trăm năm", en: "The Eternal Rings" },
    subtitle: { vi: "Trọn đời gắn kết, son sắt yêu thương", en: "Two rings, one everlasting promise" },
  },
  {
    title: { vi: "Tà voan hẹn ước", en: "The Cathedral Veil" },
    subtitle: { vi: "Nụ cười rạng ngời bên bờ sóng", en: "Pure romance by the ocean breeze" },
  },
  {
    title: { vi: "Hương hoa ngày vui", en: "Floral Romance" },
    subtitle: { vi: "Mẫu đơn e ấp và sắc hoa ngọt ngào", en: "Soft pastel blooms of devotion" },
  },
  {
    title: { vi: "Ánh nhìn trao nhau", en: "Tender Glance" },
    subtitle: { vi: "Ánh hoàng hôn dịu dàng ấm áp", en: "Bathed in warm golden hour light" },
  },
  {
    title: { vi: "Dạ tiệc lung linh", en: "JW Marriott Ballroom" },
    subtitle: { vi: "Ánh nến ấm áp và ly pha lê trang trọng", en: "An evening of timeless celebration" },
  },
  {
    title: { vi: "Bình yên bên anh", en: "By the Lake" },
    subtitle: { vi: "Cùng nhìn về tương lai êm đềm", en: "Finding peace in your gentle embrace" },
  },
  {
    title: { vi: "Chung lối tương lai", en: "Walking into Tomorrow" },
    subtitle: { vi: "Tay nắm chặt tay qua muôn dặm đường dài", en: "Hand in hand towards the golden horizon" },
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
    <section id="gallery" className="bg-[#f4efe6] px-4 py-20 sm:px-6 sm:py-28 scroll-mt-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          label={lang === "vi" ? "Khoảnh Khắc" : "Moments"}
          title={lang === "vi" ? "Phòng Trưng Bày Kỷ Niệm" : "Fine Art Gallery"}
          desc={
            lang === "vi"
              ? "Từng khoảnh khắc đong đầy yêu thương được lưu giữ trọn vẹn trong từng khung hình."
              : "Love measured in shared laughter, gentle glances, and quiet moments together."
          }
        />

        {/* Minimalist Masonry Grid: 2 columns on mobile, 3 on tablet, 4 on desktop */}
        <Reveal delay={0.15} className="mt-12 sm:mt-16">
          <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 sm:gap-4.5 [column-fill:_balance]">
            {images.map((src, idx) => {
              const item = GALLERY_ITEMS[idx % GALLERY_ITEMS.length];

              return (
                <div
                  key={idx}
                  onClick={() => handleOpen(idx)}
                  className="group relative mb-3 sm:mb-4.5 break-inside-avoid cursor-pointer overflow-hidden rounded-md sm:rounded-lg border border-[#2d081d]/10 bg-white shadow-[0_4px_16px_-4px_rgba(45,8,29,0.1)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_12px_28px_-6px_rgba(45,8,29,0.2)] focus:outline-none"
                >
                  <img
                    src={src}
                    alt={t(item.title)}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover block transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />

                  {/* Elegant hover overlay with subtle zoom icon */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
                    <div className="flex size-10 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-xs scale-90 transition-transform duration-300 group-hover:scale-100 shadow-md">
                      <Maximize2 className="size-4" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>
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
            <div className="overflow-hidden rounded-md border border-white/20 bg-black/40 shadow-2xl">
              <img
                src={images[selectedIndex]}
                alt={t(GALLERY_ITEMS[selectedIndex % GALLERY_ITEMS.length].title)}
                className="max-h-[72vh] max-w-full object-contain"
              />
            </div>

            {/* Caption in lightbox using elegant Cormorant Garamond serif */}
            <div className="mt-4 text-center px-4 max-w-xl">
              <h3 className="font-serif text-lg sm:text-2xl font-light text-cream tracking-wide">
                {t(GALLERY_ITEMS[selectedIndex % GALLERY_ITEMS.length].title)}
              </h3>
              <p className="mt-1 font-serif text-xs sm:text-sm italic text-cream/70">
                {t(GALLERY_ITEMS[selectedIndex % GALLERY_ITEMS.length].subtitle)}
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
