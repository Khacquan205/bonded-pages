import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Story } from "@/components/Story";
import { Info } from "@/components/Info";
import { Timeline } from "@/components/Timeline";
import { Gallery } from "@/components/Gallery";
import { Guestbook } from "@/components/Guestbook";
import { ClosingCta } from "@/components/ClosingCta";
import { Toaster } from "@/components/ui/sonner";
import { wedding, monogram } from "@/config/wedding";
import { LanguageProvider, useFormatDate, useLanguage } from "@/context/LanguageContext";

const OG_IMAGE =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&h=630&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ngọc Anh & Minh Quân — Thiệp cưới 15.11.2026" },
      {
        name: "description",
        content:
          "Thiệp cưới của Ngọc Anh & Minh Quân — 15 tháng 11, 2026 tại White Palace, TP.HCM. Xem chương trình, album và nhắn tin xác nhận tham dự qua Zalo.",
      },
      { property: "og:title", content: "Ngọc Anh & Minh Quân — Thiệp cưới 15.11.2026" },
      {
        property: "og:description",
        content:
          "Trân trọng kính mời bạn đến chung vui cùng chúng mình tại White Palace, TP.HCM.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: () => (
    <LanguageProvider>
      <Invitation />
    </LanguageProvider>
  ),
});

function Invitation() {
  const { lang } = useLanguage();
  const fmt = useFormatDate();

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <Story />
        <Info />
        <Timeline />
        <Gallery />
        <Guestbook />
        <ClosingCta />
      </main>
      <footer className="border-t border-eucalyptus/50 bg-cream px-6 py-12 text-center">
        <p className="font-display text-xl tracking-[0.3em] text-olive-deep">{monogram}</p>
        <p className="mt-3 text-sm text-ink-muted">{fmt(wedding.date.reception)}</p>
        <p className="mt-6 text-xs tracking-[0.14em] text-ink-muted">
          {lang === "vi" ? "Made with ♥" : "Made with ♥"}
        </p>
      </footer>
    </div>
  );
}

