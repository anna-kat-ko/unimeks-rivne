"use client";

import { useState } from "react";
import { site } from "@/content/site";

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  if (!site.faq?.length) return null;

  return (
    <section className="bg-(--color-bg) px-5 py-24 md:px-[4vw] md:py-36">
      <div className="mx-auto max-w-[760px]">
        <p data-rv className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent-deep)">
          Питання
        </p>
        <h2 data-rv className="display mb-10 text-[clamp(28px,4.4vw,44px)] leading-[1.08] text-(--color-ink)">
          Те, що часто питають
        </h2>

        <div className="flex flex-col gap-3">
          {site.faq.map((item, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                data-rv
                data-d={String(i * 0.06)}
                className="overflow-hidden rounded-2xl bg-(--color-surface)"
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-[15px] font-medium text-(--color-ink)"
                  aria-expanded={isOpen}
                >
                  {item.q}
                  <span
                    aria-hidden
                    className={`shrink-0 text-lg text-(--color-accent-deep) transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 text-sm leading-relaxed text-(--color-ink-soft)">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
