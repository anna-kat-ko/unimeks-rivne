import { sections } from "@/components/sections";
import StickyCta from "@/components/StickyCta";

export default function Page() {
  if (sections.length === 0) {
    // Скелет пустой — это нормальное состояние template/ до сборки.
    return (
      <main className="mx-auto flex min-h-screen max-w-xl flex-col justify-center gap-3 px-6 py-24">
        <p className="text-sm uppercase tracking-widest text-ink-soft">
          template
        </p>
        <h1 className="display text-3xl leading-tight">
          Скелет готов, секций пока нет
        </h1>
        <p className="text-ink-soft">
          Билдер: возьми golden-компоненты из library/parametrized/&lt;id&gt;/,
          положи в components/sections/, зарегистрируй их в
          components/sections/index.ts в порядке секций архетипа и заполни
          content/site.ts.
        </p>
      </main>
    );
  }

  return (
    <main>
      {sections.map(({ id, Component }) => (
        <Component key={id} />
      ))}
      <StickyCta />
    </main>
  );
}
