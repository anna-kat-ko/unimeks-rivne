"use client";

/**
 * Плавный скролл Lenis + связка с GSAP ScrollTrigger.
 * Проверенная связка (тот же паттерн, что в lono-next). Не переписывать:
 * ScrollTrigger должен обновляться из Lenis, иначе пины и скрабы разъезжаются.
 */
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // на тач-устройствах отдаём нативный скролл — так меньше рывков
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    let lenis: Lenis | null = null;
    let raf: ((t: number) => void) | null = null;

    if (!isTouch) {
      lenis = new Lenis({ lerp: 0.08 });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // глобальный каскадный ревил для любых секций: <div data-rv data-d="0.1">
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-rv]").forEach((el) => {
        gsap.fromTo(
          el,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: parseFloat(el.dataset.d || "0"),
            scrollTrigger: { trigger: el, start: "top 86%" },
          }
        );
      });
    });

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}
