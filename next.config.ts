import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ассеты клиента лежат локально в public/ — внешние домены не разрешаем,
  // чтобы чужие URL из библиотечных промптов (figma.site и прочее) не уехали в прод.
  images: { remotePatterns: [] },
};

export default nextConfig;
