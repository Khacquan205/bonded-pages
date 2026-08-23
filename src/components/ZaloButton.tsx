import { wedding } from "@/config/wedding";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { ZaloIcon } from "./ZaloIcon";

type Person = "bride" | "groom";

export function ZaloButton({
  person,
  variant = "solid",
  withAvatar = false,
  className,
}: {
  person: Person;
  variant?: "solid" | "outline";
  withAvatar?: boolean;
  className?: string;
}) {
  const { lang } = useLanguage();
  const p = wedding.couple[person];
  const roleVi = person === "bride" ? "cô dâu" : "chú rể";
  const roleEn = person === "bride" ? "the bride" : "the groom";
  const label =
    lang === "vi"
      ? `${person === "bride" ? "Nhắn cô dâu" : "Nhắn chú rể"} — ${p.shortName}`
      : `Message ${person === "bride" ? "the bride" : "the groom"} — ${p.shortName}`;
  const aria =
    lang === "vi"
      ? `Nhắn tin Zalo cho ${roleVi} ${p.name}`
      : `Send a Zalo message to ${roleEn} ${p.name}`;

  return (
    <a
      href={p.zalo}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className={cn(
        "inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
        variant === "solid"
          ? "bg-zalo text-white hover:brightness-110"
          : "border border-white/70 text-white backdrop-blur-[2px] hover:bg-white/15",
        className,
      )}
    >
      {withAvatar ? (
        <img
          src={p.avatar}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-8 rounded-full object-cover"
          style={{ aspectRatio: "1 / 1" }}
        />
      ) : (
        <ZaloIcon className="size-5 shrink-0" />
      )}
      <span>{label}</span>
    </a>
  );
}
