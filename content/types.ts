/**
 * Типы данных лендинга. Компоненты секций читают ТОЛЬКО отсюда (через content/site.ts):
 * ни одного текста, цены, имени или пути к картинке внутри компонента.
 * Поэтому смена клиента = правка site.ts + токенов в globals.css, а не вёрстки.
 */

export type Cta = {
  label: string;
  href: string; // tel:, https://wa.me/, https://t.me/, https://instagram.com/, #form
};

export type NavItem = { label: string; href: string };

export type Service = {
  name: string;
  description?: string;
  price?: string; // «от 800 ₴», «1200 ₴» — строкой, как говорит владелец
  duration?: string;
};

export type GalleryItem = {
  src: string; // /gallery/01.jpg — только локальные ассеты
  alt: string;
  tag?: string;
};

export type Review = {
  author: string;
  text: string;
  source?: string; // Google, Instagram
  photo?: string;
};

export type CaseItem = {
  title: string;
  client?: string;
  result: string; // цифра или факт, без «улучшили процессы»
  image?: string;
  href?: string;
};

export type Person = {
  name: string;
  role: string;
  photo: string;
  note?: string;
};

export type SiteContent = {
  lang: string; // uk | ru | en
  archetype: "A" | "B" | "C" | "D" | "E" | "F"; // см. ARCHETYPES.md
  patternId: string; // id паттерна библиотеки, из которого собран сайт

  brand: {
    name: string;
    tagline: string; // одна строка: что это и для кого
    city?: string;
    logo?: string;
  };

  nav: NavItem[]; // подписи нативные под нишу, НЕ перевод ярлыков шаблона

  hero: {
    heading: string; // продаёт бизнес, не «hi, i'm …»
    sub?: string;
    media?: string; // вырез без фона для магнит/плавающего героя
    poster?: string;
    video?: string;
    cta: Cta;
    ctaSecondary?: Cta;
    meta?: { label: string; value: string }[]; // короткие факты хиро (мерки, длительность, формулы)
    eventDetails?: { address: string; date: string; time: string };
    /** сравнение цены: дизайнерский аналог за деньги vs наш результат бесплатно */
    compare?: {
      items: { label: string; price: string; image?: string }[];
      resultPrice: string; // «$0»
      resultLabel: string; // что получает человек вместо покупной вещи
    };
  };

  services?: Service[];
  gallery?: GalleryItem[];
  cases?: CaseItem[];
  reviews?: Review[];
  team?: Person[];

  pain?: string[];

  author?: {
    name: string;
    role: string;
    photo: string;
    patents: string[];
    note: string;
    credibility?: string; // сильный акцент: статус/масштаб/стаж школи
    table: { method: string; formulas: string; need: string; highlight?: boolean }[];
    stats?: { value: string; label: string }[];
  };

  program?: { time?: string; title: string }[];
  programNote?: string;

  evenIf?: string[];

  audience?: string[];

  quiz?: {
    eyebrow: string;
    heading: string;
    sub: string;
    startCta: string;
    painQuestion: { title: string; options: string[] };
    figureQuestion: { title: string; options: string[] };
    experienceQuestion: { title: string; options: string[] };
    result: { badge: string; heading: string; body: string; cta: Cta };
  };

  faq?: { q: string; a: string }[];

  formCounter?: { total: number; left: number; note: string };

  contacts?: {
    phone?: string;
    messengers?: Cta[];
    social?: { platform: "youtube" | "instagram" | "facebook"; href: string }[];
    address?: string;
    hours?: string;
    mapEmbed?: string;
  };

  cta: Cta; // первичное действие архетипа, дублируется по странице

  seo: {
    title: string;
    description: string;
  };

  // schema.org: LocalBusiness | ProfessionalService | Product | Event | Person
  schema: Record<string, unknown>;
};
