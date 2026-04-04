import ProjectSmoother from "@/components/layout/ProjectSmoother";

/**
 * Layout for all project detail pages.
 * Wraps content in the ScrollSmoother-required DOM structure:
 *   #smooth-wrapper (fixed viewport) → #smooth-content (translated by GSAP)
 */
export default function ProjectDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <ProjectSmoother />
      <div
        id="smooth-wrapper"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <div id="smooth-content">
          {children}
        </div>
      </div>
    </>
  );
}
