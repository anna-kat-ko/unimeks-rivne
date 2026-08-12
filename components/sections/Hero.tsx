"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "@/content/site";
import { Ribbon } from "@/components/ui/Ribbon";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const root = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const r = root.current;
    if (!r) return;

    const ctx = gsap.context(() => {
      // скролл-скраб только на десктопе: мобильные браузеры (особенно iOS Safari)
      // не декодируют кадры по одному currentTime без реального play() — там просто autoplay+loop.
      const video = document.querySelector<HTMLVideoElement>("[data-hero-video]");
      const isTouch = window.matchMedia("(pointer: coarse)").matches;
      if (video) {
        if (isTouch) {
          video.loop = true;
          // некоторые встроенные браузеры (Telegram/Instagram in-app webview) игнорируют
          // JSX-атрибут muted при программном play() — выставляем свойство явно перед вызовом.
          video.muted = true;
          video.defaultMuted = true;
          const tryPlay = () => video.play().catch(() => {});
          tryPlay();
          // если автоплей всё же заблокирован — доиграть по первому тапу пользователя.
          const resumeOnGesture = () => {
            tryPlay();
            document.removeEventListener("touchstart", resumeOnGesture);
            document.removeEventListener("click", resumeOnGesture);
          };
          document.addEventListener("touchstart", resumeOnGesture, { once: true, passive: true });
          document.addEventListener("click", resumeOnGesture, { once: true });
        } else {
          video.pause();
          const bindScrub = () => {
            ScrollTrigger.create({
              trigger: "[data-hero-viewport]",
              start: "top top",
              end: "bottom bottom",
              scrub: 0.4,
              onUpdate: (self) => {
                if (video.duration) video.currentTime = self.progress * video.duration;
              },
            });
          };
          if (video.readyState >= 1) bindScrub();
          else video.addEventListener("loadedmetadata", bindScrub, { once: true });
        }
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hero-line]",
        { yPercent: 115 },
        { yPercent: 0, duration: 0.9, stagger: 0.09 }
      )
        .fromTo(
          "[data-hero-sub]",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7 },
          "-=0.5"
        )
        .fromTo(
          "[data-hero-meta]",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero-cta]",
          { autoAlpha: 0, y: 10 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          "-=0.3"
        );

      // компаратор: ценники падают-перечёркиваются по одному, потом $0 разрастается и подавляет их масштабом
      const items = gsap.utils.toArray<HTMLElement>("[data-compare-item]");
      const strikes = gsap.utils.toArray<HTMLElement>("[data-compare-strike]");
      const priceEl = document.querySelector("[data-compare-price]");
      const resultEl = document.querySelector("[data-compare-result]");

      // вращение — часть класса (Tailwind rotate-*), GSAP его не трогает
      gsap.set(items, { autoAlpha: 0, y: 22 });
      gsap.set(strikes, { scaleX: 0 });
      gsap.set(resultEl, { autoAlpha: 0, y: 16 });
      gsap.set(priceEl, { scale: 0.55, transformOrigin: "0% 50%" });

      const compareTl = gsap.timeline({
        scrollTrigger: {
          trigger: "[data-compare]",
          start: "top 78%",
          end: "top 12%",
          scrub: 0.5,
        },
      });

      items.forEach((el, i) => {
        compareTl.to(
          el,
          { autoAlpha: 1, y: 0, duration: 0.35, ease: "none" },
          i * 0.16
        );
      });
      strikes.forEach((el, i) => {
        compareTl.to(
          el,
          { scaleX: 1, duration: 0.22, ease: "none" },
          i * 0.16 + 0.22
        );
      });
      compareTl
        .to(resultEl, { autoAlpha: 1, y: 0, duration: 0.3, ease: "none" }, "+=0.05")
        .to(priceEl, { scale: 1, duration: 0.55, ease: "none" }, "<");

      // лёгкий 3D-тилт стопки карточек по движению мыши (только десктоп, courtesy pointer:fine)
      const stage = document.querySelector<HTMLElement>("[data-compare-stage]");
      if (stage && window.matchMedia("(pointer: fine)").matches) {
        const onMove = (e: MouseEvent) => {
          const rect = stage.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          gsap.to(stage, {
            rotateY: px * 10,
            rotateX: -py * 8,
            duration: 0.6,
            ease: "power2.out",
            overwrite: "auto",
          });
        };
        const onLeave = () => {
          gsap.to(stage, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power3.out" });
        };
        stage.addEventListener("mousemove", onMove);
        stage.addEventListener("mouseleave", onLeave);
        return () => {
          stage.removeEventListener("mousemove", onMove);
          stage.removeEventListener("mouseleave", onLeave);
        };
      }
    }, r);

    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, []);

  const headingLines = site.hero.heading.split(" — ").filter(Boolean);
  const lines = headingLines.length > 1 ? headingLines : [site.hero.heading];

  return (
    <section ref={root} className="relative overflow-hidden bg-(--color-bg)">
      {/* одно видео на всю секцию */}
      <div data-hero-viewport className="relative w-full overflow-hidden">
        <div data-hero-bg className="absolute inset-0 scale-[1.12]">
          <video
            data-hero-video
            src="/hero-video.mp4"
            muted
            autoPlay
            playsInline
            // легаси-атрибут для старых iOS in-app webview (Telegram/Instagram)
            webkit-playsinline="true"
            preload="auto"
            className="h-full w-full object-cover"
          />
        </div>
        {/* лёгкое затемнение ровное по всей высоте для читаемости текста */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,.82) 0%, rgba(0,0,0,.45) 10%, rgba(20,14,12,.42) 22%, rgba(20,14,12,.38) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto flex h-[100svh] max-w-[760px] md:max-w-[1500px] flex-col items-center justify-end gap-5 px-5 pb-14 text-center md:px-[4vw] md:pb-20">
          <Ribbon className="rotate-[-3deg]">📍 Офлайн, {site.brand.city}</Ribbon>

          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/85">
            {site.brand.tagline}
          </p>

          <h1 className="display mx-auto text-balance text-[clamp(24px,4.6vw,50px)] leading-[1.1] text-white">
            {lines.map((line, i) => (
              <span key={i} className="block overflow-hidden">
                <span data-hero-line className="block md:text-nowrap">
                  {line}
                </span>
              </span>
            ))}
          </h1>

          <p
            data-hero-sub
            className="max-w-[52ch] text-pretty text-base leading-relaxed text-white/85 md:text-lg"
          >
            {site.hero.sub}
          </p>

          {site.hero.meta && (
            <div className="flex flex-wrap justify-center gap-3">
              {site.hero.meta.map((m) => (
                <div
                  key={m.label}
                  data-hero-meta
                  className="flex items-baseline gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-sm"
                >
                  <span className="display text-lg text-white">{m.value}</span>
                  <span className="text-xs uppercase tracking-wide text-white/75">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {site.hero.eventDetails && (
            <div className="flex flex-wrap justify-center gap-3">
              <div data-hero-meta className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
                <span aria-hidden>📍</span>
                {site.hero.eventDetails.address}
              </div>
              <div data-hero-meta className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
                <span aria-hidden>📅</span>
                {site.hero.eventDetails.date}
              </div>
              <div data-hero-meta className="flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm text-white/90 backdrop-blur-sm">
                <span aria-hidden>🕐</span>
                {site.hero.eventDetails.time}
              </div>
            </div>
          )}

          <a
            data-hero-cta
            href={site.hero.cta.href}
            className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-(--color-accent-deep) px-7 py-4 text-sm font-semibold text-(--color-accent-ink) no-underline shadow-[0_10px_30px_-8px_rgba(0,0,0,0.45)] transition-transform duration-200 hover:-translate-y-0.5"
          >
            {site.hero.cta.label}
            <span aria-hidden>→</span>
          </a>
        </div>

        {/* компаратор сидит поверх того же видео, без второго <video> */}
        <div className="relative z-10 mx-auto flex max-w-[1240px] flex-col gap-14 px-5 pt-4 pb-14 md:gap-20 md:px-[4vw] md:pt-8 md:pb-20">
        {/* компаратор цены: брошенные ценники (мелко, вразнобой) vs один гигантский $0 — масштаб сам несёт сообщение */}
        {site.hero.compare && (
          <div id="compare-anchor" data-compare className="flex flex-col gap-10 md:mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/85">
              Стільки коштує така посадка на замовлення
            </p>

            <div
              data-compare-stage
              className="relative flex flex-col gap-14 [perspective:1400px] md:flex-row md:items-center md:justify-between md:gap-6"
            >
              {/* брошенные ценники: мелкие, вразнобой, перечёркнуты */}
              <div className="relative flex flex-wrap gap-x-7 gap-y-9 md:w-[38%] md:flex-col md:gap-7">
                {site.hero.compare.items.map((item, i) => {
                  const rotations = ["-rotate-[7deg]", "rotate-[4deg]", "-rotate-[2deg]"];
                  return (
                    <div
                      key={item.label + i}
                      data-compare-item
                      className={`relative w-fit ${rotations[i % rotations.length]}`}
                    >
                      <div
                        className="flex flex-col gap-1 bg-(--color-surface) py-3 pr-4 pl-6 text-(--color-ink-soft) shadow-[0_8px_20px_-10px_rgba(32,26,22,0.25)]"
                        style={{
                          clipPath:
                            "polygon(14px 0%, 100% 0%, 100% 100%, 14px 100%, 0% 50%)",
                        }}
                      >
                        <span
                          aria-hidden
                          className="absolute top-1/2 left-[7px] h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-(--color-bg)"
                        />
                        <span className="max-w-[16ch] text-[11px] leading-tight">
                          {item.label}
                        </span>
                        <span className="relative w-fit">
                          <span className="display text-xl text-(--color-ink)">
                            {item.price}
                          </span>
                          <span
                            data-compare-strike
                            className="absolute top-1/2 left-0 h-[2px] w-full origin-left -translate-y-1/2 bg-(--color-accent)"
                          />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* результат: один доминирующий по масштабу, своя подложка — видео не мешает читать */}
              <div
                data-compare-result
                className="flex flex-col items-start gap-1 rounded-[28px] bg-(--color-bg)/80 px-6 py-6 backdrop-blur-md md:w-[56%] md:px-8 md:py-8"
              >
                <span className="text-xs uppercase tracking-wide text-(--color-ink-soft)">
                  З майстер-класу УніМеКС
                </span>
                <span
                  data-compare-price
                  className="display leading-[0.82] text-(--color-accent-deep) text-[clamp(88px,16vw,196px)]"
                >
                  {site.hero.compare.resultPrice}
                </span>
                <span className="display text-2xl text-(--color-ink) md:text-3xl">
                  {site.hero.compare.resultLabel}
                </span>
              </div>
            </div>
          </div>
        )}
        </div>
      </div>
    </section>
  );
}
