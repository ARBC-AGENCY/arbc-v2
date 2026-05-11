"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { pageTransitionIn } from "@/lib/pageTransitions";
import { hasSeenIntroRecently, markIntroSeen } from "@/lib/introGate";

interface TransitionContextValue {
  navigate: (href: string, label: string) => void;
  navigateBack: (label: string) => void;
}

const TransitionContext = createContext<TransitionContextValue>({
  navigate: () => {},
  navigateBack: () => {},
});

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const isNavigating = useRef(false);
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;
  const pendingResume = useRef<(() => void) | null>(null);

  // When Next.js commits the new page (pathname changes), release the overlay.
  useEffect(() => {
    if (pendingResume.current) {
      pendingResume.current();
      pendingResume.current = null;
    }
  }, [pathname]);

  const navigate = (href: string, label: string) => {
    // Prevent double-fires
    if (isNavigating.current) return;

    // Redirect home → explore if the user has already seen the intro recently
    let targetHref = href;
    let targetLabel = label;
    if (href === "/" && hasSeenIntroRecently()) {
      targetHref = "/projects";
      targetLabel = "projects";
    }

    // Prevent same-page transitions
    if (targetHref === pathnameRef.current) return;

    // Stamp departure from home so subsequent "/" links go to explore
    if (pathnameRef.current === "/") markIntroSeen();

    isNavigating.current = true;

    const { tl, resume } = pageTransitionIn(targetLabel);
    pendingResume.current = resume;

    // Push the route ~550 ms in — the overlay has covered the screen by then
    setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.push(targetHref as any);
    }, 550);

    tl.then(() => {
      isNavigating.current = false;
    });
  };

  const navigateBack = (label: string) => {
    if (isNavigating.current) return;
    isNavigating.current = true;

    const { tl, resume } = pageTransitionIn(label);
    pendingResume.current = resume;

    setTimeout(() => {
      router.back();
    }, 550);

    tl.then(() => {
      isNavigating.current = false;
    });
  };

  return (
    <TransitionContext.Provider value={{ navigate, navigateBack }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useTransitionContext() {
  return useContext(TransitionContext);
}
