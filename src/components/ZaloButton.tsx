import type { CSSProperties } from "react";
import { wedding } from "@/config/wedding";
import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { ZaloIcon } from "./ZaloIcon";

type Person = "bride" | "groom" | "groomMother" | "brideMother";

// Stationery palette: "light"/"outline" sit on dark photo backgrounds,
// "solid"/"outlineDark" sit on the cream paper panels.
const variants = {
  solid: {
    className: "bg-[#451020] text-[#faf6f0] shadow-md hover:bg-[#5c1a2e]",
    letter: "#451020",
  },
  outlineDark: {
    className: "border border-[#451020]/40 text-[#451020] hover:border-[#451020] hover:bg-[#451020]/5",
    letter: "#faf7f2",
  },
  light: {
    className: "bg-[#faf6f0] text-[#451020] shadow-lg hover:bg-white",
    letter: "#faf6f0",
  },
  outline: {
    className: "border border-white/70 bg-white/5 text-white hover:bg-white/15",
    letter: "#451020",
  },
} as const;

export function ZaloButton({
  person,
  variant = "solid",
  className,
}: {
  person: Person;
  variant?: keyof typeof variants;
  className?: string;
}) {
  const { lang } = useLanguage();

  let zaloUrl = "";
  let label = "";
  let aria = "";

  if (person === "bride") {
    const p = wedding.couple.bride;
    zaloUrl = p.zalo;
    label = lang === "vi" ? `Nhắn cô dâu — ${p.shortName}` : `Bride — ${p.shortName}`;
    aria = lang === "vi" ? `Nhắn tin Zalo cho cô dâu ${p.name}` : `Send a Zalo message to bride ${p.name}`;
  } else if (person === "groom") {
    const p = wedding.couple.groom;
    zaloUrl = p.zalo;
    label = lang === "vi" ? `Nhắn chú rể — ${p.shortName}` : `Groom — ${p.shortName}`;
    aria = lang === "vi" ? `Nhắn tin Zalo cho chú rể ${p.name}` : `Send a Zalo message to groom ${p.name}`;
  } else if (person === "groomMother") {
    const m = wedding.couple.mothers.groomMother;
    zaloUrl = m.zalo;
    label = lang === "vi" ? "Nhắn mẹ Mai (Nhà trai)" : "Mrs. Mai (Groom's side)";
    aria = lang === "vi" ? `Nhắn tin Zalo cho mẹ Mai ${m.name.vi}` : `Send a Zalo message to Mrs. Mai`;
  } else if (person === "brideMother") {
    const m = wedding.couple.mothers.brideMother;
    zaloUrl = m.zalo;
    label = lang === "vi" ? "Nhắn mẹ Thuỷ (Nhà gái)" : "Mrs. Thuy (Bride's side)";
    aria = lang === "vi" ? `Nhắn tin Zalo cho mẹ Thuỷ ${m.name.vi}` : `Send a Zalo message to Mrs. Thuy`;
  }

  const v = variants[variant];

  return (
    <a
      href={zaloUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={aria}
      style={{ "--zalo-letter": v.letter } as CSSProperties}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full px-6 py-2.5 font-serif text-xs font-semibold uppercase tracking-[0.14em] transition-all duration-300 sm:py-3",
        v.className,
        className,
      )}
    >
      <ZaloIcon className="size-4 shrink-0" />
      <span className="text-balance text-center leading-snug">{label}</span>
    </a>
  );
}
