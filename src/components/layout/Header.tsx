"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

import TransitionLink from "@/components/ui/TransitionLink";
import { useTransitionContext } from "@/context/TransitionContext";

export default function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const { navigateBack } = useTransitionContext();


  // Show X close button on project detail pages and the about page
  const isProjectDetail =
    /^\/projects\/[^/]+$/.test(pathname) || pathname === "/about";

  const logoRef = useRef<HTMLDivElement>(null);
  const ctaWrapperRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Entrance animations (run once on first mount)
  useEffect(() => {
    if (!mounted) return;
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, x: -40 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.4 }
    );
    gsap.fromTo(
      ctaWrapperRef.current,
      { opacity: 0, x: 40 },
      { opacity: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 0.4 }
    );
  }, [mounted]);

  // Dual-strength magnetic — re-runs whenever the About CTA mounts/remounts,
  // i.e. whenever isProjectDetail flips back to false.
  useEffect(() => {
    if (isProjectDetail) return; // X button is showing, CTA elements don't exist

    const el = magnetRef.current;
    if (!el) return;

    // Reset underline for the freshly mounted element
    gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: "left center" });

    const STRENGTH = 30;
    const TEXT_STRENGTH = 13;

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = el.getBoundingClientRect();
      const x = ((e.clientX - left) / width - 0.5) * STRENGTH;
      const y = ((e.clientY - top) / height - 0.5) * STRENGTH;
      gsap.to(el, { x, y, duration: 1.5, ease: "power4.out" });
      gsap.to(textRef.current, {
        x: (x / STRENGTH) * TEXT_STRENGTH,
        y: (y / STRENGTH) * TEXT_STRENGTH,
        duration: 1.5,
        ease: "power4.out",
      });
    };

    const onEnter = () => {
      gsap.to(underlineRef.current, { scaleX: 1, duration: 0.3, ease: "power2.out" });
    };

    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" });
      gsap.to(textRef.current, { x: 0, y: 0, duration: 1.5, ease: "elastic.out(1, 0.3)" });
      gsap.to(underlineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [isProjectDetail]); // re-attach whenever CTA toggles back into view

  const isDark = !mounted || resolvedTheme === "dark";
  const logoSrc = isDark ? "/images/ARBC-white.svg" : "/images/ARBC-dark.svg";
  const textColor = isDark ? "#ffffff" : "#2B2A29";

  return (
    <header className="fixed top-6 left-12 right-12 z-50 flex justify-between items-center px-6 lg:px-12 py-6">
      {/* Logo */}
      <div ref={logoRef} style={{ opacity: 0 }}>
        <TransitionLink href="/" label="home" aria-label="ARBC — Home">
          <Image
            src={logoSrc}
            alt="ARBC"
            width={96}
            height={48}
            className="w-20 lg:w-24 h-auto cursor-pointer"
            priority
          />
        </TransitionLink>
      </div>

      {/* Right-side CTA — X button on project detail pages, About link otherwise */}
      <div ref={ctaWrapperRef} style={{ opacity: 0 }}>
        {isProjectDetail ? (
          /* ── X close button ── */
          <button
            onClick={() =>
              navigateBack(
                pathname === "/about" ? "home" : "projects"
              )
            }
            aria-label="Close project"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "2.5rem",
              height: "2.5rem",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: textColor,
              padding: 0,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="22"
              height="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="4" y1="4" x2="20" y2="20" />
              <line x1="20" y1="4" x2="4" y2="20" />
            </svg>
          </button>
        ) : (
          /* ── About CTA — dual-strength magnetic ── */
          <div
            ref={magnetRef}
            style={{ display: "inline-block", position: "relative", cursor: "pointer" }}
          >
            <TransitionLink href="/about" label="about">
              <span
                ref={textRef}
                style={{
                  display: "block",
                  color: textColor,
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-md)",
                  fontWeight: 700,
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {t("about")}
              </span>
            </TransitionLink>

            {/* Static grey underline */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1.5 rounded-full"
              style={{ backgroundColor: "#747474" }}
            />
            {/* Animated orange underline */}
            <div
              ref={underlineRef}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-1.5 rounded-full"
              style={{ backgroundColor: "#e7501e" }}
            />
          </div>
        )}
      </div>
    </header>
  );
}
