import ProjectSmoother from "@/components/layout/ProjectSmoother";

/**
 * About page layout — wraps content in the same GSAP ScrollSmoother
 * structure used by project detail pages (#smooth-wrapper > #smooth-content).
 */
export default function AboutLayout({ children }: { children: React.ReactNode }) {
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
        <div id="smooth-content">{children}</div>
      </div>
    </>
  );
}
