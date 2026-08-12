import type { ComponentType } from "react";

/**
 * Реестр секций страницы. Порядок = порядок секций архетипа (ARCHETYPES.md).
 * Компоненты сюда приходят из library/parametrized/<id>/ (golden) —
 * билдер их копирует, а не пишет заново. Своих секций не выдумывать.
 *
 * Пример заполнения:
 *   import Hero from "./Hero";
 *   import Services from "./Services";
 *   export const sections: SectionEntry[] = [
 *     { id: "hero", Component: Hero },
 *     { id: "services", Component: Services },
 *   ];
 */
import Hero from "./Hero";
import Quiz from "./Quiz";
import Pain from "./Pain";
import Author from "./Author";
import Program from "./Program";
import EvenIf from "./EvenIf";
import Gallery from "./Gallery";
import FAQ from "./FAQ";
import FormSection from "./FormSection";
import Footer from "./Footer";

export type SectionEntry = { id: string; Component: ComponentType };

export const sections: SectionEntry[] = [
  { id: "hero", Component: Hero },
  { id: "quiz", Component: Quiz },
  { id: "pain", Component: Pain },
  { id: "author", Component: Author },
  { id: "program", Component: Program },
  { id: "even-if", Component: EvenIf },
  { id: "gallery", Component: Gallery },
  { id: "faq", Component: FAQ },
  { id: "form", Component: FormSection },
  { id: "footer", Component: Footer },
];
