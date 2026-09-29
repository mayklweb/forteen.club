// app/provider.tsx
"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function Provider({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // scroll silliqligini boshqaradi (0–1 oralig‘ida)
      wheelMultiplier: 0.5, // g‘ildirak tezligini boshqaradi
      touchMultiplier: 1.5, // mobil uchun tezlik
      infinite: false, // infinite scroll yo‘q bo‘lsa false
    });
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return <>{children}</>;
}
