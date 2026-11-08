import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Fades + slides content in the first time it scrolls into view.
 * Pure CSS transitions (opacity / translate) toggled by an IntersectionObserver, so the
 * animation runs on the compositor instead of a JS animation loop competing with scrolling
 * on slower phones.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [animate, setAnimate] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setAnimate(false);
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      // Start once the top edge is ~15% into the viewport (works for blocks taller than the screen).
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(className, shown ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0")}
      style={{
        // Inline so a `transition-*` utility in className can't cancel the reveal; keeps border hovers.
        transition: animate
          ? `opacity 0.6s ease-out ${delay}s, translate 0.6s ease-out ${delay}s, border-color 0.2s ease`
          : undefined,
      }}
    >
      {children}
    </div>
  );
}
