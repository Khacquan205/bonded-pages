import { MapPin, Info as InfoIcon, Palette } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLanguage, useT } from "@/context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { WeddingInvitation } from "./WeddingInvitation";

export function Info() {
  const { lang } = useLanguage();
  const t = useT();
  return (
    <section id="info" className="relative bg-[#f4efe6] px-5 py-20 sm:px-6 sm:py-28 scroll-mt-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeading title={lang === "vi" ? "Thiệp Cưới" : "Wedding Stationery"} />

        <Reveal delay={0.1} className="mt-8 sm:mt-12">
          <WeddingInvitation />
        </Reveal>

        {/* ------------------------------------------------------------- */}
        {/* 1. DRESS CODE SECTION (TRÊN BẢN ĐỒ)                           */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#2d081d]/12">
          <SectionHeading title={lang === "vi" ? "Gam màu gợi ý" : "Suggested Palette"} />

          <Reveal delay={0.2} className="mt-8 max-w-2xl mx-auto">
            <div className="rounded-xl border border-[#2d081d]/15 bg-[#faf7f2] p-6 sm:p-8 shadow-xs text-center">
              <div className="flex items-center justify-center gap-2.5 pb-1">
                <Palette className="size-5 text-[#451020]" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="font-script text-3xl sm:text-4xl text-[#2d081d]">Dress code</h3>
              </div>

              {/* 5 square swatches matching the printed stationery */}
              <div className="mt-8 sm:mt-10 grid grid-cols-5 gap-2.5 sm:gap-4 md:gap-6 max-w-sm sm:max-w-md mx-auto">
                {wedding.info.dresscode.swatches.map((s) => (
                  <div
                    key={s.hex}
                    role="img"
                    aria-label={t(s.name)}
                    style={{ backgroundColor: s.hex }}
                    className="aspect-square w-full shadow-[3px_4px_6px_rgba(45,8,29,0.28)] transition-transform hover:scale-105"
                  />
                ))}
              </div>

              {/* Gentle non-mandatory dress code guidance note */}
              <p className="mt-6 sm:mt-8 font-serif text-xs sm:text-sm italic text-[#3d271d]/85 leading-relaxed max-w-md mx-auto text-pretty">
                <span className="text-[#451020] font-bold not-italic mr-1.5">*</span>
                {t(wedding.info.dresscode.text)}
              </p>
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. VENUE & DIRECTIONS + INTEGRATED PARKING & RECEPTION GUIDE */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-14 sm:mt-20 pt-10 border-t border-[#2d081d]/10">
          <SectionHeading
            title={lang === "vi" ? "Địa Điểm" : "Venue"}
            desc={
              lang === "vi"
                ? "Bản đồ đường đi đến tiệc cưới tại JW Marriott Hotel cùng thông tin hướng dẫn đỗ xe."
                : "Directions to our celebration at JW Marriott Hotel with parking details."
            }
          />

          <Reveal delay={0.25} className="mt-8">
            <div className="overflow-hidden rounded-xl border border-[#2d081d]/15 bg-white shadow-md">
              {/* Interactive Map Embed */}
              <iframe
                src={wedding.venue.embedUrl}
                title={wedding.venue.name}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-64 w-full border-0 sm:h-80"
              />

              {/* Venue Header & Navigation Bar */}
              <div className="flex flex-col gap-4 p-5 sm:p-6 sm:flex-row sm:items-center sm:justify-between border-b border-[#2d081d]/10 bg-[#fffdfa]">
                <div className="flex items-start gap-3 text-left">
                  <MapPin
                    className="mt-1 size-5 shrink-0 text-[#451020]"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="font-serif text-lg sm:text-xl font-semibold text-[#2d081d]">
                      {wedding.venue.name}
                    </p>
                    <p className="mt-1 text-sm text-[#3d271d]/80">{t(wedding.venue.address)}</p>
                  </div>
                </div>
                <a
                  href={wedding.venue.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#2d081d]/40 px-6 py-2.5 font-serif text-xs font-semibold uppercase tracking-[0.14em] text-[#2d081d] transition-colors hover:bg-[#2d081d] hover:text-[#faf6f0]"
                >
                  {lang === "vi" ? "Mở Google Maps" : "Open Maps"}
                </a>
              </div>

              {/* Seamless Parking Note */}
              <div className="p-5 sm:p-6 bg-[#faf7f2]/90 flex items-start gap-3 text-left">
                <InfoIcon
                  className="mt-0.5 size-5 shrink-0 text-[#451020]"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <div>
                  <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[#2d081d]">
                    {lang === "vi" ? "Lưu ý đậu xe" : "Parking Guidance"}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-[#3d271d]/85 leading-relaxed text-pretty">
                    {t(wedding.info.notes.text)}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
