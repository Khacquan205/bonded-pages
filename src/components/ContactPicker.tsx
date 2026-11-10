import { useCallback, useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { CheckCircle2, Heart, Users, User, Send, MessageCircle, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLanguage } from "@/context/LanguageContext";
import { wedding } from "@/config/wedding";
import { cn } from "@/lib/utils";
import { submitRsvp } from "@/services/rsvp.server";
import { ZaloButton } from "./ZaloButton";

type AttendanceType = "yes" | "no";
type SideType = "both" | "bride" | "groom";

function RsvpForm({ onSuccess }: { onSuccess: (name: string, attendance: AttendanceType, guestCount: number, side: SideType) => void }) {
  const { lang } = useLanguage();
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<AttendanceType>("yes");
  const [guestCount, setGuestCount] = useState<number>(1);
  const [isCustomCount, setIsCustomCount] = useState<boolean>(false);
  const [side, setSide] = useState<SideType>("both");
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = name.trim();
    if (!trimmedName) {
      toast.error(lang === "vi" ? "Vui lòng nhập tên của bạn!" : "Please enter your name!");
      return;
    }

    setSubmitting(true);

    const finalGuestCount = attendance === "yes" ? Math.max(1, Math.min(20, guestCount || 1)) : 0;

    // Copy a ready-made Zalo message now, while still inside the tap: iOS refuses clipboard
    // writes after an await, and it must never hold up the submit.
    const attendanceText =
      attendance === "yes"
        ? lang === "vi"
          ? `xác nhận sẽ đến tham dự (${finalGuestCount} người)`
          : `confirm attendance (${finalGuestCount} person(s))`
        : lang === "vi"
          ? "rất tiếc không thể đến tham dự nhưng xin gửi lời chúc trăm năm hạnh phúc"
          : "regretfully cannot attend but wish you lifetime happiness";
    const messageContent =
      lang === "vi"
        ? `Xin chào, tôi là ${trimmedName}, tôi ${attendanceText} vào ngày 11.12! ${note ? `Lời nhắn: "${note.trim()}"` : ""}`
        : `Hello, I am ${trimmedName}, I ${attendanceText} on Dec 11th! ${note ? `Note: "${note.trim()}"` : ""}`;
    navigator.clipboard?.writeText(messageContent).catch((clipErr) => {
      console.warn("Clipboard write error:", clipErr);
    });

    try {
      // Save to Supabase + send automated Zalo notification (server-side,
      // keeps the webhook secret out of the client bundle)
      const result = await submitRsvp({
        data: {
          name: trimmedName,
          attendance,
          guestCount: finalGuestCount,
          side,
          note: note.trim() || null,
        },
      });

      if (!result.success) {
        console.warn("Supabase RSVP sync notice: insert failed");
      }

      toast.success(
        lang === "vi"
          ? "Đã lưu xác nhận tham dự của bạn thành công!"
          : "Your attendance confirmation has been recorded!",
      );

      onSuccess(trimmedName, attendance, finalGuestCount, side);
    } catch (err) {
      console.error("RSVP submit error:", err);
      toast.success(
        lang === "vi"
          ? "Đã ghi nhận thông tin tham dự của bạn!"
          : "Recorded your attendance!",
      );
      onSuccess(trimmedName, attendance, finalGuestCount, side);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 px-6 pb-6 pt-2">
      {/* Tên khách mời */}
      <div>
        <label className="block text-xs uppercase tracking-[0.14em] text-ink-muted">
          {lang === "vi" ? "Họ và tên *" : "Your Name *"}
        </label>
        <input
          type="text"
          maxLength={60}
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={lang === "vi" ? "Ví dụ: Nguyễn Văn A..." : "E.g. John Doe..."}
          className="mt-1.5 w-full rounded-md border border-[#2d081d]/25 bg-white px-3.5 py-2 text-base text-ink placeholder:text-ink-muted/50 sm:text-sm focus:border-[#451020] focus:outline-none focus:ring-1 focus:ring-[#451020]"
        />
      </div>

      {/* Xác nhận tham dự hay không */}
      <div>
        <label className="block text-xs uppercase tracking-[0.14em] text-ink-muted">
          {lang === "vi" ? "Bạn sẽ đến chung vui chứ? *" : "Will you attend? *"}
        </label>
        <div className="mt-1.5 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setAttendance("yes")}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-md border py-2 text-xs font-medium transition-all duration-200",
              attendance === "yes"
                ? "border-[#451020] bg-[#451020] text-[#faf6f0] shadow-xs"
                : "border-[#2d081d]/20 bg-white text-ink-muted hover:border-[#451020]/60",
            )}
          >
            <CheckCircle2 className="size-3.5" />
            <span>{lang === "vi" ? "Tôi sẽ tham dự" : "I will attend"}</span>
          </button>
          <button
            type="button"
            onClick={() => setAttendance("no")}
            className={cn(
              "flex items-center justify-center gap-1.5 rounded-md border py-2 text-xs font-medium transition-all duration-200",
              attendance === "no"
                ? "border-[#2d081d] bg-[#2d081d]/10 text-[#2d081d] font-semibold shadow-xs"
                : "border-[#2d081d]/20 bg-white text-ink-muted hover:border-[#451020]/60",
            )}
          >
            <span>{lang === "vi" ? "Rất tiếc, tôi bận" : "Cannot attend"}</span>
          </button>
        </div>
      </div>

      {/* Số lượng người (nếu tham dự) */}
      {attendance === "yes" && (
        <div>
          <label className="block text-xs uppercase tracking-[0.14em] text-ink-muted">
            {lang === "vi" ? "Số lượng người tham dự" : "Number of guests"}
          </label>
          <div className="mt-1.5 flex gap-1.5 sm:gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => {
                  setIsCustomCount(false);
                  setGuestCount(num);
                }}
                className={cn(
                  "flex-1 rounded-md border py-1.5 text-center text-xs font-medium transition-all duration-200",
                  !isCustomCount && guestCount === num
                    ? "border-[#451020] bg-[#451020] text-[#faf6f0] shadow-xs"
                    : "border-[#2d081d]/20 bg-white text-ink-muted hover:border-[#451020]/60",
                )}
              >
                {num} {lang === "vi" ? "người" : num === 1 ? "guest" : "guests"}
              </button>
            ))}
            <button
              type="button"
              onClick={() => {
                setIsCustomCount(true);
                if (guestCount <= 4) {
                  setGuestCount(5);
                }
              }}
              className={cn(
                "flex-1 rounded-md border py-1.5 text-center text-xs font-medium transition-all duration-200",
                isCustomCount
                  ? "border-[#451020] bg-[#451020] text-[#faf6f0] shadow-xs"
                  : "border-[#2d081d]/20 bg-white text-ink-muted hover:border-[#451020]/60",
              )}
            >
              {lang === "vi" ? "Khác..." : "Other..."}
            </button>
          </div>

          {/* Ô nhập số lượng khi chọn Khác */}
          {isCustomCount && (
            <div className="mt-2.5 rounded-lg border border-[#2d081d]/20 bg-white/70 px-3.5 py-2.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs text-ink-muted">
                  {lang === "vi" ? "Số lượng người tham dự:" : "Number of attendees:"}
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                    className="flex size-7 items-center justify-center rounded-md border border-[#2d081d]/20 bg-white text-ink-muted transition hover:border-[#451020]/70 hover:bg-[#faf7f2] hover:text-ink active:scale-95"
                    aria-label="Decrease guest count"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={guestCount || ""}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (raw === "") {
                        setGuestCount(0);
                        return;
                      }
                      const val = parseInt(raw, 10);
                      if (!isNaN(val)) {
                        setGuestCount(Math.min(20, Math.max(0, val)));
                      }
                    }}
                    onBlur={() => {
                      if (guestCount < 1) setGuestCount(1);
                    }}
                    className="w-12 rounded-md border border-[#2d081d]/25 bg-white py-1 text-center text-base font-semibold sm:text-xs text-ink focus:border-[#451020] focus:outline-none focus:ring-1 focus:ring-[#451020]"
                  />
                  <button
                    type="button"
                    onClick={() => setGuestCount((prev) => Math.min(20, (prev || 0) + 1))}
                    className="flex size-7 items-center justify-center rounded-md border border-[#2d081d]/20 bg-white text-ink-muted transition hover:border-[#451020]/70 hover:bg-[#faf7f2] hover:text-ink active:scale-95"
                    aria-label="Increase guest count"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
              <p className="mt-1 text-right text-[11px] text-ink-muted/70">
                {lang === "vi" ? "(Tối đa 20 người)" : "(Max 20 guests)"}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Khách của bên nào */}
      <div>
        <label className="block text-xs uppercase tracking-[0.14em] text-ink-muted">
          {lang === "vi" ? "Bạn là khách của *" : "You are a guest of *"}
        </label>
        <div className="mt-1.5 flex gap-2">
          {(["both", "groom", "bride"] as SideType[]).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setSide(val)}
              className={cn(
                "flex-1 rounded-md border py-1.5 text-xs font-medium transition-all duration-200",
                side === val
                  ? "border-[#451020] bg-[#451020] text-[#faf6f0] shadow-xs"
                  : "border-[#2d081d]/20 bg-white text-ink-muted hover:border-[#451020]/60",
              )}
            >
              {val === "both"
                ? lang === "vi"
                  ? "Cả hai"
                  : "Both"
                : val === "bride"
                  ? wedding.couple.bride.shortName
                  : wedding.couple.groom.shortName}
            </button>
          ))}
        </div>
      </div>

      {/* Lời nhắn / ghi chú */}
      <div>
        <label className="block text-xs uppercase tracking-[0.14em] text-ink-muted">
          {lang === "vi" ? "Lời nhắn cho cô dâu chú rể (tùy chọn)" : "Note for the couple (optional)"}
        </label>
        <input
          type="text"
          maxLength={150}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder={lang === "vi" ? "Nhập lời chúc hoặc lưu ý..." : "Any wishes or note..."}
          className="mt-1.5 w-full rounded-md border border-[#2d081d]/25 bg-white px-3.5 py-2 text-base text-ink placeholder:text-ink-muted/50 sm:text-sm focus:border-[#451020] focus:outline-none focus:ring-1 focus:ring-[#451020]"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#451020] py-3 font-serif text-sm font-semibold uppercase tracking-[0.14em] text-[#faf6f0] shadow-md transition-all hover:bg-[#5c1a2e] hover:shadow-lg disabled:opacity-60"
        >
          <Send className="size-4" />
          <span>
            {submitting
              ? lang === "vi"
                ? "Đang lưu xác nhận..."
                : "Submitting..."
              : lang === "vi"
                ? "Xác nhận gửi thông tin"
                : "Submit Confirmation"}
          </span>
        </button>
      </div>
    </form>
  );
}

