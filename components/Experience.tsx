"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { ArrowRight, ArrowUpRight, X } from "lucide-react";

/* ---------------- content: replace files in /public/media ---------------- */
const P = (n: number) => `/media/p${String(n).padStart(2, "0")}.jpg`;
const COORD = "41.2995° N, 69.2401° E";
const CHAPTERS = [["OVERVIEW", "top"], ["TRAINING", "training"], ["CLUB", "club"], ["MEMBERSHIP", "membership"]] as const;
const DISCIPLINES = [
  ["01", "TRAINING", "Strength, technique and the daily practice of showing up.", P(1)],
  ["02", "PERFORMANCE", "Measured work for athletes who want to be faster, stronger, sharper.", P(2)],
  ["03", "CONDITIONING", "Engines built slowly. Intervals, circuits, breath.", P(3)],
  ["04", "COMMUNITY", "Same time, same people. Nobody trains alone here.", P(4)],
] as const;
const VERSIONS = {
  strength: { name: "STRENGTH", img: P(22), lead: "Heavy, slow, honest.", specs: [["Format", "Small groups"], ["Focus", "Barbell, technique"], ["Rhythm", "3× per week"]] },
  conditioning: { name: "CONDITIONING", img: P(23), lead: "Light on the feet, hard on the lungs.", specs: [["Format", "Circuits"], ["Focus", "Engine, mobility"], ["Rhythm", "4× per week"]] },
} as const;
const PANELS = [
  ["01", "TRAINING FLOOR", "Iron, chalk, daylight", P(5)],
  ["02", "RECOVERY", "Heat, silence, breath", P(6)],
  ["03", "LOUNGE", "Where the day slows down", P(7)],
  ["04", "COMMUNITY", "Same time. Same people.", P(8)],
] as const;

/* ---------------- building blocks ---------------- */
const Lines = ({ t, className = "" }: { t: string[]; className?: string }) => (
  <div data-reveal className={className}>
    {t.map((x) => (
      <span key={x} className="line block overflow-hidden"><span className="inner block will-change-transform">{x}</span></span>
    ))}
  </div>
);

const Media = ({ src, className = "", reveal = true, imgClass = "", cursor = "VIEW" }: { src: string; className?: string; reveal?: boolean; imgClass?: string; cursor?: string }) => (
  <div {...(reveal ? { "data-img": "" } : {})} {...(cursor ? { "data-cursor": cursor } : {})} className={`relative overflow-hidden bg-[#151515] ${className}`}>
    <div data-zoom className="absolute inset-0">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img data-par src={src} alt="" loading="lazy" decoding="async" onError={(e) => (e.currentTarget.style.display = "none")}
        className={imgClass || "absolute -top-[9%] left-0 h-[118%] w-full object-cover"} />
    </div>
  </div>
);

const Video = ({ src, poster }: { src: string; poster: string }) => (
  <video className="absolute inset-0 h-full w-full object-cover" src={src} poster={poster} autoPlay muted loop playsInline preload="metadata" aria-hidden />
);

/** Chapter opener: full-bleed media, giant title, coordinates — the lookbook's signature move */
const Chapter = ({ id, n, title, img, place }: { id: string; n: string; title: string[]; img: string; place: string }) => (
  <section id={id} data-chapter className="relative flex h-[100svh] flex-col justify-end overflow-hidden bg-ink px-5 pb-24 md:px-8 md:pb-14">
    <Media src={img} reveal={false} cursor="" className="!absolute inset-0" />
    <div className="absolute inset-0 bg-ink/45" />
    <div className="meta relative mb-6 flex justify-between"><span>Chapter {n}</span><span>{place} {COORD}</span></div>
    <Lines className="huge relative" t={title} />
  </section>
);

