"use client";

import { useEffect, useRef, useState, useContext } from "react";
import { flushSync } from "react-dom";
import { useTheme } from "next-themes";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { gsap, SplitText, Draggable } from "@/lib/gsap";
import { PageReadyContext } from "@/context/page-ready";
import { useTransitionContext } from "@/context/TransitionContext";
import { PROJECTS } from "./data";
import { N, STEP, CENTER_OFFSET, targetX } from "./constants";

// ── infiniteWrap ──────────────────────────────────────────────────────────
// Keeps the draggable track's x within the middle clone set so the
// loop is seamless regardless of how fast the user flings.
function infiniteWrap(d: Draggable) {
  const x = d.x;
  const setWidth = N * STEP;
  const origin = CENTER_OFFSET - N * STEP;
  const rel = x - origin;
  const wrapped = ((rel % setWidth) + setWidth) % setWidth;
  const newX = origin + (wrapped === 0 ? 0 : wrapped - setWidth);
  if (Math.abs(newX - x) > 0.5) {
    gsap.set(d.target, { x: newX });
    d.update();
  }
}

// ── Hook return type ──────────────────────────────────────────────────────
export interface ProjectSliderState {
  // Data
  activeIndex: number;
  isDark: boolean;
  // Theme tokens for chrome (rail, next button)
  railBg: string;
  nextBorder: string;
  nextBg: string;
  wipeBg: string;
  // Refs
  imageContainerRef:  React.RefObject<HTMLDivElement | null>;
  imageWipeRef:       React.RefObject<HTMLDivElement | null>;
  blocksContainerRef: React.RefObject<HTMLDivElement | null>;
  headlineRef:        React.RefObject<HTMLHeadingElement | null>;
  cursorBtnRef:       React.RefObject<HTMLButtonElement | null>;
  trackRef:           React.RefObject<HTMLDivElement | null>;
  draggableRef:       React.MutableRefObject<Draggable | null>;
  // Handlers
  switchProject:    (nextIndex: number) => void;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleMouseMove:  (e: React.MouseEvent<HTMLDivElement>) => void;
}

