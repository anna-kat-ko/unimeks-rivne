import type { Metadata } from "next";
// ⚠️ ШРИФТЫ-ЗАГЛУШКИ. Билдер ОБЯЗАН заменить их на пару из направления директора.
// Оставить как есть = слоп (см. ../../ANTISLOP.md). Inter/Roboto/Playfair/Fraunces запрещены.
// ВАЖНО для uk/ru: шрифт обязан иметь субсет cyrillic, иначе сборка падает на типах.
// Проверять по node_modules/next/dist/compiled/@next/font/dist/google/font-data.json
// (например Bricolage Grotesque кириллицы НЕ имеет, Unbounded/Onest/Golos Text/Manrope имеют).
import { Unbounded, Manrope } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/content/site";

const META_PIXEL_ID = "3089206227951124";

const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["600", "700", "800"],
  variable: "--font-display-src",
  display: "swap",
});

const text = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-text-src",
  display: "swap",
});

export const metadata: Metadata = {
  title: site.seo.title,
  description: site.seo.description,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // ВАЖНО: классы шрифтов висят на <html>, а не на <body>.
    // Токены @theme эмитятся на :root, и если переменная next/font объявлена ниже
    // (на body), то --font-display на :root резолвится в пустоту и шрифт молча
    // падает на системный. Проверено на скелете, не переносить на body.
    <html lang={site.lang} className={`${display.variable} ${text.variable}`}>
      <body>
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height={1}
            width={1}
            style={{ display: "none" }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>

        {/* schema.org — тип под бизнес ставит билдер (скилл schema-markup) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(site.schema) }}
        />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
