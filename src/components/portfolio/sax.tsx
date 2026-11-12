import type { Ref } from "react";

const BODY =
  "M150 30C168 26 178 42 170 56C164 66 150 68 146 58L138 78C148 86 150 102 142 114L146 300C148 328 166 344 190 360C220 380 228 418 206 442C184 466 142 468 120 446C104 430 104 406 120 394C132 384 146 390 148 404C150 416 140 426 128 422C112 416 108 398 118 388C100 392 86 376 90 356C94 336 112 328 128 336L122 116C118 96 104 86 108 70L116 46C118 36 132 32 150 30Z";

type Props = {
  className?: string;
  pathRef?: Ref<SVGPathElement>;
};

export function SaxMark({ className, pathRef }: Props) {
  return (
    <svg viewBox="0 0 240 490" className={className} fill="none" aria-hidden="true">
      <path
        ref={pathRef}
        d={BODY}
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