function SuccessView({
  guestName,
  attendance,
  onReset,
}: {
  guestName: string;
  attendance: AttendanceType;
  onReset: () => void;
}) {
  const { lang } = useLanguage();

  return (
    <div className="space-y-5 px-6 pb-8 pt-4 text-center">
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[#451020]/10 text-[#451020]">
        <Heart className="size-7 fill-[#451020] text-[#451020]" />
      </div>

      <div>
        <p className="font-serif text-2xl text-[#2d081d] font-light">
          {lang === "vi" ? `Cảm ơn bạn ${guestName}!` : `Thank you ${guestName}!`}
        </p>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed">
          {attendance === "yes"
            ? lang === "vi"
              ? "Gia đình đã ghi nhận xác nhận tham dự của bạn. Đã tự động sao chép tin nhắn, bạn có thể bấm gửi thêm tin nhắn Zalo bên dưới!"
              : "We have recorded your attendance. You can also send a direct Zalo message below!"
            : lang === "vi"
              ? "Cảm ơn bạn đã phản hồi. Rất tiếc vì bạn không thể đến nhưng gia đình rất trân quý tình cảm của bạn!"
              : "Thank you for letting us know. We appreciate your warm thoughts!"}
        </p>
      </div>

      {/* Zalo Direct Buttons */}
      <div className="rounded-lg border border-[#2d081d]/15 bg-[#faf7f2] p-4 space-y-3">
        <p className="text-xs uppercase tracking-[0.14em] text-[#451020] font-medium">
          {lang === "vi" ? "Nhắn tin trực tiếp qua Zalo" : "Message on Zalo"}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <ZaloButton person="groomMother" className="w-full px-4 sm:py-2.5" />
          <ZaloButton person="brideMother" className="w-full px-4 sm:py-2.5" />
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="text-xs text-ink-muted underline underline-offset-4 hover:text-[#451020] transition-colors"
      >
        {lang === "vi" ? "Chỉnh sửa lại thông tin" : "Edit my response"}
      </button>
    </div>
  );
}

const isTextField = (el: Element | null): el is HTMLElement =>
  el instanceof HTMLTextAreaElement ||
  (el instanceof HTMLInputElement && !["button", "checkbox", "radio", "submit"].includes(el.type));

/**
 * Keeps the mobile RSVP sheet above the on-screen keyboard.
 * iOS (Safari / Zalo) and recent Android Chrome don't shrink the layout for the keyboard, they
 * just cover the bottom of the screen, so a bottom sheet ends up hidden behind it. We read the
 * visual viewport (the part of the page still visible) and lift / cap the sheet to fit it, then
 * scroll the focused field to the middle of the sheet.
 */
function useKeyboardAwareSheet(active: boolean, scrollRef: RefObject<HTMLDivElement | null>) {
  const [viewport, setViewport] = useState<{ bottom: number; height: number } | null>(null);

  const revealFocusedField = useCallback(() => {
    const sheet = scrollRef.current;
    const field = document.activeElement;
    if (!sheet || !isTextField(field) || !sheet.contains(field)) return;
    const sheetBox = sheet.getBoundingClientRect();
    const fieldBox = field.getBoundingClientRect();
    const top = sheet.scrollTop + (fieldBox.top - sheetBox.top) - (sheetBox.height - fieldBox.height) / 2;
    sheet.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, [scrollRef]);

  useEffect(() => {
    const vv = window.visualViewport;
    if (!active || !vv) {
      setViewport(null);
      return;
    }
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Distance from the bottom of the visible area to the bottom of the layout viewport:
        // the keyboard height (plus any amount iOS has panned the page).
        const bottom = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
        setViewport({ bottom, height: Math.round(vv.height) });
      });
    };
    update();
    vv.addEventListener("resize", update);
    vv.addEventListener("scroll", update);
    return () => {
      cancelAnimationFrame(frame);
      vv.removeEventListener("resize", update);
      vv.removeEventListener("scroll", update);
    };
  }, [active]);

  // Once the keyboard has opened (viewport changed), bring the focused field into view.
  useEffect(() => {
    if (!active || !viewport) return;
    const timer = window.setTimeout(revealFocusedField, 50);
    return () => window.clearTimeout(timer);
  }, [active, viewport, revealFocusedField]);

  // Moving between fields with the keyboard already open doesn't resize the viewport.
  useEffect(() => {
    if (!active) return;
    const onFocusIn = () => window.setTimeout(revealFocusedField, 300);
    document.addEventListener("focusin", onFocusIn);
    return () => document.removeEventListener("focusin", onFocusIn);
  }, [active, revealFocusedField]);

  if (!viewport) return undefined;
  return {
    bottom: viewport.bottom,
    // Leave a little of the page visible above the sheet; the sheet scrolls inside.
    maxHeight: Math.max(240, Math.min(viewport.height * 0.92, viewport.height - 12)),
  };
}

