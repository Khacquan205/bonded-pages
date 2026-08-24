import { wedding } from "@/config/wedding";
import { useFormatDate, useLanguage, useT } from "@/context/LanguageContext";
import { ZaloButton } from "./ZaloButton";
import { Reveal } from "./Reveal";

export function ClosingCta() {
  const { lang } = useLanguage();
  const t = useT();
  const fmt = useFormatDate();

  return (
    <section className="relative overflow-hidden py-28 sm:py-36 text-center text-white">
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
          <p className="label-caps text-eucalyptus">
            {lang === "vi" ? "Lời ngỏ" : "Warm Invitation"}
          </p>
          <h2 className="mt-4 font-display text-3xl font-light leading-tight sm:text-5xl text-cream">
            {t(wedding.closing.title)}
          </h2>
          <div className="mx-auto mt-6 flex items-center justify-center gap-3">
            <span className="h-px w-12 bg-white/40" />
            <span className="size-1.5 rotate-45 bg-eucalyptus" />
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
    </section>
  );
}
