import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SaxMark } from "./sax";

type Props = {
  onDone: () => void;
};

export function Preloader({ onDone }: Props) {
  const pathRef = useRef<SVGPathElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      onDone();
      return;
    }

    const path = pathRef.current;
    const length = path?.getTotalLength() ?? 0;
    if (path) {
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    }

    const proxy = { p: 0 };
    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      onDone();
    };

    const tl = gsap.timeline({ onComplete: finish });
    tl.to(
      proxy,
      {
        p: 100,
        duration: 1.55,
        ease: "power1.inOut",
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.textContent = String(Math.round(proxy.p)).padStart(2, "0");
          }
        },
      },
      0,
    );
    if (path) {
      tl.to(path, { strokeDashoffset: 0, duration: 1.55, ease: "power2.inOut" }, 0);
    }
    tl.to(contentRef.current, { opacity: 0, duration: 0.28 }, "+=0.12");
    tl.to(topRef.current, { yPercent: -100, duration: 0.85, ease: "power3.inOut" }, "open");
    tl.to(bottomRef.current, { yPercent: 100, duration: 0.85, ease: "power3.inOut" }, "open");

    return () => {
      tl.kill();
    };
  }, [onDone]);

  return (
    <div ref={rootRef} className="z-preloader fixed inset-0" role="status" aria-live="polite" aria-label="Site wordt gestemd">
      <div ref={topRef} className="absolute inset-x-0 top-0 h-1/2 border-b border-brass/40 bg-pitch" />
      <div ref={bottomRef} className="absolute inset-x-0 bottom-0 h-1/2 bg-pitch" />
      <div ref={contentRef} className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-brass">
        <SaxMark pathRef={pathRef} className="mb-8 h-[38vh] w-auto" />
        <p className="font-mono text-5xl tracking-tight text-cream">
          <span ref={countRef}>00</span>
          <span className="text-brass">%</span>
        </p>
        <p className="kicker mt-4 max-w-xs text-center leading-relaxed text-mute">
          Stemmen & opwarmen // Saxofoon · Klarinet · Directie // Rotterdam
        </p>
      </div>
    </div>
  );
}
