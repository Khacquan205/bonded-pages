import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { ContactPicker } from "./ContactPicker";

const links = [
  { id: "info", vi: "Thông tin", en: "Details" },
  { id: "timeline", vi: "Chương trình", en: "Schedule" },
  { id: "gallery", vi: "Album", en: "Gallery" },
  { id: "guestbook", vi: "Lưu bút", en: "Guestbook" },
];

export function Navbar() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  const cta = lang === "vi" ? "Xác nhận tham dự" : "Confirm attendance";

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();

    const doScroll = () => {
      if (id === "top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 16;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    };

    if (open) {
      setOpen(false);
      setTimeout(doScroll, 80);
    } else {
      doScroll();
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-gradient-to-b from-black/50 to-transparent">
      <nav className="mx-auto flex h-16 sm:h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Brand logo stays left on every screen size. */}
        <div className="flex flex-1 items-center justify-start">
          <a
            href="#top"
            onClick={(e) => scrollToSection(e, "top")}
            className="flex items-center transition-transform hover:scale-105"
            aria-label="Thành Long & Huyền Nga"
          >
            <img
              src="/images/monogram-ln-cream.png"
              alt="Long & Nga"
              className="h-9 w-auto sm:h-11"
            />
          </a>
        </div>

        {/* Desktop navigation */}
        <div className="hidden shrink-0 items-center justify-center lg:flex">
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0">
            {links.map((l) => (
              <li key={l.id} className="shrink-0">
                <a
                  href={`#${l.id}`}
                  onClick={(e) => scrollToSection(e, l.id)}
                  className="whitespace-nowrap font-display text-xs uppercase tracking-[0.2em] transition-colors text-cream font-medium px-3 py-2 hover:text-white"
                >
                  {l[lang]}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Language Switch & RSVP Button & Mobile Menu */}
        <div className="flex flex-1 items-center justify-end gap-3.5 sm:gap-4 shrink-0 whitespace-nowrap">
          <div className="flex items-center gap-1 text-[0.6875rem] tracking-[0.18em] font-display shrink-0 text-cream">
            <button
              type="button"
              onClick={() => setLang("vi")}
              aria-label="Tiếng Việt"
              className={cn(
                "transition-colors",
                lang === "vi" ? "font-semibold" : "opacity-60 hover:opacity-100",
              )}
            >
              VI
            </button>
            <span className="opacity-35">/</span>
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-label="English"
              className={cn(
                "transition-colors",
                lang === "en" ? "font-semibold" : "opacity-60 hover:opacity-100",
              )}
            >
              EN
            </button>
          </div>

          <ContactPicker>
            <button
              type="button"
              className="hidden shrink-0 whitespace-nowrap rounded-full bg-[#451020] px-5 py-2 font-serif text-xs font-semibold uppercase tracking-[0.14em] text-[#faf6f0] shadow-xs transition-all duration-300 hover:bg-[#5c1a2e] hover:shadow-sm sm:inline-flex"
            >
              {cta}
            </button>
          </ContactPicker>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Đóng menu" : "Mở menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            className="inline-flex size-10 items-center justify-center text-cream lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      {open ? (
        <div
          id="mobile-navigation"
          className="absolute inset-x-0 top-full z-40 flex max-h-[75svh] flex-col overflow-y-auto border-b border-maroon/15 bg-cream px-6 py-6 shadow-lg lg:hidden animate-in fade-in duration-200"
        >
          <ul className="flex flex-col gap-6 pt-2">
            {links.map((l, index) => (
              <li key={l.id} className="flex items-baseline gap-3">
                <span className="font-display text-sm tracking-wider text-walnut-muted/60">
                  0{index + 1}
                </span>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => scrollToSection(e, l.id)}
                  className="font-serif text-2xl tracking-[0.02em] text-[#2d081d] transition-colors hover:text-[#451020]"
                >
                  {l[lang]}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-auto pt-8">
            <ContactPicker>
              <button
                type="button"
                className="w-full rounded-full bg-[#451020] py-3.5 text-center font-serif text-xs font-semibold uppercase tracking-[0.2em] text-[#faf6f0] shadow-md transition-colors hover:bg-[#5c1a2e]"
              >
                {cta}
              </button>
            </ContactPicker>
          </div>
        </div>
      ) : null}
    </header>
  );
}
