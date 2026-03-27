"use client";

interface PageAnnotationProps {
  line1: string;
  line2: string;
}

export default function PageAnnotation({ line1, line2 }: PageAnnotationProps) {
  return (
    <div className="fixed bottom-6 left-12 lg:bottom-10 z-50 flex items-end gap-3">
      {/* Orange square indicator */}
      <div
        className="shrink-0 w-3.5 h-3.5 mb-0.5"
        style={{ backgroundColor: "#e7501e" }}
      />

      {/* Label — leading-none removes descender space that throws off items-end */}
      <div
        style={{
          fontFamily: "var(--font-title)",
          fontSize: "var(--text-sm)",
          letterSpacing: "0.15em",
          lineHeight: 1,
        }}
      >
        <p className="uppercase mb-1">{line1}</p>
        <p
          className="uppercase"
          style={{
            backgroundColor: "#e7501e",
            color: "#ffffff",
            padding: "1px 4px",
          }}
        >
          {line2}
        </p>
      </div>
    </div>
  );
}
