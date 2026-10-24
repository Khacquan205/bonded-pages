import { wedding } from "@/config/wedding";
import { useLanguage, useT } from "@/context/LanguageContext";

export function WeddingInvitation() {
  const { lang } = useLanguage();
  const t = useT();
  const vi = lang === "vi";
  const reception = new Date(wedding.date.reception);
  const parts = new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Asia/Ho_Chi_Minh",
  }).formatToParts(reception);
  const date = ["day", "month", "year"]
    .map((type) => parts.find((part) => part.type === type)?.value)
    .join(" . ");
  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(reception);
  const weekday = new Intl.DateTimeFormat(vi ? "vi-VN" : "en-GB", {
    weekday: "long",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(reception);
  const lunar = vi
    ? `${weekday.charAt(0).toUpperCase()}${weekday.slice(1).toLowerCase()}, ${wedding.date.receptionLunar.vi.replace("Nhằm ngày 0", "ngày ").replace("Nhằm ngày ", "ngày ")}`
    : `${weekday}, ${wedding.date.receptionLunar.en}`;
  const motherName = (name: { readonly vi: string; readonly en: string }) =>
    vi ? `Bà ${name.vi.replace(/^Bà\s+/, "").toLocaleUpperCase("vi-VN")}` : name.en;

  return (
    <article
      aria-label={vi ? "Thiệp mời tiệc cưới" : "Wedding reception invitation"}
      className="mx-auto w-full max-w-2xl text-center font-serif text-base leading-relaxed text-[#451020] [container-type:inline-size]"
    >
      <div className="grid grid-cols-2 gap-5 text-sm leading-relaxed sm:gap-10 sm:text-base">
        <div>
          <p className="mb-2 italic">{vi ? "Nhà Trai" : "Groom’s family"}</p>
          <p>{motherName(wedding.couple.mothers.groomMother.name)}</p>
        </div>
        <div>
          <p className="mb-2 italic">{vi ? "Nhà Gái" : "Bride’s family"}</p>
          <p>{motherName(wedding.couple.mothers.brideMother.name)}</p>
        </div>
      </div>

      <div className="mt-8 sm:mt-10">
        {/* This font has unusually tall swashes; the line height contains the
            actual glyphs while container units keep each full name on one line. */}
        <h3 className="whitespace-nowrap font-script text-[6.5cqw] font-normal leading-[2.8] text-[#451020]">
          {wedding.couple.groom.name}
        </h3>
        <div className="mx-auto my-2 grid max-w-md grid-cols-[1fr_auto_1fr] items-center gap-4">
          <p className="text-xs uppercase tracking-[0.08em] sm:text-sm">
            {t(wedding.couple.groom.role)}
          </p>
          <span aria-hidden="true" className="font-alex text-4xl leading-none">
            &amp;
          </span>
          <p className="text-xs uppercase tracking-[0.08em] sm:text-sm">
            {t(wedding.couple.bride.role)}
          </p>
        </div>
        <h3 className="whitespace-nowrap font-script text-[5.6cqw] font-normal leading-[2.8] text-[#451020]">
          {wedding.couple.bride.name}
        </h3>
      </div>

      <div className="mt-8 sm:mt-10">
        <p className="font-display text-base uppercase leading-relaxed tracking-[0.06em] sm:text-lg">
          {vi ? "Trân trọng kính mời" : "Together with our families, we invite you"}
        </p>
        <div aria-hidden="true" className="mx-auto my-6 h-px w-28 bg-[#451020]/40" />
        <p className="mx-auto max-w-md text-base leading-relaxed sm:text-lg">
          {vi ? "Đến dự buổi tiệc thân mật cùng" : "To celebrate our wedding reception"}
          <br />
          {vi ? "gia đình chúng tôi tại" : "with our families at"}
        </p>
      </div>

      <div className="mt-6 sm:mt-8">
        <p className="text-2xl leading-snug sm:text-3xl">{wedding.venue.name}</p>
        <p className="mx-auto mt-3 max-w-md text-base leading-relaxed">
          {vi ? (
            <>
              Góc đường Hai Bà Trưng &amp; Đại Lộ Lê Duẩn,
              <br />
              phường Sài Gòn, Hồ Chí Minh
            </>
          ) : (
            t(wedding.venue.address)
          )}
        </p>
      </div>

      <div className="mt-8 sm:mt-10">
        <p className="text-base uppercase tracking-[0.06em] sm:text-lg">
          {vi ? `Vào lúc ${time.replace(":", " giờ ")}` : `At ${time}`}
        </p>
        <time
          dateTime={wedding.date.reception}
          className="mt-3 block font-display text-3xl leading-relaxed tracking-[0.04em] sm:text-4xl"
        >
          {date}
        </time>
        <p className="mx-auto mt-3 max-w-md text-sm italic leading-relaxed sm:text-base">
          ({lunar})
        </p>
      </div>

      <p className="mx-auto mt-8 max-w-md text-base leading-relaxed sm:mt-10 sm:text-lg">
        {vi ? "Sự hiện diện của quý khách là" : "Your presence is an honour"}
        <br />
        {vi ? "niềm vinh hạnh của gia đình chúng tôi" : "and a joy to our families"}
      </p>
    </article>
  );
}
