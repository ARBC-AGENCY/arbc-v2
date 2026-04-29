import ProjectSmoother from "@/components/layout/ProjectSmoother";

export default function PortfolioDetailLayout({
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
        <div id="smooth-content">{children}</div>
      </div>
    </>
  );
}
