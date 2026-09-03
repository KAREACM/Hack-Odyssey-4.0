import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { welcomeLinesLG, welcomeLinesSM } from "../../constants/welcome";
import eyebrow1 from "../../assets/eyebrow_1.jpg";
import eyebrow2 from "../../assets/eyebrow_2.jpg";
import section2Bg from "../../assets/section_2.png";

const Welcome = () => {
    const [activeCard, setActiveCard] = useState(0);
    const carouselRef = useRef(null);
    const welcomeRef = useRef(null);

    // Scroll carousel to active card on dot tap
    const scrollToCard = (index) => {
        setActiveCard(index);
        if (carouselRef.current) {
            const children = carouselRef.current.children;
            if (children && children[index]) {
                children[index].scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        }
    };

    // Track active card while user swipes horizontally
    const handleCarouselScroll = () => {
        if (!carouselRef.current) return;
        const container = carouselRef.current;
        const scrollLeft = container.scrollLeft;
        const cardWidth = container.offsetWidth * 0.78;
        const index = Math.round(scrollLeft / (cardWidth + 14));
        setActiveCard(Math.min(Math.max(index, 0), 1));
    };

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // ═══════════════════════════════════════════════════════════════
        // DESKTOP: 100% UNTOUCHED ORIGINAL TIMELINE & VIEWPORT PHYSICS
        // ═══════════════════════════════════════════════════════════════
        mm.add("(min-width: 769px)", () => {
            const lines = gsap.utils.toArray(".welcome-text-desktop .clip-text-welcome");
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".welcome-section",
                    start: "top 75%",
                    end: "bottom 80%",
                    scrub: 1,
                },
            });

            tl.to(lines, {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                stagger: 0.25,
            });

            tl.from(".welcome-image-card-desktop", {
                y: 25,
                opacity: 0.8,
                scale: 0.98,
                stagger: 0.15,
                ease: "power2.out",
                duration: 0.8,
            }, "-=0.3");

            tl.from(".welcome-statement-desktop", {
                y: 20,
                opacity: 0.7,
                ease: "power2.out",
                duration: 0.8,
            }, "<");
        });

        // ═══════════════════════════════════════════════════════════════
        // MOBILE: DEDICATED 60-120 FPS SCRUB & ERGONOMIC TOUCH MOTION
        // ═══════════════════════════════════════════════════════════════
        mm.add("(max-width: 768px)", () => {
            const linesMobile = gsap.utils.toArray(".welcome-text-mobile .clip-text-welcome");

            // Mobile text illumination triggers in the user's primary reading zone
            const tlMobile = gsap.timeline({
                scrollTrigger: {
                    trigger: ".welcome-text-mobile",
                    start: "top 80%",
                    end: "bottom 46%",
                    scrub: 0.6,
                },
            });

            tlMobile.to(linesMobile, {
                clipPath: "inset(0% 0% 0% 0%)",
                ease: "none",
                stagger: 0.14,
            });

            // Smooth entrance for touch visual showcase
            gsap.from(".welcome-mobile-cards", {
                scrollTrigger: {
                    trigger: ".welcome-mobile-cards",
                    start: "top 86%",
                },
                y: 26,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
            });

            // Smooth entrance for glassmorphic manifesto
            gsap.from(".welcome-mobile-manifesto", {
                scrollTrigger: {
                    trigger: ".welcome-mobile-manifesto",
                    start: "top 88%",
                },
                y: 22,
                opacity: 0,
                duration: 0.7,
                ease: "power3.out",
            });
        });

        return () => mm.revert();
    }, { scope: welcomeRef });

    return (
        <section 
            id="welcome" 
            ref={welcomeRef}
            className="welcome-section w-full min-h-screen text-[#f4efe7] px-5 sm:px-10 md:px-16 lg:px-24 pt-28 sm:pt-32 md:pt-32 pb-20 md:pb-24 relative overflow-hidden bg-[#030206]"
        >
            {/* Cinematic Background Layer - shifted lower so top remains deep cinematic black */}
            <div
                className="absolute inset-x-0 bottom-0 top-24 md:top-36 bg-cover bg-bottom bg-no-repeat opacity-85 pointer-events-none z-0 scale-105"
                style={{ backgroundImage: `url(${section2Bg})` }}
            />

            {/* Deep Cinematic Black Top Fade */}
            <div className="absolute inset-x-0 top-0 h-48 md:h-72 bg-gradient-to-b from-[#030206] via-[#030206]/95 to-transparent pointer-events-none z-1" />

            {/* Seamless Bottom Blend with Next Section */}
            <div className="absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-t from-[#030206] via-[#030206]/70 to-transparent pointer-events-none z-1" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* ─── EYEBROW WITH PURPLE ACCENT ─── */}
                <div className="flex items-center gap-2.5 mb-5 md:mb-8">
                    <span className="w-5 sm:w-6 md:w-8 h-[1.5px] bg-[#a855f7] inline-block rounded-full shadow-[0_0_6px_#a855f7]" />
                    <p className="text-[10px] sm:text-xs font-semibold tracking-[0.24em] text-[#9b93ab] uppercase font-mono">
                        THE ODYSSEY
                    </p>
                </div>

                {/* ─── EDITORIAL STATEMENT ─── */}
                <div className="flex flex-col gap-1.5 mb-10 md:mb-20">
                    {/* Desktop Headline (100% Identical to original desktop layout) */}
                    <div className="hidden md:block w-full md:w-[92%] lg:w-[86%] text-[38px] lg:text-[44px] leading-[1.18] font-normal tracking-[-0.012em]">
                        <div className="w-full welcome-text-desktop flex flex-col justify-center items-start">
                            {welcomeLinesLG.map((text, index) => (
                                <span key={index} className="relative block text-darkBrown">
                                    {text}
                                    <span className="clip-text-welcome">{text}</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Headline (Legible ghost baseline + fluid 60-120fps illumination) */}
                    <div className="block md:hidden w-full text-[24px] sm:text-[28px] leading-[1.3] font-normal tracking-[-0.015em]">
                        <div className="w-full welcome-text-mobile flex flex-col justify-center items-start">
                            {welcomeLinesSM.map((text, index) => (
                                <span key={index} className="relative block text-darkBrown">
                                    {text}
                                    <span className="clip-text-welcome">{text}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ─── DESKTOP SECOND PART: ORGANIC PILLS + STATEMENT (100% UNTOUCHED) ─── */}
                <div className="hidden md:flex flex-row justify-between items-center gap-12 pt-2">
                    {/* Left: Sleek Organic Pill Visuals */}
                    <div className="flex flex-row justify-start items-center gap-4 welcome-image-card-desktop">
                        <div className="overflow-hidden rounded-[3rem] md:w-52 lg:w-56 aspect-[16/11] border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.12)] group">
                            <img
                                src={eyebrow1}
                                alt="Hackathon team collaborating"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="overflow-hidden rounded-[3rem] md:w-52 lg:w-56 aspect-[16/11] border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.12)] group">
                            <img
                                src={eyebrow2}
                                alt="Developer coding at hackathon"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Right: Refined Statement Block Matching Reference */}
                    <div className="w-1/2 welcome-statement-desktop flex flex-col justify-center">
                        <p className="text-xl md:text-2xl lg:text-[1.7rem] text-[#c7c2d1] leading-[1.28] font-normal tracking-[-0.2px]">
                            <span>One challenge.</span><br />
                            <span>One team.</span><br />
                            <span><strong className="font-bold text-white">One</strong> idea at a time.</span>
                        </p>
                        <div className="flex items-center gap-2 mt-6">
                            <span className="w-4 h-[1.5px] bg-[#a855f7] inline-block"></span>
                            <span className="text-[11px] tracking-[0.22em] font-semibold text-[#716886] uppercase">
                                KARE &middot; ACM STUDENT CHAPTER
                            </span>
                        </div>
                    </div>
                </div>

                {/* ─── MOBILE SECOND PART: TOUCH GALLERY SHOWCASE + GLASS MANIFESTO ─── */}
                <div className="flex md:hidden flex-col gap-7 pt-2">
                    
                    {/* 1. Tactile Touch-Swipeable Dual Pill Showcase */}
                    <div className="welcome-mobile-cards w-full flex flex-col gap-3">
                        {/* Scroll-Snap Touch Track with 60-120fps Hardware Momentum */}
                        <div
                            ref={carouselRef}
                            onScroll={handleCarouselScroll}
                            className="mobile-carousel-container flex gap-3.5 overflow-x-auto snap-x snap-mandatory py-2 -mx-5 px-5 select-none touch-pan-x"
                            style={{ scrollPaddingLeft: "1.25rem", scrollPaddingRight: "1.25rem" }}
                        >
                            {/* Card 1: Team Collaboration */}
                            <div 
                                onClick={() => scrollToCard(0)}
                                className={`shrink-0 snap-center w-[78vw] max-w-[310px] aspect-[16/11] rounded-[2.2rem] overflow-hidden relative border transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                                    activeCard === 0
                                        ? "border-purple-500/40 shadow-[0_10px_32px_rgba(168,85,247,0.22)] scale-100"
                                        : "border-white/10 opacity-75 scale-[0.97]"
                                }`}
                            >
                                <img
                                    src={eyebrow1}
                                    alt="Hackathon team collaborating"
                                    className="w-full h-full object-cover will-change-transform"
                                    loading="eager"
                                />
                                {/* Ambient bottom fade & luxury tag */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030206]/85 via-[#030206]/20 to-transparent pointer-events-none" />
                                <div className="absolute top-3.5 left-4 pointer-events-none">
                                    <span className="backdrop-blur-md bg-black/60 border border-white/15 text-[9px] font-mono tracking-widest text-[#d8b4fe] px-2.5 py-1 rounded-full uppercase font-semibold">
                                        01 &middot; COLLABORATION
                                    </span>
                                </div>
                            </div>

                            {/* Card 2: Rapid Prototyping */}
                            <div 
                                onClick={() => scrollToCard(1)}
                                className={`shrink-0 snap-center w-[78vw] max-w-[310px] aspect-[16/11] rounded-[2.2rem] overflow-hidden relative border transition-all duration-300 active:scale-[0.98] cursor-pointer ${
                                    activeCard === 1
                                        ? "border-purple-500/40 shadow-[0_10px_32px_rgba(168,85,247,0.22)] scale-100"
                                        : "border-white/10 opacity-75 scale-[0.97]"
                                }`}
                            >
                                <img
                                    src={eyebrow2}
                                    alt="Developer coding at hackathon"
                                    className="w-full h-full object-cover will-change-transform"
                                    loading="eager"
                                />
                                {/* Ambient bottom fade & luxury tag */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030206]/85 via-[#030206]/20 to-transparent pointer-events-none" />
                                <div className="absolute top-3.5 left-4 pointer-events-none">
                                    <span className="backdrop-blur-md bg-black/60 border border-white/15 text-[9px] font-mono tracking-widest text-[#d8b4fe] px-2.5 py-1 rounded-full uppercase font-semibold">
                                        02 &middot; PROTOTYPING
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Tactile Indicator Controls */}
                        <div className="flex items-center justify-between px-1">
                            {/* Interactive Touch Indicators */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => scrollToCard(0)}
                                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                                        activeCard === 0
                                            ? "w-7 h-1.5 bg-[#a855f7] shadow-[0_0_8px_#a855f7]"
                                            : "w-2 h-1.5 bg-white/20 hover:bg-white/40"
                                    }`}
                                    aria-label="View slide 1"
                                />
                                <button
                                    onClick={() => scrollToCard(1)}
                                    className={`transition-all duration-300 rounded-full cursor-pointer ${
                                        activeCard === 1
                                            ? "w-7 h-1.5 bg-[#a855f7] shadow-[0_0_8px_#a855f7]"
                                            : "w-2 h-1.5 bg-white/20 hover:bg-white/40"
                                    }`}
                                    aria-label="View slide 2"
                                />
                            </div>

                            {/* Swipe gesture indicator */}
                            <span className="text-[9.5px] font-mono tracking-widest text-[#8e859f]/80 uppercase">
                                SWIPE TO DISCOVER &rarr;
                            </span>
                        </div>
                    </div>

                    {/* 2. Elevated Mobile Manifesto Glassmorphic Card */}
                    <div className="welcome-mobile-manifesto relative overflow-hidden rounded-[2rem] border border-white/[0.09] bg-gradient-to-br from-white/[0.05] via-[#120b1e]/60 to-purple-950/[0.15] backdrop-blur-2xl p-6 shadow-[0_16px_40px_rgba(0,0,0,0.6)]">
                        {/* Ambient Corner Radial Glow */}
                        <div className="absolute -top-10 -right-10 w-28 h-28 bg-[#a855f7]/20 rounded-full blur-2xl pointer-events-none" />

                        {/* Hackathon Creed Micro-Label */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-[#a855f7] shadow-[0_0_6px_#a855f7]" />
                            <p className="text-[9px] font-mono font-semibold tracking-[0.24em] text-[#c084fc] uppercase">
                                HACKATHON CREED
                            </p>
                        </div>

                        {/* Core Statement */}
                        <p className="text-[20px] sm:text-[22px] text-[#f1ecf7] leading-[1.32] font-normal tracking-[-0.015em]">
                            <span>One challenge.</span><br />
                            <span>One team.</span><br />
                            <span><strong className="font-bold text-white drop-shadow-[0_0_12px_rgba(168,85,247,0.45)]">One</strong> idea at a time.</span>
                        </p>

                        {/* Chapter Signature */}
                        <div className="flex items-center gap-2 mt-5 pt-4 border-t border-white/[0.08]">
                            <span className="w-4 h-[1.5px] bg-[#a855f7] inline-block rounded-full shadow-[0_0_6px_#a855f7]" />
                            <span className="text-[10px] tracking-[0.22em] font-semibold text-[#8e859f] uppercase font-mono">
                                KARE &middot; ACM STUDENT CHAPTER
                            </span>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Welcome;