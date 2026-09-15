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
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    // Plain `overflow: hidden` isn't enough on iOS Safari / in-app webviews
    // (Zalo, Facebook Messenger): if the menu opens mid-momentum-scroll, the
    // browser freezes `position: fixed` layers at the wrong offset, which
    // shows through as ghosted/duplicated content behind the menu. Locking
    // the body to `position: fixed` at the current scroll offset avoids that.
    const scrollY = window.scrollY;
    const { body } = document;
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = "";
      body.style.top = "";
      body.style.left = "";
      body.style.right = "";
      body.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
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
        const headerOffset = 64;
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
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "border-b border-maroon/15 bg-cream/95 backdrop-blur-md shadow-2xs"
            : "border-b border-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 sm:h-20 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Left Column: Brand Logo */}
          <div className="flex flex-1 items-center justify-start">
            <a
              href="#top"
              onClick={(e) => scrollToSection(e, "top")}
              className={cn(
                "flex items-center gap-2 sm:gap-2.5 shrink-0 whitespace-nowrap transition-colors",
                scrolled || open ? "text-[#2d081d]" : "text-white drop-shadow-xs",
              )}
            >
              <span className="font-script text-[0.95rem] sm:text-base md:text-[1.125rem] tracking-normal leading-none pr-0.5">
                Nga &amp; Long
              </span>
              <span
                className={cn(
                  "hidden min-[390px]:inline-block font-display text-xs tracking-[0.16em] sm:text-sm whitespace-nowrap",
                  scrolled || open ? "text-[#2d081d]/75" : "text-white/85",
                )}
              >
                · 11.12.2026
              </span>
            </a>
          </div>

          {/* Center Column: Navigation Links */}
          <ul className="hidden lg:flex items-center justify-center gap-6 xl:gap-8 shrink-0">
            {links.map((l) => (
              <li key={l.id} className="shrink-0">
                <a
                  href={`#${l.id}`}
                  onClick={(e) => scrollToSection(e, l.id)}
                  className={cn(
                    "whitespace-nowrap font-display text-xs uppercase tracking-[0.2em] transition-colors",
                    scrolled
                      ? "text-[#3d271d] hover:text-[#610401] font-medium"
                      : "text-white/90 hover:text-white drop-shadow-xs",
                  )}
                >
                  {l[lang]}
                </a>
              </li>
            ))}
          </ul>

          {/* Right Column: Language Switch & RSVP Button */}
          <div className="flex flex-1 items-center justify-end gap-3.5 sm:gap-4 shrink-0 whitespace-nowrap">
            <div
              className={cn(
                "flex items-center gap-1 text-[0.6875rem] tracking-[0.18em] font-display shrink-0",
                scrolled || open ? "text-[#3d271d]/75" : "text-white/80",
              )}
            >
              <button
                type="button"
                onClick={() => setLang("vi")}
                aria-label="Tiếng Việt"
                className={cn(
                  "transition-colors",
                  lang === "vi"
                    ? scrolled || open
                      ? "font-semibold text-[#610401]"
                      : "font-semibold text-white"
                    : "opacity-60 hover:opacity-100",
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
                  lang === "en"
                    ? scrolled || open
                      ? "font-semibold text-[#610401]"
                      : "font-semibold text-white"
                    : "opacity-60 hover:opacity-100",
                )}
              >
                EN
              </button>
            </div>

            <ContactPicker>
              <button
                type="button"
                className={cn(
                  "hidden shrink-0 whitespace-nowrap rounded-full px-5 py-2 font-display text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 sm:inline-flex",
                  scrolled
                    ? "bg-[#610401] text-[#faf6f0] shadow-xs hover:bg-[#780602] hover:shadow-sm"
                    : "border border-white/75 bg-white/10 text-white backdrop-blur-xs hover:bg-white/25",
                )}
              >
                {cta}
              </button>
            </ContactPicker>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Đóng menu" : "Mở menu"}
              aria-expanded={open}
              className={cn(
                "inline-flex size-10 items-center justify-center lg:hidden",
                scrolled || open ? "text-[#2d081d]" : "text-white drop-shadow-xs",
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div className="fixed inset-0 top-16 z-40 flex flex-col overflow-y-auto bg-cream px-8 pb-12 pt-8 lg:hidden animate-in fade-in duration-200">
          <div className="mb-6 flex items-baseline justify-between border-b border-[#2d081d]/15 pb-4">
            <span className="font-script text-3xl sm:text-4xl text-[#2d081d] leading-none">
              Nga &amp; Long
            </span>
            <span className="font-display text-sm font-semibold tracking-[0.16em] text-[#2d081d]/80">
              11.12.2026
            </span>
          </div>

          <ul className="flex flex-col gap-6">
            {links.map((l, index) => (
              <li key={l.id} className="flex items-baseline gap-3">
                <span className="font-display text-sm tracking-wider text-walnut-muted/60">
                  0{index + 1}
                </span>
                <a
                  href={`#${l.id}`}
                  onClick={(e) => scrollToSection(e, l.id)}
                  className="font-display text-2xl tracking-[0.08em] text-[#2d081d] transition-colors hover:text-[#610401]"
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
                className="w-full rounded-full bg-[#610401] py-3.5 text-center font-display text-xs font-medium uppercase tracking-[0.2em] text-[#faf6f0] shadow-md transition-colors hover:bg-[#780602]"
              >
                {cta}
              </button>
            </ContactPicker>
          </div>
        </div>
      ) : null}
    </>
  );
}
