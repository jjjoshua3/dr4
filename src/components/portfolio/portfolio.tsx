import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Play } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BANDS,
  CHAPTERS,
  DAAN_AGE,
  FILTERS,
  RAIL,
  SCORE,
  TOPICS,
  VIDEOS,
  matches,
  type FilterId,
} from "./data";
import { Cursor } from "./cursor";
import { Preloader } from "./preloader";
import { SaxMark } from "./sax";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PHRASE = ["Saxofoon", "Klarinet", "Dirigent", "Docent", "Codarts", "Rotterdam", "IMPAKT", "Bigband"];

export function Portfolio() {
  const [booting, setBooting] = useState(true);
  const finishBoot = useCallback(() => setBooting(false), []);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = booting ? "hidden" : previous;
    return () => {
      document.body.style.overflow = previous;
    };
  }, [booting]);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleX(${progress})`;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (booting) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.to("#hero-sax", {
        y: 140,
        rotation: 16,
        ease: "none",
        scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>("[data-ink]").forEach((el) => {
        gsap.fromTo(
          el,
          { color: "#9e9689" },
          {
            color: "#f4efe6",
            ease: "none",
            scrollTrigger: { trigger: el, start: "top 82%", end: "top 42%", scrub: true },
          },
        );
      });
      const line = document.getElementById("score-line");
      if (line) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: "#directie", start: "top 72%", end: "bottom 68%", scrub: true },
          },
        );
      }
    });
    return () => ctx.revert();
  }, [booting]);

  return (
    <>
      <a href="#top" className="skip">
        Naar inhoud
      </a>
      <div ref={bar} className="z-bar pointer-events-none fixed inset-x-0 top-0 h-px origin-left bg-brass" aria-hidden="true" />
      <div className="grain" aria-hidden="true" />
      <Cursor />
      {booting ? <Preloader onDone={finishBoot} /> : null}
      <Header />
      <Rail />
      <main>
        <Hero onListen={() => openVideo("kKDFos-CEd8")} />
        <Marquee />
        <Story />
        <Vault />
        <Bands />
        <Score />
        <Contact />
      </main>
      <footer className="border-t border-brass/25">
        <div className="wrap flex flex-col gap-3 py-8 font-mono text-xs tracking-widest text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Daan Roosenbrand</p>
          <p>
            Ontworpen door{" "}
            <a
              href="https://jjjoshua3.netlify.app/"
              target="_blank"
              rel="noreferrer"
              className="text-cream underline decoration-brass/70 underline-offset-4 hover:text-brass"
            >
              Joshua
            </a>
          </p>
          <p>Rotterdam · Saxofoon · Klarinet · Dirigent · Docent</p>
        </div>
      </footer>
    </>
  );
}

function openVideo(id: string) {
  window.dispatchEvent(new CustomEvent("daan-open", { detail: id }));
}

function Header() {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <header className="nav-fade fixed inset-x-0 top-0 z-30">
      <div className="wrap flex items-center justify-between gap-4 py-4">
        <a href="#top" className="font-mono text-xs tracking-widest text-cream uppercase">
          Daan Roosenbrand
          <span className="hidden md:inline"> — Saxofoon · Klarinet · Dirigent</span>
        </a>
        <a
          ref={ref}
          href="#contact"
          className="inline-flex min-h-11 items-center border border-brass/50 px-4 font-mono text-xs tracking-widest text-cream uppercase transition-colors hover:bg-brass hover:text-pitch"
          onMouseMove={(event) => {
            const el = ref.current;
            if (!el || !window.matchMedia("(pointer: fine)").matches) return;
            const rect = el.getBoundingClientRect();
            const x = event.clientX - (rect.left + rect.width / 2);
            const y = event.clientY - (rect.top + rect.height / 2);
            el.style.transform = `translate(${x * 0.28}px, ${y * 0.35}px)`;
          }}
          onMouseLeave={() => {
            if (ref.current) ref.current.style.transform = "";
          }}
        >
          <span className="sm:hidden">Boeken</span>
          <span className="hidden sm:inline">Boek Daan / Contact</span>
        </a>
      </div>
    </header>
  );
}

function Rail() {
  const [section, setSection] = useState("top");

  useEffect(() => {
    const nodes = RAIL.map((item) => document.getElementById(item.id)).filter((node): node is HTMLElement => Boolean(node));
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (hit?.target.id) setSection(hit.target.id);
      },
      { threshold: [0.2, 0.45], rootMargin: "-18% 0px -42% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-1/2 right-6 z-30 hidden -translate-y-1/2 lg:block" aria-label="Onderdelen">
      <ol className="flex flex-col gap-3">
        {RAIL.map((item, index) => {
          const active = section === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-label={item.label}
                className={`flex items-center justify-end gap-3 font-mono text-xs tracking-widest uppercase ${active ? "text-brass" : "text-mute"}`}
              >
                {active ? <span>{item.label}</span> : null}
                <span>{String(index + 1).padStart(2, "0")}</span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function Hero({ onListen }: { onListen: () => void }) {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col justify-center pt-24 pb-8">
      <div id="hero-sax" className="pointer-events-none absolute top-[16%] right-[6%] hidden h-72 w-32 text-brass/30 lg:block">
        <SaxMark className="h-full w-full" />
      </div>
      <div className="wrap relative flex flex-1 flex-col">
        <div className="grid items-center gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="vertical-label absolute top-8 left-0 hidden font-mono text-xs tracking-widest text-mute lg:block">
              Rotterdam — Codarts
            </p>
            <p className="kicker mb-6 lg:pl-10">01 — Het geluid van Rotterdam</p>
            <h1 className="display lg:pl-10">
              <span className="block">Adem.</span>
              <span className="block pl-6 md:pl-14">Koper.</span>
              <span className="block pl-8 text-brass italic md:pl-14">Ziel.</span>
            </h1>
            <p className="mt-8 font-serif text-3xl tracking-tight md:text-5xl lg:pl-10">Daan Roosenbrand</p>
            <p className="mt-5 max-w-md text-base leading-relaxed text-mute md:text-lg lg:pl-10">
              Professioneel saxofonist, klarinettist, dirigent en docent. Geboren, getogen en gevormd in Rotterdam
              <span className="age">{DAAN_AGE}</span>
              jaar.
            </p>
          </div>
          <figure className="relative lg:col-span-5">
            <Corners />
            <div className="hero-frame bg-char">
              <img
                src="/photos/blue.jpg"
                alt="Daan Roosenbrand speelt saxofoon in blauw podiumlicht"
                className="crop-blue h-full w-full object-cover"
              />
              <span className="vignette pointer-events-none absolute inset-0" />
            </div>
            <figcaption className="mt-3 flex items-center justify-between font-mono text-xs tracking-widest text-mute uppercase">
              <span>Live</span>
              <span>Rotterdam</span>
            </figcaption>
          </figure>
        </div>
        <button
          type="button"
          data-cursor="LUISTER"
          onClick={onListen}
          className="group mt-10 flex w-full items-center gap-4 border-t border-b border-brass/30 py-5 text-left lg:mt-12"
        >
          <span className="kicker shrink-0">Luister</span>
          <span className="font-serif text-2xl transition-transform duration-300 group-hover:translate-x-2 md:text-4xl">Baker Street</span>
          <span className="ml-auto hidden text-sm text-mute sm:inline">Iconische saxofoon-solo · live</span>
          <span className="grid size-11 shrink-0 place-items-center rounded-full border border-brass text-brass">
            <Play className="size-4 translate-x-px" fill="currentColor" />
          </span>
        </button>
      </div>
    </section>
  );
}

function Corners() {
  return (
    <>
      <span className="corner corner-tl" />
      <span className="corner corner-tr" />
      <span className="corner corner-bl" />
      <span className="corner corner-br" />
    </>
  );
}

function Marquee() {
  return (
    <div className="marquee py-4" aria-hidden="true">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <span key={copy} className="flex items-center">
            {PHRASE.map((word) => (
              <span key={`${copy}-${word}`} className="flex items-center gap-5 px-5">
                <span className="font-serif text-2xl italic md:text-3xl">{word}</span>
                <span className="text-brass">·</span>
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

function Story() {
  const [chapter, setChapter] = useState(0);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-chapter]");
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!hit) return;
        const index = Number((hit.target as HTMLElement).dataset.chapter);
        if (!Number.isNaN(index)) setChapter(index);
      },
      { threshold: [0.45, 0.7], rootMargin: "-10% 0px -25% 0px" },
    );
    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="verhaal" className="py-24 md:py-32">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <p className="kicker mb-4">02 — Verhaal</p>
            <div className="relative">
              <Corners />
              <div className="ratio-portrait relative overflow-hidden bg-char">
                {CHAPTERS.map((item, index) => (
                  <img
                    key={item.image}
                    src={item.image}
                    alt={index === chapter ? item.alt : ""}
                    aria-hidden={index === chapter ? undefined : true}
                    className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${item.crop} ${index === chapter ? "opacity-100" : "opacity-0"}`}
                  />
                ))}
                <span className="vignette pointer-events-none absolute inset-0" />
              </div>
              <p className="mt-4 font-mono text-xs tracking-widest text-mute uppercase">
                {String(chapter + 1).padStart(2, "0")} / 03 · Rotterdam
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-20 lg:col-span-6 lg:col-start-7 lg:pt-16">
          <article data-chapter="0" className="chapter">
            <p className="kicker mb-5">De muzikant</p>
            <p data-ink className="text-xl leading-relaxed text-cream md:text-2xl">
              Daan Roosenbrand
              <span className="age">{DAAN_AGE}</span>
              is Rotterdammer. Afgestudeerd aan Codarts, saxofonist én klarinettist, met een voorliefde voor lichte muziek. Zijn carrière loopt door zalen, bigbands en clubs — niet langs één genre.
            </p>
          </article>
          <article data-chapter="1" className="chapter">
            <p className="kicker mb-5">Bands, podium, dj's</p>
            <p data-ink className="text-xl leading-relaxed text-cream md:text-2xl">
              Hij was gewaardeerd lid van de Dave Warmerdam Band, waar zijn toon scherper werd. Nu speelt hij bij de coverband IMPAKT uit Roosendaal en bij Night at the Jukebox. Met dj's staat hij op feesten, in clubs en op bedrijfsevents: de saxofoon in een andere kamer, even precies.
            </p>
          </article>
          <article data-chapter="2" className="chapter">
            <p className="kicker mb-5">Dirigent en docent</p>
            <p data-ink className="text-xl leading-relaxed text-cream md:text-2xl">
              Directie en lesgeven horen bij hetzelfde vak. Let's Swing Delft en JD's Big Band. Saxofoonles bij Excelsior Papendrecht — waar hij ook solist is — en sinds 2023 bij Gastels Fanfare. Privéles klarinet en saxofoon, en muziek op basisscholen. Plezier is het uitgangspunt.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

