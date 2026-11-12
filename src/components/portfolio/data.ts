/** Pas alleen deze waarde aan om de leeftijd op de hele site te wijzigen. */
export const DAAN_AGE = "[XX]";

export type Tag = "solo" | "bands" | "codarts" | "excelsior";
export type FilterId = "all" | Tag;

export type Video = {
  id: string;
  title: string;
  label: string;
  tags: Tag[];
  href?: string;
};

export const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "Alles" },
  { id: "solo", label: "Solo & TV" },
  { id: "bands", label: "Bands & Ahoy" },
  { id: "codarts", label: "Codarts Pop Orchestra" },
  { id: "excelsior", label: "Excelsior Live" },
];

export const VIDEOS: Video[] = [
  {
    id: "kKDFos-CEd8",
    title: "Excelsior & Daan Roosenbrand — Baker Street",
    label: "Iconische saxofoon-solo",
    tags: ["solo", "excelsior"],
  },
  {
    id: "WLPDBI1BV6g",
    title: "Excelsior & Daan Roosenbrand — Against All Odds",
    label: "Live ballad-solo",
    tags: ["solo", "excelsior"],
  },
  {
    id: "WjrbjayKkLQ",
    title: "Nick Nicolai — It's A Man's World",
    label: "TV-optreden / sessie-saxofonist",
    tags: ["solo"],
  },
  {
    id: "Mf3JzKaa7D8",
    title: "Bracchus — Live in Rotterdam Ahoy",
    label: "Eurekaweek 2019 · groot podium",
    tags: ["bands"],
  },
  {
    id: "JUqgIJMsIZc",
    title: "Night at the Jukebox — Band showcase",
    label: "Huidige band",
    tags: ["bands"],
    href: "https://www.nightatthejukebox.nl/",
  },
  {
    id: "rpkXoRAOxDU",
    title: "Codarts Pop Orchestra — Licht en Donker",
    label: "Froukje · Codarts Rotterdam",
    tags: ["codarts"],
  },
  {
    id: "gVm_NMxlTmU",
    title: "Codarts Pop Orchestra — Hold Back",
    label: "Margi Sinniah · Codarts Rotterdam",
    tags: ["codarts"],
  },
  {
    id: "bGFwhE3EVrA",
    title: "Have Yourself a Merry Little Christmas",
    label: "Intieme sessie",
    tags: ["solo"],
  },
  {
    id: "22HLcpeJl3k",
    title: "Excelsior Papendrecht — Crooner's Serenade",
    label: "Uit het archief",
    tags: ["excelsior"],
  },
];

export const BANDS = [
  {
    name: "IMPAKT",
    status: "Huidig",
    text: "Coverband uit Roosendaal. High-energy liveshows, Daan als vast bandlid.",
  },
  {
    name: "Night at the Jukebox",
    status: "Huidig",
    text: "Huidige band. Avonden die tussen club en concertzaal in zitten.",
    href: "https://www.nightatthejukebox.nl/",
  },
  {
    name: "Sax & DJ",
    status: "Samen",
    text: "Live-improvisatie met dj's op feesten, in clubs en op bedrijfsevents.",
  },
  {
    name: "Dave Warmerdam Band",
    status: "Eerder",
    text: "Voormalig bandlid. Blues, jazz en soul — daar werd de toon scherper.",
  },
] as const;

export const SCORE = [
  {
    role: "Dirigent",
    title: "Let's Swing Delft",
    text: "Muzikaal leider en dirigent.",
  },
  {
    role: "Dirigent",
    title: "JD's Big Band",
    text: "Muzikaal leider en dirigent.",
  },
  {
    role: "Docent · heden",
    title: "Excelsior Papendrecht",
    text: "Saxofoondocent, en regelmatig solist.",
  },
  {
    role: "Docent · sinds 2023",
    title: "Gastels Fanfare",
    text: "Saxofoondocent.",
  },
  {
    role: "Docent · heden",
    title: "Lessen & basisscholen",
    text: "Privéles saxofoon en klarinet, en muziekles op basisscholen. Plezier staat voorop.",
  },
  {
    role: "Opleiding",
    title: "Codarts Rotterdam",
    text: "Conservatorium, lichte muziek.",
  },
  {
    role: "Eerder",
    title: "Ambachtse Muziekschool & de Rover",
    text: "Voormalig saxofoondocent.",
  },
] as const;

export const TOPICS = [
  "Live saxofonist / klarinettist / solo",
  "Sax & DJ boeking",
  "Bands (IMPAKT / Night at the Jukebox)",
  "Dirigent / bigband workshop",
  "Saxofoonles / basisschool educatie",
] as const;

export const RAIL = [
  { id: "top", label: "Geluid" },
  { id: "verhaal", label: "Verhaal" },
  { id: "zaal", label: "Zaal" },
  { id: "bands", label: "Bands" },
  { id: "directie", label: "Directie" },
  { id: "contact", label: "Boeken" },
] as const;

export const CHAPTERS = [
  {
    image: "/photos/close.jpg",
    crop: "crop-close",
    alt: "Close-up van Daan Roosenbrand met saxofoon in groen en rood podiumlicht",
  },
  {
    image: "/photos/orange.jpg",
    crop: "crop-orange",
    alt: "Daan Roosenbrand op het podium met saxofoon, een Fender-gitaar op de voorgrond",
  },
  {
    image: "/photos/purple.jpg",
    crop: "crop-purple",
    alt: "Daan Roosenbrand met saxofoon naast een zangeres op een verlicht podium",
  },
] as const;

export function matches(video: Video, filter: FilterId) {
  return filter === "all" || video.tags.includes(filter);
}
