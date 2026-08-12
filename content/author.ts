/**
 * Данные АВТОРА демо (не клиента!). Общие для всех сборок, правятся редко.
 *
 * Зачем: демо-сайт для холодного лида — это ПРИМАНКА, а не товар. Мы показываем
 * скелет на данных владельца бизнеса; он узнаёт свой салон/студию и жмёт кнопку,
 * которая ведёт к автору. Дальше — нормальный проект с правками, за нормальные деньги.
 * Без этого блока демо не монетизируется вообще: человек посмотрел и ушёл.
 *
 * Правило: блок автора ОБЯЗАТЕЛЕН на каждом сгенерированном демо (см. PRODUCT.md).
 * Убирать его можно только для платного клиентского сайта (demo: false).
 *
 * ПОЧЕМУ БОТ, А НЕ ЛИЧКА: в личке лид тонет в «запросах на переписку» и непонятно,
 * с какого именно демо пришёл человек. Бот принимает /start с меткой лида
 * (deep link `?start=<leadSlug>`), сразу здоровается, отдаёт ссылку на визитку
 * с работами — и присылает Свете уведомление «новый лид с сайта <клиент>».
 *
 * ⚠️ ЯЗЫК — ОТ КЛИЕНТА, НЕ ЗАШИТ. Тексты блока берутся по `site.lang`, то есть на том
 * языке, на котором сам бизнес говорит в своём Instagram (Jentan пишет украинским → uk;
 * салон в том же городе, который постит по-русски → ru). Хардкодить один язык нельзя:
 * это не «украинский продукт», а персонализация под конкретного владельца.
 * Нет локали под язык клиента — берём en как нейтральный фолбэк и заводим новую локаль.
 */
import { site } from "@/content/site";

export type AuthorCopy = {
  ribbon: string;
  outro: {
    kicker: string;
    heading: string;
    text: string;
    cta: string;
  };
};

export type AuthorConfig = {
  /** true = это демо для холодного лида, показываем блок автора */
  demo: boolean;
  /** от чьего имени идёт предложение (в подписи под кнопкой) */
  name: Record<string, string>;

  /** username бота без @ — приёмник лидов */
  bot: string;
  /**
   * Метка этого демо. Билдер ставит handle/слаг клиента (напр. "jentan_beauty").
   * Уходит в deep link → бот понимает, с какого сайта лид, и пишет это Свете.
   * Ограничения Telegram start-payload: до 64 символов, только A-Z a-z 0-9 _ -
   */
  leadSlug: string;

  /** тексты по языкам; ключ = site.lang */
  copy: Record<string, AuthorCopy>;
};

export const author: AuthorConfig = {
  demo: true,

  bot: "TODO_BOT_USERNAME", // ← подставить после создания бота (BotFather)
  leadSlug: "demo", // ← билдер заменяет на handle клиента при сборке

  name: {
    uk: "Світлана",
    ru: "Светлана",
    en: "Svitlana",
  },

  copy: {
    uk: {
      ribbon: "Демо-сайт · хочу такий",
      outro: {
        kicker: "Це демо",
        heading: "Хочете такий сайт — під себе?",
        // Честно проговариваем, что это скелет: реальный сайт дорабатывается под задачу.
        text:
          "Цю сторінку зібрано за вашими фото та даними з Instagram — як приклад, " +
          "яким може бути ваш сайт. Робочий сайт доопрацьовується під ваші послуги, " +
          "ціни та побажання. Напишіть — обговоримо.",
        cta: "Написати в Telegram",
      },
    },

    ru: {
      ribbon: "Демо-сайт · хочу такой",
      outro: {
        kicker: "Это демо",
        heading: "Хотите такой сайт — под себя?",
        text:
          "Эта страница собрана по вашим фото и данным из Instagram — как пример, " +
          "каким может быть ваш сайт. Рабочий сайт дорабатывается под ваши услуги, " +
          "цены и пожелания. Напишите — обсудим.",
        cta: "Написать в Telegram",
      },
    },

    en: {
      ribbon: "Demo site · I want one",
      outro: {
        kicker: "This is a demo",
        heading: "Want a site like this — made for you?",
        text:
          "This page was built from your own photos and Instagram data as an example " +
          "of what your site could look like. The real site is tailored to your " +
          "services, prices and preferences. Message me — let's talk.",
        cta: "Message on Telegram",
      },
    },
  },
};

/** Тексты под язык клиента (site.lang), с нейтральным фолбэком. */
export const authorCopy = (lang: string = site.lang): AuthorCopy =>
  author.copy[lang] ?? author.copy.en;

/** Имя автора под язык клиента. */
export const authorName = (lang: string = site.lang): string =>
  author.name[lang] ?? author.name.en;

/** Готовая ссылка кнопки: deep link с меткой лида. */
export const authorHref = (a: AuthorConfig = author) =>
  `https://t.me/${a.bot}?start=${a.leadSlug}`;
