import { wedding } from "@/config/wedding";
import { useFormatDate, useLanguage, useT } from "@/context/LanguageContext";
import { ZaloButton } from "./ZaloButton";
import { Reveal } from "./Reveal";

export function ClosingCta() {
  const { lang } = useLanguage();
  const t = useT();
  const fmt = useFormatDate();

  return (
    <section className="relative overflow-hidden pt-20 pb-0 sm:pt-28 sm:pb-0 text-center text-white">
      {/* Background Image & Overlay */}
      <img
        src={wedding.closing.image}
        alt="Wedding background"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/60" />

      <div className="relative mx-auto max-w-3xl px-6">
        <Reveal>
          <p className="font-display text-xs sm:text-sm font-semibold uppercase tracking-[0.3em] text-[#faf6f0]/90">
            {lang === "vi" ? "Lời Ngỏ" : "Warm Invitation"}
          </p>
          <h2 className="mt-4 font-display text-3xl font-light leading-tight sm:text-5xl text-cream">
            {t(wedding.closing.title)}
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-white/40" />
            <span className="size-2 rotate-45 bg-[#610401] border border-white/40" />
            <span className="h-px w-12 bg-white/40" />
          </div>
          <p className="mt-6 text-sm sm:text-base leading-relaxed text-white/90">
            {lang === "vi"
              ? "Hãy nhắn tin cho chúng mình qua Zalo để xác nhận tham dự và giúp chúng mình chuẩn bị đón tiếp bạn chu đáo nhất nhé."
              : "Please send us a message via Zalo to confirm your attendance so we can best prepare for your warm welcome."}
          </p>
        </Reveal>

        {/* 2 Separate Zalo Buttons for Bride and Groom */}
        <Reveal delay={0.15} className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <ZaloButton
            person="bride"
            variant="solid"
            withAvatar={true}
            className="w-full sm:w-auto shadow-lg hover:scale-[1.02]"
          />
          <ZaloButton
            person="groom"
            variant="solid"
            withAvatar={true}
            className="w-full sm:w-auto shadow-lg hover:scale-[1.02]"
          />
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

      {/* Bespoke Stationery Footer */}
      <footer className="relative z-10 mt-16 sm:mt-20 border-t border-white/15 bg-black/60 py-8 sm:py-10 text-center backdrop-blur-sm">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-2.5 px-6">
          <div className="flex size-10 items-center justify-center rounded-full border border-white/40">
            <span className="font-display text-[0.6875rem] tracking-[0.2em] text-white/90 pl-0.5">
              N&thinsp;&amp;&thinsp;L
            </span>
          </div>
          <div className="flex flex-col items-center gap-0.5 font-display text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-white/85">
            <span className="whitespace-nowrap">{wedding.couple.bride.name}</span>
            <span className="text-[0.625rem] text-white/60">&amp;</span>
            <span className="whitespace-nowrap">{wedding.couple.groom.name}</span>
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
