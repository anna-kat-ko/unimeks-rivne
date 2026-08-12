"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";

export default function StickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.7);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-[calc(env(safe-area-inset-bottom)+12px)] pt-3 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={site.cta.href}
        className="pointer-events-auto inline-flex w-full max-w-[420px] items-center justify-center gap-2 rounded-full bg-(--color-accent-deep) px-6 py-4 text-sm font-semibold text-(--color-accent-ink) no-underline shadow-[0_10px_30px_-8px_rgba(0,0,0,0.5)] transition-transform duration-200 hover:-translate-y-0.5"
      >
        {site.cta.label}
        <span aria-hidden>→</span>
      </a>
    </div>
  );
}
