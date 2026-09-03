import React, { useRef } from "react";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMediaQuery } from "react-responsive";
import { MdArrowOutward } from "react-icons/md";
import heroBg from "../../assets/hero_section.png";
import mobileHeroBg from "../../assets/hero_section_mobile.png";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
    const heroRef = useRef(null);
    const isMobHero = useMediaQuery({
        query: "(max-width:768px)",
    });

    useGSAP(() => {
        if (isMobHero) {
            // Mobile Entrance Animation: Centered Cascading Stagger
            gsap.from(".hero-eyebrow", {
                y: -15,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                delay: 0.1,
            });

            gsap.from(".hero-title-hack, .hero-title-odyssey, .hero-badge-exponent", {
                y: 35,
                opacity: 0,
                duration: 1.0,
                stagger: 0.08,
                ease: "power4.out",
                delay: 0.2,
            });

            gsap.from(".hero-subtext, .hero-btn-wrap", {
                y: 20,
                opacity: 0,
                duration: 0.85,
                stagger: 0.1,
                ease: "power3.out",
                delay: 0.35,
            });

            gsap.from(".hero-venue-box", {
                y: 25,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.45,
            });
        } else {
            // Desktop Background gentle parallax scale on scroll
            if (heroRef.current) {
                gsap.to(".hero-img", {
                    yPercent: -6,
                    scale: 1.12,
                    ease: "power1.inOut",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1.5,
                    }
                });
            }

            // Desktop Entrance Animation for Eyebrow & Top-Left Title "HACK"
            gsap.from(".hero-eyebrow", {
                x: -25,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
                delay: 0.1,
            });

            gsap.from(".hero-title-hack", {
                y: 70,
                opacity: 0,
                duration: 1.1,
                ease: "power4.out",
                delay: 0.2,
            });

            // Desktop Entrance Animation for Subtitle & Button
            gsap.from(".hero-subtext, .hero-btn-wrap", {
                y: 35,
                opacity: 0,
                duration: 0.9,
                stagger: 0.12,
                ease: "power3.out",
                delay: 0.35,
            });

            // Desktop Entrance Animation for Venue Block (Bottom-Left)
            gsap.from(".hero-venue-box", {
                y: 40,
                opacity: 0,
                duration: 1.0,
                ease: "power3.out",
                delay: 0.45,
            });

            // Desktop Entrance Animation for Bottom-Right Title "ODYSSEY" & Circled "4.0" Exponent
            gsap.from(".hero-title-odyssey, .hero-badge-exponent", {
                y: 70,
                opacity: 0,
                duration: 1.1,
                stagger: 0.1,
                ease: "power4.out",
                delay: 0.3,
            });
        }
    }, { scope: heroRef, dependencies: [isMobHero] });

    return (
        <section 
            ref={heroRef}
            className="hero-section w-full h-[100dvh] min-h-[100dvh] max-h-[100dvh] relative overflow-hidden bg-[#030206] flex flex-col justify-between"
        >
            {/* Desktop Background Layer - Edge-to-edge */}
            <div
                className="hero-img absolute inset-0 bg-no-repeat bg-cover bg-center z-0 md:block hidden will-change-transform"
                style={{ backgroundImage: `url(${heroBg})` }}
            />

            {/* Mobile Background Layer - Edge-to-edge */}
            <div
                className="hero-img absolute inset-0 bg-no-repeat bg-cover bg-center z-0 md:hidden block will-change-transform"
                style={{ backgroundImage: `url(${mobileHeroBg})` }}
            />

            {/* Subtle Gradient Overlays for High-End Contrast & Smooth Section Transition */}
            <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[#030206]/80 via-[#030206]/35 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 bg-gradient-to-t from-[#030206] via-[#030206]/80 to-transparent pointer-events-none z-10" />

            {/* ════════════ DESKTOP LAYOUT: ASYMMETRICAL 4-CORNER (md:flex hidden) ════════════ */}
            <div className="relative z-20 w-full h-full md:flex hidden flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-8 sm:pb-10 md:pb-12 px-6 sm:px-10 md:px-14 lg:px-16 select-none pointer-events-none">
                
                {/* TOP ROW: TOP-LEFT TITLE + SUBTITLE + CTA BUTTON */}
                <div className="flex justify-between items-start w-full pointer-events-auto">
                    
                    {/* TOP-LEFT: EYEBROW + GIANT "HACK" + SUBTITLE + REGISTER NOW */}
                    <div className="flex flex-col items-start max-w-xl text-left">
                        {/* Eyebrow: KARE ACM PRESENTS */}
                        <div className="hero-eyebrow flex items-center gap-2 mb-2 sm:mb-2.5">
                            <span className="w-5 sm:w-6 h-[1.5px] bg-[#a855f7] rounded-full inline-block shadow-[0_0_6px_#a855f7]" />
                            <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#d8b4fe] uppercase">
                                KARE ACM PRESENTS
                            </p>
                        </div>

                        <h1 className="hero-title-hack font-hero-bebas text-white tracking-tight uppercase leading-[0.82] text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] 2xl:text-[10.5rem] drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
                            HACK
                        </h1>

                        {/* Unified Subtitle & Date Description */}
                        <div className="hero-subtext mt-2 sm:mt-3 md:mt-4 text-[#cbd5e1] text-xs sm:text-sm md:text-base font-normal tracking-wide max-w-xs sm:max-w-sm drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
                            <p className="text-white font-medium text-sm sm:text-base">
                                Enter the Code Dimension
                            </p>
                            <p className="text-[#a199b0] text-xs sm:text-sm mt-1 leading-relaxed">
                                October 27 – 28, 2026 &middot; 24-Hour Hackathon
                            </p>
                        </div>

                        {/* CTA Button */}
                        <div className="hero-btn-wrap mt-4 sm:mt-5 md:mt-6">
                            <a
                                href="#prizepool"
                                className="inline-flex items-center gap-2.5 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[#f4efe7] hover:bg-white text-[#181717] font-bold text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(244,239,231,0.3)] hover:shadow-[0_0_35px_rgba(244,239,231,0.55)] transition-all duration-300 transform hover:scale-105 active:scale-95 group cursor-pointer"
                            >
                                <span className="font-semibold tracking-wider text-[11px] sm:text-xs">
                                    REGISTER NOW
                                </span>
                                <div className="w-5 h-5 rounded-full bg-[#181717] text-[#f4efe7] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                    <MdArrowOutward className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                                </div>
                            </a>
                        </div>
                    </div>

                </div>

                {/* BOTTOM ROW: BOTTOM-LEFT VENUE + BOTTOM-RIGHT TITLE & 4.0 EXPONENT */}
                <div className="flex flex-col-reverse sm:flex-row justify-between items-start sm:items-end w-full gap-6 sm:gap-4 pointer-events-auto mt-auto">
                    
                    {/* BOTTOM-LEFT: VENUE & LOCATION */}
                    <div className="hero-venue-box max-w-xs sm:max-w-sm text-left select-none drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)]">
                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="w-3.5 h-[1.5px] bg-[#a855f7] rounded-full inline-block shadow-[0_0_6px_#a855f7]" />
                            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#a855f7] uppercase">
                                VENUE &middot; CAMPUS
                            </span>
                        </div>
                        <h4 className="text-white text-xs sm:text-sm md:text-base font-semibold tracking-tight uppercase leading-snug">
                            Kalasalingam Academy of Research and Education
                        </h4>
                        <p className="text-[#a199b0] text-[11px] sm:text-xs tracking-wide mt-0.5">
                            Tech Arena & Auditorium &middot; Tamil Nadu
                        </p>
                    </div>

                    {/* BOTTOM-RIGHT: GIANT "ODYSSEY" + CIRCLED "4.0" EXPONENT */}
                    <div className="hero-bottom-right flex flex-col items-start sm:items-end text-left sm:text-right select-none w-full sm:w-auto">
                        <div className="relative inline-flex items-start">
                            <h1 className="hero-title-odyssey font-hero-bebas text-white tracking-tight uppercase leading-[0.82] text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] xl:text-[9rem] 2xl:text-[10.5rem] drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
                                ODYSSEY
                            </h1>
                            <span 
                                className="hero-badge-exponent inline-flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 rounded-full border-[1.5px] md:border-2 border-white/80 text-white font-mono font-bold text-[9px] sm:text-[11px] md:text-xs lg:text-sm -mt-1 sm:-mt-2 md:-mt-3 ml-1 sm:ml-2 shadow-[0_0_15px_rgba(168,85,247,0.4)] backdrop-blur-sm bg-purple-950/40 select-none shrink-0"
                                title="Version 4.0"
                            >
                                4.0
                            </span>
                        </div>
                    </div>

                </div>

            </div>

            {/* ════════════ MOBILE LAYOUT: CENTER-ALIGNED HARMONIOUS HIERARCHY (md:hidden flex) ════════════ */}
            <div className="relative z-20 w-full h-full md:hidden flex flex-col justify-between pt-20 sm:pt-24 pb-2 sm:pb-3 px-4 select-none pointer-events-none">
                
                {/* Mobile Top Centered Brand & Action Hub */}
                <div className="flex flex-col items-center text-center w-full max-w-sm mx-auto pointer-events-auto">
                    {/* Eyebrow: — KARE ACM PRESENTS — */}
                    <div className="hero-eyebrow flex items-center justify-center gap-2 mb-1.5">
                        <span className="w-4 sm:w-5 h-[1.5px] bg-[#a855f7] rounded-full inline-block shadow-[0_0_6px_#a855f7]" />
                        <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#d8b4fe] uppercase">
                            KARE ACM PRESENTS
                        </p>
                        <span className="w-4 sm:w-5 h-[1.5px] bg-[#a855f7] rounded-full inline-block shadow-[0_0_6px_#a855f7]" />
                    </div>

                    {/* Unified HACK ODYSSEY 4.0 Lockup - Big, Heroic, Impactful */}
                    <div className="flex flex-col items-center justify-center leading-none">
                        <h1 className="hero-title-hack font-hero-bebas text-white tracking-tight uppercase leading-[0.82] text-[3.6rem] sm:text-6xl drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
                            HACK
                        </h1>
                        <div className="relative inline-flex items-start justify-center -mt-1 sm:-mt-1.5">
                            <h1 className="hero-title-odyssey font-hero-bebas text-white tracking-tight uppercase leading-[0.82] text-[3.6rem] sm:text-6xl drop-shadow-[0_12px_35px_rgba(0,0,0,0.95)]">
                                ODYSSEY
                            </h1>
                            <span 
                                className="hero-badge-exponent inline-flex items-center justify-center w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 rounded-full border-[1.5px] border-white/80 text-white font-mono font-bold text-[8.5px] sm:text-[9.5px] -mt-1.5 ml-1 sm:ml-1.5 shadow-[0_0_12px_rgba(168,85,247,0.4)] backdrop-blur-sm bg-purple-950/40 select-none shrink-0"
                                title="Version 4.0"
                            >
                                4.0
                            </span>
                        </div>
                    </div>

                    {/* Subtitle & Date Description */}
                    <div className="hero-subtext mt-2 sm:mt-2.5 text-center drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)] max-w-xs mx-auto">
                        <p className="text-white font-medium text-xs sm:text-sm">
                            Enter the Code Dimension
                        </p>
                        <p className="text-[#cbd5e1] text-[11px] sm:text-xs mt-0.5 leading-relaxed">
                            October 27 – 28, 2026 &middot; 24-Hour Hackathon
                        </p>
                    </div>

                    {/* Primary CTA Button */}
                    <div className="hero-btn-wrap mt-3 sm:mt-3.5">
                        <a
                            href="#prizepool"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#f4efe7] hover:bg-white text-[#181717] font-bold text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(244,239,231,0.3)] hover:shadow-[0_0_30px_rgba(244,239,231,0.55)] transition-all duration-300 transform active:scale-95 group cursor-pointer"
                        >
                            <span className="font-semibold tracking-wider text-[11px]">
                                REGISTER NOW
                            </span>
                            <div className="w-4.5 h-4.5 rounded-full bg-[#181717] text-[#f4efe7] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300">
                                <MdArrowOutward className="w-2.5 h-2.5" />
                            </div>
                        </a>
                    </div>
                </div>

                {/* Mobile Bottom Centered Venue Block - Guaranteed In-View Above Fold */}
                <div className="hero-venue-box text-center select-none drop-shadow-[0_2px_15px_rgba(0,0,0,0.9)] pointer-events-auto max-w-xs mx-auto pb-1 sm:pb-2">
                    <div className="flex items-center justify-center gap-1.5 mb-0.5">
                        <span className="w-3 h-[1.5px] bg-[#a855f7] rounded-full inline-block shadow-[0_0_6px_#a855f7]" />
                        <span className="text-[9.5px] font-semibold tracking-[0.2em] text-[#a855f7] uppercase font-mono">
                            VENUE &middot; CAMPUS
                        </span>
                        <span className="w-3 h-[1.5px] bg-[#a855f7] rounded-full inline-block shadow-[0_0_6px_#a855f7]" />
                    </div>
                    <h4 className="text-white text-[11px] sm:text-xs font-semibold tracking-tight uppercase leading-snug">
                        Kalasalingam Academy of Research and Education
                    </h4>
                    <p className="text-[#a199b0] text-[9.5px] tracking-wide mt-0.5">
                        Tech Arena & Auditorium &middot; Tamil Nadu
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Hero;
