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
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden">
      <img
        src={wedding.hero.image}
        alt={lang === "vi" ? "Ảnh cưới của cô dâu và chú rể" : "Wedding photo of the couple"}
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35" />

      <div className="relative mx-auto flex min-h-[100svh] max-w-3xl flex-col items-center justify-center px-6 py-28 text-center">
        <motion.p {...fade(0.05)} className="text-[0.6875rem] uppercase tracking-[0.4em] text-white/85">
          {wedding.hero.label[lang]}
        </motion.p>

        <motion.h1
          {...fade(0.15)}
          className="mt-6 flex flex-col items-center font-display text-[3rem] font-light leading-[1.08] tracking-[0.02em] text-white sm:text-7xl"
        >
          <span>{wedding.couple.bride.shortName}</span>
          <span className="my-1 text-2xl text-eucalyptus sm:my-2 sm:text-4xl">&</span>
          <span>{wedding.couple.groom.shortName}</span>
        </motion.h1>


        <motion.div {...fade(0.25)} className="mt-6 flex items-center gap-4">
          <span className="h-px w-10 bg-white/40" />
          <p className="text-sm tracking-[0.14em] text-white/90">{fmt(wedding.date.reception)}</p>
          <span className="h-px w-10 bg-white/40" />
        </motion.div>

        <motion.div {...fade(0.35)} className="mt-10">
          <Countdown target={wedding.date.reception} />
        </motion.div>

        <motion.div {...fade(0.45)} className="mt-11 flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row">
          <ContactPicker>
            <button
              type="button"
              className="w-full rounded-full bg-olive px-8 py-3.5 text-sm tracking-[0.1em] text-cream transition-colors hover:bg-olive-deep sm:w-auto"
            >
              {lang === "vi" ? "Nhắn tin xác nhận" : "Message us"}
            </button>
          </ContactPicker>

          <div className="flex w-full items-center gap-3 sm:w-auto">
            <button
              type="button"
              onClick={() => downloadIcs(lang)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/70 px-7 py-3.5 text-sm tracking-[0.1em] text-white transition-colors hover:bg-white/15 sm:w-auto"
            >
              <CalendarPlus className="size-4" />
              {lang === "vi" ? "Lưu vào lịch" : "Save the date"}
            </button>
          </div>
        </motion.div>

        <motion.a
          {...fade(0.55)}
          href={googleCalendarUrl(lang)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 text-xs tracking-[0.1em] text-white/70 underline underline-offset-4 hover:text-white"
        >
          {lang === "vi" ? "Thêm vào Google Calendar" : "Add to Google Calendar"}
        </motion.a>
      </div>

      <a
        href="#story"
        aria-label={lang === "vi" ? "Cuộn xuống" : "Scroll down"}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/80 transition-colors hover:text-white"
      >
        <ChevronDown className="size-6 animate-bounce" />
      </a>
    </section>
  );
}
