"use client";

import { useEffect } from "react";
import { ScrollSmoother, ScrollTrigger } from "@/lib/gsap";

/**
 * Mounts a GSAP ScrollSmoother instance for project detail pages.
 * Must be rendered inside a DOM structure with:
 *   #smooth-wrapper > #smooth-content
 *
 * The instance is destroyed on unmount so it doesn't bleed into other routes.
 */
export default function ProjectSmoother() {
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.4,
      effects: false,
      normalizeScroll: false,
    });

    return () => {
      smoother.kill();
      // Refresh ScrollTrigger so pinned sections recalculate after smoother is gone
      ScrollTrigger.refresh();
    };
  }, []);

  return null;
}
