"use client";

import gsap from "gsap";
import React, { useEffect, useRef } from "react";

export function Header() {
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    const showHeader = () => {
      gsap.to(header.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power3.inOut",
      });
    };

    window.addEventListener("loaderComplete", showHeader);

    return () => {
      window.removeEventListener("loaderComplete", showHeader);
    };
  }, []);

  return (
    <header
      ref={header}
      className="fixed top-5 z-40 w-full opacity-0 "
    >
      <div className="mx-auto max-w-[1600px] px-5">
        <div className="flex w-full items-center justify-between">
          <button
            type="button"
            className="flex gap-2 rounded-full bg-[#2A2928]/50 px-5 py-1.5 tracking-tight text-[#F5F4EF] backdrop-blur-[10px]"
          >
            Menu
          </button>

          <h1 className="text-2xl font-bold tracking-tight">Forteen</h1>

          <button
            type="button"
            className="flex gap-2 rounded-full bg-[#2A2928]/50 px-5 py-2 tracking-tight text-[#F5F4EF] backdrop-blur-[10px]"
          >
            Join Forteen
          </button>
        </div>
      </div>
    </header>
  );
}
