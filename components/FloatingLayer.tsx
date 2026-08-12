"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export type FloatItem = {
  src: string;
  top: string; // % внутри секции-родителя
  left: string;
  w: number; // px
  depth?: number; // 0.2 (медленно, дальше) – 0.7 (быстро, ближе)
  rotate?: number;
};

/**
 * Вырезанные предметы плавают СЛОЕМ НАД контентом секции (высокий z-index,
 * pointer-events:none — не мешает кликам). Без блюра — только чёткие пропы.
 * Вход: подъём+фейд при попадании в вьюпорт. Дальше — постоянный боб + лёгкий
 * скролл-параллакс. Секция-родитель должна быть position:relative.
 */
export default function FloatingLayer({ items }: { items: FloatItem[] }) {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const r = root.current;
    if (!r) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const els = gsap.utils.toArray<HTMLElement>("[data-float]", r);
    if (reduce) {
      gsap.set(els, { autoAlpha: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      els.forEach((el) => {
        const depth = parseFloat(el.dataset.depth || "0.4");
        const rotateBase = parseFloat(el.dataset.rotate || "0");
        gsap.set(el, { rotation: rotateBase });

        // вход: поднимается и проявляется, когда секция попадает в вьюпорт
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 60 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: r, start: "top 85%" },
          }
        );

        // постоянное покачивание вверх-вниз — не зависит от скролла, всегда видно, что живое
        gsap.to(el, {
          y: `+=${14 + depth * 16}`,
          duration: 3 + depth * 2.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          delay: 1 + Math.random() * 0.6,
        });

        // скролл-параллакс: слой едет со своей скоростью, глубина ≠ скорость соседей
        gsap.to(el, {
          yPercent: -22 * depth,
          ease: "none",
          scrollTrigger: {
            trigger: r,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      });
    }, r);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={root} className="pointer-events-none absolute inset-0 z-0 overflow-visible md:z-30">
      {items.map((it, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={i}
          data-float
          data-depth={it.depth ?? 0.4}
          data-rotate={it.rotate ?? 0}
          src={it.src}
          alt=""
          aria-hidden
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute",
            top: it.top,
            left: it.left,
            width: `clamp(${Math.round(it.w * 0.6)}px, ${(it.w / 390) * 55}vw, ${it.w}px)`,
            filter: "drop-shadow(0 18px 28px rgba(43,35,32,0.28))",
          }}
        />
      ))}
    </div>
  );
}
