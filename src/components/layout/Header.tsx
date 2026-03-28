"use client";

import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";
import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import Magnet from "@/components/ui/Magnet";

export default function Header() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const t = useTranslations("Nav");

  const logoRef = useRef<HTMLDivElement>(null);
  // Wrapper for entrance animation — keeps GSAP x-translate separate from Magnet's transform
  const ctaWrapperRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

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

  const handleMouseEnter = () =>
    gsap.to(underlineRef.current, { scaleX: 1, duration: 0.3, ease: "power2.out" });

  const handleMouseLeave = () =>
    gsap.to(underlineRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" });

  const isDark = !mounted || resolvedTheme === "dark";
  const logoSrc = isDark ? "/images/ARBC-white.svg" : "/images/ARBC-dark.svg";
  const textColor = isDark ? "#ffffff" : "#2B2A29";

  return (
    <header className="fixed top-6 left-12 right-12 z-50 flex justify-between items-center px-6 lg:px-12 py-6">
      {/* Logo */}
      <div ref={logoRef} style={{ opacity: 0 }}>
        <Link href="/" aria-label="ARBC — Home">
          <Image
            src={logoSrc}
            alt="ARBC"
            width={96}
            height={48}
            className="w-20 lg:w-24 h-auto cursor-pointer"
            priority
          />
        </Link>
      </div>

      {/* About CTA */}
      <div ref={ctaWrapperRef} style={{ opacity: 0 }}>
        <Magnet padding={60} magnetStrength={4}>
          <button
            className="relative cursor-pointer"
            style={{
              color: textColor,
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-md)",
              fontWeight: 700,
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <Link href="/about">{t("about")}</Link>

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
          </button>
        </Magnet>
      </div>
    </header>
  );
}
