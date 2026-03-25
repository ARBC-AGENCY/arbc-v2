import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <main>
      <h1>{t("hero_title")}</h1>
      <p>{t("hero_subtitle")}</p>
    </main>
  );
}