// ── Hook ──────────────────────────────────────────────────────────────────
export function useProjectSlider(): ProjectSliderState {
  const isPageReady = useContext(PageReadyContext);
  const router      = useRouter();
  const pathname    = usePathname();
  const searchParams = useSearchParams();
  const { navigate: _navigate } = useTransitionContext(); // eslint-disable-line @typescript-eslint/no-unused-vars

  // ── Initial index — always 0 on SSR/first render to avoid hydration mismatch.
  // After mount we apply URL param > sessionStorage priority in a useEffect.
  const [activeIndex, setActiveIndex] = useState(0);
  const isTransitioning = useRef(false);

  // ── URL / session sync ───────────────────────────────────────────────────
  const syncUrl = (index: number) => {
    const slug = PROJECTS[index].slug;
    sessionStorage.setItem("arbc_active_project", slug);
    const params = new URLSearchParams(searchParams.toString());
    params.set("p", slug);
    router.replace(`${pathname}?${params.toString()}` as any, { scroll: false });
  };

  // ── Theme ────────────────────────────────────────────────────────────────
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const railBg     = isDark ? "rgba(25, 25, 25, 1)"   : "rgba(204, 204, 204, 0.88)";
  const nextBorder = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.22)";
  const nextBg     = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)";
  const wipeBg     = isDark ? "#1a1a1a"                : "#d0d0d0";

  // ── Refs ─────────────────────────────────────────────────────────────────
  const imageContainerRef  = useRef<HTMLDivElement>(null);
  const imageWipeRef       = useRef<HTMLDivElement>(null);
  const blocksContainerRef = useRef<HTMLDivElement>(null);
  const headlineRef        = useRef<HTMLHeadingElement>(null);
  const cursorBtnRef       = useRef<HTMLButtonElement>(null);
  const trackRef           = useRef<HTMLDivElement>(null);
  const draggableRef       = useRef<Draggable | null>(null);
  const xQuickRef          = useRef<((v: number) => void) | null>(null);
  const yQuickRef          = useRef<((v: number) => void) | null>(null);

  // ── Cursor button init ───────────────────────────────────────────────────
  useEffect(() => {
    if (!cursorBtnRef.current) return;
    gsap.set(cursorBtnRef.current, { opacity: 0, scale: 0.8 });
    xQuickRef.current = gsap.quickTo(cursorBtnRef.current, "x", { duration: 0.7, ease: "power3.out" });
    yQuickRef.current = gsap.quickTo(cursorBtnRef.current, "y", { duration: 0.7, ease: "power3.out" });
  }, []);

  // ── Draggable setup ──────────────────────────────────────────────────────
  // Must run BEFORE the restore effect so restore can override the initial x.
  useEffect(() => {
    if (!trackRef.current) return;
    gsap.set(trackRef.current, { x: targetX(0) });

    const [d] = Draggable.create(trackRef.current, {
      type: "x",
      inertia: true,
      cursor: "grab",
      activeCursor: "grabbing",
      snap: (val: number) => Math.round(val / STEP) * STEP,
      onDrag: function (this: Draggable) { infiniteWrap(this); },
      onThrowUpdate: function (this: Draggable) { infiniteWrap(this); },
      onThrowComplete: function (this: Draggable) {
        const x = gsap.getProperty(trackRef.current!, "x") as number;
        const raw = Math.round((CENTER_OFFSET - x) / STEP);
        const idx = ((raw % N) + N) % N;
        setActiveIndex(idx);
        syncUrl(idx);
      },
    });

    draggableRef.current = d;
    return () => { d.kill(); };
  }, []);

  // ── Restore saved index after hydration (URL param > sessionStorage) ──────
  // Runs after Draggable setup so it can override the initial x=targetX(0).
  useEffect(() => {
    const urlSlug = searchParams.get("p");
    if (urlSlug) {
      const i = PROJECTS.findIndex((p) => p.slug === urlSlug);
      if (i >= 0 && i !== 0) {
        setActiveIndex(i);
        if (trackRef.current) gsap.set(trackRef.current, { x: targetX(i) });
        draggableRef.current?.update();
      }
      return;
    }
    const stored = sessionStorage.getItem("arbc_active_project");
    if (stored) {
      const i = PROJECTS.findIndex((p) => p.slug === stored);
      if (i >= 0 && i !== 0) {
        setActiveIndex(i);
        if (trackRef.current) gsap.set(trackRef.current, { x: targetX(i) });
        draggableRef.current?.update();
      }
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Page-ready entrance ──────────────────────────────────────────────────
  useEffect(() => {
    if (!isPageReady || !blocksContainerRef.current) return;
    animateIn(0.1);
  }, [isPageReady]);

  function animateIn(delay = 0) {
    if (!blocksContainerRef.current) return;
    const blockEls = blocksContainerRef.current.querySelectorAll("[data-text-block]");
    if (blockEls.length) {
      gsap.fromTo(
        Array.from(blockEls),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 0.5, ease: "expo.out", delay },
      );
    }
    const headline = blocksContainerRef.current.querySelector("h2");
    if (headline) {
      const split = new SplitText(headline, { type: "words" });
      gsap.set(split.words, { y: 28, opacity: 0 });
      gsap.to(split.words, {
        y: 0, opacity: 1, stagger: 0.038, duration: 0.5, ease: "expo.out",
        delay: delay + 0.1,
        onComplete: () => split.revert(),
      });
    }
  }

  // ── Project switch ───────────────────────────────────────────────────────
  const switchProject = (nextIndex: number) => {
    if (isTransitioning.current) return;
    const idx = ((nextIndex % N) + N) % N;
    if (idx === activeIndex) return;
    isTransitioning.current = true;

    gsap.to(trackRef.current, {
      x: targetX(idx),
      ease: "expo.out",
      duration: 0.58,
      onComplete: () => { draggableRef.current?.update(); },
    });

    const tl = gsap.timeline({
      onComplete: () => {
        flushSync(() => setActiveIndex(idx));
        syncUrl(idx);
        runEntrance();
      },
    });

    tl.to(blocksContainerRef.current, { y: -12, opacity: 0, duration: 0.26, ease: "power2.in" });
    tl.to(
      imageWipeRef.current,
      { clipPath: "inset(0 100% 0 0%)", duration: 0.4, ease: "power2.inOut" },
      "<0.05",
    );
  };

  function runEntrance() {
    gsap.set(blocksContainerRef.current, { y: 0, opacity: 1 });

    gsap.fromTo(
      imageWipeRef.current,
      { clipPath: "inset(0 0% 0 100%)" },
      { clipPath: "inset(0 0% 0 0%)", duration: 0.46, ease: "power2.inOut" },
    );

    const blockEls = blocksContainerRef.current?.querySelectorAll("[data-text-block]");
    if (blockEls?.length) {
      gsap.fromTo(
        Array.from(blockEls),
        { y: 18, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.09, duration: 0.42, ease: "expo.out", delay: 0.06,
          onComplete: () => { isTransitioning.current = false; },
        },
      );
    } else {
      isTransitioning.current = false;
    }

    const headline = blocksContainerRef.current?.querySelector("h2");
    if (headline) {
      const split = new SplitText(headline, { type: "words" });
      gsap.set(split.words, { y: 28, opacity: 0 });
      gsap.to(split.words, {
        y: 0, opacity: 1, stagger: 0.028, duration: 0.4, ease: "expo.out", delay: 0.12,
        onComplete: () => split.revert(),
      });
    }
  }

  // ── Cursor follower ──────────────────────────────────────────────────────
  const handleMouseEnter = () =>
    gsap.to(cursorBtnRef.current, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(1.7)" });

  const handleMouseLeave = () =>
    gsap.to(cursorBtnRef.current, { opacity: 0, scale: 0.85, duration: 0.4, ease: "power2.in" });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = imageContainerRef.current!.getBoundingClientRect();
    xQuickRef.current?.(e.clientX - r.left - r.width / 2);
    yQuickRef.current?.(e.clientY - r.top - r.height / 2);
  };

  return {
    activeIndex, isDark,
    railBg, nextBorder, nextBg, wipeBg,
    imageContainerRef, imageWipeRef, blocksContainerRef,
    headlineRef, cursorBtnRef, trackRef, draggableRef,
    switchProject,
    handleMouseEnter, handleMouseLeave, handleMouseMove,
  };
}
