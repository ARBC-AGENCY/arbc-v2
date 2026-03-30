"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { pageTransitionIn } from "@/lib/pageTransitions";
import { hasSeenIntroRecently, markIntroSeen } from "@/lib/introGate";

interface TransitionContextValue {
  navigate: (href: string, label: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
});

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigating = useRef(false);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  const navigate = (href: string, label: string) => {
    // Prevent double-fires
    if (isNavigating.current) return;

    // Redirect home → explore if the user has already seen the intro recently
    let targetHref = href;
    let targetLabel = label;
    if (href === "/" && hasSeenIntroRecently()) {
      targetHref = "/explore";
      targetLabel = "Explore";
    }

    // Prevent same-page transitions
    if (targetHref === pathnameRef.current) return;

    // Stamp departure from home so subsequent "/" links go to explore
    if (pathnameRef.current === "/") markIntroSeen();

    isNavigating.current = true;

    const tl = pageTransitionIn(targetLabel);

    // Push the route ~550 ms in — the overlay has covered the screen by then
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.push(targetHref as any);
    }, 550);

    // once-in spring is fired inside the timeline via tl.call() — no separate
    // pageTransitionOut needed here. Just reset the lock when done.
    tl.then(() => {
      isNavigating.current = false;
    });
  };

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionContext() {
  return useContext(TransitionContext);
}
