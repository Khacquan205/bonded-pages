import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
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

function Placeholder({ id, vi, en }: { id: string; vi: string; en: string }) {
  const { lang } = useLanguage();
  return (
    <section id={id} className="border-t border-eucalyptus/40 px-6 py-20 odd:bg-cream even:bg-cream-deep">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="label-caps">{lang === "vi" ? "Sắp có" : "Coming soon"}</p>
        <h2 className="mt-3 font-display text-3xl">{lang === "vi" ? vi : en}</h2>
      </Reveal>
    </section>
  );
}

function Invitation() {
  const { lang } = useLanguage();
  const fmt = useFormatDate();

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Navbar />
      <main>
        <Hero />
        <Placeholder id="story" vi="Chuyện chúng mình" en="Our story" />
        <Placeholder id="info" vi="Thông tin sự kiện" en="Event details" />
        <Placeholder id="timeline" vi="Chương trình" en="Schedule" />
        <Placeholder id="gallery" vi="Album" en="Gallery" />
        <Placeholder id="guestbook" vi="Sổ lưu bút" en="Guestbook" />
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
