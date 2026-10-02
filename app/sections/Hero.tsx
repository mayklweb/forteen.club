"use client";

import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { useEffect, useRef } from "react";

gsap.registerPlugin(CustomEase);

CustomEase.create("custom", "0, 0.8, 1, 1");

const VIDEO_URL =
  "https://quechua-lookbook.com/ss25/wp-content/uploads/2025/01/loop-2.mp4";

const rotatePositions = [5.5, -5, 5.5, -5];

export function Hero() {
  const hero = useRef<HTMLDivElement>(null);
  const images = useRef<HTMLDivElement[]>([]);
  const video = useRef<HTMLVideoElement>(null);
  const title = useRef<HTMLDivElement>(null);
  const loader = useRef<HTMLDivElement>(null);

  console.log(title.current);

  useEffect(() => {
    const imgItems = images.current.filter(Boolean);
    const titleLines =
      title.current?.querySelectorAll(".hero-title-line") ?? [];

    const ctx = gsap.context(() => {
      gsap.set(titleLines, {
        yPercent: 100,
      });

      gsap.set(imgItems, {
        rotate: (i) => rotatePositions[i],
      });

      gsap.set(video.current, {
        rotate: 5.5,
      });

      // Header above everything during loading
      const tl = gsap.timeline({
        delay: 0.5,
      });

      // Images
      tl.to(imgItems, {
        scale: 1,
        duration: 0.5,
        ease: "custom",
        stagger: 0.5,
      });

      // Video
      tl.to(video.current, {
        scale: 1,
        rotate: 0,
        duration: 1,
        ease: "0, 0, 0, 1",
      });

      tl.to(loader.current, {
        zIndex: 2,
        duration: 0.5,
        ease: "custom",
        onComplete: () => {
          window.dispatchEvent(new Event("loaderComplete"));
        },
      });

      tl.to(
        titleLines,
        {
          yPercent: 0,
          duration: 0.8,
          ease: "0.3, 0, 0, 1",
        },
        "-=0.4",
      );
    }, hero);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={hero}
      className="relative h-dvh w-full overflow-hidden bg-[#F5F4EF]"
    >
      <div ref={loader} className="bg-[#F5F4EF] w-full h-full relative z-[100]">
        {/* Intro images */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) images.current[i] = el;
            }}
            className="absolute left-1/2 top-1/2 h-[200px] w-[260px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl scale-0"
          >
            <img
              src="/media/image.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        {/* Hero video */}
        <video
          ref={video}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 h-full w-full object-cover scale-0"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </div>

      <div
        ref={title}
        className="absolute inset-0 z-20 flex items-center justify-center px-5"
      >
        <h1 className="text-center text-[clamp(3rem,8vw,9rem)] font-medium  tracking-tighter text-[#F5F4EF]">
          <span className="block overflow-hidden">
            <span className="hero-title-line block leading-[80%] ">
              Find freedom
            </span>
          </span>

          <span className="block overflow-hidden">
            <span className="hero-title-line block leading-[120%] ">
              in every move
            </span>
          </span>
        </h1>
      </div>
    </section>
  );
}
