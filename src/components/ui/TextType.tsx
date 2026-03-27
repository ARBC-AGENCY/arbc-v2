"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface TextTypeProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  /** ms per character */
  typingSpeed?: number;
  /** seconds to wait after animate=true before typing starts */
  startDelay?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  animate?: boolean;
  onComplete?: () => void;
}

export default function TextType({
  text,
  className = "",
  style,
  typingSpeed = 55,
  startDelay = 0,
  showCursor = true,
  cursorCharacter = "|",
  cursorBlinkDuration = 0.5,
  animate = false,
  onComplete,
}: TextTypeProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [started, setStarted] = useState(false);
  const [done, setDone] = useState(false);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const indexRef = useRef(0);

  // Trigger typing after delay
  useEffect(() => {
    if (!animate || started) return;
    const t = setTimeout(() => setStarted(true), startDelay * 1000);
    return () => clearTimeout(t);
  }, [animate]); // eslint-disable-line react-hooks/exhaustive-deps

  // Cursor blink — starts when typing starts
  useEffect(() => {
    const el = cursorRef.current;
    if (!el || !started) return;
    const anim = gsap.to(el, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
    return () => { anim.kill(); };
  }, [started, cursorBlinkDuration]);

  // Typing interval
  useEffect(() => {
    if (!started || done) return;
    const interval = setInterval(() => {
      const next = indexRef.current + 1;
      setDisplayedText(text.slice(0, next));
      indexRef.current = next;
      if (next >= text.length) {
        clearInterval(interval);
        setDone(true);
        onComplete?.();
      }
    }, typingSpeed);
    return () => clearInterval(interval);
  }, [started]); // eslint-disable-line react-hooks/exhaustive-deps

  // Suppress background/padding decorations until the first character appears
  const activeStyle: React.CSSProperties = {
    display: "inline",
    whiteSpace: "pre-wrap",
    ...style,
    ...(displayedText.length === 0 && {
      backgroundColor: "transparent",
      padding: 0,
    }),
  };

  return (
    <span
      className={className}
      style={activeStyle}
    >
      {displayedText}
      {showCursor && started && !done && (
        <span
          ref={cursorRef}
          style={{ marginLeft: "1px", display: "inline-block", opacity: 1 }}
        >
          {cursorCharacter}
        </span>
      )}
    </span>
  );
}
