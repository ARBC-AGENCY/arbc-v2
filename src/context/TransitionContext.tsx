"use client";

import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { pageTransitionIn, pageTransitionOut } from "@/lib/pageTransitions";

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
    // Prevent double-fires and same-page transitions
    if (isNavigating.current) return;
    if (href === pathnameRef.current) return;

    isNavigating.current = true;

    const tl = pageTransitionIn(label);

    // Push the route ~550 ms in — the overlay has covered the screen by then
    const timer = setTimeout(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      router.push(href as any);
    }, 550);

    // After the full animation completes (~2 s), spring in the new page content
    tl.then(() => {
      clearTimeout(timer); // safety — shouldn't fire after tl ends
      pageTransitionOut();
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
