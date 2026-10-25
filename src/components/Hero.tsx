import { useEffect } from "react";
import { motion } from "framer-motion";
import { wedding } from "@/config/wedding";
import { useLanguage } from "@/context/LanguageContext";
import { useRsvpButton } from "@/context/RsvpButtonContext";
import { ContactPicker } from "./ContactPicker";

const fade = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

export function Hero() {
  const { lang } = useLanguage();
  const { isSticky, setIsSticky } = useRsvpButton();

  useEffect(() => {
    let frame = 0;
    const checkScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y > 50) setIsSticky(true);
        else if (y < 20) setIsSticky(false);
        frame = 0;
      });
    };
    window.addEventListener("scroll", checkScroll, { passive: true });
    checkScroll();
    return () => {
      window.removeEventListener("scroll", checkScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [setIsSticky]);

  return (
    <section id="top" className="relative w-full overflow-hidden bg-[#f4efe6]">
      <img
        src="/images/paper-texture.png"
        alt=""
        aria-hidden="true"
        decoding="async"
        className="absolute inset-0 size-full object-cover opacity-60 mix-blend-multiply"
      />
      <div className="relative z-10 grid h-[100svh] w-full grid-rows-[minmax(0,1fr)_auto] text-center">
        <h1 className="sr-only">
          Save The Date · 11.12.2026 · {wedding.couple.groom.name} &amp; {wedding.couple.bride.name}
        </h1>
        <motion.div {...fade(0.1)} className="h-full min-h-0 w-full min-w-0">
          <div className="relative h-full w-full">
            <div className="absolute inset-0 overflow-hidden bg-[#233026]">
              <img
                src={wedding.hero.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 hidden size-full scale-110 object-cover opacity-55 blur-2xl lg:block"
              />
              <img
                src={wedding.hero.image}
                alt={
                  lang === "vi"
                    ? "Ảnh cưới của Thành Long và Huyền Nga"
                    : "Wedding photo of Thanh Long and Huyen Nga"
                }
                decoding="async"
                fetchPriority="high"
                className="relative size-full object-cover object-[center_30%] lg:object-contain"
              />
              <div className="pointer-events-none absolute inset-x-0 top-0 h-[25%] bg-gradient-to-b from-black/40 to-transparent" />
            </div>
          </div>
        </motion.div>
        <div className="flex min-w-0 flex-col items-center justify-center px-6 pt-3 pb-2 sm:px-10 sm:pt-4 sm:pb-3">
          <motion.div
            {...fade(0.28)}
            className="flex w-full max-w-md items-center justify-center gap-3 lg:max-w-3xl"
          >
            <span className="h-px w-5 shrink-0 bg-[#451020]/30" />
            <p className="font-display text-base leading-relaxed font-bold uppercase tracking-[0.08em] text-[#451020] sm:text-lg lg:text-2xl">
              {wedding.venue.name}
            </p>
            <span className="h-px w-5 shrink-0 bg-[#451020]/30" />
          </motion.div>
          <motion.p
            {...fade(0.34)}
            className="mt-1.5 font-display text-base font-bold uppercase tracking-[0.24em] text-[#451020] sm:text-lg lg:text-2xl"
          >
            11.12.2026
          </motion.p>
          <div className="mt-2 flex h-11 items-center justify-center sm:h-12">
            {!isSticky ? (
              <motion.div
                layoutId="rsvp-main-button"
                transition={{ type: "spring", stiffness: 260, damping: 25, mass: 0.8 }}
              >
                <ContactPicker>
                  <button
                    type="button"
                    className="cursor-pointer whitespace-nowrap rounded-full bg-[#451020] px-6 py-3 font-serif text-[0.6875rem] font-semibold uppercase tracking-[0.12em] text-[#faf6f0] shadow-md transition-colors duration-200 hover:bg-[#5c1a2e] active:scale-[0.98] sm:px-10 sm:py-3.5 sm:text-sm"
                  >
                    {lang === "vi" ? "Xác nhận tham dự" : "Confirm attendance"}
                  </button>
                </ContactPicker>
              </motion.div>
            ) : (
              <div
                aria-hidden="true"
                className="invisible rounded-full px-8 py-3 font-serif text-[0.8125rem] uppercase tracking-[0.16em] sm:text-sm sm:px-10 sm:py-3.5 whitespace-nowrap select-none"
              >
                {lang === "vi" ? "Xác nhận tham dự" : "Confirm attendance"}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
