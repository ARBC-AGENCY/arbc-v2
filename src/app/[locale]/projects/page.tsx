import { useTranslations } from "next-intl";
import ProjectSlider from "@/components/sections/ProjectSlider";
import PageAnnotation from "@/components/layout/PageAnnotation";

export default function ExplorePage() {
  const t = useTranslations("Projects");

  return (
    <main data-page-name="projects">
      <div className="once-in overflow-hidden">
        <ProjectSlider />
      </div>
      <div className="once-in hidden sm:block">
        <PageAnnotation
          line1={t("annotation_line1")}
          line2={t("annotation_line2")}
        />
      </div>
    </main>
  );
}
