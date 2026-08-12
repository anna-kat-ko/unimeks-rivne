import { site } from "@/content/site";
import { Flower } from "@/components/ui/Ribbon";
import FloatingLayer from "@/components/FloatingLayer";

export default function Pain() {
  if (!site.pain?.length) return null;
  return (
    <section className="relative overflow-visible bg-(--color-surface) px-5 py-24 md:px-[4vw] md:py-36">
      <FloatingLayer
        items={[
          { src: "/floaters/flowers.webp", top: "-6%", left: "80%", w: 140, depth: 0.35, rotate: -6 },
          { src: "/floaters/patterns.webp", top: "70%", left: "3%", w: 150, depth: 0.5, rotate: 5 },
        ]}
      />
      <Flower className="absolute -top-4 right-6 h-20 w-20 text-(--color-accent) md:right-16" />
      <div className="mx-auto max-w-[1240px]">
        <p data-rv className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent-deep)">
          Знайомо?
        </p>
        <h2 data-rv className="display mb-12 max-w-[18ch] text-[clamp(28px,4.4vw,44px)] leading-[1.08] text-(--color-ink)">
          Впізнаєш себе хоча б в одному пункті?
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {site.pain.map((p, i) => (
            <div
              key={i}
              data-rv
              data-d={String(i * 0.08)}
              className={`rounded-[22px] border border-(--color-ink)/8 bg-(--color-bg) p-6 text-[15px] leading-relaxed text-(--color-ink) ${
                i === 0 ? "sm:col-span-2 sm:text-lg" : ""
              }`}
            >
              {p}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
