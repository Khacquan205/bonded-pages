import { wedding } from "@/config/wedding";
import { useT } from "@/context/LanguageContext";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Story() {
  const t = useT();
  const { lang } = useLanguage();
  const people = [
    { key: "bride", data: wedding.story.bride },
    { key: "groom", data: wedding.story.groom },
  ] as const;

  return (
    <section id="story" className="bg-cream px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          label={lang === "vi" ? "Chuyện chúng mình" : "Our story"}
          title={lang === "vi" ? "Sáu năm và một lời hẹn" : "Six years, one promise"}
          desc={t(wedding.story.intro)}
        />

        <div className="mt-14 grid gap-10 sm:grid-cols-2 sm:gap-8">
          {people.map((p, i) => (
            <Reveal key={p.key} delay={i * 0.12} className="text-center">
              <div className="mx-auto w-full max-w-xs overflow-hidden rounded-t-[10rem] border border-eucalyptus/60">
                <img
                  src={p.data.image}
                  alt={t(p.data.title)}
                  loading="lazy"
                  decoding="async"
                  className="h-80 w-full object-cover"
                />
              </div>
              <h3 className="mt-6 font-display text-2xl text-olive-deep">{t(p.data.title)}</h3>
              <p className="mx-auto mt-3 max-w-sm text-[0.9375rem] leading-relaxed text-ink-muted">
                {t(p.data.text)}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
