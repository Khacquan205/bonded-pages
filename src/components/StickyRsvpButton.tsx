import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { useRsvpButton } from "@/context/RsvpButtonContext";
import { ContactPicker } from "./ContactPicker";

export function StickyRsvpButton() {
  const { lang } = useLanguage();
  const { isSticky } = useRsvpButton();

  // Stays mounted and only toggles opacity/transform: mounting a fixed element or
  // animating its layout mid-scroll makes it jump or vanish in iOS / Zalo webviews.
  return (
    <div
      aria-hidden={!isSticky}
      inert={!isSticky}
      className={cn(
        "fixed inset-x-0 bottom-[max(1.25rem,env(safe-area-inset-bottom))] z-40 mx-auto w-fit transition-[opacity,translate] duration-300 ease-out will-change-transform",
        isSticky ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <ContactPicker>
        <button
          type="button"
          className="rounded-full bg-[#451020] px-8 py-3 font-serif text-[0.8125rem] font-semibold uppercase tracking-[0.16em] text-[#faf6f0] shadow-[0_10px_30px_rgba(45,8,29,0.4)] border border-[#faf6f0]/20 transition-colors duration-200 hover:bg-[#5c1a2e] active:scale-[0.98] sm:text-sm sm:px-10 sm:py-3.5 whitespace-nowrap cursor-pointer"
          aria-label={lang === "vi" ? "Xác nhận tham dự tiệc cưới" : "Confirm attendance"}
        >
          {lang === "vi" ? "Xác nhận tham dự" : "Confirm attendance"}
        </button>
      </ContactPicker>
    </div>
  );
}
