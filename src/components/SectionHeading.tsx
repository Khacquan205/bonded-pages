import { Reveal } from "./Reveal";

export function SectionHeading({
  label,
  title,
  desc,
}: {
  label: string;
  title: string;
  desc?: string;
}) {
  return (
    <Reveal className="mx-auto max-w-2xl text-center">
      <p className="label-caps text-maroon">{label}</p>
      <h2 className="mt-3 font-display text-3xl font-light text-maroon sm:text-4xl">{title}</h2>
      <div className="mx-auto mt-5 flex items-center justify-center gap-3">
        <span className="h-px w-10 bg-maroon/30" />
        <span className="size-1.5 rotate-45 bg-maroon/50" />
        <span className="h-px w-10 bg-maroon/30" />
      </div>
      {desc ? <p className="mt-5 text-[0.9375rem] leading-relaxed text-walnut-muted">{desc}</p> : null}
    </Reveal>
  );
}
