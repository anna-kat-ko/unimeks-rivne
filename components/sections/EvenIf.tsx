import { site } from "@/content/site";

export default function EvenIf() {
  if (!site.evenIf?.length && !site.audience?.length) return null;
  return (
    <section className="bg-(--color-bg) px-5 py-24 md:px-[4vw] md:py-36">
      <div className="mx-auto grid max-w-[1240px] gap-14 md:grid-cols-2 md:gap-16">
        {site.evenIf && site.evenIf.length > 0 && (
          <div>
            <p data-rv className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent-deep)">
              На всяк випадок
            </p>
            <h2 data-rv className="display mb-8 text-[clamp(26px,3.6vw,36px)] leading-[1.1] text-(--color-ink)">
              Навіть якщо…
            </h2>
            <ul className="flex flex-col gap-4">
              {site.evenIf.map((t, i) => (
                <li key={i} data-rv data-d={String(i * 0.08)} className="flex items-start gap-3 text-[15px] text-(--color-ink-soft)">
                  <span aria-hidden className="mt-0.5 text-(--color-accent-deep)">—</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {site.audience && site.audience.length > 0 && (
          <div>
            <p data-rv className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent-deep)">
              Для кого це
            </p>
            <h2 data-rv className="display mb-8 text-[clamp(26px,3.6vw,36px)] leading-[1.1] text-(--color-ink)">
              Кому підійде цей майстер-клас
            </h2>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {site.audience.map((t, i) => (
                <li
                  key={i}
                  data-rv
                  data-d={String(i * 0.08)}
                  className="rounded-2xl bg-(--color-surface) p-4 text-sm text-(--color-ink)"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
