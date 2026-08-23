import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "vi" | "en";
type Bi = { vi: string; en: string } | { readonly vi: string; readonly en: string };

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (v: Bi) => string;
};

const LanguageContext = createContext<Ctx | null>(null);
const STORAGE_KEY = "wedding-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("vi");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === "vi" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    window.localStorage.setItem(STORAGE_KEY, l);
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggle: () => setLang(lang === "vi" ? "en" : "vi"),
      t: (v: Bi) => v[lang],
    }),
    [lang, setLang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}

export function useT() {
  return useLanguage().t;
}

export function useFormatDate() {
  const { lang } = useLanguage();
  return useCallback(
    (iso: string, opts?: Intl.DateTimeFormatOptions) => {
      const d = new Date(iso);
      const options: Intl.DateTimeFormatOptions = opts ?? {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      if (lang === "vi") {
        const weekday = new Intl.DateTimeFormat("vi-VN", { weekday: "long", timeZone: "Asia/Ho_Chi_Minh" }).format(d);
        const day = new Intl.DateTimeFormat("vi-VN", { day: "numeric", timeZone: "Asia/Ho_Chi_Minh" }).format(d);
        const month = new Intl.DateTimeFormat("vi-VN", { month: "numeric", timeZone: "Asia/Ho_Chi_Minh" }).format(d);
        const year = new Intl.DateTimeFormat("vi-VN", { year: "numeric", timeZone: "Asia/Ho_Chi_Minh" }).format(d);
        const cap = weekday.charAt(0).toUpperCase() + weekday.slice(1);
        return `${cap}, ${day} tháng ${month}, ${year}`;
      }
      return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "Asia/Ho_Chi_Minh" }).format(d);
    },
    [lang],
  );
}
