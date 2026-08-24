import { CalendarHeart, MapPin, PartyPopper, Info as InfoIcon, Shirt } from "lucide-react";
import { wedding } from "@/config/wedding";
import { useFormatDate, useLanguage, useT } from "@/context/LanguageContext";
import { ContactPicker } from "./ContactPicker";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

function timeOf(iso: string) {
  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(iso));
}

export function Info() {
  const { lang } = useLanguage();
  const t = useT();
  const fmt = useFormatDate();

  const events = [
    {
      key: "ceremony",
      icon: CalendarHeart,
      title: lang === "vi" ? "Lễ Vu Quy" : "Ceremony",
      iso: wedding.date.ceremony,
      place: lang === "vi" ? "Tư gia nhà gái" : "Bride's family home",
    },
    {
      key: "reception",
      icon: PartyPopper,
      title: lang === "vi" ? "Tiệc Cưới" : "Reception",
      iso: wedding.date.reception,
      place: wedding.venue.name,
    },
  ] as const;

  return (
    <section id="info" className="bg-cream-deep px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          label={lang === "vi" ? "Thông tin" : "Details"}
          title={lang === "vi" ? "Thời gian & địa điểm" : "When & where"}
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {events.map((e, i) => (
            <Reveal key={e.key} delay={i * 0.1}>
              <div className="h-full rounded-lg border border-eucalyptus/70 bg-cream p-7 text-center">
                <e.icon className="mx-auto size-6 text-olive" strokeWidth={1.4} aria-hidden />
                <h3 className="mt-4 font-display text-2xl text-olive-deep">{e.title}</h3>
                <p className="mt-3 text-sm text-ink">{fmt(e.iso)}</p>
                <p className="mt-1 font-display text-3xl font-light text-olive">{timeOf(e.iso)}</p>
                <p className="mt-3 text-sm text-ink-muted">{e.place}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-5">
          <div className="overflow-hidden rounded-lg border border-eucalyptus/70 bg-cream">
            <iframe
              src={wedding.venue.embedUrl}
              title={wedding.venue.name}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-64 w-full border-0 sm:h-80"
            />
            <div className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3 text-left">
                <MapPin className="mt-0.5 size-5 shrink-0 text-olive" strokeWidth={1.4} aria-hidden />
                <div>
                  <p className="font-display text-xl text-olive-deep">{wedding.venue.name}</p>
                  <p className="mt-1 text-sm text-ink-muted">{t(wedding.venue.address)}</p>
                </div>
              </div>
              <a
                href={wedding.venue.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center justify-center rounded-full border border-olive px-6 py-3 text-sm font-medium text-olive transition-colors hover:bg-olive hover:text-cream"
              >
                {lang === "vi" ? "Chỉ đường" : "Get directions"}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-lg border border-eucalyptus/70 bg-cream p-7">
              <Shirt className="size-5 text-olive" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-3 font-display text-2xl text-olive-deep">
                {t(wedding.info.dresscode.title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {t(wedding.info.dresscode.text)}
              </p>
              <div className="mt-5 flex gap-3">
                {wedding.info.dresscode.swatches.map((c) => (
                  <span
                    key={c}
                    title={c}
                    className="size-9 rounded-full border border-eucalyptus/70"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="h-full rounded-lg border border-eucalyptus/70 bg-cream p-7">
              <InfoIcon className="size-5 text-olive" strokeWidth={1.4} aria-hidden />
              <h3 className="mt-3 font-display text-2xl text-olive-deep">
                {t(wedding.info.notes.title)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {t(wedding.info.notes.text)}
              </p>
              <ContactPicker>
                <button
                  type="button"
                  className="mt-5 inline-flex items-center justify-center rounded-full bg-olive px-6 py-3 text-sm font-medium text-cream transition-colors hover:bg-olive-deep"
                >
                  {lang === "vi" ? "Xác nhận tham dự" : "Confirm attendance"}
                </button>
              </ContactPicker>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
