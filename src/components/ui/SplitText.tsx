"use client";

import { useRef, useEffect, useState } from "react";
import { gsap, SplitText as GSAPSplitText } from "@/lib/gsap";
import { useGSAP } from "@gsap/react";

type Variant = "slide" | "blur" | "chars";

interface SplitTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  tag?: keyof React.JSX.IntrinsicElements;
  variant?: Variant;
  unitDelay?: number;
  duration?: number;
  ease?: string;
  animate?: boolean;
  startDelay?: number;
  onComplete?: () => void;
}

const VARIANTS: Record<
  Variant,
  { from: gsap.TweenVars; to: gsap.TweenVars; split: "chars" | "words" }
> = {
  slide: {
    split: "words",
    from: { opacity: 0, y: 18 },
    to: { opacity: 1, y: 0 },
  },
  blur: {
    split: "words",
    from: { opacity: 0, filter: "blur(10px)", y: 6 },
    to: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  chars: {
    split: "chars",
    from: { opacity: 0, y: 10 },
    to: { opacity: 1, y: 0 },
  },
};

export default function SplitText({
  text,
  className = "",
  style,
  tag = "p",
  variant = "slide",
  unitDelay = 0.045,
  duration = 0.8,
  ease = "power3.out",
  animate = false,
  startDelay = 0,
  onComplete,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const animatedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    if (document.fonts.status === "loaded") {
      setFontsLoaded(true);
    } else {
      document.fonts.ready.then(() => setFontsLoaded(true));
    }
  }, []);

  const { from, to, split: splitType } = VARIANTS[variant];

  useGSAP(
    () => {
      if (!ref.current || !text || !fontsLoaded || !animate) return;
      if (animatedRef.current) return;

      const el = ref.current;

      // Clean up any prior split
      if ((el as any)._splitInstance) {
        try { (el as any)._splitInstance.revert(); } catch (_) {}
        (el as any)._splitInstance = null;
      }

      const splitInstance = new GSAPSplitText(el, {
        type: splitType,
        onSplit(self) {
          const targets = splitType === "chars" ? self.chars : self.words;

          // Reveal container, hide units — all in one batch before any paint
          gsap.set(el, { opacity: 1 });
          gsap.set(targets, from);

          gsap.to(targets, {
            ...to,
            duration,
            ease,
            stagger: unitDelay,
            delay: startDelay,
            willChange: "transform, opacity",
            force3D: true,
            onComplete() {
              animatedRef.current = true;
              onCompleteRef.current?.();
            },
          });
        },
      });

      (el as any)._splitInstance = splitInstance;

      return () => {
        try { splitInstance.revert(); } catch (_) {}
        (el as any)._splitInstance = null;
      };
    },
    {
      dependencies: [text, fontsLoaded, animate, unitDelay, duration, ease, startDelay],
      scope: ref,
    }
  );

  const Tag = tag as "p";
  return (
    <Tag
      ref={ref as React.RefObject<HTMLParagraphElement>}
      className={className}
      style={{ overflow: "visible", ...style, opacity: 0 }}
    >
      {text}
    </Tag>
  );
}
