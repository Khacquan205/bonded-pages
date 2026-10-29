import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { RsvpButtonProvider } from "@/context/RsvpButtonContext";
import { Hero } from "@/components/Hero";
import { Info } from "@/components/Info";
import { Timeline } from "@/components/Timeline";
import { Gallery } from "@/components/Gallery";
import { Guestbook } from "@/components/Guestbook";
import { ClosingCta } from "@/components/ClosingCta";
import { StickyRsvpButton } from "@/components/StickyRsvpButton";
import { MusicPlayer } from "@/components/MusicPlayer";
import { Toaster } from "@/components/ui/sonner";
import { wedding } from "@/config/wedding";
import { LanguageProvider } from "@/context/LanguageContext";

// Link preview (Zalo / Facebook / Messenger): 1200x630 crop of the pic-time album cover (bench under the vines)
// Must be an absolute URL: Zalo / Facebook crawlers don't resolve relative og:image paths
const SITE_URL = "https://bonded-pages.nguyenkhacquanpr2017.workers.dev";
const OG_IMAGE = `${SITE_URL}/images/og-cover-jardin.jpg`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Thành Long & Huyền Nga — Thiệp cưới 11.12.2026" },
      {
        name: "description",
        content:
          "Thiệp cưới của Thành Long & Huyền Nga — 11 tháng 12, 2026 tại JW Marriott Hotel, TP. Hồ Chí Minh. Xem chương trình, album và xác nhận tham dự.",
      },
      { property: "og:title", content: "Thành Long & Huyền Nga — Thiệp cưới 11.12.2026" },
      {
        property: "og:description",
        content:
          "Trân trọng kính mời bạn đến chung vui cùng gia đình chúng tôi tại JW Marriott Hotel, TP. Hồ Chí Minh.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: OG_IMAGE },
    ],
  }),
  component: () => (
    <LanguageProvider>
      <RsvpButtonProvider>
        <Invitation />
      </RsvpButtonProvider>
      </LanguageProvider>
  ),
});

function Invitation() {

  return (
    <div className="relative min-h-screen bg-cream text-ink">
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
      <StickyRsvpButton />
      <MusicPlayer />
    </div>
  );
}

