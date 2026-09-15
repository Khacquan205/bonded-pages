import { useState, useEffect } from "react";
import { Send, Heart, MessageSquareHeart } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/context/LanguageContext";
import { wedding } from "@/config/wedding";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

type SideType = "bride" | "groom" | "both";

interface MessageItem {
  id: string;
  name: string;
  message: string;
  side: SideType | string;
  created_at: string;
}

const COOLDOWN_KEY = "wedding_guestbook_cooldown";
const COOLDOWN_SECONDS = 60;

export function Guestbook() {
  const { lang } = useLanguage();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(6);

  // Form states
  const [name, setName] = useState("");
  const [side, setSide] = useState<SideType>("both");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  // Fetch messages from Supabase
  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data, error } = await supabase
          .from("guestbook_messages")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching guestbook messages:", error);
        } else if (data) {
          setMessages(data as MessageItem[]);
        }
      } catch (err) {
        console.error("Error fetching guestbook:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check (bot detection)
    if (honeypot) {
      toast.error("Invalid submission");
      return;
    }

    const trimmedName = name.trim();
    const trimmedMsg = message.trim();

    if (!trimmedName || !trimmedMsg) {
      toast.error(
        lang === "vi"
          ? "Vui lòng nhập tên và lời chúc của bạn nhé!"
          : "Please enter your name and heartfelt message!",
      );
      return;
    }

    // Cooldown check (60s)
    const lastSubmit = localStorage.getItem(COOLDOWN_KEY);
    if (lastSubmit) {
      const diff = Math.floor((Date.now() - parseInt(lastSubmit, 10)) / 1000);
      if (diff < COOLDOWN_SECONDS) {
        const remaining = COOLDOWN_SECONDS - diff;
        toast.error(
          lang === "vi"
            ? `Vui lòng đợi ${remaining}s trước khi gửi lời chúc tiếp theo nhé.`
            : `Please wait ${remaining}s before sending another message.`,
        );
        return;
      }
    }

    setSubmitting(true);

    try {
      const newMsg = {
        name: trimmedName,
        message: trimmedMsg,
        side,
      };

      const { data, error } = await supabase
        .from("guestbook_messages")
        .insert([newMsg])
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        toast.error(
          lang === "vi"
            ? "Không thể gửi lời chúc. Vui lòng thử lại sau ít phút!"
            : "Could not send message. Please try again later!",
        );
      } else {
        // Optimistic UI prepend
        const insertedItem: MessageItem = data
          ? (data as MessageItem)
          : {
              id: Date.now().toString(),
              name: trimmedName,
              message: trimmedMsg,
              side,
              created_at: new Date().toISOString(),
            };

        setMessages((prev) => [insertedItem, ...prev]);
        setName("");
        setMessage("");
        setSide("both");
        localStorage.setItem(COOLDOWN_KEY, Date.now().toString());

        toast.success(
          lang === "vi"
            ? "Cảm ơn bạn rất nhiều vì lời chúc ấm áp!"
            : "Thank you warmly for your sweet wishes!",
        );
      }
    } catch (err) {
      console.error("Failed to submit message:", err);
      toast.error(
        lang === "vi"
          ? "Đã có lỗi xảy ra khi gửi lời chúc."
          : "An error occurred while sending your message.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const sideLabel = (s: string) => {
    if (s === "bride") return lang === "vi" ? `Nhà gái (${wedding.couple.bride.shortName})` : "Bride's side";
    if (s === "groom") return lang === "vi" ? `Nhà trai (${wedding.couple.groom.shortName})` : "Groom's side";
    return lang === "vi" ? "Cả hai" : "Both";
  };

  return (
    <section id="guestbook" className="bg-cream px-6 py-20 sm:py-28 scroll-mt-16">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          label={lang === "vi" ? "Lưu bút" : "Guestbook"}
          title={lang === "vi" ? "Sổ lưu bút chúc phúc" : "Words of Love"}
          desc={
            lang === "vi"
              ? "Gửi những lời chúc tốt đẹp và tình cảm yêu thương nhất đến cô dâu & chú rể."
              : "Send your warm blessings and best wishes to the bride and groom."
          }
        />

        {/* Guestbook Form */}
        <Reveal className="mt-12 rounded-xl border border-maroon/20 bg-cream-deep/70 p-6 sm:p-8 shadow-2xs backdrop-blur-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Honeypot field for bot protection */}
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="block text-xs uppercase tracking-[0.14em] text-walnut/70 font-medium">
                  {lang === "vi" ? "Tên của bạn *" : "Your Name *"}
                </label>
                <input
                  type="text"
                  maxLength={60}
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={lang === "vi" ? "Nhập tên hoặc biệt danh..." : "Your name..."}
                  className="mt-2 w-full rounded-md border border-[#2d081d]/20 bg-white/90 px-4 py-2.5 text-sm text-[#3d271d] placeholder:text-[#3d271d]/40 focus:border-[#610401] focus:outline-none focus:ring-1 focus:ring-[#610401]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-[0.14em] text-[#3d271d]/75 font-display font-medium">
                  {lang === "vi" ? "Bạn là khách của *" : "You are a guest of *"}
                </label>
                <div className="mt-2 flex gap-2">
                  {(["both", "bride", "groom"] as SideType[]).map((val) => (
                    <button
                      key={val}
                      type="button"
                      onClick={() => setSide(val)}
                      className={cn(
                        "flex-1 rounded-md border py-2 text-xs font-medium transition-all duration-200 font-display",
                        side === val
                          ? "border-[#610401] bg-[#610401] text-[#faf6f0] shadow-xs"
                          : "border-[#2d081d]/20 bg-white/80 text-[#3d271d]/80 hover:border-[#610401]/50 hover:text-[#610401]",
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
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="block text-xs uppercase tracking-[0.14em] text-[#3d271d]/75 font-display font-medium">
                  {lang === "vi" ? "Lời chúc *" : "Your Message *"}
                </label>
                <span className="text-[0.6875rem] text-[#3d271d]/60">
                  {message.length}/500
                </span>
              </div>
              <textarea
                rows={3}
                maxLength={500}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  lang === "vi"
                    ? "Gửi lời chúc trăm năm hạnh phúc đến cặp đôi..."
                    : "Write your heartfelt wishes for the couple..."
                }
                className="mt-2 w-full resize-none rounded-md border border-[#2d081d]/20 bg-white/90 px-4 py-2.5 text-sm text-[#3d271d] placeholder:text-[#3d271d]/40 focus:border-[#610401] focus:outline-none focus:ring-1 focus:ring-[#610401]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#610401] px-7 py-3 text-xs sm:text-sm font-medium uppercase tracking-[0.14em] text-[#faf6f0] shadow-md transition-all hover:bg-[#780602] hover:shadow-lg disabled:opacity-60 hover:scale-[1.01] font-display"
              >
                <Send className="size-4" />
                <span>
                  {submitting
                    ? lang === "vi"
                      ? "Đang gửi..."
                      : "Sending..."
                    : lang === "vi"
                      ? "Gửi lời chúc"
                      : "Send Wishes"}
                </span>
              </button>
            </div>
          </form>
        </Reveal>

        {/* Message List */}
        <div className="mt-14 space-y-4">
          {loading ? (
            <div className="py-12 text-center text-sm text-walnut/60">
              {lang === "vi" ? "Đang tải lời chúc..." : "Loading wishes..."}
            </div>
          ) : messages.length === 0 ? (
            <div className="rounded-lg border border-dashed border-maroon/25 bg-cream-deep/50 py-12 text-center">
              <MessageSquareHeart className="mx-auto size-8 text-maroon/50" />
              <p className="mt-3 text-sm text-walnut/70">
                {lang === "vi"
                  ? "Chưa có lời chúc nào. Hãy là người đầu tiên gửi lời chúc nhé!"
                  : "No wishes yet. Be the first one to leave a blessing!"}
              </p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {messages.slice(0, visibleCount).map((item) => (
                <Reveal
                  key={item.id}
                  className="flex flex-col justify-between rounded-lg border border-[#2d081d]/15 bg-white/85 p-5 shadow-xs backdrop-blur-xs transition-colors hover:border-[#610401]/35"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-display text-lg font-medium text-[#2d081d]">
                        {item.name}
                      </h4>
                      <span className="shrink-0 rounded-full bg-[#610401]/10 px-2.5 py-0.5 text-[0.6875rem] font-medium font-display text-[#610401]">
                        {sideLabel(item.side)}
                      </span>
                    </div>
                    <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#3d271d]/85 whitespace-pre-line">
                      "{item.message}"
                    </p>
                  </div>
                  <div className="mt-4 flex items-center justify-between border-t border-[#2d081d]/12 pt-3 text-[0.6875rem] text-[#3d271d]/60 font-display">
                    <span>
                      {new Date(item.created_at).toLocaleDateString(
                        lang === "vi" ? "vi-VN" : "en-US",
                        {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        },
                      )}
                    </span>
                    <Heart className="size-3.5 text-[#610401]/70 fill-[#610401]/25" />
                  </div>
                </Reveal>
              ))}
            </div>
          )}

          {/* Load More Button */}
          {!loading && messages.length > visibleCount && (
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                className="inline-flex rounded-full border border-[#2d081d]/30 px-6 py-2.5 text-xs uppercase tracking-[0.14em] font-medium text-[#2d081d] transition-colors hover:bg-[#610401] hover:text-[#faf6f0] hover:border-[#610401] font-display"
              >
                {lang === "vi" ? "Xem thêm lời chúc" : "Load more wishes"}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
