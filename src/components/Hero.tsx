import { motion } from "framer-motion";
import { ChevronDown, CalendarPlus } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useFormatDate, useLanguage } from "@/context/LanguageContext";
import { Countdown } from "./Countdown";
import { ContactPicker } from "./ContactPicker";
import { downloadIcs, googleCalendarUrl } from "@/lib/calendar";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

export function Hero() {
  const { lang } = useLanguage();
  const fmt = useFormatDate();

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden flex items-center justify-center">
      {/* Background couple photo */}
      <img
        src={wedding.hero.image}
        alt={lang === "vi" ? "Ảnh cưới của Huyền Nga và Thành Long" : "Wedding photo of Huyen Nga and Thanh Long"}
        decoding="async"
        className="absolute inset-0 size-full object-cover object-[center_35%]"
      />

      {/* Deep bordeaux tint and cinematic vignette tuned for the new couple photo */}
      <div className="absolute inset-0 bg-[#2d081d]/25 mix-blend-multiply" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />

      {/* Fine-art stationery double hairline frame */}
      <div className="pointer-events-none absolute inset-3 sm:inset-5 md:inset-7 z-10 border border-white/25" />
      <div className="pointer-events-none absolute inset-4 sm:inset-6 md:inset-8 z-10 border border-white/10" />

      {/* Content Container */}
      <div className="relative z-20 mx-auto flex min-h-[100svh] max-w-4xl flex-col items-center justify-center px-6 pt-24 pb-16 text-center sm:pt-28 sm:pb-20">
        {/* Monogram Crest & Couple Names */}
        <motion.div {...fade(0.05)} className="flex flex-col items-center gap-1.5 sm:gap-2">
          <div className="relative mb-1 flex items-center justify-center">
            <img
              src="/images/logo-cat-mouse-white.png"
              alt="Logo Lan & Nam"
              className="h-20 sm:h-24 md:h-28 w-auto object-contain drop-shadow-[0_4px_24px_rgba(0,0,0,0.85)] transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div
            className="flex flex-col items-center gap-0.5 text-center"
            aria-label={`${wedding.couple.bride.name} & ${wedding.couple.groom.name}`}
          >
            <span className="font-display text-[0.75rem] sm:text-xs md:text-sm font-medium uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white/95 whitespace-nowrap">
              {wedding.couple.bride.name}
            </span>
            <span className="font-display text-[0.625rem] sm:text-[0.6875rem] font-light text-white/65">
              &amp;
            </span>
            <span className="font-display text-[0.75rem] sm:text-xs md:text-sm font-medium uppercase tracking-[0.22em] sm:tracking-[0.28em] text-white/95 whitespace-nowrap">
              {wedding.couple.groom.name}
            </span>
          </div>
        </motion.div>

        {/* Official Save The Date Typography Artwork */}
        <motion.div {...fade(0.18)} className="my-2 sm:my-3 flex flex-col items-center">
          <h1 className="sr-only">
            Save The Date · 11.12.2026 · {wedding.couple.bride.name} &amp; {wedding.couple.groom.name}
          </h1>
          <img
            src="/images/save-the-date-white.png"
            alt="Save the date 11.12.26"
            className="h-auto w-44 sm:w-56 md:w-64 max-h-[28vh] object-contain drop-shadow-[0_4px_28px_rgba(0,0,0,0.65)]"
          />
        </motion.div>

        {/* Venue & Ceremony Date Banner */}
        <motion.div {...fade(0.28)} className="flex flex-col items-center gap-1">
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="h-px w-6 bg-white/40 sm:w-12" />
            <p className="font-display text-xs uppercase tracking-[0.24em] text-white sm:text-sm md:text-base drop-shadow-xs">
              {wedding.venue.name} · {wedding.venue.city}
            </p>
            <span className="h-px w-6 bg-white/40 sm:w-12" />
          </div>
          <p className="font-sans text-[0.6875rem] tracking-[0.16em] text-white/85 sm:text-xs uppercase">
            {lang === "vi" ? "18:00 · Thứ Sáu, 11 Tháng 12, 2026" : "6:00 PM · Friday, December 11, 2026"}
          </p>
        </motion.div>

        {/* Countdown to Reception */}
        <motion.div {...fade(0.38)} className="mt-4 sm:mt-5">
          <Countdown target={wedding.date.reception} />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div {...fade(0.48)} className="mt-6 flex w-full flex-col items-center gap-3 sm:mt-7 sm:w-auto sm:flex-row sm:gap-4">
          <ContactPicker>
            <button
              type="button"
              className="w-full rounded-full bg-[#610401] px-7 py-3 font-display text-xs font-medium uppercase tracking-[0.16em] text-[#faf6f0] shadow-lg transition-all hover:scale-[1.02] hover:bg-[#780602] hover:shadow-xl sm:w-auto sm:text-sm sm:px-8 sm:py-3.5"
            >
              {lang === "vi" ? "Xác nhận tham dự" : "Confirm attendance"}
            </button>
          </ContactPicker>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => downloadIcs(lang)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/75 bg-black/20 backdrop-blur-xs px-6 py-3 font-display text-xs font-medium uppercase tracking-[0.14em] text-white transition-all hover:bg-white/20 sm:w-auto sm:text-sm sm:px-7 sm:py-3.5"
            >
              <CalendarPlus className="size-4" />
              {lang === "vi" ? "Lưu vào lịch" : "Save the date"}
            </button>
          </div>
        </motion.div>

        <motion.a
          {...fade(0.58)}
          href={googleCalendarUrl(lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 font-display text-xs tracking-[0.12em] text-white/80 underline underline-offset-4 hover:text-white sm:text-sm transition-colors"
        >
          {lang === "vi" ? "Thêm vào Google Calendar" : "Add to Google Calendar"}
        </motion.a>
      </div>

      <a
        href="#info"
        aria-label={lang === "vi" ? "Cuộn xuống" : "Scroll down"}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-white/75 transition-colors hover:text-white"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </a>
    </section>
  );
}
