import { Link } from "@tanstack/react-router";
import { SaxMark } from "@/components/portfolio/sax";

export function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen flex-col justify-center overflow-hidden px-6 py-24">
      <SaxMark className="pointer-events-none absolute top-1/2 right-[-4rem] h-[70vh] w-auto -translate-y-1/2 text-brass/15" />
      <div className="wrap relative">
        <p className="kicker">404 — Niet op de lessenaar</p>
        <h1 className="display-md mt-4 max-w-3xl italic">Deze toon bestaat niet.</h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-mute">
          De pagina is weg, of de solo is al afgelopen. Terug naar het podium.
        </p>
        <Link
          to="/"
          className="mt-10 inline-flex min-h-11 items-center border border-brass px-6 font-mono text-xs tracking-widest text-brass uppercase transition-colors hover:bg-brass hover:text-pitch"
        >
          Naar Daan
        </Link>
      </div>
    </main>
  );
}
