"use client";

import { useEffect, useRef, useState } from "react";

const NXANCE_IMAGE = "/nxance%20image.svg";

export default function ProductShowcase() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-[#f8f9fc] px-4 pb-10 pt-4 sm:px-6 sm:pb-14 md:pb-16 lg:px-8"
      aria-label="Product preview"
    >
      {/* Ambient glow — pulses like a live demo */}
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[42%] transition-opacity duration-1000 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        <div className="animate-showcase-glow h-[min(90vw,720px)] w-[min(95vw,1100px)] rounded-full bg-gradient-to-r from-[#2563eb]/20 via-[#7c3aed]/25 to-[#2563eb]/15 blur-3xl" />
      </div>

      <div
        className={`relative mx-auto w-full max-w-6xl transition-all duration-1000 ease-out ${
          visible
            ? "translate-y-0 opacity-100"
            : "translate-y-16 opacity-0"
        }`}
      >
        <div className="animate-showcase-float mx-auto w-full max-w-5xl">
          <div className="animate-showcase-ken-burns origin-center overflow-hidden rounded-2xl shadow-[0_24px_80px_rgba(15,23,42,0.12)] sm:rounded-3xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={NXANCE_IMAGE}
              alt="Nxance AI dashboard on a desktop monitor showing portfolio analytics, AI insights, and wealth management tools"
              className="h-auto w-full select-none"
              draggable={false}
              loading="eager"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
