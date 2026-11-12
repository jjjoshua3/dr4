import { createFileRoute } from "@tanstack/react-router";
import { Portfolio } from "@/components/portfolio/portfolio";
import { VIDEOS } from "@/components/portfolio/data";

const TITLE =
  "Daan Roosenbrand | Professioneel Saxofonist, Klarinettist, Docent & Dirigent (Rotterdam)";
const DESCRIPTION =
  "Op zoek naar een energieke saxofonist (solo of met DJ), klarinettist, bigband-dirigent of saxofoondocent in regio Rotterdam, Papendrecht, Delft en Roosendaal? Ontdek het portfolio van Codarts-alumnus Daan Roosenbrand.";
const CANONICAL = "https://www.daanroosenbrand.nl/";
const OG_IMAGE = "https://img.youtube.com/vi/kKDFos-CEd8/maxresdefault.jpg";

const AREA = ["Rotterdam", "Papendrecht", "Oud Gastel", "Roosendaal", "Delft", "Zuid-Holland", "Noord-Brabant"];

const KNOWN_DATES: Record<string, string> = {
  Mf3JzKaa7D8: "2019-08-01",
  "22HLcpeJl3k": "2015-01-01",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${CANONICAL}#daan`,
      name: "Daan Roosenbrand",
      jobTitle: "Saxofonist, Klarinettist, Muziekdocent & Dirigent",
      url: CANONICAL,
      image: OG_IMAGE,
      alumniOf: { "@type": "CollegeOrUniversity", name: "Codarts Rotterdam" },
      areaServed: AREA,
      memberOf: [
        { "@id": `${CANONICAL}#impakt` },
        { "@id": `${CANONICAL}#jukebox` },
        { "@id": `${CANONICAL}#lets-swing` },
        { "@id": `${CANONICAL}#jds` },
      ],
      worksFor: [
        { "@type": "Organization", name: "Muziekvereniging Excelsior Papendrecht" },
        { "@type": "Organization", name: "Gastels Fanfare" },
      ],
    },
    {
      "@type": "MusicGroup",
      "@id": `${CANONICAL}#impakt`,
      name: "Coverband IMPAKT",
      genre: "Cover",
      areaServed: "Roosendaal",
    },
    {
      "@type": "MusicGroup",
      "@id": `${CANONICAL}#jukebox`,
      name: "Night at the Jukebox",
      url: "https://www.nightatthejukebox.nl/",
    },
    {
      "@type": "MusicGroup",
      "@id": `${CANONICAL}#lets-swing`,
      name: "Let's Swing Delft",
      genre: "Bigband",
      areaServed: "Delft",
    },
    {
      "@type": "MusicGroup",
      "@id": `${CANONICAL}#jds`,
      name: "JD's Big Band",
      genre: "Bigband",
    },
    {
      "@type": ["LocalBusiness", "PerformingGroup"],
      "@id": `${CANONICAL}#praktijk`,
      name: "Daan Roosenbrand",
      description: DESCRIPTION,
      url: CANONICAL,
      image: OG_IMAGE,
      areaServed: AREA,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Rotterdam",
        addressRegion: "Zuid-Holland",
        addressCountry: "NL",
      },
      founder: { "@id": `${CANONICAL}#daan` },
    },
    ...VIDEOS.map((video) => ({
      "@type": "VideoObject",
      name: video.title,
      description: video.alt,
      thumbnailUrl: `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`,
      embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}`,
      contentUrl: `https://www.youtube.com/watch?v=${video.id}`,
      ...(KNOWN_DATES[video.id] ? { uploadDate: KNOWN_DATES[video.id] } : {}),
    })),
  ],
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "nl_NL" },
      { property: "og:url", content: CANONICAL },
      { property: "og:image", content: OG_IMAGE },
      { property: "og:image:alt", content: "Daan Roosenbrand speelt de saxofoonsolo van Baker Street" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
      { name: "twitter:image", content: OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(jsonLd) }],
  }),
  component: Home,
});

function Home() {
  return <Portfolio />;
}
