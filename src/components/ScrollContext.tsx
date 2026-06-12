/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import Lenis from "@studio-freight/lenis";

interface ScrollContextValue {
  lenis: Lenis | null;
}

const ScrollContext = createContext<ScrollContextValue>({ lenis: null });

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const instance = new Lenis({
      duration: 0.8,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    setLenis(instance);

    let rafId = requestAnimationFrame(function onFrame(time: number) {
      instance.raf(time);
      rafId = requestAnimationFrame(onFrame);
    });

    return () => {
      cancelAnimationFrame(rafId);
      instance.destroy();
    };
  }, []);

  return (
    <ScrollContext.Provider value={{ lenis }}>
      {children}
    </ScrollContext.Provider>
  );
}

export function useLenis() {
  return useContext(ScrollContext);
}