/* ------------------------------------------------------------------ */
export default function Experience() {
  const root = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);
  const hWrap = useRef<HTMLDivElement>(null);
  const hTrack = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const stick = useRef<HTMLDivElement>(null);
  const [chap, setChap] = useState(0);
  const [active, setActive] = useState(0);
  const [label, setLabel] = useState("");
  const [fine, setFine] = useState(false);
  const [ver, setVer] = useState<keyof typeof VERSIONS>("strength");
  const [modal, setModal] = useState(false);
  const V = VERSIONS[ver];

  const go = (id: string) => lenisRef.current?.scrollTo(id === "top" ? 0 : `#${id}`, { duration: 1.6 });

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isFine = matchMedia("(pointer: fine) and (min-width: 768px)").matches;
    setFine(isFine);

    const lenis = new Lenis({ lerp: 0.09, smoothWheel: !reduce });
    lenisRef.current = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
    lenis.on("scroll", ({ direction, scroll }: { direction: number; scroll: number }) => {
      if (navRef.current) gsap.to(navRef.current, { yPercent: direction === 1 && scroll > 500 ? -130 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
    });

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      const $ = <T extends HTMLElement>(s: string) => gsap.utils.toArray<T>(s);
      if (reduce) { gsap.set("[data-loader]", { display: "none" }); lenis.start(); return; }

      /* hero intro */
      const hero = gsap.timeline({ paused: true, defaults: { ease: "power4.out" } });
      hero.fromTo("[data-herovideo]", { scale: 1.08 }, { scale: 1, duration: 2.6, ease: "power3.out" }, 0)
        .from("[data-nav] > *", { autoAlpha: 0, y: -14, stagger: 0.06, duration: 1 }, 0.2)
        .from("[data-hmeta] > *", { autoAlpha: 0, y: 12, stagger: 0.1, duration: 1 }, 0.4)
        .from("[data-hline] .inner", { yPercent: 115, duration: 1.4, stagger: 0.12 }, 0.6)
        .from("[data-hbottom] > *", { autoAlpha: 0, duration: 1, stagger: 0.1 }, 1.4);

      /* loader: 00% counter + four photographs, then wordmark */
      const num = { v: 0 };
      const counter = document.querySelector("[data-count]");
      const load = gsap.timeline({ defaults: { ease: "power4.out" } });
      load.to(num, { v: 100, duration: 2.6, ease: "power2.inOut", onUpdate: () => { if (counter) counter.textContent = String(Math.round(num.v)).padStart(2, "0") + "%"; } })
        .fromTo("[data-lph]", { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0% 0 0 0)", duration: 1, stagger: 0.55 }, 0.1)
        .to("[data-lph], [data-count]", { autoAlpha: 0, duration: 0.5, ease: "power2.in" }, ">0.2")
        .from("[data-l1] .inner", { yPercent: 110, duration: 1.2 }, ">-0.1")
        .from("[data-l2] > *", { autoAlpha: 0, y: 10, stagger: 0.12, duration: 0.8 }, "-=0.6")
        .to("[data-l1] .inner, [data-l2]", { autoAlpha: 0, duration: 0.5, ease: "power2.in" }, "+=0.6")
        .to("[data-loader]", { clipPath: "inset(0 0 100% 0)", duration: 1.1, ease: "power4.inOut" })
        .add(() => { lenis.start(); hero.play(); }, "-=0.7")
        .set("[data-loader]", { display: "none" });

      /* hero scroll drift */
      gsap.to("[data-hcontent]", { yPercent: -12, opacity: 0.2, ease: "none", scrollTrigger: { trigger: "#top", start: "top top", end: "bottom top", scrub: true } });
      gsap.to("[data-hfade]", { opacity: 1, ease: "none", scrollTrigger: { trigger: "#top", start: "60% top", end: "bottom top", scrub: true } });

      /* reveals */
      $("[data-reveal]").forEach((el) =>
        gsap.from(el.querySelectorAll(".inner"), { yPercent: 115, duration: 1.3, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: el, start: "top 88%" } }));
      $("[data-img]").forEach((el) => {
        const st = { trigger: el, start: "top 90%" };
        gsap.fromTo(el, { clipPath: "inset(0 100% 0 0)" }, { clipPath: "inset(0 0% 0 0)", duration: 1.4, ease: "power4.out", scrollTrigger: st });
        gsap.fromTo(el.querySelector("[data-zoom]"), { scale: 1.12 }, { scale: 1, duration: 1.8, ease: "power4.out", scrollTrigger: st });
      });
      $("[data-phil]").forEach((el) => {
        gsap.fromTo(el.querySelectorAll(".inner"), { yPercent: 110, opacity: 0, scale: 0.96, clipPath: "inset(0 0 100% 0)" },
          { yPercent: 0, opacity: 1, scale: 1, clipPath: "inset(0 0 0% 0)", ease: "power4.out", duration: 1.4, stagger: 0.14, scrollTrigger: { trigger: el, start: "top 70%" } });
        gsap.to(el, { opacity: 0.15, ease: "none", scrollTrigger: { trigger: el, start: "bottom 35%", end: "bottom top", scrub: true } });
      });

      /* chapter tracking + sticky discipline switching */
      $("[data-chapter]").forEach((el, i) => ScrollTrigger.create({ trigger: el, start: "top 55%", end: "bottom 55%", onToggle: (s) => s.isActive && setChap(i) }));
      $("[data-disc]").forEach((el, i) => ScrollTrigger.create({ trigger: el, start: "top 60%", end: "bottom 60%", onToggle: (s) => s.isActive && setActive(i) }));

      mm.add({ desk: "(min-width: 768px)" }, (c) => {
        const desk = !!c.conditions?.desk;
        const amt = desk ? 7 : 3;
        $("[data-img]").forEach((el) => {
          const img = el.querySelector("[data-par]");
          if (img) gsap.fromTo(img, { yPercent: -amt }, { yPercent: amt, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });
        $("[data-speed]").forEach((el) => {
          const s = parseFloat(el.dataset.speed || "0") * (desk ? 1 : 0.4);
          gsap.fromTo(el, { y: s * 90 }, { y: -s * 90, ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true } });
        });
        /* horizontal scroll: pinned on desktop/tablet, native swipe rail on phones */
        if (desk && hWrap.current && hTrack.current) {
          const track = hTrack.current;
          const dist = () => track.scrollWidth - window.innerWidth;
          const tw = gsap.to(track, { x: () => -dist(), ease: "none",
            scrollTrigger: { trigger: hWrap.current, pin: true, scrub: 1, start: "top top", end: () => "+=" + dist(), invalidateOnRefresh: true, anticipatePin: 1 } });
          track.querySelectorAll("[data-hpar]").forEach((img) =>
            gsap.fromTo(img, { xPercent: -7 }, { xPercent: 7, ease: "none", scrollTrigger: { trigger: img.parentElement!.parentElement, containerAnimation: tw, start: "left right", end: "right left", scrub: true } }));
        }
      });

      if (isFine) $("[data-magnetic]").forEach((el) => {
        const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" });
        el.addEventListener("mousemove", (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - (r.left + r.width / 2)) * 0.22); yTo((e.clientY - (r.top + r.height / 2)) * 0.3); });
        el.addEventListener("mouseleave", () => { xTo(0); yTo(0); });
      });
    }, root);

    let off = () => {};
    if (isFine && cursorRef.current) {
      const cur = cursorRef.current;
      gsap.set(cur, { xPercent: -50, yPercent: -50 });
      const cx = gsap.quickTo(cur, "x", { duration: 0.35, ease: "power3.out" });
      const cy = gsap.quickTo(cur, "y", { duration: 0.35, ease: "power3.out" });
      const move = (e: MouseEvent) => { cx(e.clientX); cy(e.clientY); };
      const over = (e: MouseEvent) => setLabel((e.target as HTMLElement).closest<HTMLElement>("[data-cursor]")?.dataset.cursor || "");
      window.addEventListener("mousemove", move); window.addEventListener("mouseover", over);
      off = () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
    }
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    return () => { off(); window.removeEventListener("load", refresh); mm.revert(); ctx.revert(); gsap.ticker.remove(tick); lenis.destroy(); };
  }, []);

  /* sticky image swap */
  useEffect(() => {
    stick.current?.querySelectorAll<HTMLElement>("[data-pv]").forEach((el, i) => {
      if (i === active) gsap.fromTo(el, { clipPath: "inset(100% 0 0 0)", zIndex: 2 }, { clipPath: "inset(0% 0 0 0)", duration: 0.9, ease: "power4.out" });
      else gsap.set(el, { zIndex: 1, delay: 0.9 });
    });
  }, [active]);

  /* video modal: lock scroll */
  useEffect(() => { modal ? lenisRef.current?.stop() : lenisRef.current?.start(); }, [modal]);

  return (
    <div ref={root} className="relative">
      {/* ===== LOADER ===== */}
      <div data-loader className="fixed inset-0 z-[100] bg-ink" style={{ clipPath: "inset(0 0 0% 0)" }}>
        {[[P(1), "left-[8%] top-[14%] w-[26vw] md:w-[14vw]"], [P(2), "right-[10%] top-[10%] w-[30vw] md:w-[16vw]"], [P(3), "left-[14%] bottom-[22%] w-[30vw] md:w-[15vw]"], [P(4), "right-[8%] bottom-[16%] w-[26vw] md:w-[13vw]"]].map(([s, c]) => (
          <div key={s} data-lph className={`absolute aspect-[3/4] overflow-hidden bg-[#1b1b1b] ${c}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={s} alt="" onError={(e) => (e.currentTarget.style.display = "none")} className="h-full w-full object-cover" />
          </div>
        ))}
        <div className="meta absolute left-5 top-6 md:left-8">Forteen Club — Sport, 2026</div>
        <div data-count className="absolute bottom-5 right-5 text-5xl font-extrabold tracking-[-0.06em] md:bottom-8 md:right-8 md:text-8xl">00%</div>
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
          <span data-l1 className="line block overflow-hidden"><span className="inner block text-[16vw] font-extrabold uppercase leading-[.85] tracking-[-0.06em] md:text-[9vw]">Forteen</span></span>
          <div data-l2 className="meta mt-6 flex gap-8 text-mute"><span>Sport Club</span><span>Tashkent / Uzbekistan</span></div>
        </div>
      </div>

      {/* ===== CURSOR ===== */}
      {fine && (
        <div ref={cursorRef} aria-hidden className={`pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center rounded-full bg-accent text-[10px] font-bold tracking-[.14em] text-ink transition-[width,height] duration-300 ease-out ${label ? "h-20 w-20" : "h-3 w-3"}`}>
          {label && (label === "→" ? <ArrowRight size={18} /> : label)}
        </div>
      )}

      {/* ===== CHAPTER NAV ===== */}
      <header ref={navRef} className="fixed inset-x-0 top-0 z-50 hidden mix-blend-difference md:block">
        <nav data-nav className="meta grid grid-cols-3 items-center px-8 py-6 text-white">
          <button onClick={() => go("top")} className="justify-self-start text-sm font-extrabold tracking-[-0.03em]">FORTEEN</button>
          <div className="flex justify-center gap-9">
            {CHAPTERS.map(([n, id], i) => (
              <button key={id} onClick={() => go(id)} className="relative pb-1">
                {n}<span className={`absolute inset-x-0 bottom-0 h-px origin-left bg-white transition-transform duration-500 ${chap === i ? "scale-x-100" : "scale-x-0"}`} />
              </button>
            ))}
          </div>
          <button onClick={() => go("membership")} data-cursor="→" className="flex items-center gap-1 justify-self-end">JOIN <ArrowUpRight size={12} /></button>
        </nav>
      </header>
      <div className="meta fixed bottom-6 left-8 z-50 hidden text-white mix-blend-difference md:block">
        {String(chap + 1).padStart(2, "0")} / {String(CHAPTERS.length).padStart(2, "0")} <span className="ml-3 opacity-60">{CHAPTERS[chap][0]}</span>
      </div>
      <nav className="meta fixed inset-x-0 bottom-0 z-50 flex justify-between bg-ink/85 px-5 py-4 backdrop-blur md:hidden">
        {CHAPTERS.map(([n, id], i) => <button key={id} onClick={() => go(id)} className={chap === i ? "text-accent" : "text-paper"}>{n}</button>)}
      </nav>

      <main>
        {/* ================= CHAPTER 01 · OVERVIEW ================= */}
        <section id="top" data-chapter className="relative h-[100svh] overflow-hidden bg-ink">
          <div data-herovideo className="absolute inset-0 will-change-transform"><Video src="/media/hero.mp4" poster="/media/hero.jpg" /><div className="absolute inset-0 bg-ink/35" /></div>
          <div data-hfade className="absolute inset-0 bg-paper opacity-0" />
          <div data-hcontent className="relative flex h-full flex-col justify-end px-5 pb-24 md:px-8 md:pb-14">
            <div data-hmeta className="meta mb-8 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
              <span>Tashkent / Uzbekistan</span>
              <span className="max-w-[26ch] text-paper/80 md:text-right">A sport club built around movement, discipline and community.</span>
            </div>
            <h1 className="huge" aria-label="Forteen. Move with purpose.">
              <span className="meta mb-4 block !font-medium tracking-[.3em] text-paper/70">FORTEEN</span>
              {["MOVE", "WITH", "PURPOSE."].map((w) => <span key={w} data-hline className="line block overflow-hidden"><span className="inner block">{w}</span></span>)}
            </h1>
            <div data-hbottom className="meta mt-8 flex justify-between">
              <span className="hidden md:block">Scroll to explore ↓</span>
              <button onClick={() => setModal(true)} data-cursor="PLAY" className="underline underline-offset-4">Discover full video</button>
            </div>
          </div>
        </section>

        <section className="bg-paper px-5 py-[26vh] text-ink md:px-8 md:py-[38vh]">
          <div className="meta mb-16 md:mb-24">The idea</div>
          <Lines className="big" t={["SPORT IS MORE", "THAN MOVEMENT."]} />
          <Lines className="big mt-[16vh] text-mute md:ml-[18vw]" t={["IT IS DISCIPLINE,", "ENERGY AND CONNECTION."]} />
          <Lines className="mt-20 max-w-[24ch] font-serif text-2xl leading-snug md:ml-[18vw] md:text-4xl" t={["Forteen is a space for people", "who choose to move forward —", "together."]} />
        </section>

        <section className="bg-ink px-5 md:px-8">
          {[["DISCIPLINE", "OVER", "MOTIVATION."], ["CONSISTENCY", "OVER", "INTENSITY."], ["PROGRESS", "OVER", "PERFECTION."]].map((g, i) => (
            <div key={i} data-phil className="flex min-h-[90svh] flex-col justify-center">
              {g.map((w, j) => (
                <span key={w} className="line block overflow-hidden">
                  <span className={`inner huge block ${j === 1 ? "!text-[.32em] !leading-[2.2] tracking-[.2em] text-mute" : ""}`}>{w}</span>
                </span>
              ))}
            </div>
          ))}
        </section>

        {/* ================= CHAPTER 02 · TRAINING ================= */}
        <Chapter id="training" n="02" title={["WHAT", "WE DO."]} img={P(24)} place="Training —" />

        <section className="grid bg-paper text-ink md:grid-cols-2">
          <div ref={stick} className="sticky top-0 z-10 h-[42svh] md:h-[100svh] md:p-8">
            <div className="relative h-full w-full overflow-hidden bg-[#151515]">
              {DISCIPLINES.map(([n, , , img]) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={n} data-pv src={img} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} className="absolute inset-0 h-full w-full object-cover" />
              ))}
              <div className="meta absolute bottom-3 left-3 z-10 text-paper">{DISCIPLINES[active][0]} / 04</div>
            </div>
          </div>
          <div className="px-5 md:px-8">
            {DISCIPLINES.map(([n, name, copy]) => (
              <div key={n} data-disc className="flex min-h-[70svh] flex-col justify-center md:min-h-[100svh]">
                <span className="meta mb-4">{n}</span>
                <Lines className="big" t={[name]} />
                <p className="mt-6 max-w-[30ch] font-serif text-xl leading-snug md:text-3xl">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        {/* two versions of the session — switch like the reference's MH500 / MH900 */}
        <section className="bg-ink px-5 py-[14vh] md:px-8 md:py-[20vh]">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-6">
              <div key={ver} className="relative aspect-[4/5] overflow-hidden bg-[#151515]" data-cursor="">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={V.img} alt="" loading="lazy" onError={(e) => (e.currentTarget.style.display = "none")} className="absolute inset-0 h-full w-full animate-[fade_.8s_ease-out] object-cover" />
              </div>
            </div>
            <div className="flex flex-col justify-between md:col-span-5 md:col-start-8">
              <div className="meta flex gap-6">
                {(Object.keys(VERSIONS) as (keyof typeof VERSIONS)[]).map((k) => (
                  <button key={k} onClick={() => setVer(k)} data-cursor="" className={`border-b pb-1 transition-colors ${ver === k ? "border-accent text-paper" : "border-transparent text-mute"}`}>{VERSIONS[k].name}</button>
                ))}
              </div>
              <div className="my-12">
                <div className="big">{V.name}</div>
                <p className="mt-6 font-serif text-2xl md:text-4xl">{V.lead}</p>
              </div>
              <dl className="meta divide-y divide-paper/15 border-y border-paper/15">
                {V.specs.map(([k, v]) => <div key={k} className="flex justify-between py-4"><dt className="text-mute">{k}</dt><dd>{v}</dd></div>)}
              </dl>
              <button onClick={() => setVer(ver === "strength" ? "conditioning" : "strength")} className="meta mt-6 self-start underline underline-offset-4">Back to the other version</button>
            </div>
          </div>
        </section>

        {/* ================= CHAPTER 03 · CLUB ================= */}
        <Chapter id="club" n="03" title={["THIS IS", "FORTEEN."]} img={P(9)} place="Chilonzor —" />

        <section className="bg-[#0d0d0d]">
          <div ref={hWrap} className="h-[100svh] snap-x snap-mandatory overflow-x-auto overflow-y-hidden md:snap-none md:overflow-hidden [scrollbar-width:none]">
            <div ref={hTrack} className="flex h-full w-max items-center gap-4 px-5 md:gap-10 md:px-8">
              <div className="flex h-full w-[82vw] shrink-0 snap-start flex-col justify-end pb-24 md:w-[60vw] md:pb-16">
                <Lines className="font-serif text-3xl leading-tight md:text-5xl" t={["A place built around movement.", "A place built around people.", "A place built to keep you moving."]} />
                <div className="meta mt-8 text-mute">Swipe / scroll →</div>
              </div>
              {PANELS.map(([n, title, sub, img], i) => (
                <article key={n} className={`flex h-[72svh] w-[82vw] shrink-0 snap-center flex-col md:h-[78vh] md:w-[52vw] ${i % 2 ? "md:mt-24" : "md:-mt-12"}`}>
                  <Media src={img} reveal={false} className="min-h-0 flex-1" imgClass="absolute top-0 -left-[8%] h-full w-[116%] max-w-none object-cover" />
                  <div className="meta mt-4 flex items-baseline justify-between">
                    <span><span className="text-accent">{n}</span> / {title}</span><span className="hidden text-mute md:inline">{COORD}</span>
                  </div>
                  <span className="meta mt-1 text-mute md:hidden">{sub}</span>
                </article>
              ))}
              <div className="meta w-[30vw] shrink-0 text-mute">Tashkent — 2026</div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden bg-ink px-5 py-[16vh] md:px-8 md:py-[22vh]">
          <Lines className="big" t={["MORE THAN", "A WORKOUT."]} />
          <div className="mt-16 grid grid-cols-12 gap-y-10 md:mt-24 md:gap-y-0">
            <div data-speed="0.35" className="col-span-8 md:col-span-4"><Media src={P(12)} className="aspect-[3/4]" /><p className="meta mt-3 text-mute">01 / Forteen Club</p></div>
            <div data-speed="-0.5" className="col-span-5 col-start-8 md:col-span-2 md:col-start-6 md:mt-[14vw]"><Media src={P(13)} className="aspect-square" /><p className="meta mt-3 text-mute">02 / Detail</p></div>
            <div data-speed="0.8" className="col-span-7 md:col-span-3 md:col-start-9"><Media src={P(14)} className="aspect-[4/5]" /><p className="meta mt-3 text-mute">03 / Training</p></div>
            <Lines className="col-span-12 py-8 font-serif text-3xl italic leading-tight md:col-span-5 md:col-start-2 md:mt-[6vw] md:text-5xl" t={["A COMMUNITY", "THAT MOVES", "TOGETHER."]} />
            <div data-speed="-0.3" className="col-span-9 col-start-4 md:col-span-3 md:col-start-8 md:mt-[6vw]"><Media src={P(15)} className="aspect-[3/4]" /><p className="meta mt-3 text-mute">04 / Community</p></div>
          </div>
        </section>

        {/* ================= CHAPTER 04 · MEMBERSHIP ================= */}
        <section id="membership" data-chapter className="bg-paper px-5 pb-[18vh] pt-[22vh] text-ink md:px-8 md:pt-[28vh]">
          <div className="meta mb-12 flex justify-between"><span>Chapter 04</span><span>{COORD}</span></div>
          <Lines className="huge" t={["BECOME", "PART OF", "FORTEEN."]} />
          <div className="mt-16 flex flex-col gap-12 md:mt-24 md:flex-row md:items-end md:justify-between">
            <p className="max-w-[30ch] font-serif text-2xl leading-snug md:text-3xl">Membership gives you access to the club, training and a community built around movement.</p>
            <a href="https://t.me/forteenclub" data-cursor="→" data-magnetic className="group relative inline-flex items-center gap-4 self-start overflow-hidden border border-ink px-8 py-5 text-sm font-bold uppercase tracking-[.08em] transition-colors duration-500 hover:text-paper">
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-500 ease-[cubic-bezier(.7,0,.2,1)] group-hover:scale-y-100" />
              <span className="relative">Become a member</span>
              <ArrowRight size={16} className="relative transition-transform duration-500 group-hover:translate-x-2" />
            </a>
          </div>
        </section>

        <section className="relative flex h-[100svh] flex-col justify-between overflow-hidden bg-ink px-5 pb-24 pt-28 md:px-8 md:pb-16">
          <Video src="/media/cta.mp4" poster="/media/cta.jpg" />
          <div className="absolute inset-0 bg-ink/65" />
          <Lines className="huge relative" t={["SEE YOU", "AT FORTEEN."]} />
          <div className="relative flex items-end justify-between">
            <span className="meta">Ready to move?</span>
            <a href="https://t.me/forteenclub" data-cursor="→" data-magnetic className="group flex items-center gap-4 border border-paper px-8 py-5 text-sm font-bold uppercase tracking-[.08em] transition-colors duration-500 hover:bg-paper hover:text-ink">
              Join the club <ArrowRight size={16} className="transition-transform duration-500 group-hover:translate-x-2" />
            </a>
          </div>
        </section>
      </main>

      <footer className="overflow-hidden bg-ink px-5 pb-16 pt-20 md:px-8 md:pb-0">
        <div className="meta grid grid-cols-2 gap-y-10 md:grid-cols-4">
          <div>FORTEEN<br /><span className="text-mute">Tashkent<br />Uzbekistan</span></div>
          <div className="flex flex-col gap-2">
            <span className="text-mute">Follow us</span>
            <a href="https://instagram.com/forteenclub" className="flex items-center gap-1 hover:text-accent">Instagram <ArrowUpRight size={11} /></a>
            <a href="https://t.me/forteenclub" className="flex items-center gap-1 hover:text-accent">Telegram <ArrowUpRight size={11} /></a>
            <a href="mailto:hello@forteen.club" className="hover:text-accent">Contact</a>
          </div>
          <div className="col-span-2 text-mute md:text-right">© 2026 Forteen Club</div>
        </div>
        <div aria-hidden className="mt-16 select-none text-[24vw] font-extrabold uppercase leading-[.72] tracking-[-0.07em] md:-mb-[1.2vw]">Forteen</div>
      </footer>

      {/* ===== FULL VIDEO MODAL ===== */}
      <div role="dialog" aria-hidden={!modal} className={`fixed inset-0 z-[96] bg-ink transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(.7,0,.2,1)] ${modal ? "opacity-100 [clip-path:inset(0)]" : "pointer-events-none opacity-0 [clip-path:inset(100%_0_0_0)]"}`}>
        {modal && <video src="/media/full.mp4" poster="/media/hero.jpg" autoPlay controls playsInline className="h-full w-full object-contain" />}
        <button onClick={() => setModal(false)} data-cursor="" className="meta absolute right-5 top-5 flex items-center gap-2 md:right-8 md:top-6">Close <X size={14} /></button>
      </div>
    </div>
  );
}