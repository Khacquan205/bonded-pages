import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { useRsvpButton } from "@/context/RsvpButtonContext";
import { ContactPicker } from "./ContactPicker";

export function StickyRsvpButton() {
  const { lang } = useLanguage();
  const { isSticky } = useRsvpButton();

  return (
    <AnimatePresence>
      {isSticky && (
        <motion.div
          layoutId="rsvp-main-button"
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
        >
          <ContactPicker>
            <button
              type="button"
              className="rounded-full bg-[#451020] px-8 py-3 font-serif text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-[#faf6f0] shadow-[0_10px_30px_rgba(45,8,29,0.4)] border border-[#faf6f0]/20 transition-all hover:scale-[1.02] hover:bg-[#5c1a2e] hover:shadow-[0_14px_38px_rgba(45,8,29,0.52)] active:scale-[0.98] sm:text-sm sm:px-10 sm:py-3.5 whitespace-nowrap cursor-pointer"
              aria-label={lang === "vi" ? "Xác nhận tham dự tiệc cưới" : "Confirm attendance"}
            >
              {lang === "vi" ? "Xác nhận tham dự" : "Confirm attendance"}
            </button>
          </ContactPicker>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
