import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMediaQuery } from "react-responsive";
import pinVideo from "../../assets/pin-video.mp4";
import { FaPlay, FaPause } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const VideoPin = () => {
    const isMobile = useMediaQuery({
        query: "(max-width: 768px)",
    });

    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(true);

    useGSAP(() => {
        ScrollTrigger.config({ ignoreMobileResize: true });

        if (!isMobile) {
            const vpTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".video-wrapper",
                    start: "top top",
                    end: "+=2000px",
                    scrub: 1.2,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            vpTl.fromTo(
                ".video-box",
                { clipPath: "circle(120px at 50% 50%)" },
                {
                    clipPath: "circle(120% at 50% 50%)",
                    ease: "power1.inOut",
                }
            );
        } else {
            // Mobile: 60-120 FPS high-refresh responsive timeline
            const vpMobTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".video-wrapper",
                    start: "top top",
                    end: "+=1200px",
                    scrub: 0.8, // 0.8 for responsive, lag-free finger tracking on 60-120Hz screens
                    pin: true,
                    anticipatePin: 1,
                }
            });

            vpMobTl.fromTo(
                ".video-box",
                { clipPath: "circle(95px at 50% 50%)" },
                {
                    clipPath: "circle(125% at 50% 50%)",
                    ease: "power1.inOut",
                }
            );
        }
    }, [isMobile]);

    const handleTogglePlay = (e) => {
        if (e) e.stopPropagation();
        if (!videoRef.current) return;
        if (videoRef.current.paused) {
            videoRef.current.play();
            setIsPlaying(true);
        } else {
            videoRef.current.pause();
            setIsPlaying(false);
        }
    };

    return (
        <div className="h-screen w-full overflow-hidden relative bg-[#030206] flex items-center justify-center">
            {/* Expanding Video Container with Circular Clip-Path */}
            <div className="relative w-full h-full video-box overflow-hidden z-10 flex items-center justify-center will-change-transform">
                <video
                    ref={videoRef}
                    src={pinVideo}
                    playsInline
                    muted
                    loop
                    autoPlay
                    preload="auto"
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-full object-cover will-change-transform"
                />
                
                {/* Subtle Cinematic Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#030206]/40 via-transparent to-[#030206]/60 pointer-events-none" />

                {/* Concentric Rotating SVG Circular Ring with Dedicated Segment Arcs & Exponent 3.0 Badges */}
                {/* Isolated positioning wrapper prevents transform conflict with CSS rotation keyframes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[185px] h-[185px] sm:w-[205px] sm:h-[205px] md:w-[220px] md:h-[220px] pointer-events-none select-none z-20 flex items-center justify-center">
                    <div className="spin-circle-container w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
                            <defs>
                                {/* Arc 1: Top-Right (15° to 75°) for HACK ODYSSEY */}
                                <path
                                    id="arcHack1"
                                    d="M 119.41, 27.56 A 75,75 0 0,1 172.44, 80.59"
                                    fill="none"
                                />
                                {/* Arc 2: Bottom-Right (102° to 168°) for HIGHLIGHTS */}
                                <path
                                    id="arcHigh1"
                                    d="M 173.36, 115.59 A 75,75 0 0,1 115.59, 173.36"
                                    fill="none"
                                />
                                {/* Arc 3: Bottom-Left (195° to 255°) for HACK ODYSSEY */}
                                <path
                                    id="arcHack2"
                                    d="M 80.59, 172.44 A 75,75 0 0,1 27.56, 119.41"
                                    fill="none"
                                />
                                {/* Arc 4: Top-Left (282° to 348°) for HIGHLIGHTS */}
                                <path
                                    id="arcHigh2"
                                    d="M 26.64, 84.41 A 75,75 0 0,1 84.41, 26.64"
                                    fill="none"
                                />
                            </defs>

                            {/* Top Dot at 0° */}
                            <circle cx="100" cy="25" r="1.8" fill="#f4efe7" opacity="0.9" />

                            {/* 1. HACK ODYSSEY on Arc 1 */}
                            <text className="text-[8.5px] font-mono font-bold tracking-[0.18em] fill-[#f4efe7]">
                                <textPath href="#arcHack1" startOffset="50%" textAnchor="middle">
                                    HACK ODYSSEY
                                </textPath>
                            </text>

                            {/* 2. Circled Exponent Badge 1 at ~88° */}
                            <g transform="translate(174.5, 97.5) rotate(88)">
                                <circle cx="0" cy="0" r="8.5" stroke="rgba(244, 239, 231, 0.9)" strokeWidth="1.2" fill="#030206" />
                                <text x="0" y="2.8" textAnchor="middle" fontSize="6.5" fontFamily="'Inter', monospace" fontWeight="bold" fill="#f4efe7">
                                    3.0
                                </text>
                            </g>

                            {/* 3. HIGHLIGHTS on Arc 2 */}
                            <text className="text-[8.5px] font-mono font-bold tracking-[0.18em] fill-[#f4efe7]">
                                <textPath href="#arcHigh1" startOffset="50%" textAnchor="middle">
                                    HIGHLIGHTS
                                </textPath>
                            </text>

                            {/* Bottom Dot at 180° */}
                            <circle cx="100" cy="175" r="1.8" fill="#f4efe7" opacity="0.9" />

                            {/* 4. HACK ODYSSEY on Arc 3 */}
                            <text className="text-[8.5px] font-mono font-bold tracking-[0.18em] fill-[#f4efe7]">
                                <textPath href="#arcHack2" startOffset="50%" textAnchor="middle">
                                    HACK ODYSSEY
                                </textPath>
                            </text>

                            {/* 5. Circled Exponent Badge 2 at ~268° */}
                            <g transform="translate(25.5, 102.5) rotate(268)">
                                <circle cx="0" cy="0" r="8.5" stroke="rgba(244, 239, 231, 0.9)" strokeWidth="1.2" fill="#030206" />
                                <text x="0" y="2.8" textAnchor="middle" fontSize="6.5" fontFamily="'Inter', monospace" fontWeight="bold" fill="#f4efe7">
                                    3.0
                                </text>
                            </g>

                            {/* 6. HIGHLIGHTS on Arc 4 */}
                            <text className="text-[8.5px] font-mono font-bold tracking-[0.18em] fill-[#f4efe7]">
                                <textPath href="#arcHigh2" startOffset="50%" textAnchor="middle">
                                    HIGHLIGHTS
                                </textPath>
                            </text>
                        </svg>
                    </div>
                </div>

                {/* Refined Minimalist Frosted Glass Play / Pause Button (No Muddy Glows) */}
                <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="pointer-events-auto absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-14 h-14 sm:w-16 sm:h-16 md:w-18 md:h-18 rounded-full bg-white/10 hover:bg-white/20 active:bg-white/25 backdrop-blur-xl border border-white/25 hover:border-white/50 text-white shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-300 transform hover:scale-105 active:scale-95 group focus:outline-none"
                    title={isPlaying ? "Pause Highlights" : "Play Highlights"}
                    aria-label={isPlaying ? "Pause Highlights" : "Play Highlights"}
                >
                    {isPlaying ? (
                        <FaPause className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 group-hover:text-white transition-colors" />
                    ) : (
                        <FaPlay className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5 text-white/90 group-hover:text-white transition-colors" />
                    )}
                </button>
            </div>
        </div>
    );
};

export default VideoPin;
