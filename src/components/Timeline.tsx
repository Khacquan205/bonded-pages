import { useState } from "react";
import { Clock, MapPin } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useFormatDate, useLanguage, useT } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Timeline() {
  const { lang } = useLanguage();
  const t = useT();
  const fmt = useFormatDate();
  const [activeTab, setActiveTab] = useState<number>(0);

  const currentSchedule = wedding.timeline[activeTab] ?? wedding.timeline[0];

  return (
    <section id="timeline" className="bg-cream px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          label={lang === "vi" ? "Chương trình" : "Schedule"}
          title={lang === "vi" ? "Lịch trình ngày vui" : "Wedding Timeline"}
          desc={
            lang === "vi"
              ? "Từng khoảnh khắc trọn vẹn và ý nghĩa trong ngày hạnh phúc của chúng mình."
              : "Every meaningful moment of our special day."
          }
        />

        {/* Tab Switcher */}
        <div className="mt-12 flex justify-center">
          <div className="inline-flex rounded-full border border-eucalyptus/60 bg-cream-deep p-1.5 shadow-xs">
            {wedding.timeline.map((day, idx) => (
              <button
                key={day.key}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 sm:px-8 sm:text-sm",
                  activeTab === idx
                    ? "bg-olive text-cream shadow-xs"
                    : "text-ink-muted hover:text-olive-deep",
                )}
              >
                {t(day.tab)}
              </button>
            ))}
          </div>
        </div>

        {/* Date subtitle */}
        <p className="mt-4 text-center text-xs tracking-[0.16em] text-ink-muted">
          {fmt(currentSchedule.date)}
        </p>

        {/* Vertical Timeline */}
        <div className="relative mt-12 pl-6 sm:pl-0">
          {/* Vertical line for mobile (left) / desktop (center) */}
          <div className="absolute left-[35px] top-4 bottom-4 w-px bg-eucalyptus/50 sm:left-1/2 sm:-translate-x-1/2" />

          <div className="space-y-10 sm:space-y-12">
            {currentSchedule.items.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <Reveal key={`${currentSchedule.key}-${idx}`} delay={idx * 0.08}>
                  <div
                    className={cn(
                      "relative flex flex-col sm:flex-row sm:items-center",
                      isEven ? "sm:flex-row-reverse" : "",
                    )}
                  >
                    {/* Time & Content Box */}
                    <div
                      className={cn(
                        "ml-8 w-auto rounded-lg border border-eucalyptus/60 bg-cream-deep p-5 shadow-2xs sm:ml-0 sm:w-[calc(50%-2.5rem)]",
                        isEven ? "sm:text-right" : "sm:text-left",
                      )}
                    >
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full bg-olive/10 px-3 py-1 font-display text-sm font-normal text-olive-deep",
                          isEven ? "sm:flex-row-reverse" : "",
                        )}
                      >
                        <Clock className="size-3.5 text-olive" />
                        <span>{item.time}</span>
                      </div>

                      <h4 className="mt-3 font-display text-xl font-normal text-olive-deep sm:text-2xl">
                        {t(item.title)}
                      </h4>

                      <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                        {t(item.desc)}
                      </p>

                      {item.location ? (
                        <div
                          className={cn(
                            "mt-3 flex items-center gap-1.5 text-xs text-olive",
                            isEven ? "sm:justify-end" : "sm:justify-start",
                          )}
                        >
                          <MapPin className="size-3.5 shrink-0" />
                          <span>{t(item.location)}</span>
                        </div>
                      ) : null}
                    </div>

                    {/* Timeline center bullet */}
                    <div className="absolute left-[11px] top-6 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-olive bg-cream shadow-xs sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2">
                      <span className="size-2 rounded-full bg-olive" />
                    </div>

                    {/* Empty placeholder for symmetry on desktop */}
                    <div className="hidden w-[calc(50%-2.5rem)] sm:block" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
