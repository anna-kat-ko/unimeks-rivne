import { site } from "@/content/site";

export default function Program() {
  if (!site.program?.length) return null;
  return (
    <section id="program" className="bg-(--color-surface) px-5 py-24 md:px-[4vw] md:py-36">
      <div className="mx-auto max-w-[860px]">
        <p data-rv className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent-deep)">
          Програма майстер-класу
        </p>
        <h2 data-rv className="display mb-12 text-[clamp(28px,4.4vw,44px)] leading-[1.08] text-(--color-ink)">
          Що відбудеться за 1,5 години
        </h2>

        <div className="relative flex flex-col gap-0">
          <div
            aria-hidden
            className="absolute top-2 bottom-2 left-[27px] w-px bg-(--color-accent)/30"
          />
          {site.program.map((step, i) => (
            <div key={i} data-rv data-d={String(i * 0.08)} className="relative flex gap-6 py-5">
              <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-(--color-bg) text-center ring-1 ring-(--color-accent)/30">
                <span className="display text-xl text-(--color-accent-deep)">{i + 1}</span>
              </div>
              <p className="pt-3 text-[15px] leading-relaxed text-(--color-ink) md:text-base">
                {step.title}
              </p>
            </div>
          ))}
        </div>

        {site.programNote && (
          <p data-rv className="mt-8 rounded-2xl bg-(--color-accent-soft)/60 p-5 text-sm leading-relaxed text-(--color-ink)">
            {site.programNote}
          </p>
        )}
      </div>
    </section>
  );
}
