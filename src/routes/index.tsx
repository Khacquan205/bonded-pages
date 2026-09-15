import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { Timeline } from "@/components/Timeline";
import { Gallery } from "@/components/Gallery";
import { Guestbook } from "@/components/Guestbook";
import { ClosingCta } from "@/components/ClosingCta";
import { Toaster } from "@/components/ui/sonner";
import { wedding } from "@/config/wedding";
import { LanguageProvider } from "@/context/LanguageContext";

const OG_IMAGE =
  "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&h=630&q=80";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Huyền Nga & Thành Long — Thiệp cưới 11.12.2026" },
      {
        name: "description",
        content:
          "Thiệp cưới của Huyền Nga & Thành Long — 11 tháng 12, 2026 tại JW Marriott Hotel, TP. Hồ Chí Minh. Xem chương trình, album và xác nhận tham dự.",
      },
      { property: "og:title", content: "Huyền Nga & Thành Long — Thiệp cưới 11.12.2026" },
      {
        property: "og:description",
        content:
          "Trân trọng kính mời bạn đến chung vui cùng gia đình chúng tôi tại JW Marriott Hotel, TP. Hồ Chí Minh.",
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

  return (
    <div className="min-h-screen bg-cream text-ink">
      <Toaster position="top-center" richColors />
      <Navbar />
      <main>
        <Hero />
        <Info />
        <Timeline />
        <Gallery />
        <Guestbook />
        <ClosingCta />
      </main>
    </div>
  );
}