function Vault() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [activeId, setActiveId] = useState(VIDEOS[0].id);
  const [openId, setOpenId] = useState<string | null>(null);
  const shown = useMemo(() => VIDEOS.filter((video) => matches(video, filter)), [filter]);
  const active = shown.find((video) => video.id === activeId) ?? shown[0];

  useEffect(() => {
    const onOpen = (event: Event) => {
      const id = (event as CustomEvent<string>).detail;
      if (VIDEOS.some((video) => video.id === id)) setOpenId(id);
    };
    window.addEventListener("daan-open", onOpen);
    return () => window.removeEventListener("daan-open", onOpen);
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (openId) return;
      const tag = event.target instanceof HTMLElement ? event.target.tagName : "";
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
      const index = shown.findIndex((video) => video.id === active?.id);
      if (index < 0) return;
      const next = event.key === "ArrowRight" ? (index + 1) % shown.length : (index - 1 + shown.length) % shown.length;
      const item = shown[next];
      if (item) setActiveId(item.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active?.id, openId, shown]);

  const choose = (id: FilterId) => {
    setFilter(id);
    const next = VIDEOS.filter((video) => matches(video, id));
    if (!next.some((video) => video.id === activeId) && next[0]) setActiveId(next[0].id);
  };

  return (
    <section id="zaal" className="bg-char py-24 md:py-32">
      <div className="wrap">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker">03 — Live on stage & in session</p>
            <h2 className="display-md mt-3 italic">De luisterzaal</h2>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2" role="tablist" aria-label="Filter optredens">
            {FILTERS.map((item) => {
              const selected = filter === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => choose(item.id)}
                  className={`min-h-11 border-b py-2 font-mono text-xs tracking-widest uppercase ${selected ? "border-brass text-brass" : "border-transparent text-mute"}`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </div>

        {active ? (
          <div className="mt-12 grid items-end gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="kicker">{active.label}</p>
              <h3 className="mt-4 font-serif text-4xl leading-none md:text-5xl">{active.title}</h3>
              <p className="mt-5 max-w-sm text-mute">
                {String(shown.findIndex((video) => video.id === active.id) + 1).padStart(2, "0")} / {String(shown.length).padStart(2, "0")}
                <span className="hidden md:inline"> — pijltjes wisselen van stuk</span>
              </p>
              {active.href ? (
                <a
                  href={active.href}
                  target="_blank"
                  rel="noreferrer"
                  className="kicker mt-6 inline-flex min-h-11 items-center gap-2"
                >
                  Naar de band
                  <ArrowUpRight className="size-4" />
                </a>
              ) : null}
            </div>
            <button
              type="button"
              data-cursor="LUISTER"
              aria-label={`Speel ${active.title}`}
              onClick={() => setOpenId(active.id)}
              className="relative lg:col-span-7"
            >
              <Corners />
              <span className="relative block aspect-video overflow-hidden bg-pitch">
                <Thumb id={active.id} alt="" />
                <span className="vignette-soft absolute inset-0" />
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid size-20 place-items-center rounded-full border border-brass bg-pitch/50 text-brass">
                    <Play className="size-6 translate-x-0.5" fill="currentColor" />
                  </span>
                </span>
              </span>
            </button>
          </div>
        ) : null}

        <div className="mt-8 flex gap-3 overflow-x-auto pb-2">
          {shown.map((video, index) => {
            const selected = video.id === active?.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => setActiveId(video.id)}
                aria-current={selected ? "true" : undefined}
                aria-label={video.title}
                className={`w-40 shrink-0 text-left md:w-52 ${selected ? "opacity-100" : "opacity-55"}`}
              >
                <span className={`block aspect-video overflow-hidden border ${selected ? "border-brass" : "border-brass/20"}`}>
                  <Thumb id={video.id} alt="" />
                </span>
                <span className="mt-2 block font-mono text-xs tracking-widest text-mute">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>
      </div>
      {openId ? <Cinema id={openId} onClose={() => setOpenId(null)} /> : null}
    </section>
  );
}

function Thumb({ id, alt }: { id: string; alt: string }) {
  return (
    <img
      src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
      alt={alt}
      className="h-full w-full object-cover"
    />
  );
}

function Cinema({ id, onClose }: { id: string; onClose: () => void }) {
  const video = VIDEOS.find((item) => item.id === id);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeRef.current();
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="z-cinema fixed inset-0 flex flex-col bg-pitch/95" role="dialog" aria-modal="true" aria-label={video?.title ?? "Video"} onClick={onClose}>
      <div className="wrap flex items-center justify-between py-4">
        <p className="kicker">{video?.label}</p>
        <button type="button" onClick={onClose} className="kicker min-h-11 text-cream">
          Sluiten
        </button>
      </div>
      <div className="flex flex-1 items-center px-5 pb-10 md:px-10">
        <div className="screen" onClick={(event) => event.stopPropagation()}>
          <iframe
            className="h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={video?.title ?? "Optreden"}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function Bands() {
  return (
    <section id="bands" className="py-24 md:py-32">
      <div className="wrap">
        <p className="kicker">04 — Samen</p>
        <h2 className="display-md mt-3 max-w-3xl italic">Bands, projecten & samenwerkingen</h2>
        <div className="mt-12 border-b border-brass/25">
          {BANDS.map((band, index) => (
            <article key={band.name} className="group border-t border-brass/25 py-8">
              <div className="flex items-baseline justify-between gap-6">
                <h3 className="font-serif text-4xl transition-transform duration-300 group-hover:translate-x-3 md:text-6xl">
                  {band.name}
                </h3>
                <p className="kicker shrink-0">
                  {String(index + 1).padStart(2, "0")} · {band.status}
                </p>
              </div>
              <p className="mt-3 max-w-xl text-mute">{band.text}</p>
              {"href" in band && band.href ? (
                <a href={band.href} target="_blank" rel="noreferrer" className="kicker mt-4 inline-flex min-h-11 items-center gap-2">
                  nightatthejukebox.nl
                  <ArrowUpRight className="size-4" />
                </a>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Score() {
  return (
    <section id="directie" className="pb-24 md:pb-32">
      <div className="wrap">
        <p className="kicker">05 — Meesterschap</p>
        <h2 className="display-md mt-3 max-w-3xl italic">Directie, educatie & vak</h2>
        <p className="mt-5 max-w-xl text-mute">
          Kennis en passie delen, met het plezier in muziek als maat.
        </p>
        <div className="relative mt-14 pl-8">
          <div className="absolute top-0 bottom-0 left-0 w-px bg-brass/20" />
          <div id="score-line" className="absolute top-0 bottom-0 left-0 w-px origin-top bg-brass" />
          <ol className="space-y-11">
            {SCORE.map((item) => (
              <li key={item.title} className="grid gap-2 md:grid-cols-12">
                <p className="kicker md:col-span-4">{item.role}</p>
                <div className="md:col-span-8">
                  <h3 className="font-serif text-3xl md:text-4xl">{item.title}</h3>
                  <p className="mt-2 max-w-lg text-mute">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [topics, setTopics] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  const toggle = (topic: string) => {
    setTopics((current) => (current.includes(topic) ? current.filter((item) => item !== topic) : [...current, topic]));
  };

  return (
    <section id="contact" className="bg-char py-24 md:py-32">
      <div className="wrap grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="kicker">06 — Bericht</p>
          <h2 className="display-md mt-4 italic">Zullen we samen muziek maken?</h2>
          <p className="mt-5 max-w-sm text-mute">Kies een of meer onderwerpen. Daarna naam, contact en — als je wilt — een datum.</p>
          <img
            src="/photos/portrait.jpg"
            alt="Portret van Daan Roosenbrand"
            className="mt-8 h-40 w-40 border border-brass object-cover"
          />
        </div>
        <div className="lg:col-span-7">
          {sent ? (
            <div role="status" className="border-t border-brass/30 pt-8">
              <p className="display-md italic">Genoteerd.</p>
              <ul className="mt-6 space-y-2">
                {topics.map((topic) => (
                  <li key={topic} className="font-mono text-xs tracking-widest text-brass uppercase">
                    {topic}
                  </li>
                ))}
              </ul>
              <p className="mt-6 max-w-md text-mute">
                {name}, je bericht staat klaar. Daan neemt contact op via {contact}
                {date ? ` — datum ${date}` : ""}.
              </p>
              <button
                type="button"
                className="mt-8 min-h-11 border border-brass px-5 font-mono text-xs tracking-widest text-brass uppercase"
                onClick={() => setSent(false)}
              >
                Nieuw bericht
              </button>
            </div>
          ) : (
            <form
              className="space-y-8"
              noValidate
              onSubmit={(event) => {
                event.preventDefault();
                if (!name.trim() || !contact.trim()) {
                  setError("Naam en e-mail of telefoon zijn nodig.");
                  return;
                }
                if (topics.length === 0) {
                  setError("Kies minstens één onderwerp.");
                  return;
                }
                setError("");
                setSent(true);
              }}
            >
              <div className="flex flex-col gap-3">
                {TOPICS.map((topic) => {
                  const on = topics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      aria-pressed={on}
                      onClick={() => toggle(topic)}
                      className={`min-h-11 border px-4 py-3 text-left text-sm ${on ? "border-brass bg-brass text-pitch" : "border-brass/30 text-cream"}`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>
              <Field id="naam" label="Naam" value={name} onChange={setName} />
              <Field id="contactveld" label="E-mail of telefoon" value={contact} onChange={setContact} />
              <Field id="datum" label="Datum (optioneel)" value={date} onChange={setDate} />
              <Field id="bericht" label="Bericht" value={message} onChange={setMessage} multiline />
              {error ? (
                <p role="alert" className="text-sm text-brass">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                className="min-h-12 border border-brass px-8 font-mono text-xs tracking-widest text-brass uppercase transition-colors hover:bg-brass hover:text-pitch"
              >
                Verstuur bericht
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  multiline,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
}) {
  const [focus, setFocus] = useState(false);
  const lifted = focus || value.length > 0;
  const className = "w-full border-b border-brass/30 bg-transparent py-3 text-cream outline-none focus:border-brass";
  return (
    <div className="relative">
      <label htmlFor={id} className={`pointer-events-none absolute left-0 text-mute transition-all ${lifted ? "-top-3 text-xs text-brass" : "top-3"}`}>
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={4}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={`${className} resize-none`}
        />
      ) : (
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          className={className}
        />
      )}
    </div>
  );
}