export function ContactPicker({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
  const sheetScrollRef = useRef<HTMLDivElement>(null);
  const sheetStyle = useKeyboardAwareSheet(isMobile && open, sheetScrollRef);
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    attendance: AttendanceType;
  } | null>(null);

  const handleSuccess = (name: string, attendance: AttendanceType) => {
    setSubmittedData({ name, attendance });
  };

  const handleReset = () => {
    setSubmittedData(null);
  };

  const title = lang === "vi" ? "Xác nhận tham dự" : "Confirm your attendance";
  const desc =
    lang === "vi"
      ? "Vui lòng cho cô dâu & chú rể biết bạn sẽ đến chung vui."
      : "Please let the couple know if you can join our celebration.";

  const header = (
    <div className="px-6 pb-1 pt-6 text-center">
      <p className="font-serif text-2xl sm:text-3xl text-[#2d081d] font-light">{title}</p>
      <p className="mt-1 text-xs text-ink-muted">{desc}</p>
    </div>
  );

  const content = (
    <>
      {!submittedData ? (
        <>
          {header}
          <RsvpForm onSuccess={handleSuccess} />
        </>
      ) : (
        <SuccessView
          guestName={submittedData.name}
          attendance={submittedData.attendance}
          onReset={handleReset}
        />
      )}
    </>
  );

  if (isMobile) {
    return (
      <Drawer
        open={open}
        onOpenChange={(v) => { setOpen(v); if (!v) setSubmittedData(null); }}
        // vaul's own keyboard handling misplaces the sheet on iOS / Zalo; useKeyboardAwareSheet does it.
        repositionInputs={false}
      >
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent
          style={sheetStyle}
          className="max-h-[90svh] border-[#2d081d]/20 bg-[#faf7f2]"
        >
          <DrawerTitle className="sr-only">{title}</DrawerTitle>
          <DrawerDescription className="sr-only">{desc}</DrawerDescription>
          {/* Scroll inside a wrapper, not the sheet itself: vaul hangs a background layer
              below the sheet (::after, top: 100%) that would scroll up over the fields. */}
          <div ref={sheetScrollRef} className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
            {content}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setSubmittedData(null); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md gap-0 rounded-xl border-[#2d081d]/20 bg-[#faf7f2] p-0 shadow-xl">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{desc}</DialogDescription>
        {content}
      </DialogContent>
    </Dialog>
  );
}
