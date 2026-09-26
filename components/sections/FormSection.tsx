"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { PillButton, Ribbon } from "@/components/ui/Ribbon";
import FloatingLayer from "@/components/FloatingLayer";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

type Status = "idle" | "loading" | "success" | "error";

const REGISTRATION_ENDPOINT = "https://unimeks-registration-rivne.provizgotocan.workers.dev";

// Telegram-бот запису: заявка дублюється туди, щоб бот одразу знав ім'я й телефон
const BOT_LEAD_ENDPOINT = "https://unimex-bot.vercel.app/api/lead";
const BOT_SITE_CODE = "s5"; // код цього сайту у вкладці «Сайты» таблиці бота
const BOT_FALLBACK_LINK = `https://t.me/Unimex_assistant_bot?start=${BOT_SITE_CODE}`;
const REDIRECT_SECONDS = 4;

async function sendToBot(payload: Record<string, string>): Promise<string> {
  try {
    const res = await fetch(BOT_LEAD_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...payload, site: BOT_SITE_CODE, city: "Рівне" }),
    });
    const data = await res.json();
    return data?.ok && data.link ? data.link : BOT_FALLBACK_LINK;
  } catch {
    return BOT_FALLBACK_LINK; // бот недоступний — все одно ведемо в Telegram, там спитають контакт
  }
}

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"] as const;
const UTM_STORAGE_KEY = "unimeks_utm";

function readStoredUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function FormSection() {
  const counter = site.formCounter;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [botLink, setBotLink] = useState(BOT_FALLBACK_LINK);
  const [secondsLeft, setSecondsLeft] = useState(REDIRECT_SECONDS);

  // Після успішної заявки — відлік і автоматичний перехід у Telegram
  useEffect(() => {
    if (status !== "success") return;
    if (secondsLeft <= 0) {
      window.location.href = botLink;
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [status, secondsLeft, botLink]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) utm[key] = value.slice(0, 150);
    });
    if (Object.keys(utm).length > 0) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
    }
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const payload = { name, phone, ...readStoredUtm() };
      const botPromise = sendToBot(payload);
      const res = await fetch(REGISTRATION_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) {
        setErrorMessage(
          data?.error === "validation"
            ? "Перевір ім'я та формат телефону (+380XXXXXXXXX або 0XXXXXXXXX)."
            : "Не вдалося надіслати. Спробуй ще раз або напиши нам напряму."
        );
        setStatus("error");
        return;
      }
      window.fbq?.("track", "Lead");
      setBotLink(await botPromise);
      setSecondsLeft(REDIRECT_SECONDS);
      setStatus("success");
      setName("");
      setPhone("");
    } catch {
      setErrorMessage("Не вдалося надіслати. Спробуй ще раз або напиши нам напряму.");
      setStatus("error");
    }
  }

  return (
    <section id="form" className="relative bg-(--color-surface) px-5 py-24 md:px-[4vw] md:py-36">
      <FloatingLayer
        items={[
          { src: "/floaters/fabric-stack.webp", top: "2%", left: "6%", w: 150, depth: 0.4, rotate: 6 },
          { src: "/floaters/patterns.webp", top: "70%", left: "84%", w: 160, depth: 0.3, rotate: -5 },
        ]}
      />
      <div className="mx-auto max-w-[640px] text-center">
        {counter && (
          <div data-rv className="mb-6 flex justify-center">
            <Ribbon className="rotate-0">
              Залишилось {counter.left} з {counter.total} місць
            </Ribbon>
          </div>
        )}

        <h2 data-rv className="display mb-4 text-[clamp(28px,4.6vw,46px)] leading-[1.06] text-(--color-ink)">
          Забронюй місце на майстер-класі в Рівному
        </h2>
        <p data-rv className="mb-8 text-(--color-ink-soft)">{site.hero.sub}</p>

        <div data-rv className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <PillButton href="#quiz" variant="outline">
            Не впевнена, чи підійде мені → тест 30 сек
          </PillButton>
        </div>

        {status === "success" ? (
          <div
            data-rv
            className="mx-auto max-w-[420px] rounded-[28px] bg-(--color-bg) p-8 text-(--color-ink)"
          >
            <p className="display mb-2 text-xl">Дякуємо! Заявку прийнято</p>
            <p className="mb-5 text-sm text-(--color-ink-soft)">
              Запрошення з датою, адресою та схемою проходу надішлемо в Telegram.
            </p>
            <p className="mb-1 text-sm font-semibold">🎁 Подарунок для тебе</p>
            <p className="mb-5 text-sm text-(--color-ink-soft)">
              Безкоштовний відеоурок «Конструювання брюк за 10 хвилин» за методом «УніМеКС».
              Натисни «Старт» у боті — урок одразу прийде в чат.
            </p>
            <a
              href={botLink}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-(--color-accent-deep) px-6 py-4 text-sm font-semibold text-(--color-accent-ink) shadow-[0_10px_26px_-10px_rgba(201,116,143,0.6)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              Отримати урок і запрошення в Telegram
            </a>
            <p className="mt-3 text-xs text-(--color-ink-soft)">
              {secondsLeft > 0
                ? `Автоматично відкриємо Telegram через ${secondsLeft} с…`
                : "Відкриваємо Telegram…"}
            </p>
          </div>
        ) : (
          <form
            data-rv
            onSubmit={handleSubmit}
            className="mx-auto flex max-w-[420px] flex-col gap-3 rounded-[28px] bg-(--color-bg) p-6 md:p-8"
          >
            <label htmlFor="hero-form-name" className="sr-only">
              Ім&apos;я
            </label>
            <input
              id="hero-form-name"
              name="name"
              type="text"
              autoComplete="given-name"
              placeholder="Ім&apos;я"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="rounded-full border border-(--color-ink)/12 bg-transparent px-5 py-3.5 text-sm text-(--color-ink) outline-none placeholder:text-(--color-ink-soft) focus:border-(--color-accent-deep)"
            />
            <label htmlFor="hero-form-phone" className="sr-only">
              Телефон
            </label>
            <input
              id="hero-form-phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              placeholder="Телефон"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="rounded-full border border-(--color-ink)/12 bg-transparent px-5 py-3.5 text-sm text-(--color-ink) outline-none placeholder:text-(--color-ink-soft) focus:border-(--color-accent-deep)"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-1 inline-flex items-center justify-center gap-2 rounded-full bg-(--color-accent-deep) px-6 py-4 text-sm font-semibold text-(--color-accent-ink) shadow-[0_10px_26px_-10px_rgba(201,116,143,0.6)] transition-transform duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {status === "loading" ? "Надсилаємо…" : site.cta.label}
            </button>
            {status === "error" && (
              <p className="mt-1 text-xs text-red-600">{errorMessage}</p>
            )}
            {counter?.note && (
              <p className="mt-1 text-xs text-(--color-ink-soft)">{counter.note}</p>
            )}
          </form>
        )}
      </div>
    </section>
  );
}
