"use client";
import { useEffect, useRef } from "react";
export function ScrollVideoHero() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const box = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = canvas.current,
      section = box.current;
    if (!node || !section) return;
    const context = node.getContext("2d");
    if (!context) return;
    let disposed = false;
    let raf = 0;
    const frames: HTMLImageElement[] = [];
    let loaded = false;
    const draw = () => {
      raf = 0;
      const r = section.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const progress = Math.min(
        1,
        Math.max(0, (innerHeight - r.top) / (innerHeight + r.height)),
      );
      const target = Math.max(1, Math.ceil(progress * 180));
      for (let i = target; i >= 1; i--) {
        if (frames[i]?.complete && frames[i].naturalWidth) {
          context.drawImage(frames[i], 0, 0, 1280, 720);
          break;
        }
      }
    };
    const scroll = () => {
      if (!raf) raf = requestAnimationFrame(draw);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loaded) {
          loaded = true;
          for (let i = 1; i <= 180; i++) {
            const image = new Image();
            image.src = `/frames/frame-${String(i).padStart(4, "0")}.jpg`;
            image.onload = () => {
              if (!disposed) scroll();
            };
            frames[i] = image;
          }
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(section);
    window.addEventListener("scroll", scroll, { passive: true });
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  return (
    <div
      ref={box}
      className="relative overflow-hidden bg-[#0a0a09] aspect-[16/10]"
      aria-label="Exploración visual de una publicación de arquitectura"
    >
      <div className="absolute inset-0 bg-[url('/frames/frame-0001.jpg')] bg-cover bg-center" />
      <canvas
        ref={canvas}
        width={1280}
        height={720}
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      <span className="absolute bottom-5 left-5 eyebrow text-[#e7ded1]">
        Cuaderno conceptual / Umbral
      </span>
    </div>
  );
}
