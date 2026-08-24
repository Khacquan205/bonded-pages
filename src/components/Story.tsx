import { wedding } from "@/config/wedding";
import { useT } from "@/context/LanguageContext";
import { useLanguage } from "@/context/LanguageContext";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Story() {
  const t = useT();
  const { lang } = useLanguage();

  return (
    <section id="story" className="bg-cream px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          label={lang === "vi" ? "Chuyện chúng mình" : "Our story"}
          title={lang === "vi" ? "Sáu năm và một lời hẹn" : "Six years, one promise"}
          desc={t(wedding.story.intro)}
        />

        {/* Vertical story blocks: Bride first, then Groom */}
        <div className="mt-16 sm:mt-24 space-y-16 sm:space-y-24">
          {/* Block 1: Về Cô dâu (Bride) - Ảnh trái / Text phải */}
          <Reveal className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <div className="flex justify-center md:justify-end">
              <div className="relative w-full max-w-sm overflow-hidden rounded-t-[12rem] rounded-b-2xl border border-eucalyptus/60 shadow-xs">
                <img
                  src={wedding.story.bride.image}
                  alt={t(wedding.story.bride.title)}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <span className="label-caps text-olive">
                {lang === "vi" ? "Cô dâu" : "The Bride"}
              </span>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl text-olive-deep font-light">
                {t(wedding.story.bride.title)}
              </h3>
              <div className="mt-4 flex items-center justify-center md:justify-start gap-2">
                <span className="h-px w-8 bg-eucalyptus" />
                <span className="size-1 rotate-45 bg-olive" />
              </div>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink-muted">
                {t(wedding.story.bride.text)}
              </p>
            </div>
          </Reveal>

          {/* Block 2: Về Chú rể (Groom) - Text trái / Ảnh phải (đảo chiều) */}
          <Reveal className="grid items-center gap-8 md:grid-cols-2 md:gap-14">
            <div className="order-2 md:order-1 text-center md:text-right">
              <span className="label-caps text-olive">
                {lang === "vi" ? "Chú rể" : "The Groom"}
              </span>
              <h3 className="mt-2 font-display text-3xl sm:text-4xl text-olive-deep font-light">
                {t(wedding.story.groom.title)}
              </h3>
              <div className="mt-4 flex items-center justify-center md:justify-end gap-2">
                <span className="size-1 rotate-45 bg-olive" />
                <span className="h-px w-8 bg-eucalyptus" />
              </div>
              <p className="mt-5 text-base sm:text-lg leading-relaxed text-ink-muted">
                {t(wedding.story.groom.text)}
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center md:justify-start">
              <div className="relative w-full max-w-sm overflow-hidden rounded-t-[12rem] rounded-b-2xl border border-eucalyptus/60 shadow-xs">
                <img
                  src={wedding.story.groom.image}
                  alt={t(wedding.story.groom.title)}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

