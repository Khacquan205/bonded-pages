import { useState } from "react";
import { MapPin, Info as InfoIcon, Palette, Download } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLanguage, useT } from "@/context/LanguageContext";
import { ContactPicker } from "./ContactPicker";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export function Info() {
  const { lang } = useLanguage();
  const t = useT();
  const [selectedCard, setSelectedCard] = useState<"reception" | "ceremony">("reception");
  const [cardSide, setCardSide] = useState<"back" | "front">("back");
  const [isCardZoomOpen, setIsCardZoomOpen] = useState(false);

  const currentCardImg =
    selectedCard === "reception"
      ? cardSide === "front"
        ? "/images/thiep-tiec-cuoi-mat-truoc.png"
        : "/images/thiep-tiec-cuoi-mat-sau.png"
      : cardSide === "front"
        ? "/images/thiep-le-thanh-hon-mat-truoc.png"
        : "/images/thiep-le-thanh-hon-mat-sau.png";

  const currentCardTitle =
    selectedCard === "reception"
      ? cardSide === "front"
        ? (lang === "vi" ? "Mặt Trước — Save The Date" : "Front Cover — Save The Date")
        : (lang === "vi" ? "Mặt Sau — Thiệp Tiệc Cưới Chính\u00A0Thức" : "Official Reception\u00A0Invitation")
      : cardSide === "front"
        ? (lang === "vi" ? "Mặt Trước — Bìa Dập Nổi\u00A0Monogram" : "Front Cover — Embossed\u00A0Monogram")
        : (lang === "vi" ? "Mặt Sau — Thiệp Lễ Thành Hôn\u00A0(Tư\u00A0Gia)" : "Ceremony Invitation — Back");

  const downloadFilename =
    selectedCard === "reception"
      ? cardSide === "front"
        ? "Thiep-Tiec-Cuoi-Mat-Truoc-Thanh-Long-Huyen-Nga.png"
        : "Thiep-Tiec-Cuoi-Mat-Sau-Thanh-Long-Huyen-Nga.png"
      : cardSide === "front"
        ? "Thiep-Le-Thanh-Hon-Mat-Truoc-Thanh-Long-Huyen-Nga.png"
        : "Thiep-Le-Thanh-Hon-Mat-Sau-Thanh-Long-Huyen-Nga.png";

  return (
    <section id="info" className="relative bg-[#f4efe6] px-5 py-20 sm:px-6 sm:py-28 scroll-mt-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          label={lang === "vi" ? "Thiệp Cưới Vật Lý" : "Official Invitation"}
          title={lang === "vi" ? "Thiệp Cưới Chính Thức" : "Wedding Stationery"}
        />

        {/* ------------------------------------------------------------- */}
        {/* CARD SELECTOR TABS: RECEPTION vs CEREMONY                     */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-8 sm:mt-10 flex flex-col items-center gap-3">
          <div className="inline-flex rounded-full border border-[#2d081d]/20 bg-[#faf7f2] p-1.5 shadow-2xs">
            <button
              type="button"
              onClick={() => setSelectedCard("reception")}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-semibold uppercase lining-nums tracking-[0.14em] transition-all duration-300 sm:px-7 sm:text-sm font-serif",
                selectedCard === "reception"
                  ? "bg-[#451020] text-[#faf6f0] shadow-md"
                  : "text-[#3d271d]/70 hover:text-[#451020]",
              )}
            >
              {lang === "vi" ? "Tiệc Cưới (11.12)" : "Reception (Dec 11)"}
            </button>
            <button
              type="button"
              onClick={() => setSelectedCard("ceremony")}
              className={cn(
                "rounded-full px-5 py-2 text-xs font-semibold uppercase lining-nums tracking-[0.14em] transition-all duration-300 sm:px-7 sm:text-sm font-serif",
                selectedCard === "ceremony"
                  ? "bg-[#451020] text-[#faf6f0] shadow-md"
                  : "text-[#3d271d]/70 hover:text-[#451020]",
              )}
            >
              {lang === "vi" ? "Lễ Thành Hôn (06.12)" : "Ceremony (Dec 06)"}
            </button>
          </div>

          {/* Sub-toggle: 2 Tabs Mặt Sau & Mặt Trước for both cards */}
          <div className="inline-flex items-center rounded-full border border-[#2d081d]/15 bg-[#faf7f2] p-1 shadow-2xs font-serif text-xs">
            <button
              type="button"
              onClick={() => setCardSide("back")}
              className={cn(
                "rounded-full px-4 py-1.5 font-medium transition-all duration-200",
                cardSide === "back"
                  ? "bg-[#2d081d] text-[#faf6f0] shadow-2xs font-semibold"
                  : "text-[#2d081d]/75 hover:text-[#2d081d] hover:bg-black/5",
              )}
            >
              {lang === "vi" ? "Mặt Sau" : "Back"}
            </button>
            <button
              type="button"
              onClick={() => setCardSide("front")}
              className={cn(
                "rounded-full px-4 py-1.5 font-medium transition-all duration-200",
                cardSide === "front"
                  ? "bg-[#2d081d] text-[#faf6f0] shadow-2xs font-semibold"
                  : "text-[#2d081d]/75 hover:text-[#2d081d] hover:bg-black/5",
              )}
            >
              {lang === "vi" ? "Mặt Trước" : "Front"}
            </button>
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* CENTERPIECE: OFFICIAL WEDDING INVITATION CARD                 */}
        {/* ------------------------------------------------------------- */}
        <Reveal delay={0.1} className="mt-8 sm:mt-10">
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
                  height={2127}
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
            label={lang === "vi" ? "Trang Phục" : "Dress Code"}
            title={lang === "vi" ? "Bảng Màu Trang Phục" : "Dress Code"}
            desc={
              lang === "vi"
                ? "Để buổi tiệc thêm phần đồng điệu và trang nhã, quý khách vui lòng ưu tiên trang phục theo các gam màu gợi ý."
                : "To make our celebration harmoniously beautiful, guests are kindly invited to wear our suggested color palette."
            }
          />

          <Reveal delay={0.2} className="mt-8 max-w-2xl mx-auto">
            <div className="rounded-xl border border-[#2d081d]/15 bg-[#faf7f2] p-6 sm:p-8 shadow-xs text-center">
              <div className="flex items-center justify-center gap-2.5">
                <Palette className="size-5 text-[#451020]" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="font-script text-3xl sm:text-4xl text-[#2d081d]">
                  Dress code
                </h3>
              </div>

              {/* 4 square swatches matching the printed stationery */}
              <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-6 max-w-md mx-auto text-center">
                {wedding.info.dresscode.swatches.map((s) => (
                  <div key={s.hex} className="flex flex-col items-center">
                    <div
                      role="img"
                      aria-label={t(s.name)}
                      style={{ backgroundColor: s.hex }}
                      className="size-14 sm:size-18 shadow-[3px_4px_6px_rgba(45,8,29,0.28)] transition-transform hover:scale-105"
                    />
                    <span className="mt-2 font-serif text-xs font-medium text-[#2d081d] sm:text-sm">
                      {t(s.name)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* 2. VENUE & DIRECTIONS + INTEGRATED PARKING & RECEPTION GUIDE */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-14 sm:mt-20 pt-10 border-t border-[#2d081d]/10">
          <SectionHeading
            label={lang === "vi" ? "Chỉ Dẫn & Đón Tiếp" : "Venue & Guest Guide"}
            title={lang === "vi" ? "Địa Điểm & Bản Đồ" : "Venue & Directions"}
            desc={
              lang === "vi"
                ? "Bản đồ đường đi đến tiệc cưới tại JW Marriott Hotel cùng thông tin hướng dẫn đỗ xe và đón tiếp."
                : "Directions to our celebration at JW Marriott Hotel with integrated parking and reception details."
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

              {/* Seamless Parking Note & Reception Callout (Right inside Venue Card) */}
              <div className="p-5 sm:p-6 bg-[#faf7f2]/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-3 text-left">
                  <InfoIcon className="mt-0.5 size-5 shrink-0 text-[#451020]" strokeWidth={1.5} aria-hidden="true" />
                  <div>
                    <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.12em] text-[#2d081d]">
                      {lang === "vi" ? "Lưu ý đậu xe & Thời gian đón khách" : "Parking & Arrival Guidance"}
                    </p>
                    <p className="mt-1 text-xs sm:text-sm text-[#3d271d]/85 leading-relaxed">
                      {t(wedding.info.notes.text)}
                    </p>
                    <p className="mt-1.5 text-xs text-[#451020] font-medium">
                      {lang === "vi" ? "• 18:00: Đón khách & Chụp ảnh · 18:30: Khai tiệc" : "• 18:00: Welcome & Photos · 18:30: Dinner"}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 w-full sm:w-auto">
                  <ContactPicker>
                    <button
                      type="button"
                      className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#451020] px-6 py-2.5 font-serif text-xs font-semibold uppercase tracking-[0.14em] text-[#faf6f0] shadow-md transition-all hover:bg-[#5c1a2e] hover:scale-105"
                    >
                      {lang === "vi" ? "Xác nhận tham dự" : "Confirm Attendance"}
                    </button>
                  </ContactPicker>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
