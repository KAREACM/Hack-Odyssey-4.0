import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ClickIndicator from "./ClickIndicator";
import RegisterButton from "../Buttons/RegisterButton";
import "./overlay.css";

gsap.registerPlugin(ScrollTrigger);

const MAP_URL = "https://maps.app.goo.gl/qYQocWWcx1YJ5Kax6";

const MapLink = () => {
  const [active, setActive] = useState(false);
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
      });

      // 1. Whisper-quiet Eyebrow
      tl.from(".venue-eyebrow", {
        opacity: 0,
        y: 14,
        duration: 0.6,
        ease: "power3.out",
      })
        // 2. Main Editorial Statement (unified typography)
        .from(
          ".venue-title-text",
          {
            opacity: 0,
            y: 30,
            stagger: 0.12,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.3"
        )
        // 3. Mobile CTA button
        .from(
          ".venue-mobile-cta",
          {
            opacity: 0,
            scale: 0.95,
            duration: 0.5,
            ease: "power2.out",
          },
          "-=0.3"
        )
        // 4. Architectural Metadata baseline
        .from(
          ".venue-meta-col",
          {
            opacity: 0,
            y: 18,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.35"
        );
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="venue"
      ref={sectionRef}
      aria-label="Venue location and map navigation"
      className="venue-section relative w-full min-h-[85vh] bg-[#030206] flex flex-col justify-between items-center text-center px-6 sm:px-12 md:px-16 pt-36 sm:pt-44 lg:pt-52 pb-24 sm:pb-32 select-none overflow-hidden"
    >
      {/* ─── Subtle Ambient Atmospheric Glow (Whisper-quiet) ─── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[900px] h-[400px] sm:h-[500px] bg-[#9B4DFF]/[0.08] rounded-full blur-[160px] pointer-events-none z-0" />

      {/* Top and Bottom Section Transitions */}
      <div className="absolute inset-x-0 top-0 h-32 sm:h-44 bg-gradient-to-b from-[#040208] to-transparent pointer-events-none z-1" />
      <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 bg-gradient-to-t from-[#030206] to-transparent pointer-events-none z-1" />

      {/* Floating magnetic cursor pill CTA */}
      <ClickIndicator active={active} />

      {/* ─── Center Editorial Composition ─── */}
      <div className="w-full max-w-5xl mx-auto relative z-10 flex flex-col items-center my-auto">
        
        {/* Eyebrow: Pure, unadorned typography (NO BADGING, NO PILL, NO BORDERS) */}
        <p className="venue-eyebrow text-xs sm:text-sm font-mono tracking-[0.3em] text-[#a199b0] uppercase font-medium mb-6 sm:mb-8 select-none">
          WHERE THE ODYSSEY BEGINS
        </p>

        {/* Primary Interactive Statement: Harmonious Typography (Single type system) */}
        <div
          ref={triggerRef}
          className={`venue-map-interactive-trigger inline-block w-full max-w-4xl ${
            active ? "is-hovering" : ""
          }`}
        >
          <a
            href={MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            aria-label="Open Google Maps to Dr. K. S. Krishnan Auditorium, KARE"
            className="group block transition-opacity duration-300 focus-visible:outline-2 focus-visible:outline-[#9B4DFF] focus-visible:outline-offset-8 rounded-xl"
          >
            {/* Statement Line 1 */}
            <h2 className="venue-title-text text-4xl sm:text-6xl md:text-7xl lg:text-[5.5vw] font-normal text-[#f4efe7] tracking-tight leading-[1.12]">
              Meet us at KARE.
            </h2>

            {/* Statement Line 2 with elegant, delicate underline */}
            <div className="venue-title-text mt-3 sm:mt-4">
              <span className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.5vw] font-normal text-[#b1a696] tracking-tight leading-[1.12] underline underline-offset-[14px] sm:underline-offset-[18px] md:underline-offset-[22px] decoration-1 decoration-[#b1a696]/50 group-hover:text-[#f4efe7] group-hover:decoration-[#f4efe7] transition-all duration-300">
                Dr. K. S. Krishnan Auditorium.
              </span>
            </div>
          </a>
        </div>

        {/* Mobile & Touch-First Visible CTA (Hidden on desktop) */}
        <div className="venue-mobile-cta mt-10 sm:mt-12 md:hidden flex justify-center w-full">
          <RegisterButton
            href={MAP_URL}
            label="VIEW MAP"
            className="shadow-[0_0_25px_rgba(244,239,231,0.3)]"
          />
        </div>

        {/* ─── Architectural Metadata Baseline (Clean, quiet, NO heavy cards) ─── */}
        <div className="w-full max-w-4xl mt-16 sm:mt-24 pt-8 sm:pt-10 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center select-none">
          <div className="venue-meta-col flex flex-col items-center">
            <span className="text-[11px] font-mono tracking-[0.22em] text-[#a199b0]/60 uppercase mb-1">
              Venue
            </span>
            <p className="text-xs sm:text-sm font-normal text-[#f4efe7] tracking-wide">
              Dr. K. S. Krishnan Auditorium
            </p>
          </div>

          <div className="venue-meta-col flex flex-col items-center">
            <span className="text-[11px] font-mono tracking-[0.22em] text-[#a199b0]/60 uppercase mb-1">
              Institution
            </span>
            <p className="text-xs sm:text-sm font-normal text-[#f4efe7] tracking-wide">
              Kalasalingam Academy of Research and Education
            </p>
          </div>

          <div className="venue-meta-col flex flex-col items-center">
            <span className="text-[11px] font-mono tracking-[0.22em] text-[#a199b0]/60 uppercase mb-1">
              Location
            </span>
            <p className="text-xs sm:text-sm font-normal text-[#f4efe7] tracking-wide">
              KARE Campus &middot; Tamil Nadu
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default MapLink;