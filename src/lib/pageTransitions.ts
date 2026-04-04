import gsap from "gsap";

// ── Helpers ────────────────────────────────────────────────────────────────

function setActiveWord(key: string): void {
  const els = document.querySelectorAll<HTMLElement>(".loading-words h2");
  let matched = false;
  els.forEach((el) => {
    const isMatch = el.dataset.key === key;
    el.classList.toggle("active", isMatch);
    if (isMatch) matched = true;
  });
  // Fallback: for dynamic labels (project names etc.) use the __dynamic__ slot
  if (!matched) {
    const dynamic = document.querySelector<HTMLElement>(
      '.loading-words h2[data-key="__dynamic__"]'
    );
    if (dynamic) {
      dynamic.textContent = key;
      dynamic.classList.add("active");
    }
  }
}

function lockScroll(): void {
  document.documentElement.style.overflow = "hidden";
}

function unlockScroll(): void {
  document.documentElement.style.overflow = "";
}

// ── Shared exit builder ────────────────────────────────────────────────────
/**
 * Appends the exit phase (sweep-out + once-in spring) to an existing timeline.
 * Used by both firstLoadTransition and pageTransitionIn so the visual is
 * identical in both situations.
 */
function appendExit(tl: gsap.core.Timeline, isMobile: boolean): void {
  tl.set(".loading-screen .rounded-div-wrap.top", { height: "0vh" });

  // Kick off once-in spring NOW — the overlay is still fully covering the
  // page at this exact timeline position, so content never flashes at y=0.
  tl.call(() => {
    gsap.set("main .once-in", { y: isMobile ? "20vh" : "50vh" });
    gsap.to("main .once-in", {
      duration: 1,
      y: "0vh",
      stagger: 0.05,
      ease: "expo.out",
      clearProps: "transform",
    });
  });

  // Overlay sweeps out; words and bottom curve collapse at the same time
  tl.to(".loading-screen", {
    duration: 0.8,
    top: "-100%",
    ease: "power3.inOut",
  });
  tl.to(".loading-words", { duration: 0.5, opacity: 0, ease: "linear" }, "<");
  tl.to(
    ".loading-screen .rounded-div-wrap.bottom",
    { duration: 0.85, height: "0", ease: "power3.inOut" },
    "<"
  );

  // Reset overlay to off-screen-below for the next use
  tl.set(".loading-screen", { top: "100%" });
  tl.set(".loading-words", { opacity: 0 });
  tl.set(".loading-container", { pointerEvents: "none", zIndex: 800 });
  tl.call(unlockScroll);
}

// ── First-load transition ─────────────────────────────────────────────────
/**
 * Identical cinematic arc to a page transition, used when the ARBC splash
 * loader finishes. The overlay sweeps IN from below (covering the still-
 * visible ARBC loader), shows the page name, then sweeps OUT above while
 * the .once-in sections spring up.
 *
 * revealPage() is called at the moment the overlay fully covers the screen.
 * PageWrapper passes () => flushSync(() => setLoaded(true)) here, which
 * unmounts the ARBC loader and makes the page content visible — safely
 * hidden under the overlay until it exits.
 */
export function firstLoadTransition(
  pageName: string,
  revealPage: () => void
): void {
  setActiveWord(pageName);
  lockScroll();

  const isMobile = window.innerWidth <= 540;

  // Raise the overlay above the ARBC loader (z-9999) synchronously so it
  // renders on top as it slides in from below.
  gsap.set(".loading-container", { zIndex: 10000, pointerEvents: "auto" });

  const tl = gsap.timeline();

  // ── Initial overlay state ───────────────────────────────────────────────
  tl.set(".loading-screen", { top: "100%" }); // off-screen below
  tl.set(".loading-words", { opacity: 0, y: 0 });
  tl.set(".loading-screen .rounded-div-wrap.bottom", {
    height: isMobile ? "5vh" : "10vh",
  });

  // ── Entry: overlay slides up from below over the ARBC loader ───────────
  tl.to(".loading-screen", { duration: 0.5, top: "0%", ease: "power4.in" });
  tl.to(
    ".loading-screen .rounded-div-wrap.top",
    { duration: 0.4, height: "10vh", ease: "power4.in" },
    "<"
  );

  // Overlay is now fully covering — unmount ARBC loader and reveal page DOM
  tl.call(revealPage);

  // Page name drifts in while overlay is stationary
  tl.to(".loading-words", {
    duration: 0.8,
    opacity: 1,
    y: -50,
    ease: "power4.out",
    delay: 0.05,
  });

  // ── Exit: identical to pageTransitionIn ────────────────────────────────
  appendExit(tl, isMobile);
}

// ── Inter-page transition ─────────────────────────────────────────────────
/**
 * Cinematic overlay sweep for navigation between pages.
 * Returns the GSAP timeline so TransitionContext can attach .then() for
 * resetting the navigation lock.
 */
export function pageTransitionIn(
  destinationLabel: string
): gsap.core.Timeline {
  setActiveWord(destinationLabel);
  lockScroll();

  const isMobile = window.innerWidth <= 540;
  const tl = gsap.timeline();

  // ── Initial state ──────────────────────────────────────────────────────
  tl.set(".loading-container", { pointerEvents: "auto", zIndex: 10000 });
  tl.set(".loading-screen", { top: "100%" });
  tl.set(".loading-words", { opacity: 0, y: 0 });
  tl.set(".loading-screen .rounded-div-wrap.bottom", {
    height: isMobile ? "5vh" : "10vh",
  });

  // ── Entry: overlay sweeps up from below ────────────────────────────────
  tl.to(".loading-screen", { duration: 0.5, top: "0%", ease: "power4.in" });
  tl.to(
    ".loading-screen .rounded-div-wrap.top",
    { duration: 0.4, height: "10vh", ease: "power4.in" },
    "<"
  );

  // Destination word drifts in
  tl.to(".loading-words", {
    duration: 0.8,
    opacity: 1,
    y: -50,
    ease: "power4.out",
    delay: 0.05,
  });

  // ── Exit: shared with firstLoadTransition ─────────────────────────────
  appendExit(tl, isMobile);

  return tl;
}
