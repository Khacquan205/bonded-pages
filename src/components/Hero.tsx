import { motion } from "framer-motion";
import { ChevronDown, CalendarPlus } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLanguage } from "@/context/LanguageContext";
import { ContactPicker } from "./ContactPicker";
import { googleCalendarUrl } from "@/lib/calendar";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

export function Hero() {
  const { lang } = useLanguage();

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-[#451020]">
      {/* Embossed floral plum paper, taken from the printed Save the Date card */}
      <img
        src="/images/save-the-date-texture.jpg"
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-4xl flex-col items-center px-3 pt-16 pb-2.5 text-center sm:px-6 sm:pt-20 sm:pb-4">
        <h1 className="sr-only">
          Save The Date · 11.12.2026 · {wedding.couple.groom.name} &amp; {wedding.couple.bride.name}
        </h1>

        {/* Save The Date artwork: the photo fills the whole block, script overlaid on its corners */}
        <motion.div {...fade(0.1)} className="my-auto flex w-full flex-col items-center">
          <div
            className="relative aspect-[664/822] [--hero-reserve:19rem] sm:[--hero-reserve:15rem] shadow-[0_16px_45px_rgba(0,0,0,0.45)]"
            style={{ width: "min(72vw, max(calc((100svh - var(--hero-reserve)) * 0.808 * 0.76), 16rem), 32rem)" }}
          >
            <img
              src={wedding.hero.image}
              alt={
                lang === "vi"
                  ? "Ảnh cưới của Thành Long và Huyền Nga"
                  : "Wedding photo of Thanh Long and Huyen Nga"
              }
              decoding="async"
              className="absolute inset-0 size-full object-cover"
            />
            {/* Soft top/bottom shading so the white script stays legible on the photo */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-black/40 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[32%] bg-gradient-to-t from-black/65 via-black/35 to-transparent" />
            <img
              src="/images/save-the-date-save.png"
              alt=""
              aria-hidden="true"
              style={{
                left: "-16.27%",
                top: "-13.14%",
                width: "66.57%",
              }}
              className="pointer-events-none absolute drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]"
            />
            <img
              src="/images/save-the-date-the-date.png"
              alt=""
              aria-hidden="true"
              style={{
                left: "8.28%",
                top: "92.94%",
                width: "108.43%",
              }}
              className="pointer-events-none absolute drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]"
            />
          </div>
          <p className="mt-8 font-serif text-xs italic lining-nums tracking-[0.04em] text-[#faf6f0]/90 sm:mt-11 sm:text-base">
            11th December 2026.
          </p>
        </motion.div>

        {/* Bottom Section: Venue, Date, CTA Buttons & Scroll */}
        <div className="w-full flex flex-col items-center pt-2 sm:pt-3">
          {/* Venue & Reception Time Banner */}
          <motion.div {...fade(0.28)} className="flex flex-col items-center gap-1 sm:gap-1.5">
            <div className="flex items-center gap-3 sm:gap-5">
              <span className="h-px w-6 bg-white/40 sm:w-12" />
              <p className="font-display text-xs uppercase tracking-[0.24em] text-white sm:text-sm md:text-base">
                {wedding.venue.name}
              </p>
              <span className="h-px w-6 bg-white/40 sm:w-12" />
            </div>
            <p className="font-sans text-[0.6875rem] tracking-[0.16em] text-white/85 sm:text-xs uppercase">
              {lang === "vi" ? "18:00 · Thứ Sáu, 11 Tháng 12, 2026" : "6:00 PM · Friday, December 11, 2026"}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div {...fade(0.38)} className="mt-3 flex w-full flex-col items-center gap-2.5 sm:mt-4 sm:w-auto sm:flex-row sm:gap-4">
            <ContactPicker>
              <button
                type="button"
                className="w-full rounded-full bg-[#faf6f0] px-7 py-2.5 font-serif text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-[#451020] shadow-lg transition-all hover:scale-[1.02] hover:bg-white hover:shadow-xl sm:w-auto sm:text-sm sm:px-8 sm:py-3"
              >
                {lang === "vi" ? "Xác nhận tham dự" : "Confirm attendance"}
              </button>
            </ContactPicker>

            <a
              href={googleCalendarUrl(lang)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/75 bg-white/5 px-6 py-2.5 font-serif text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-white transition-all hover:bg-white/15 sm:w-auto sm:text-sm sm:px-7 sm:py-3"
            >
              <CalendarPlus className="size-4" />
              {lang === "vi" ? "Lưu vào lịch" : "Save the date"}
            </a>
          </motion.div>

          {/* Scroll down indicator */}
          <a
            href="#info"
            aria-label={lang === "vi" ? "Cuộn xuống" : "Scroll down"}
            className="mt-2 text-white/65 transition-colors hover:text-white sm:hidden"
          >
            <ChevronDown className="size-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
