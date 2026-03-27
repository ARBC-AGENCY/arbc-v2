import { useTranslations } from "next-intl";
import PageAnnotation from "@/components/layout/PageAnnotation";

export default function HomePage() {
  const t = useTranslations("Home");

  return (
    <main>
      <PageAnnotation
        line1={t("annotation_line1")}
        line2={t("annotation_line2")}
      />
    </main>
  );
}
