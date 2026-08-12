import { site } from "@/content/site";

const SOCIAL_ICON: Record<string, React.ReactNode> = {
  youtube: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.6 31.6 0 0 0 0 12a31.6 31.6 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.6 31.6 0 0 0 24 12a31.6 31.6 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12l-6.2 3.5Z" />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .3 2.4.5a4.9 4.9 0 0 1 1.8 1.2 4.9 4.9 0 0 1 1.2 1.8c.2.4.4 1.2.5 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 2-.5 2.4a4.9 4.9 0 0 1-1.2 1.8 4.9 4.9 0 0 1-1.8 1.2c-.4.2-1.2.4-2.4.5-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.3-2.4-.5a4.9 4.9 0 0 1-1.8-1.2 4.9 4.9 0 0 1-1.2-1.8c-.2-.4-.4-1.2-.5-2.4-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.3-2 .5-2.4a4.9 4.9 0 0 1 1.2-1.8 4.9 4.9 0 0 1 1.8-1.2c.4-.2 1.2-.4 2.4-.5C8.4 2.2 8.8 2.2 12 2.2Zm0 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10Zm0 8.2a3.2 3.2 0 1 1 0-6.4 3.2 3.2 0 0 1 0 6.4Zm5.2-8.4a1.2 1.2 0 1 1-2.3 0 1.2 1.2 0 0 1 2.3 0Z" />
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden>
      <path d="M13.5 21.9v-8.4h2.8l.4-3.3h-3.2V8c0-1 .3-1.6 1.7-1.6h1.6V3.4c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.7H7.4v3.3h2.9v8.4h3.2Z" />
    </svg>
  ),
};

export default function Footer() {
  const c = site.contacts;
  return (
    <footer className="border-t border-(--color-ink)/8 bg-(--color-bg) px-5 py-10 text-center md:px-[4vw]">
      <p className="display text-lg text-(--color-ink)">{site.brand.name}</p>
      <p className="mt-2 text-xs text-(--color-ink-soft)">
        {site.brand.tagline} · {site.brand.city}
      </p>

      {c?.address && (
        <p className="mt-4 text-sm text-(--color-ink-soft)">{c.address}</p>
      )}

      {c?.mapEmbed && (
        <a
          href={c.mapEmbed}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-sm font-semibold text-(--color-accent-deep) underline underline-offset-2"
        >
          Як знайти
        </a>
      )}

      {c?.social && c.social.length > 0 && (
        <div className="mt-6 flex justify-center gap-4">
          {c.social.map((s) => (
            <a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.platform}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-(--color-ink)/15 text-(--color-ink) transition hover:border-(--color-accent-deep) hover:text-(--color-accent-deep)"
            >
              {SOCIAL_ICON[s.platform]}
            </a>
          ))}
        </div>
      )}

      <div className="mx-auto mt-10 flex max-w-[1240px] flex-col items-center gap-4 border-t border-(--color-ink)/8 pt-6 sm:flex-row sm:justify-between">
        <div className="flex items-center gap-2.5 opacity-70">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-trademark.png" alt="УніМеКС" className="h-11 w-auto" />
          <span className="text-[11px] tracking-wide text-(--color-ink-soft)">Торгова марка</span>
        </div>

        <p className="text-xs text-(--color-ink-soft)">
          <a href="/polityka-konfidentsiinosti.html" className="underline underline-offset-2">
            Політика конфіденційності
          </a>
        </p>
      </div>
    </footer>
  );
}
