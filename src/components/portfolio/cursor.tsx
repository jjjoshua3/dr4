import { useEffect, useRef, useState } from "react";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setOn(true);
    document.documentElement.classList.add("has-cursor");

    let x = 0;
    let y = 0;
    let rx = 0;
    let ry = 0;
    let frame = 0;
    let visible = false;

    const move = (event: MouseEvent) => {
      x = event.clientX;
      y = event.clientY;
      if (!visible) {
        visible = true;
        if (dot.current) dot.current.style.opacity = "1";
        if (ring.current) ring.current.style.opacity = "1";
      }
      if (dot.current) {
        dot.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    const loop = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px)`;
      frame = requestAnimationFrame(loop);
    };

    const over = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const host = target?.closest("[data-cursor]");
      const text = host?.getAttribute("data-cursor") ?? "";
      if (label.current) {
        label.current.textContent = text;
        label.current.style.opacity = text ? "1" : "0";
      }
      if (ring.current) ring.current.dataset.active = text ? "1" : "0";
    };

    frame = requestAnimationFrame(loop);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!on) return null;

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" data-active="0">
        <span ref={label} className="cursor-label" />
      </div>
    </>
  );
}
