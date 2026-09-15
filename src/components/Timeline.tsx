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
    <section id="timeline" className="bg-cream px-6 py-20 sm:py-28 scroll-mt-16">
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
          <div className="inline-flex rounded-full border border-maroon/20 bg-cream-deep/70 p-1.5 shadow-2xs backdrop-blur-xs">
            {wedding.timeline.map((day, idx) => (
              <button
                key={day.key}
                type="button"
                onClick={() => setActiveTab(idx)}
                className={cn(
                  "rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-[0.14em] transition-all duration-300 sm:px-8 sm:text-sm font-display",
                  activeTab === idx
                    ? "bg-[#610401] text-[#faf6f0] shadow-md"
                    : "text-[#3d271d]/70 hover:text-[#610401]",
                )}
              >
                {t(day.tab)}
              </button>
            ))}
          </div>
        </div>

        {/* Date subtitle */}
        <p className="mt-4 text-center font-display text-sm tracking-[0.16em] text-[#3d271d]/75">
          {fmt(currentSchedule.date)}
        </p>

        {/* Vertical Timeline */}
        <div className="relative mt-12 pl-6 sm:pl-0">
          {/* Vertical line for mobile (left) / desktop (center) */}
          <div className="absolute left-[35px] top-4 bottom-4 w-px bg-[#610401]/20 sm:left-1/2 sm:-translate-x-1/2" />

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
                        "ml-8 w-auto rounded-lg border border-[#2d081d]/15 bg-white/80 p-5 shadow-xs backdrop-blur-xs transition-colors hover:border-[#610401]/40 sm:ml-0 sm:w-[calc(50%-2.5rem)] sm:p-6",
                        isEven ? "sm:text-right" : "sm:text-left",
                      )}
                    >
                      <div
                        className={cn(
                          "inline-flex items-center gap-1.5 rounded-full bg-[#610401]/10 px-3 py-1 font-display text-xs sm:text-sm font-medium text-[#610401]",
                          isEven ? "sm:flex-row-reverse" : "",
                        )}
                      >
                        <Clock className="size-3.5 text-[#610401]" />
                        <span>{item.time}</span>
                      </div>

                      <h4 className="mt-3 font-display text-xl font-medium text-[#2d081d] sm:text-2xl">
                        {t(item.title)}
                      </h4>

                      <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#3d271d]/85">
                        {t(item.desc)}
                      </p>

                      {item.location ? (
                        <div
                          className={cn(
                            "mt-3 flex items-center gap-1.5 text-xs font-display text-[#610401]/90",
                            isEven ? "sm:justify-end" : "sm:justify-start",
                          )}
                        >
                          <MapPin className="size-3.5 shrink-0 text-[#610401]" />
                          <span>{t(item.location)}</span>
                        </div>
                      ) : null}
                    </div>

                    {/* Timeline center bullet */}
                    <div className="absolute left-[11px] top-6 flex size-6 -translate-x-1/2 items-center justify-center rounded-full border-2 border-[#610401] bg-[#faf7f2] shadow-xs sm:left-1/2 sm:top-1/2 sm:-translate-y-1/2">
                      <span className="size-2 rounded-full bg-[#610401]" />
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
