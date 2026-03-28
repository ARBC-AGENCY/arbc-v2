import { useTranslations } from "next-intl";
import PageAnnotation from "@/components/layout/PageAnnotation";
import HomeHero from "@/components/sections/HomeHero";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <main>
      <HomeHero
        b1p1={t("b1_p1")}
        b1p2={t("b1_p2")}
        b1p3={t("b1_p3")}
        b2prefix={t("b2_prefix")}
        b2main={t("b2_main")}
        b2sub={t("b2_sub")}
        b3prefix={t("b3_prefix")}
        b3main={t("b3_main")}
        b3sub={t("b3_sub")}
        ctaLabel={t("hero_cta")}
      />
      <PageAnnotation
        line1={t("annotation_line1")}
        line2={t("annotation_line2")}
      />
    </main>
  );
}
