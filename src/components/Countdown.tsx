import { useEffect, useState } from "react";
import { useLanguage } from "@/context/LanguageContext";

function diff(target: number) {
  const ms = Math.max(0, target - Date.now());
  return {
    d: Math.floor(ms / 86400000),
    h: Math.floor(ms / 3600000) % 24,
    m: Math.floor(ms / 60000) % 60,
    s: Math.floor(ms / 1000) % 60,
  };
}

const ZERO = { d: 0, h: 0, m: 0, s: 0 };

export function Countdown({ target }: { target: string }) {
  const { lang } = useLanguage();
  const t = new Date(target).getTime();
  // Start from zeros so SSR and the first client render match, then tick.
  const [v, setV] = useState(ZERO);

  useEffect(() => {
    setV(diff(t));
    const id = window.setInterval(() => setV(diff(t)), 1000);
    return () => window.clearInterval(id);
  }, [t]);

  const labels =
    lang === "vi"
      ? { d: "Ngày", h: "Giờ", m: "Phút", s: "Giây" }
      : { d: "Days", h: "Hours", m: "Min", s: "Sec" };

  const cells = [
    { k: "d", n: v.d },
    { k: "h", n: v.h },
    { k: "m", n: v.m },
    { k: "s", n: v.s },
  ] as const;

  return (
    <div className="flex items-start justify-center gap-5 sm:gap-9">
      {cells.map((c) => (
        <div key={c.k} className="min-w-[3.25rem] text-center">
          <div className="font-display text-4xl font-light tabular-nums text-white sm:text-5xl">
            {String(c.n).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[0.625rem] font-medium uppercase tracking-[0.22em] text-white/75">
            {labels[c.k]}
          </div>
        </div>
      ))}
    </div>
  );
}
