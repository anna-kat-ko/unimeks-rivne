/**
 * Блок автора демо. ОБЯЗАТЕЛЕН на каждом сгенерированном демо-сайте (PRODUCT.md).
 * Это единственное место, где демо монетизируется: владелец бизнеса узнаёт свой
 * салон на своих фото и жмёт кнопку → попадает в бота → Свете падает лид.
 *
 * Два элемента:
 *   AuthorRibbon — компактная пилюля в углу, видна всегда;
 *   AuthorOutro  — финальный блок в конце страницы.
 *
 * ВАЖНО ПО ВЁРСТКЕ:
 * 1) Пилюля висит в ПРАВОМ НИЖНЕМ углу, а не полосой снизу: у локальных услуг
 *    (архетип A) внизу почти всегда своя фикс-кнопка «Записаться» — полоса бы с ней
 *    столкнулась. Отступ снизу увеличен, чтобы не наезжать на такую кнопку.
 * 2) Стиль НЕЙТРАЛЬНЫЙ (графит/белый), НЕ в палитре клиента — блок должен читаться
 *    как сообщение от автора, а не как часть сайта клиента. Не перекрашивать в акцент.
 * 3) Монтируется в layout ВНЕ <main> — чтобы не попадать в реестр секций и в подсчёт
 *    движения у engine/audit.py (иначе даст ложный «эффект»).
 * 4) ЯЗЫК берётся из site.lang (как говорит сам бизнес), не зашит. См. content/author.ts.
 */
import { author, authorCopy, authorName, authorHref } from "@/content/author";

export function AuthorRibbon() {
  if (!author.demo) return null;

  const copy = authorCopy();

  return (
    <a
      href={authorHref()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={copy.ribbon}
      className={[
        "fixed right-4 bottom-24 z-[60] md:bottom-6",
        "inline-flex items-center gap-2 rounded-full",
        "bg-[#141414]/90 px-4 py-2.5 backdrop-blur",
        "text-[13px] font-medium text-white no-underline",
        "shadow-[0_6px_24px_rgba(0,0,0,.35)] ring-1 ring-white/15",
        "transition-transform duration-200 hover:-translate-y-0.5",
      ].join(" ")}
    >
      <span
        aria-hidden
        className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
      />
      {copy.ribbon}
    </a>
  );
}

export function AuthorOutro() {
  if (!author.demo) return null;

  const copy = authorCopy();

  return (
    <section
      // не section архетипа: это подпись автора, поэтому вне контента клиента
      aria-label={copy.outro.kicker}
      className="border-t border-black/10 bg-[#141414] px-6 py-16 text-center md:py-24"
    >
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
        <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/45">
          {copy.outro.kicker}
        </p>

        <h2 className="display text-balance text-2xl leading-tight text-white md:text-4xl">
          {copy.outro.heading}
        </h2>

        <p className="text-pretty text-sm leading-relaxed text-white/65 md:text-base">
          {copy.outro.text}
        </p>

        <a
          href={authorHref()}
          target="_blank"
          rel="noopener noreferrer"
          className={[
            "mt-2 inline-flex items-center gap-2 rounded-full",
            "bg-white px-7 py-3.5 text-sm font-semibold text-[#141414] no-underline",
            "transition-transform duration-200 hover:-translate-y-0.5",
          ].join(" ")}
        >
          {copy.outro.cta}
          <span aria-hidden>→</span>
        </a>

        <p className="mt-1 text-xs text-white/40">{authorName()}</p>
      </div>
    </section>
  );
}
