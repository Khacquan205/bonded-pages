import { useState } from "react";
import { MapPin, Info as InfoIcon, Palette, ZoomIn, Download } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useLanguage, useT } from "@/context/LanguageContext";
import { ContactPicker } from "./ContactPicker";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export function Info() {
  const { lang } = useLanguage();
  const t = useT();
  const [isCardZoomOpen, setIsCardZoomOpen] = useState(false);

  return (
    <section id="info" className="relative bg-[#f4efe6] px-5 py-20 sm:px-6 sm:py-28 scroll-mt-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          label={lang === "vi" ? "Thiệp Báo Tin" : "Official Invitation"}
          title={lang === "vi" ? "Trân Trọng Báo Tin Lễ Vu Quy" : "Wedding Announcement"}
        />

        {/* ------------------------------------------------------------- */}
        {/* CENTERPIECE: OFFICIAL WEDDING INVITATION CARD (ARTBOARD 2)   */}
        {/* ------------------------------------------------------------- */}
        <Reveal delay={0.1} className="mt-12 sm:mt-16">
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
              className="group relative cursor-zoom-in overflow-hidden rounded-xs border border-[#2d081d]/15 bg-[#faf7f2] p-2.5 sm:p-4 shadow-[0_22px_60px_-15px_rgba(45,8,29,0.22)] transition-all duration-500 hover:shadow-[0_28px_70px_-12px_rgba(45,8,29,0.3)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#610401]"
            >
              {/* Inner card container: scales image smoothly on hover without any blur or dimming */}
              <div className="relative overflow-hidden rounded-xs border border-[#2d081d]/12 bg-[#faf7f2]">
                <img
                  src="/images/official-invitation-card.png"
                  alt="Thiệp Báo Tin Lễ Vu Quy - Nguyễn Huyền Nga & Trần Thành Long - JW Marriott Hotel"
                  width={975}
                  height={1350}
                  className="w-full h-auto object-contain block transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="eager"
                />
              </div>

              {/* Card Footer Bar */}
              <div className="mt-3 flex items-center justify-between px-1 text-[0.6875rem] font-display uppercase tracking-[0.16em] text-[#2d081d]/75">
                <span className="font-semibold text-[#610401]">
                  {lang === "vi" ? "Thiệp cưới chính thức" : "Official Invitation"}
                </span>
                <span className="inline-flex items-center gap-1.5 font-medium text-[#2d081d]/70 transition-colors group-hover:text-[#610401]">
                  <ZoomIn className="size-3.5" />
                  <span>{lang === "vi" ? "Nhấn để phóng to toàn màn hình" : "Click to view full screen"}</span>
                </span>
              </div>
            </div>

            {/* Semantic screen-reader content for SEO and Accessibility */}
            <div className="sr-only">
              <h2>TRÂN TRỌNG BÁO TIN LỄ VU QUY</h2>
              <p>Cô dâu: Nguyễn Huyền Nga (Ái nữ)</p>
              <p>Chú rể: Trần Thành Long (Trưởng nam)</p>
              <p>Đại diện Nhà Trai: Bà Nguyễn Thị Thuỷ</p>
              <p>Đại diện Nhà Gái: Bà Trần Thị Tuyết Mai</p>
              <p>Trân trọng kính mời đến dự buổi tiệc thân mật cùng gia đình chúng tôi tại JW Marriott Hotel</p>
              <p>Địa chỉ: Đường Hai Bà Trưng, Quận 1, TP. Hồ Chí Minh</p>
              <p>Thời gian: Vào lúc 18 giờ 00 · Thứ Sáu, ngày 11 tháng 12 năm 2026 (Tức ngày 03 tháng 11 năm Bính Ngọ)</p>
              <p>Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi</p>
            </div>
          </div>
        </Reveal>

        {/* High-Resolution Zoom Lightbox Dialog */}
        <Dialog open={isCardZoomOpen} onOpenChange={setIsCardZoomOpen}>
          <DialogContent className="max-w-3xl border border-white/20 bg-black/95 p-3 sm:p-5 text-white shadow-2xl backdrop-blur-xl">
            <DialogTitle className="sr-only">
              {lang === "vi" ? "Thiệp Báo Tin Lễ Vu Quy" : "Wedding Announcement Card"}
            </DialogTitle>
            <div className="relative flex flex-col items-center max-h-[85vh] overflow-y-auto pt-2">
              <img
                src="/images/official-invitation-card.png"
                alt="Thiệp Báo Tin Lễ Vu Quy - Nguyễn Huyền Nga & Trần Thành Long"
                className="max-h-[75vh] w-auto rounded-sm object-contain shadow-2xl"
              />
              <div className="mt-4 flex items-center gap-3">
                <a
                  href="/images/official-invitation-card.png"
                  download="Thiep-Bao-Tin-Vu-Quy-Huyen-Nga-Thanh-Long.png"
                  className="inline-flex items-center gap-2 rounded-full bg-[#610401] px-5 py-2.5 font-display text-xs font-medium uppercase tracking-[0.16em] text-[#faf6f0] shadow-md transition-all hover:bg-[#780602] hover:scale-105"
                >
                  <Download className="size-4" />
                  {lang === "vi" ? "Tải thiệp về máy" : "Download Invitation Card"}
                </a>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* ------------------------------------------------------------- */}
        {/* HEADING: ĐỊA ĐIỂM & LƯU Ý                                     */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-16 sm:mt-24 pt-12 border-t border-[#2d081d]/12">
          <SectionHeading
            label={lang === "vi" ? "Chỉ Dẫn & Đón Tiếp" : "Venue & Guest Guide"}
            title={lang === "vi" ? "Địa Điểm & Lưu Ý" : "Venue & Important Notes"}
            desc={
              lang === "vi"
                ? "Bản đồ đường đi đến tiệc cưới tại JW Marriott Hotel cùng các thông tin về trang phục và lịch trình đón tiếp."
                : "Directions to our celebration at JW Marriott Hotel, dress code guidance, and welcome schedule."
            }
          />
        </div>

        {/* ------------------------------------------------------------- */}
        {/* MAP EMBED                                                     */}
        {/* ------------------------------------------------------------- */}
        <Reveal delay={0.25} className="mt-10">
          <div className="overflow-hidden rounded-lg border border-[#2d081d]/15 bg-white shadow-md">
            <iframe
              src={wedding.venue.embedUrl}
              title={wedding.venue.name}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 sm:h-80"
            />
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 text-left">
                <MapPin className="mt-0.5 size-5 shrink-0 text-[#610401]" strokeWidth={1.5} aria-hidden="true" />
                <div>
                  <p className="font-display text-lg sm:text-xl font-semibold text-[#2d081d]">
                    {wedding.venue.name}
                  </p>
                  <p className="mt-1 text-sm text-[#3d271d]/80">{t(wedding.venue.address)}</p>
                </div>
              </div>
              <a
                href={wedding.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-[#2d081d]/40 px-6 py-2.5 font-display text-xs font-medium uppercase tracking-[0.14em] text-[#2d081d] transition-colors hover:bg-[#2d081d] hover:text-[#faf6f0]"
              >
                {lang === "vi" ? "Mở Google Maps" : "Open Maps"}
              </a>
            </div>
          </div>
        </Reveal>

        {/* ------------------------------------------------------------- */}
        {/* DRESS CODE & GOOD TO KNOW                                     */}
        {/* ------------------------------------------------------------- */}
        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {/* Dress Code Block with authentic brush swatches */}
          <Reveal delay={0.3}>
            <div className="h-full rounded-lg border border-[#2d081d]/15 bg-[#faf7f2] p-7 shadow-xs">
              <div className="flex items-center gap-2.5">
                <Palette className="size-5 text-[#610401]" strokeWidth={1.5} aria-hidden="true" />
                <h3 className="font-script text-3xl sm:text-4xl text-[#2d081d]">
                  Dress code
                </h3>
              </div>
              <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#3d271d]/85">
                {t(wedding.info.dresscode.text)}
              </p>

              {/* 4 Authentic Brush Swatches from Stationery */}
              <div className="mt-6 grid grid-cols-4 gap-3 sm:gap-4 text-center">
                {wedding.info.dresscode.swatches.map((s) => (
                  <div key={s.name} className="flex flex-col items-center">
                    <div className="relative flex size-14 sm:size-16 items-center justify-center overflow-hidden rounded-md transition-transform hover:scale-105">
                      <img
                        src={s.image}
                        alt={s.name}
                        className="size-full object-contain"
                        loading="lazy"
                      />
                    </div>
                    <span className="mt-2 font-display text-[0.6875rem] font-medium tracking-wide text-[#2d081d] sm:text-xs">
                      {s.name}
                    </span>
                    <span className="font-mono text-[0.625rem] text-[#3d271d]/60 uppercase">
                      {s.hex}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Notes / Good to know */}
          <Reveal delay={0.35}>
            <div className="flex h-full flex-col justify-between rounded-lg border border-[#2d081d]/15 bg-[#faf7f2] p-7 shadow-xs">
              <div>
                <div className="flex items-center gap-2.5">
                  <InfoIcon className="size-5 text-[#610401]" strokeWidth={1.5} aria-hidden="true" />
                  <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#2d081d]">
                    {t(wedding.info.notes.title)}
                  </h3>
                </div>
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-[#3d271d]/85">
                  {t(wedding.info.notes.text)}
                </p>
                <div className="mt-4 rounded-md border border-[#2d081d]/10 bg-white/60 p-4 text-xs text-[#3d271d]/80 leading-relaxed">
                  <p className="font-semibold text-[#2d081d] mb-1">
                    {lang === "vi" ? "Thời gian đón khách & Khai tiệc:" : "Reception Schedule:"}
                  </p>
                  <p>{lang === "vi" ? "• 18:00: Đón khách & Chụp ảnh lưu niệm" : "• 18:00: Welcome guests & Photo booth"}</p>
                  <p>{lang === "vi" ? "• 18:30: Khai tiệc & Nghi thức thành hôn" : "• 18:30: Dinner & Wedding ceremony"}</p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#2d081d]/10">
                <ContactPicker>
                  <button
                    type="button"
                    className="w-full rounded-full bg-[#610401] py-3 text-center font-display text-xs font-medium uppercase tracking-[0.16em] text-[#faf6f0] shadow-md transition-colors hover:bg-[#780602]"
                  >
                    {lang === "vi" ? "Gửi xác nhận tham dự" : "Confirm Attendance"}
                  </button>
                </ContactPicker>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
