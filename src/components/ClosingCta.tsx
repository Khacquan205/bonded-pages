import { wedding } from "@/config/wedding";
import { useFormatDate, useLanguage, useT } from "@/context/LanguageContext";
import { ZaloButton } from "./ZaloButton";
import { Reveal } from "./Reveal";

export function ClosingCta() {
  const { lang } = useLanguage();
  const t = useT();
  const fmt = useFormatDate();

  return (
    <section className="relative overflow-hidden bg-[#120d0e] text-center text-white">
      <div className="relative pt-20 sm:pt-28">
        {/* Background Image & Overlay: the couple sits in the open band below the RSVP note */}
        <img
          src={wedding.closing.image}
          alt="Wedding background"
          loading="lazy"
          decoding="async"
          className="absolute -bottom-[13%] left-1/2 h-[107%] w-auto max-w-none -translate-x-1/2 sm:inset-0 sm:size-full sm:max-w-full sm:translate-x-0 sm:object-cover sm:object-[center_25%] lg:object-[center_40%] xl:object-[center_49%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.62)_58%,rgba(0,0,0,0.15)_80%,rgba(0,0,0,0.3)_100%)]" />

        <div className="relative mx-auto max-w-3xl px-6">
          <Reveal>
            <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-[#faf6f0]/90">
              {lang === "vi" ? "Lời Ngỏ" : "Warm Invitation"}
            </p>
            <h2 className="mt-4 font-serif text-3xl leading-tight sm:text-5xl text-cream">
              {t(wedding.closing.title)}
            </h2>
            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-white/40" />
              <span className="size-2 rotate-45 bg-[#451020] border border-white/40" />
              <span className="h-px w-12 bg-white/40" />
            </div>
            <p className="mt-6 text-sm sm:text-base leading-relaxed text-white/90">
              {lang === "vi"
                ? "Hãy nhắn tin cho chúng mình qua Zalo để xác nhận tham dự và giúp chúng mình chuẩn bị đón tiếp bạn chu đáo nhất nhé."
                : "Please send us a message via Zalo to confirm your attendance so we can best prepare for your warm welcome."}
            </p>
          </Reveal>

          {/* Zalo Buttons for Couple and Mothers */}
          <Reveal delay={0.15} className="mt-10 flex flex-col items-center justify-center gap-3 max-w-3xl mx-auto">
            <div className="flex flex-col sm:flex-row w-full gap-3 justify-center">
              <ZaloButton
                person="groom"
                variant="light"
                className="w-full sm:w-1/2 hover:scale-[1.02]"
              />
              <ZaloButton
                person="bride"
                variant="light"
                className="w-full sm:w-1/2 hover:scale-[1.02]"
              />
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-3 justify-center">
              <ZaloButton
                person="groomMother"
                variant="outline"
                className="w-full sm:w-1/2 hover:scale-[1.02]"
              />
              <ZaloButton
                person="brideMother"
                variant="outline"
                className="w-full sm:w-1/2 hover:scale-[1.02]"
              />
            </div>
          </Reveal>

          {/* RSVP Deadline notice */}
          <Reveal delay={0.25} className="mt-8">
            <p className="text-xs uppercase tracking-[0.18em] text-white/75">
              {lang === "vi"
                ? `* Vui lòng phản hồi trước ngày ${fmt(wedding.rsvpDeadline)}`
                : `* Please kindly RSVP before ${fmt(wedding.rsvpDeadline)}`}
            </p>
          </Reveal>
        </div>

        {/* Open band that lets the couple in the photo show through */}
        <div aria-hidden="true" className="h-72 sm:h-80" />
      </div>

      {/* Bespoke Stationery Footer */}
      <footer className="relative z-10 border-t border-white/15 bg-black/60 py-8 sm:py-10 text-center backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-2.5 px-6">
          <div className="relative mb-1 flex items-center justify-center">
            <img
              src="/images/monogram-ln-cream.png"
              alt="Monogram Long & Nga"
              className="h-14 sm:h-16 w-auto object-contain opacity-90 drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]"
            />
          </div>
          <div className="flex flex-col items-center gap-0.5 font-display text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/85">
            <span className="whitespace-nowrap">{wedding.couple.groom.name}</span>
            <span className="text-[0.625rem] text-white/60">&amp;</span>
            <span className="whitespace-nowrap">{wedding.couple.bride.name}</span>
          </div>
          <p className="font-display text-[0.6875rem] tracking-[0.16em] text-white/60 uppercase">
            11.12.2026 · {wedding.venue.name}
          </p>
          <p className="mt-1 font-serif text-[0.6875rem] italic text-white/40">
            Forever &amp; Always
          </p>
        </div>
      </footer>
    </section>
  );
}
