import { useState } from "react";
import { MapPin, Info as InfoIcon, Palette, Download } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLanguage, useT } from "@/context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Info() {
  const { lang } = useLanguage();
  const t = useT();
  const [isCardZoomOpen, setIsCardZoomOpen] = useState(false);

  const currentCardImg = "/images/thiep-tiec-cuoi-mat-sau.png";
  const currentCardTitle =
    lang === "vi"
      ? "Thiệp Tiệc Cưới Chính Thức"
      : "Official Reception Invitation";
  const downloadFilename = "Thiep-Tiec-Cuoi-Thanh-Long-Huyen-Nga.png";

  return (
    <section id="info" className="relative bg-[#f4efe6] px-5 py-20 sm:px-6 sm:py-28 scroll-mt-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          title={lang === "vi" ? "Thiệp Cưới" : "Wedding Stationery"}
        />

        {/* ------------------------------------------------------------- */}
        {/* CENTERPIECE: OFFICIAL WEDDING INVITATION CARD                 */}
        {/* ------------------------------------------------------------- */}
        <Reveal delay={0.1} className="mt-8 sm:mt-12">
          <div className="mx-auto max-w-lg sm:max-w-xl">
            {/* Stationery Mount Frame: Clickable to view full card */}
            <div
              role="button"
              tabIndex={0}
              onClick={() => setIsCardZoomOpen(true)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setIsCardZoomOpen(true);
                }
              }}
              aria-label={lang === "vi" ? "Nhấn để xem thiệp toàn màn hình" : "Click to view invitation card in full screen"}
              className="group relative cursor-zoom-in overflow-hidden rounded-xs border border-[#2d081d]/15 bg-[#faf7f2] p-2.5 sm:p-4 shadow-[0_22px_60px_-15px_rgba(45,8,29,0.22)] transition-all duration-500 hover:shadow-[0_28px_70px_-12px_rgba(45,8,29,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#451020]"
            >
              {/* Inner card container: scales image smoothly on hover without any blur or dimming */}
              <div className="relative overflow-hidden rounded-xs border border-[#2d081d]/12 bg-[#faf7f2]">
                <img
                  src={currentCardImg}
                  alt={currentCardTitle}
                  width={1536}
                  height={2123}
                  className="w-full h-auto object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="eager"
                />
              </div>
            </div>

            {/* Semantic screen-reader content for SEO and Accessibility */}
            <div className="sr-only">
              <h2>TRÂN TRỌNG KÍNH MỜI ĐẾN DỰ BUỔI TIỆC THÂN MẬT CÙNG GIA ĐÌNH CHÚNG TÔI</h2>
              <p>Trần Thành Long (Trưởng nam) &amp; Nguyễn Huyền Nga (Ái nữ)</p>
              <p>Nhà trai: Bà Tạ Thị Tuyết Mai</p>
              <p>Nhà gái: Bà Nguyễn Thị Thủy</p>
              <p>Địa điểm tiệc cưới: JW Marriott Hotel &amp; Suites Saigon</p>
              <p>Địa chỉ: Góc đường Hai Bà Trưng &amp; Đại Lộ Lê Duẩn, phường Sài Gòn, TP. Hồ Chí Minh</p>
              <p>Thời gian tiệc: Vào lúc 18 giờ 00 · Thứ Sáu, ngày 11 tháng 12 năm 2026 (11.12.2026)</p>
              <p>Hôn lễ tại tư gia: Vào lúc 09 giờ 00 · Chủ Nhật, ngày 06 tháng 12 năm 2026 (06.12.2026 - Nhằm 28/10 Âm lịch)</p>
            </div>
          </div>
        </Reveal>

        {/* High-Resolution Zoom Lightbox Dialog */}
        <Dialog open={isCardZoomOpen} onOpenChange={setIsCardZoomOpen}>
          <DialogContent className="max-w-3xl border border-white/20 bg-black/95 p-3 sm:p-5 text-white shadow-2xl backdrop-blur-xl">
            <DialogTitle className="sr-only">
              {currentCardTitle}
            </DialogTitle>
            <div className="relative flex flex-col items-center max-h-[85vh] overflow-y-auto pt-2">
              <img
                src={currentCardImg}
                alt={currentCardTitle}
                className="max-h-[75vh] w-auto rounded-sm object-contain shadow-2xl"
              />
              <div className="mt-4 flex items-center gap-3">
                <a
                  href={currentCardImg}
                  download={downloadFilename}
                  className="inline-flex items-center gap-2 rounded-full bg-[#451020] px-5 py-2.5 font-serif text-xs font-semibold uppercase tracking-[0.16em] text-[#faf6f0] shadow-md transition-all hover:bg-[#5c1a2e] hover:scale-105"
                >
                  <Download className="size-4" />
                  {lang === "vi" ? "Tải thiệp về máy" : "Download Invitation Card"}
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* ------------------------------------------------------------- */}
        {/* 1. DRESS CODE SECTION (TRÊN BẢN ĐỒ)                           */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#2d081d]/12">
          <SectionHeading
            title={lang === "vi" ? "Gam màu gợi ý" : "Suggested Palette"}
          />

          <Reveal delay={0.2} className="mt-8 max-w-2xl mx-auto">
            <div className="rounded-xl border border-[#2d081d]/15 bg-[#faf7f2] p-6 sm:p-8 shadow-xs text-center">
              <div className="flex items-center justify-center gap-2.5 pb-1">
                <Palette className="size-5 text-[#451020]" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="font-script text-3xl sm:text-4xl text-[#2d081d]">
                  Dress code
                </h3>
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
                  <MapPin className="mt-1 size-5 shrink-0 text-[#451020]" strokeWidth={1.5} aria-hidden="true" />
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
                <InfoIcon className="mt-0.5 size-5 shrink-0 text-[#451020]" strokeWidth={1.5} aria-hidden="true" />
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
