import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLanguage } from "@/context/LanguageContext";
import { ContactPicker } from "./ContactPicker";
import saveTextImg from "@/assets/save-the-date-save-red.png";
import dateTextImg from "@/assets/save-the-date-the-date-red.png";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

export function Hero() {
  const { lang } = useLanguage();

  return (
    <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-[#f4efe6]">
      {/* Delicate stationery paper texture */}
      <img
        src="/images/paper-texture.png"
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-60 mix-blend-multiply"
      />

      {/* Content Container */}
      <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-4xl flex-col items-center px-3 pt-16 pb-3 text-center sm:px-6 sm:pt-20 sm:pb-6">
        <h1 className="sr-only">
          Save The Date · 11.12.2026 · {wedding.couple.groom.name} &amp; {wedding.couple.bride.name}
        </h1>

        {/* Save The Date artwork: the photo fills the whole block, script overlaid on its corners */}
        <motion.div {...fade(0.1)} className="my-auto flex w-full flex-col items-center">
          <div
            className="relative aspect-[664/822] [--hero-reserve:14rem] sm:[--hero-reserve:12rem]"
            style={{ width: "min(78vw, max(calc((100svh - var(--hero-reserve)) * 0.808 * 0.88), 18rem), 35rem)" }}
          >
            {/* Rounded photo frame with subtle art mount border & shadow */}
            <div className="absolute inset-0 overflow-hidden rounded-xl sm:rounded-2xl shadow-[0_16px_40px_rgba(45,8,29,0.16)] border border-[#2d081d]/12">
              <img
                src={wedding.hero.image}
                alt={
                  lang === "vi"
                    ? "Ảnh cưới của Thành Long và Huyền Nga"
                    : "Wedding photo of Thanh Long and Huyen Nga"
                }
                decoding="async"
                className="size-full object-cover"
              />
              {/* Subtle shading for photo depth */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[22%] bg-gradient-to-t from-black/35 to-transparent" />
            </div>

            {/* Red script overlays: top-left & bottom-right (matching card layout) */}
            <img
              src={saveTextImg}
              alt="Save"
              aria-hidden="true"
              style={{
                left: "-12%",
                top: "-9%",
                width: "54%",
              }}
              className="pointer-events-none absolute z-10 drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)] drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            />
            <img
              src={dateTextImg}
              alt="the date"
              aria-hidden="true"
              style={{
                left: "6%",
                top: "91%",
                width: "95%",
              }}
              className="pointer-events-none absolute z-10 drop-shadow-[0_1px_4px_rgba(255,255,255,0.95)] drop-shadow-[0_0_8px_rgba(255,255,255,0.7)]"
            />
          </div>
        </motion.div>

        {/* Bottom Section: Venue, Date, CTA Button & Scroll */}
        <div className="w-full flex flex-col items-center pt-10 sm:pt-12">
          {/* Venue Banner */}
          <motion.div {...fade(0.28)} className="flex items-center gap-3 sm:gap-5">
            <span className="h-px w-6 bg-[#451020]/30 sm:w-12" />
            <p className="font-display text-xs uppercase tracking-[0.24em] text-[#451020] sm:text-sm md:text-base font-semibold">
              {wedding.venue.name}
            </p>
            <span className="h-px w-6 bg-[#451020]/30 sm:w-12" />
          </motion.div>

          {/* Date from navbar - clear, sharp & bold */}
          <motion.p
            {...fade(0.34)}
            className="mt-2 font-display text-sm sm:text-base font-bold tracking-[0.24em] text-[#451020] uppercase"
          >
            11.12.2026
          </motion.p>

          {/* CTA Button: Confirm Attendance */}
          <motion.div {...fade(0.4)} className="mt-4 sm:mt-5 flex justify-center">
            <ContactPicker>
              <button
                type="button"
                className="rounded-full bg-[#451020] px-8 py-3 font-serif text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-[#faf6f0] shadow-md transition-all hover:scale-[1.02] hover:bg-[#5c1a2e] hover:shadow-lg sm:text-sm sm:px-10 sm:py-3.5"
              >
                {lang === "vi" ? "Xác nhận tham dự" : "Confirm attendance"}
              </button>
            </ContactPicker>
          </motion.div>

          {/* Scroll down indicator */}
          <a
            href="#info"
            aria-label={lang === "vi" ? "Cuộn xuống" : "Scroll down"}
            className="mt-3 text-[#451020]/50 transition-colors hover:text-[#451020] sm:hidden"
          >
            <ChevronDown className="size-5 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
