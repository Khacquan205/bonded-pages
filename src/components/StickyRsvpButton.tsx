import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { ContactPicker } from "./ContactPicker";

export function StickyRsvpButton() {
  const { lang } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show as soon as user starts scrolling down past the initial hero view
      setVisible(window.scrollY > 180);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 60, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 60, opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 z-40 pointer-events-auto"
        >
          <ContactPicker>
            <button
              type="button"
              className="group inline-flex items-center gap-2.5 rounded-full bg-[#451020] px-7 py-3 sm:px-8 sm:py-3.5 font-serif text-xs sm:text-sm font-semibold uppercase tracking-[0.16em] text-[#faf6f0] shadow-[0_10px_30px_rgba(45,8,29,0.4)] border border-[#faf6f0]/25 transition-all duration-300 hover:scale-[1.04] hover:bg-[#5c1a2e] hover:shadow-[0_14px_38px_rgba(45,8,29,0.52)] active:scale-[0.98] cursor-pointer"
              aria-label={lang === "vi" ? "Xác nhận tham dự tiệc cưới" : "Confirm attendance"}
            >
              <Heart className="size-3.5 sm:size-4 fill-[#faf6f0]/90 text-[#faf6f0]/90 transition-transform duration-300 group-hover:scale-125" />
              <span className="whitespace-nowrap">
                {lang === "vi" ? "Xác nhận tham dự" : "Confirm attendance"}
              </span>
            </button>
          </ContactPicker>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
