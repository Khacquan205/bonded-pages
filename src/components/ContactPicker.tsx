import { useState, type ReactNode } from "react";
import { CheckCircle2, Heart, Users, User, Send, MessageCircle } from "lucide-react";
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

    const newRsvpRecord = {
      id: "rsvp_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6),
      name: trimmedName,
      attendance,
      guest_count: attendance === "yes" ? guestCount : 0,
      side,
      note: note.trim() || null,
      phone: null,
      created_at: new Date().toISOString(),
    };

    // Save locally first for 100% instant availability
    try {
      const existing = JSON.parse(localStorage.getItem("wedding_local_rsvps") || "[]");
      localStorage.setItem("wedding_local_rsvps", JSON.stringify([newRsvpRecord, ...existing]));
    } catch (e) {
      console.warn("LocalStorage save error:", e);
    }

    try {
      // Save to Supabase + send automated Zalo notification (server-side,
      // keeps the webhook secret out of the client bundle)
      const result = await submitRsvp({
        data: {
          name: trimmedName,
          attendance,
          guestCount: attendance === "yes" ? guestCount : 0,
          side,
          note: note.trim() || null,
        },
      });

      if (!result.success) {
        console.warn("Supabase RSVP sync notice: insert failed");
      }

      // Auto-generate text and copy to clipboard for convenience
      const attendanceText =
        attendance === "yes"
          ? lang === "vi"
            ? `xác nhận sẽ đến tham dự (${guestCount} người)`
            : `confirm attendance (${guestCount} person(s))`
          : lang === "vi"
            ? "rất tiếc không thể đến tham dự nhưng xin gửi lời chúc trăm năm hạnh phúc"
            : "regretfully cannot attend but wish you lifetime happiness";

      const messageContent =
        lang === "vi"
          ? `Chào hai bạn, mình là ${trimmedName}, mình ${attendanceText} vào ngày 15.11 nhé! ${note ? `Lời nhắn: "${note.trim()}"` : ""}`
          : `Hello, I am ${trimmedName}, I ${attendanceText} on Nov 15th! ${note ? `Note: "${note.trim()}"` : ""}`;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(messageContent);
        }
      } catch (clipErr) {
        console.warn("Clipboard write error:", clipErr);
      }

      toast.success(
        lang === "vi"
          ? "Đã lưu xác nhận tham dự của bạn thành công!"
          : "Your attendance confirmation has been recorded!",
      );

      onSuccess(trimmedName, attendance, guestCount, side);
    } catch (err) {
      console.error("RSVP submit error:", err);
      toast.success(
        lang === "vi"
          ? "Đã ghi nhận thông tin tham dự của bạn!"
          : "Recorded your attendance!",
      );
      onSuccess(trimmedName, attendance, guestCount, side);
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
          className="mt-1.5 w-full rounded-md border border-eucalyptus/70 bg-cream px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted/50 focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive"
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
                ? "border-olive bg-olive text-cream shadow-2xs"
                : "border-eucalyptus/70 bg-cream text-ink-muted hover:border-olive/60",
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
                ? "border-olive-deep bg-cream-deep text-olive-deep font-semibold shadow-2xs ring-1 ring-olive/40"
                : "border-eucalyptus/70 bg-cream text-ink-muted hover:border-olive/60",
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
          <div className="mt-1.5 flex gap-2">
            {[1, 2, 3, 4].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setGuestCount(num)}
                className={cn(
                  "flex-1 rounded-md border py-1.5 text-xs font-medium transition-all duration-200",
                  guestCount === num
                    ? "border-olive bg-olive text-cream"
                    : "border-eucalyptus/70 bg-cream text-ink-muted hover:border-olive/60",
                )}
              >
                {num} {lang === "vi" ? (num === 1 ? "người" : "người") : (num === 1 ? "guest" : "guests")}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Khách của bên nào */}
      <div>
        <label className="block text-xs uppercase tracking-[0.14em] text-ink-muted">
          {lang === "vi" ? "Bạn là khách của *" : "You are a guest of *"}
        </label>
        <div className="mt-1.5 flex gap-2">
          {(["both", "bride", "groom"] as SideType[]).map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => setSide(val)}
              className={cn(
                "flex-1 rounded-md border py-1.5 text-xs font-medium transition-all duration-200",
                side === val
                  ? "border-olive bg-olive text-cream"
                  : "border-eucalyptus/70 bg-cream text-ink-muted hover:border-olive/60",
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
          className="mt-1.5 w-full rounded-md border border-eucalyptus/70 bg-cream px-3.5 py-2 text-sm text-ink placeholder:text-ink-muted/50 focus:border-olive focus:outline-none focus:ring-1 focus:ring-olive"
        />
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={submitting}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-olive py-3 text-sm font-medium text-cream shadow-xs transition-all hover:bg-olive-deep disabled:opacity-60"
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
      <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-sage-mist/80 text-olive">
        <Heart className="size-7 fill-olive text-olive" />
      </div>

      <div>
        <p className="font-display text-2xl text-olive-deep font-light">
          {lang === "vi" ? `Cảm ơn bạn ${guestName}!` : `Thank you ${guestName}!`}
        </p>
        <p className="mt-2 text-sm text-ink-muted leading-relaxed">
          {attendance === "yes"
            ? lang === "vi"
              ? "Chúng mình đã ghi nhận xác nhận tham dự của bạn. Đã tự động sao chép tin nhắn, bạn có thể bấm gửi thêm tin nhắn Zalo bên dưới nhé!"
              : "We have recorded your attendance. You can also send a direct Zalo message below!"
            : lang === "vi"
              ? "Cảm ơn bạn đã phản hồi. Rất tiếc vì bạn không thể đến nhưng chúng mình rất trân quý tình cảm của bạn!"
              : "Thank you for letting us know. We appreciate your warm thoughts!"}
        </p>
      </div>

      {/* Zalo Direct Buttons */}
      <div className="rounded-lg border border-eucalyptus/60 bg-cream-deep p-4 space-y-3">
        <p className="text-xs uppercase tracking-[0.14em] text-olive font-medium">
          {lang === "vi" ? "Nhắn tin trực tiếp qua Zalo" : "Message on Zalo"}
        </p>
        <div className="flex flex-col gap-2.5 sm:flex-row">
          <ZaloButton person="bride" className="w-full text-xs py-2.5" />
          <ZaloButton person="groom" className="w-full text-xs py-2.5" />
        </div>
      </div>

      <button
        type="button"
        onClick={onReset}
        className="text-xs text-ink-muted underline underline-offset-4 hover:text-olive"
      >
        {lang === "vi" ? "Chỉnh sửa lại thông tin" : "Edit my response"}
      </button>
    </div>
  );
}

export function ContactPicker({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  const { lang } = useLanguage();
  const [open, setOpen] = useState(false);
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
      ? "Vui lòng cho cô dâu & chú rể biết bạn sẽ đến chung vui nhé."
      : "Please let the couple know if you can join our celebration.";

  const header = (
    <div className="px-6 pb-1 pt-6 text-center">
      <p className="font-display text-2xl text-olive-deep font-light">{title}</p>
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
      <Drawer open={open} onOpenChange={(v) => { setOpen(v); if (!v) setSubmittedData(null); }}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="border-eucalyptus bg-cream max-h-[90svh] overflow-y-auto">
          <DrawerTitle className="sr-only">{title}</DrawerTitle>
          <DrawerDescription className="sr-only">{desc}</DrawerDescription>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setSubmittedData(null); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md gap-0 rounded-xl border-eucalyptus bg-cream p-0 shadow-lg">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <DialogDescription className="sr-only">{desc}</DialogDescription>
        {content}
      </DialogContent>
    </Dialog>
  );
}
