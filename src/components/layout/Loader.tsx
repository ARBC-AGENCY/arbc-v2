"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import { gsap } from "@/lib/gsap";
import MorphSVGPlugin from "gsap/MorphSVGPlugin";
import { useTranslations } from "next-intl";

gsap.registerPlugin(MorphSVGPlugin);

export default function Loader({ onComplete }: { onComplete: () => void }) {
  const { resolvedTheme } = useTheme();
  const t = useTranslations("Loader");

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const isDark = mounted ? resolvedTheme === "dark" : true; // default dark until mounted

  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const morphPathRef = useRef<SVGPathElement>(null);
  const ringRef = useRef<SVGCircleElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  const CIRCUMFERENCE = 2 * Math.PI * 54;

  useEffect(() => {
    if (!mounted) return;

    gsap.fromTo(
      logoRef.current,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
    );

    gsap.fromTo(
      text1Ref.current,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.75, ease: "power3.out" },
    );

    const imageUrls = [
      "/images/Background-dark.webp",
      "/images/Background-white.webp",
    ];

    let loaded = 0;
    const total = imageUrls.length;

    const updateProgress = (val: number) => {
      gsap.to(progressRef, {
        current: val,
        duration: 0.6,
        ease: "power2.out",
        onUpdate: () => {
          setProgress(Math.round(progressRef.current));
        },
      });
    };

    const loadImages = imageUrls.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.onload = img.onerror = () => {
            loaded++;
            updateProgress(Math.round((loaded / total) * 100));
            resolve();
          };
          img.src = src;
        }),
    );

    Promise.all(loadImages).then(() => {
      setTimeout(() => runExitSequence(), 600);
    });
  }, [mounted]);

  const runExitSequence = () => {
    const tl = gsap.timeline({ onComplete });

    tl.to(text1Ref.current, {
      y: -28,
      opacity: 0,
      duration: 0.45,
      ease: "power3.in",
    })
      .fromTo(
        text2Ref.current,
        { y: 28, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, ease: "power3.out" },
        "-=0.1",
      )
      .to(
        morphPathRef.current,
        {
          duration: 2.2,
          morphSVG:
            "M330.544,273.298L404.539,272.255L405.578,345.994c39.310,-1.113,70.844,-33.308,70.844,-72.893A73.097,73.097,0,0,0,474.318,255.686H453.744V220.259a72.681,72.681,0,0,0,-50.263,-20.110c-40.286,0.000,-72.945,32.662,-72.945,72.941C330.536,273.161,330.544,273.246,330.544,273.298ZM481.619,320.800L447.253,353.677s14.256,16.810,34.366,0.000C481.619,353.677,497.471,338.252,481.619,320.800Z",
          ease: "power2.inOut",
          fill: "#e7501e",
        },
        "+=0.3",
      )
      .to(morphPathRef.current, {
        rotate: 180,
        transformOrigin: "center center",
        duration: 1,
        ease: "power4.out",
      })
      .to(containerRef.current, {
        scale: 1.06,
        opacity: 0,
        duration: 0.7,
        ease: "power2.inOut",
      });
  };

  const strokeOffset = CIRCUMFERENCE - (CIRCUMFERENCE * progress) / 100;
  const letterColor = isDark ? "#ffffff" : "#2B2A29";
  const morphFill = isDark ? "#ffffff" : "#2B2A29";
  const bgColor = isDark ? "#191919" : "#cccccc";
  const trackColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)";
  const textColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.5)";
  const percentColor = isDark ? "rgba(255,255,255,0.35)" : "rgba(0,0,0,0.35)";

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-10"
      style={{ backgroundColor: bgColor }}
    >
      {/* ── Logo ───────────────────────────────────── */}
      <div ref={logoRef} className="w-48" style={{ opacity: 0 }}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 18132.48 4731.65"
          className="w-full h-auto"
        >
          {/* inline style replaced with direct fill props — fixes hydration */}
          <g>
            <path
              fill={letterColor}
              d="M2460.76 1.82l2838.43 0 0 4621.53 -1577.74 0 0 -318.36c-383.88,268.88 -851.33,426.66 -1355.64,426.66 -1306.59,0 -2365.81,-1059.22 -2365.81,-2365.86 0,-1345.84 1117.62,-2415.72 2460.76,-2363.96zm-1266.28 2661.39l334.13 0 0 574.95c481.42,463.12 1247.08,448.24 1710.2,-33.18 226.9,-235.92 338.99,-540.09 337.68,-843.41l-1211.42 3.16 -23.47 -1207.51c-308.82,6.49 -615.16,130.56 -846.17,370.8 -300.32,312.2 -399.55,743.98 -300.95,1135.2zm447.6 -1632.87l-571.9 546.89c-362.62,-378.82 213.97,-920.75 571.9,-546.89z"
            />
            <path
              fill={letterColor}
              d="M16507.35 11.07c622.95,0 1188,247.59 1602.48,649.55l-1037.9 1073.37c-146.25,-141.45 -345.37,-228.49 -564.9,-228.49 -448.87,0 -812.72,363.85 -812.72,812.72 0,448.87 363.85,812.72 812.72,812.72 224.48,0 427.62,-90.99 574.72,-238.01l1050.72 1050.72c-416.41,415.02 -990.82,671.57 -1625.12,671.57 -1271.49,0 -2302.19,-1030.69 -2302.19,-2302.03 0,-1271.49 1030.7,-2302.11 2302.19,-2302.11z"
            />
            <path
              fill={letterColor}
              d="M12474.49 1718.14c788.35,32.23 1417.63,681.46 1417.63,1477.71 0,816.94 -662.26,1479.14 -1479.14,1479.14 -117.11,0 -231.11,-13.65 -340.36,-39.4l-9.07 -1448.49 -1166.79 -0.06 0 -3185.27 1577.73 0 0 1716.37z"
            />
            <path
              fill="#e7501e"
              d="M6064.84 10.79l2003.99 -5.96c1107.06,-10.24 2012.04,904.13 2012.04,2006.29 0,553.96 -224.57,1055.54 -587.56,1418.58l557.7 557.76 1216.12 -0.43 -3.75 636.41 -576.48 0 -2066.97 8.76 -955.78 -955.73 -1.58 946.97 -1597.73 0c0,-1539.49 -3.59,-3073.59 0,-4612.66zm3846.27 3451.2l1903.8 0.21 7.59 1157.97 -292.51 1.75 -0.79 -897.28 -1308.23 0 -309.87 -262.66zm-2272.75 -1891.25c-1.75,6.33 799.52,803.32 874.69,878.49 112.05,-112.15 181.36,-266.97 181.36,-438.05 0,-342.37 -277.53,-619.9 -619.84,-619.9 -163.38,0 -320.37,64.3 -436.21,179.46z"
            />
          </g>
        </svg>
      </div>

      {/* ── Morph SVG + Progress Ring ───────────────── */}
      <div className="relative flex items-center justify-center w-28 h-28">
        {/* Progress ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 120 120"
        >
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke={trackColor}
            strokeWidth="1.5"
          />
          <circle
            ref={ringRef}
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="#e7501e"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={strokeOffset}
            style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
          />
        </svg>

        {/* Morph shape — increased from w-[72px] to w-[110px] */}
        <svg viewBox="9 80 800 400" className="absolute w-36 h-36">
          <path
            ref={morphPathRef}
            fill={morphFill}
            d="M490.1 280.649c0 44.459-36.041 80.5-80.5 80.5s-80.5-36.041-80.5-80.5 36.041-80.5 80.5-80.5 80.5 36.041 80.5 80.5z"
          />
        </svg>

        {/* Percentage */}
        <span
          className="absolute text-xs font-light tracking-widest"
          style={{
            color: percentColor,
            fontFamily: "var(--font-body)",
            bottom: "-24px",
          }}
        >
          {progress}%
        </span>
      </div>

      {/* ── Animated text ───────────────────────────── */}
      <div
        className="relative overflow-visible h-8 flex items-center justify-center"
        style={{ minWidth: "320px" }}
      >
        <div
          ref={text1Ref}
          className="absolute text-center whitespace-nowrap"
          style={{
            opacity: 0,
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: textColor,
          }}
        >
          {t.rich("line1", {
            orange: (chunks) => (
              <span style={{ color: "#e7501e" }}>{chunks}</span>
            ),
          })}
        </div>
        <div
          ref={text2Ref}
          className="absolute text-center whitespace-nowrap opacity-0"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-sm)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: textColor,
          }}
        >
          {t.rich("line2", {
            orange: (chunks) => (
              <span style={{ color: "#e7501e" }}>{chunks}</span>
            ),
          })}
        </div>
      </div>
    </div>
  );
}
