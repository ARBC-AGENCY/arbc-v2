"use client";

/**
 * Renders the fixed full-screen overlay used for cinematic page transitions.
 * All animation is driven externally by pageTransitions.ts via GSAP string
 * selectors — this component is pure markup / mounting point.
 */
export default function PageTransition() {
  return (
    <div className="loading-container">
      <div className="loading-screen">
        {/* Curved top edge — organic blob illusion */}
        <div className="rounded-div-wrap top">
          <div className="rounded-div" />
        </div>

        {/* Destination page name shown mid-transition */}
        <div className="loading-words">
          <h2>Home</h2>
          <h2>About</h2>
          <h2>Explore</h2>
        </div>

        {/* Curved bottom edge */}
        <div className="rounded-div-wrap bottom">
          <div className="rounded-div" />
        </div>
      </div>
    </div>
  );
}
