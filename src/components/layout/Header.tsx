"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { useTranslations } from "next-intl";
import TransitionLink from "@/components/ui/TransitionLink";

export default function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Nav");

  const logoRef = useRef<HTMLDivElement>(null);
  const ctaWrapperRef = useRef<HTMLDivElement>(null);
  const magnetRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // Entrance animations + initial underline state
  useEffect(() => {
    if (!mounted) return;

    gsap.set(underlineRef.current, { scaleX: 0, transformOrigin: "left center" });

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

  // Dual-strength magnetic: magnetRef moves at STRENGTH, textRef at TEXT_STRENGTH
  useEffect(() => {
    const el = magnetRef.current;
    if (!el) return;

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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

      {/* About CTA — dual-strength magnetic */}
      <div ref={ctaWrapperRef} style={{ opacity: 0 }}>
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
      </div>
    </header>
  );
}
