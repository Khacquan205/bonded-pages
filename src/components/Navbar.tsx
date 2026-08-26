import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { monogram } from "@/config/wedding";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { ContactPicker } from "./ContactPicker";

const links = [
  { id: "story", vi: "Chuyện chúng mình", en: "Our story" },
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

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500",
          scrolled || open
            ? "border-b border-eucalyptus/60 bg-cream/95 backdrop-blur-sm"
            : "border-b border-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a
            href="#top"
            className={cn(
              "font-display text-lg tracking-[0.3em] transition-colors",
              scrolled || open ? "text-olive-deep" : "text-white",
            )}
          >
            {monogram}
          </a>

          <ul className="hidden items-center gap-8 lg:flex">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className={cn(
                    "text-xs uppercase tracking-[0.18em] transition-colors",
                    scrolled ? "text-ink-muted hover:text-olive" : "text-white/85 hover:text-white",
                  )}
                >
                  {l[lang]}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div
              className={cn(
                "flex items-center gap-1 text-[0.6875rem] tracking-[0.18em]",
                scrolled || open ? "text-ink-muted" : "text-white/80",
              )}
            >
              <button
                type="button"
                onClick={() => setLang("vi")}
                aria-label="Tiếng Việt"
                className={cn("transition-opacity", lang === "vi" ? "font-semibold opacity-100" : "opacity-60")}
              >
                VI
              </button>
              <span className="opacity-40">/</span>
              <button
                type="button"
                onClick={() => setLang("en")}
                aria-label="English"
                className={cn("transition-opacity", lang === "en" ? "font-semibold opacity-100" : "opacity-60")}
              >
                EN
              </button>
            </div>

            <ContactPicker>
              <button
                type="button"
                className={cn(
                  "hidden rounded-full px-5 py-2 text-xs tracking-[0.12em] transition-colors sm:inline-flex",
                  scrolled
                    ? "bg-olive text-cream hover:bg-olive-deep"
                    : "border border-white/70 text-white hover:bg-white/15",
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
                scrolled || open ? "text-olive-deep" : "text-white",
              )}
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>

      {open ? (
        <div className="fixed inset-0 top-16 z-40 flex flex-col overflow-y-auto bg-cream px-8 pb-12 pt-10 lg:hidden">
          <ul className="flex flex-col gap-7">
            {links.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  className="font-display text-3xl text-olive-deep"
                >
                  {l[lang]}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-auto pt-10">
            <ContactPicker>
              <button
                type="button"
                className="w-full rounded-full bg-olive px-6 py-3.5 text-sm tracking-[0.12em] text-cream"
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
