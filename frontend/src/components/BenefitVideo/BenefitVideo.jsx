import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import VideoPin from "./VideoPin";
import "./benefit.css";

gsap.registerPlugin(ScrollTrigger);

const BenefitVideo = () => {
    const containerRef = useRef(null);
    const titleWords = ["RELIVE", "THE", "ODYSSEY"];
    const subtitleWords = "24 HOURS OF RELENTLESS CODE, GROUNDBREAKING INNOVATION & UNSTOPPABLE ENERGY.".split(" ");

    useGSAP(() => {
        const revealTl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                end: "top 25%",
                scrub: 1,
            }
        });

        // 1. Eyebrow Reveal
        revealTl
            .from(".odyssey-video-eyebrow", {
                y: 20,
                opacity: 0,
                duration: 0.5,
                ease: "power2.out"
            })
            // 2. Main Title Word-by-Word Rise Reveal
            .from(".odyssey-title-word", {
                yPercent: 120,
                opacity: 0,
                stagger: 0.15,
                duration: 0.8,
                ease: "power3.out"
            }, "-=0.2")
            // 3. Subtitle Word-by-Word Progressive Reveal
            .from(".odyssey-sub-word", {
                yPercent: 100,
                opacity: 0,
                stagger: 0.03,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.3");
    }, { scope: containerRef });

    return (
        <section id="highlights" ref={containerRef} className="video-highlight-section w-full bg-[#030206] text-[#f4efe7] relative">
            {/* Top Introductory Section Tailored to Hack Odyssey */}
            <div className="max-w-6xl mx-auto pt-20 sm:pt-28 pb-10 sm:pb-14 px-6 sm:px-12 flex flex-col items-center text-center relative z-10">
                {/* Eyebrow with Purple Accent Line */}
                <div className="odyssey-video-eyebrow flex items-center gap-2.5 mb-4 select-none">
                    <span className="w-6 md:w-8 h-[1.5px] bg-[#a855f7] inline-block rounded-full shadow-[0_0_6px_#a855f7]"></span>
                    <p className="text-[11px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#8e859f] uppercase">
                        THE EXPERIENCE &middot; HACK ODYSSEY 3.0
                    </p>
                    <span className="w-6 md:w-8 h-[1.5px] bg-[#a855f7] inline-block rounded-full shadow-[0_0_8px_#a855f7]"></span>
                </div>

                {/* Main Heading - Consistent Solid White Typography */}
                <h2 className="font-hero-bebas text-5xl sm:text-7xl md:text-8xl lg:text-[7.5rem] tracking-tight text-white uppercase leading-[0.95] select-none flex flex-wrap justify-center items-center">
                    {titleWords.map((word, idx) => (
                        <span key={idx} className="inline-block overflow-hidden mx-2 sm:mx-3.5">
                            <span className="odyssey-title-word inline-block will-change-transform text-white">
                                {word}
                            </span>
                        </span>
                    ))}
                </h2>

                {/* Subtitle with Progressive Word-by-Word Reveal */}
                <p className="max-w-xl text-xs sm:text-sm md:text-base font-mono text-[#8e859f] tracking-wider uppercase mt-4 sm:mt-6 leading-relaxed select-none">
                    {subtitleWords.map((word, idx) => (
                        <span key={idx} className="inline-block overflow-hidden mr-1.5">
                            <span className="odyssey-sub-word inline-block will-change-transform">
                                {word}
                            </span>
                        </span>
                    ))}
                </p>
            </div>

            {/* Pinned Circular Expanding Video Pin */}
            <div className="vd-pin relative overlay-box w-full">
                <div className="video-wrapper relative w-full h-screen">
                    <VideoPin />
                </div>
            </div>
        </section>
    );
};

export default BenefitVideo;
