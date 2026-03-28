import gsap from "gsap";

function setActiveWord(label: string): void {
  document.querySelectorAll(".loading-words h2").forEach((el) => {
    el.classList.toggle("active", el.textContent?.trim() === label);
  });
}

/**
 * Cinematic overlay sweep — called when the user triggers navigation.
 * Returns the GSAP timeline so the caller can await completion.
 */
export function pageTransitionIn(
  destinationLabel: string
): gsap.core.Timeline {
  setActiveWord(destinationLabel);

  const isMobile = window.innerWidth <= 540;
  const tl = gsap.timeline();

  // Lock pointer-events so the overlay blocks accidental clicks
  tl.set(".loading-container", { pointerEvents: "auto" });
  tl.set(".loading-screen", { top: "100%" });
  tl.set(".loading-words", { opacity: 0, y: 0 });
  tl.set(".loading-screen .rounded-div-wrap.bottom", {
    height: isMobile ? "5vh" : "10vh",
  });

  // ── Entry: screen sweeps up from below ─────────
  tl.to(".loading-screen", { duration: 0.5, top: "0%", ease: "power4.in" });
  // Top curved edge grows in sync with the sweep
  tl.to(
    ".loading-screen .rounded-div-wrap.top",
    { duration: 0.4, height: "10vh", ease: "power4.in" },
    "<" // starts at same time as loading-screen
  );
  // Destination word fades in and drifts up
  tl.to(".loading-words", {
    duration: 0.8,
    opacity: 1,
    y: -50,
    ease: "power4.out",
    delay: 0.05,
  });

  // ── Exit: screen sweeps out above ──────────────
  tl.set(".loading-screen .rounded-div-wrap.top", { height: "0vh" });
  tl.to(".loading-screen", {
    duration: 0.8,
    top: "-100%",
    ease: "power3.inOut",
  }, "-=0.2");
  tl.to(".loading-words", { duration: 0.6, opacity: 0, ease: "linear" }, "-=0.8");
  tl.to(
    ".loading-screen .rounded-div-wrap.bottom",
    { duration: 0.85, height: "0", ease: "power3.inOut" },
    "-=0.6"
  );

  // ── Reset state ────────────────────────────────
  tl.set(".loading-screen", { top: "100%" });
  tl.set(".loading-words", { opacity: 0 });
  tl.set(".loading-container", { pointerEvents: "none" });

  return tl;
}

/**
 * Springs up the new page's .once-in sections after the overlay exits.
 * Call this after pageTransitionIn's timeline has resolved.
 */
export function pageTransitionOut(): void {
  const isMobile = window.innerWidth <= 540;
  gsap.set("main .once-in", { y: isMobile ? "20vh" : "50vh" });
  gsap.to("main .once-in", {
    duration: 1,
    y: "0vh",
    stagger: 0.05,
    ease: "expo.out",
    clearProps: "transform",
  });
}

/**
 * First-page-load reveal. The overlay starts covering the screen (it sits
 * behind the ARBC splash loader at z-9999), then sweeps away while the
 * .once-in sections spring up underneath.
 *
 * Called from PageWrapper after the ARBC Loader's onComplete fires.
 */
export function initLoader(pageName: string): void {
  setActiveWord(pageName);

  const isMobile = window.innerWidth <= 540;

  // These gsap.set() calls are synchronous — they execute before the next
  // browser paint, so the overlay covers the freshly-revealed content
  // before the user sees any flash.
  gsap.set(".loading-container", { pointerEvents: "auto" });
  gsap.set(".loading-screen", { top: "0" });
  gsap.set("main .once-in", { y: isMobile ? "10vh" : "50vh" });
  gsap.set(".loading-words", { opacity: 1, y: -50 });
  gsap.set(".loading-screen .rounded-div-wrap.bottom", {
    height: isMobile ? "5vh" : "10vh",
  });

  // Timeline starts after a short pause so the viewer registers the page name
  const tl = gsap.timeline({ delay: 0.3 });

  tl.to(".loading-screen", {
    duration: 0.8,
    top: "-100%",
    ease: "power4.inOut",
  });
  tl.to(
    ".loading-screen .rounded-div-wrap.bottom",
    { duration: 1, height: "0vh", ease: "power4.inOut" },
    "-=0.8"
  );
  tl.to(
    ".loading-words",
    { duration: 0.3, opacity: 0, ease: "linear" },
    "-=0.8"
  );
  tl.to(
    "main .once-in",
    {
      duration: 1,
      y: "0vh",
      stagger: 0.05,
      ease: "expo.out",
      clearProps: "transform",
    },
    "-=0.8"
  );

  tl.set(".loading-container", { pointerEvents: "none" });
}
