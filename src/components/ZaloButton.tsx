import { wedding } from "@/config/wedding";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { ZaloIcon } from "./ZaloIcon";

type Person = "bride" | "groom" | "groomMother" | "brideMother";

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

  let zaloUrl = "";
  let label = "";
  let aria = "";
  let avatarUrl: string | undefined = undefined;

  if (person === "bride") {
    const p = wedding.couple.bride;
    zaloUrl = p.zalo;
    avatarUrl = p.avatar;
    label = lang === "vi" ? `Nhắn cô dâu — ${p.shortName}` : `Message bride — ${p.shortName}`;
    aria = lang === "vi" ? `Nhắn tin Zalo cho cô dâu ${p.name}` : `Send a Zalo message to bride ${p.name}`;
  } else if (person === "groom") {
    const p = wedding.couple.groom;
    zaloUrl = p.zalo;
    avatarUrl = p.avatar;
    label = lang === "vi" ? `Nhắn chú rể — ${p.shortName}` : `Message groom — ${p.shortName}`;
    aria = lang === "vi" ? `Nhắn tin Zalo cho chú rể ${p.name}` : `Send a Zalo message to groom ${p.name}`;
  } else if (person === "groomMother") {
    const m = wedding.couple.mothers.groomMother;
    zaloUrl = m.zalo;
    label = lang === "vi" ? "Nhắn mẹ Mai (Nhà trai)" : "Message Mrs. Mai (Groom's family)";
    aria = lang === "vi" ? `Nhắn tin Zalo cho mẹ Mai ${m.name.vi}` : `Send a Zalo message to Mrs. Mai`;
  } else if (person === "brideMother") {
    const m = wedding.couple.mothers.brideMother;
    zaloUrl = m.zalo;
    label = lang === "vi" ? "Nhắn mẹ Thuỷ (Nhà gái)" : "Message Mrs. Thuy (Bride's family)";
    aria = lang === "vi" ? `Nhắn tin Zalo cho mẹ Thuỷ ${m.name.vi}` : `Send a Zalo message to Mrs. Thuy`;
  }

  return (
    <a
      href={zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      className={cn(
        "inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-2.5 text-xs sm:text-sm font-medium transition-all duration-300",
        variant === "solid"
          ? "bg-zalo text-white hover:brightness-110 shadow-sm"
          : "border border-white/70 text-white backdrop-blur-[2px] hover:bg-white/15",
        className,
      )}
    >
      {withAvatar && avatarUrl ? (
        <img
          src={avatarUrl}
          alt=""
          loading="lazy"
          decoding="async"
          className="size-7 sm:size-8 rounded-full object-cover shrink-0"
          style={{ aspectRatio: "1 / 1" }}
        />
      ) : (
        <ZaloIcon className="size-4 sm:size-5 shrink-0" />
      )}
      <span className="truncate">{label}</span>
    </a>
  );
}
