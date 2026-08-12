"use client";

import { useState } from "react";
import { site } from "@/content/site";
import { Flower } from "@/components/ui/Ribbon";

type Step = "intro" | "pain" | "figure" | "experience" | "result";

const STEP_ORDER: Step[] = ["intro", "pain", "figure", "experience", "result"];

export default function Quiz() {
  const q = site.quiz;
  const [step, setStep] = useState<Step>("intro");
  const [pains, setPains] = useState<number[]>([]);

  if (!q) return null;

  const stepIndex = STEP_ORDER.indexOf(step);
  const progress = step === "intro" ? 0 : step === "result" ? 100 : (stepIndex / 3) * 100;

  const togglePain = (i: number) => {
    setPains((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));
  };

  const optionClass =
    "rounded-2xl border border-white/15 px-5 py-4 text-left text-sm leading-snug text-white/80 transition hover:border-white/40 hover:text-white";

  return (
    <section id="quiz" className="relative overflow-hidden bg-(--color-ink) px-5 py-24 md:px-[4vw] md:py-32">
      <Flower className="pointer-events-none absolute -top-8 left-8 h-28 w-28 text-white/10" />

      <div className="relative mx-auto max-w-[640px]">
        {step !== "intro" && (
          <div className="mb-10 h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-(--color-accent-deep) transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        {step === "intro" && (
          <div data-rv className="text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent)">
              {q.eyebrow}
            </p>
            <h2 className="display mb-4 text-[clamp(28px,4.4vw,44px)] leading-[1.08] text-white">
              {q.heading}
            </h2>
            <p className="mb-8 text-white/70">{q.sub}</p>
            <button
              type="button"
              onClick={() => setStep("pain")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-(--color-accent-deep) px-7 py-4 text-sm font-semibold text-(--color-accent-ink) transition-transform duration-200 hover:-translate-y-0.5"
            >
              {q.startCta} <span aria-hidden>→</span>
            </button>
          </div>
        )}

        {step === "pain" && (
          <div data-rv>
            <p className="mb-1 text-xs uppercase tracking-wide text-white/50">Запитання 1/3</p>
            <h3 className="display mb-6 text-[clamp(22px,3vw,30px)] leading-tight text-white">
              {q.painQuestion.title}
            </h3>
            <div className="mb-8 flex flex-col gap-3">
              {q.painQuestion.options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => togglePain(i)}
                  aria-pressed={pains.includes(i)}
                  className={`${optionClass} ${
                    pains.includes(i) ? "border-(--color-accent-deep) bg-(--color-accent-deep)/20 text-white" : ""
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            <button
              type="button"
              disabled={pains.length === 0}
              onClick={() => setStep("figure")}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-accent-deep) px-7 py-4 text-sm font-semibold text-(--color-accent-ink) transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:translate-y-0"
            >
              Далі <span aria-hidden>→</span>
            </button>
          </div>
        )}

        {step === "figure" && (
          <div data-rv>
            <p className="mb-1 text-xs uppercase tracking-wide text-white/50">Запитання 2/3</p>
            <h3 className="display mb-6 text-[clamp(22px,3vw,30px)] leading-tight text-white">
              {q.figureQuestion.title}
            </h3>
            <div className="flex flex-col gap-3">
              {q.figureQuestion.options.map((opt, i) => (
                <button key={i} type="button" onClick={() => setStep("experience")} className={optionClass}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "experience" && (
          <div data-rv>
            <p className="mb-1 text-xs uppercase tracking-wide text-white/50">Запитання 3/3</p>
            <h3 className="display mb-6 text-[clamp(22px,3vw,30px)] leading-tight text-white">
              {q.experienceQuestion.title}
            </h3>
            <div className="flex flex-col gap-3">
              {q.experienceQuestion.options.map((opt, i) => (
                <button key={i} type="button" onClick={() => setStep("result")} className={optionClass}>
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === "result" && (
          <div data-rv className="text-center">
            <span className="mb-5 inline-block rounded-full bg-(--color-accent-deep) px-4 py-1.5 text-[11px] font-bold uppercase tracking-wide text-(--color-accent-ink)">
              🟢 {q.result.badge}
            </span>
            <h3 className="display mb-4 text-[clamp(26px,4vw,38px)] leading-[1.1] text-white">
              {q.result.heading}
            </h3>
            <p className="mx-auto mb-8 max-w-[48ch] text-white/75">{q.result.body}</p>
            <a
              href={q.result.cta.href}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-(--color-accent-deep) px-7 py-4 text-sm font-semibold text-(--color-accent-ink) no-underline transition-transform duration-200 hover:-translate-y-0.5"
            >
              {q.result.cta.label} <span aria-hidden>→</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
