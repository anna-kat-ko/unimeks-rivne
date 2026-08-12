import { site } from "@/content/site";
import { Ribbon } from "@/components/ui/Ribbon";
import FloatingLayer from "@/components/FloatingLayer";

export default function Author() {
  const a = site.author;
  if (!a) return null;

  return (
    <section id="method" className="relative bg-(--color-bg) px-5 py-24 md:px-[4vw] md:py-36">
      <FloatingLayer
        items={[
          { src: "/floaters/scissors.webp", top: "78%", left: "88%", w: 150, depth: 0.3, rotate: 10 },
        ]}
      />
      <div className="mx-auto flex max-w-[1240px] flex-col gap-14 md:flex-row md:items-start md:gap-16">
        {/* фото + бейдж, паттерн AIMEE: пилюля-CTA рядом с фото автора */}
        <div data-rv className="relative mx-auto w-full max-w-[380px] md:mx-0 md:w-[40%]">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-(--color-surface)">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={a.photo} alt={a.name} loading="lazy" decoding="async" className="h-full w-full object-cover" />
          </div>
          <Ribbon className="absolute -top-3 -right-3 -rotate-6">
            ✓ Запатентовано
          </Ribbon>
        </div>

        <div className="flex-1">
          <p data-rv className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent-deep)">
            Методика, якій можна довіряти
          </p>
          <h2 data-rv className="display mb-5 max-w-[16ch] text-[clamp(28px,4.4vw,44px)] leading-[1.08] text-(--color-ink)">
            {a.name}
          </h2>
          <p data-rv className="mb-2 text-base text-(--color-ink-soft)">{a.role}</p>

          {a.credibility && (
            <p
              data-rv
              className="mb-6 max-w-[36ch] text-[clamp(19px,2.6vw,26px)] font-bold leading-snug text-(--color-accent-deep)"
            >
              {a.credibility}
            </p>
          )}

          <p data-rv className="mb-6 max-w-[54ch] text-(--color-ink-soft)">{a.note}</p>

          <ul data-rv className="mb-8 flex flex-col gap-2">
            {a.patents.map((p, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-(--color-ink)">
                <span aria-hidden className="mt-1 text-(--color-accent-deep)">✦</span>
                {p}
              </li>
            ))}
          </ul>

          {/* сравнение методик */}
          <div data-rv className="overflow-hidden rounded-2xl border border-(--color-ink)/10">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-(--color-surface) text-(--color-ink-soft)">
                  <th className="px-4 py-3 font-semibold">Методика</th>
                  <th className="px-4 py-3 font-semibold">Формул</th>
                  <th className="px-4 py-3 font-semibold">Що потрібно</th>
                </tr>
              </thead>
              <tbody>
                {a.table.map((row, i) => (
                  <tr
                    key={i}
                    className={
                      row.highlight
                        ? "bg-(--color-accent-soft) font-semibold text-(--color-ink)"
                        : "border-t border-(--color-ink)/8 text-(--color-ink-soft)"
                    }
                  >
                    <td className="px-4 py-3">{row.method}</td>
                    <td className="px-4 py-3">{row.formulas}</td>
                    <td className="px-4 py-3">{row.need}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {a.stats && (
            <div data-rv className="mt-8 grid grid-cols-3 gap-2 sm:gap-4">
              {a.stats.map((s, i) => (
                <div key={i}>
                  <div className="display text-nowrap text-[clamp(17px,5.2vw,30px)] text-(--color-accent-deep)">{s.value}</div>
                  <div className="text-xs text-(--color-ink-soft)">{s.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
