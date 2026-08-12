"use client";

import { useRef } from "react";
import { site } from "@/content/site";
import { Flower } from "@/components/ui/Ribbon";
import FloatingLayer from "@/components/FloatingLayer";

export default function Gallery() {
  const track = useRef<HTMLDivElement | null>(null);
  if (!site.gallery?.length) return null;

  const scrollBy = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const step = (card?.offsetWidth || 280) + 20;
    el.scrollBy({ left: dir * step * 2, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-visible bg-(--color-surface) py-24 md:py-36">
      <FloatingLayer
        items={[
          { src: "/floaters/bust.webp", top: "72%", left: "2%", w: 130, depth: 0.55, rotate: 5 },
        ]}
      />
      <Flower className="absolute top-8 left-6 h-16 w-16 -rotate-12 text-(--color-accent) md:left-16" />

      <div className="mx-auto flex max-w-[1240px] items-end justify-between gap-6 px-5 md:px-[4vw]">
        <div>
          <p data-rv className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-(--color-accent-deep)">
            Це вже спрацювало
          </p>
          <h2 data-rv className="display max-w-[20ch] text-[clamp(28px,4.4vw,44px)] leading-[1.08] text-(--color-ink)">
            На різних фігурах
          </h2>
        </div>

        <div data-rv className="hidden shrink-0 gap-2 md:flex">
          <button
            aria-label="Назад"
            onClick={() => scrollBy(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-ink)/15 text-(--color-ink) transition hover:border-(--color-accent-deep) hover:text-(--color-accent-deep)"
          >
            ←
          </button>
          <button
            aria-label="Вперед"
            onClick={() => scrollBy(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-(--color-ink)/15 text-(--color-ink) transition hover:border-(--color-accent-deep) hover:text-(--color-accent-deep)"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={track}
        data-rv
        className="mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-5 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] md:px-[4vw] [&::-webkit-scrollbar]:hidden"
      >
        {site.gallery.map((g, i) => (
          <div
            key={i}
            data-card
            className="flex w-[62vw] shrink-0 snap-start flex-col gap-3 sm:w-[38vw] md:w-[26vw] lg:w-[300px]"
          >
            <div className="aspect-[3/4.6] overflow-hidden rounded-[22px] bg-(--color-bg)">
              {/* object-contain — фото студийные на кремовом фоне, целиком, не обрезая голову/ноги */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={g.src} alt={g.alt} loading="lazy" decoding="async" className="h-full w-full object-contain" />
            </div>
            {g.tag && <p className="text-sm text-(--color-ink-soft)">{g.tag}</p>}
          </div>
        ))}
        {/* хвост, чтобы последняя карточка не липла к краю */}
        <div className="w-px shrink-0" aria-hidden />
      </div>
    </section>
  );
}
