import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './winners.css';
import { BsFillPlusCircleFill, BsXCircleFill } from "react-icons/bs";

import winner1 from '../../assets/winner1.jpeg';
import winner2 from '../../assets/winner2.jpeg';
import winner3 from '../../assets/winner3.jpeg';
import winner4 from '../../assets/winner4.jpeg';
import winner5 from '../../assets/winner5.jpeg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const WINNERS_DATA = [
    {
        id: 1,
        rank: "01",
        position: "Grand Champion · 1st Place",
        prize: "₹10,000",
        edition: "HACK ODYSSEY",
        version: "3.0",
        team: "Idea Igniters",
        project: "Autonomous Edge-AI & Smart Embedded Telemetry",
        university: "Francis Xavier Engineering College",
        track: "AI & Smart Automation",
        summary: "Engineered an intelligent edge-AI telemetry and automation platform delivering real-time monitoring and high-accuracy telemetry.",
        image: winner1,
        progress: 20,
        accentColor: "#a855f7",
        textColor: "#d8b4fe",
        hoverColor: "#a855f7",
        tech: ["Python", "TensorFlow", "React", "FastAPI", "IoT"],
        impact: "Awarded Grand Champion 1st Place with highest technical excellence and innovation."
    },
    {
        id: 2,
        rank: "02",
        position: "1st Runner Up · 2nd Place",
        prize: "₹6,000",
        edition: "HACK ODYSSEY",
        version: "3.0",
        team: "Tera Byte",
        project: "Scalable High-Performance Distributed Architecture",
        university: "SRM Institute of Science & Technology, Tiruchirapalli Campus",
        track: "Web3 & Cloud Computing",
        summary: "Pioneered a resilient distributed architecture providing high-throughput verification and secure cross-platform synchronization.",
        image: winner2,
        progress: 40,
        accentColor: "#38bdf8",
        textColor: "#bae6fd",
        hoverColor: "#38bdf8",
        tech: ["Node.js", "Docker", "Go", "TypeScript", "Redis"],
        impact: "Awarded 1st Runner Up 2nd Place for exceptional architectural design and real-time reliability."
    },
    {
        id: 3,
        rank: "03",
        position: "2nd Runner Up · 3rd Place",
        prize: "₹4,500",
        edition: "HACK ODYSSEY",
        version: "3.0",
        team: "Agri Vision",
        project: "Next-Gen Computer Vision & Smart Agro-Tech Platform",
        university: "Bharath Institute of Higher Education and Research",
        track: "Computer Vision & AgriTech",
        summary: "Deployed cutting-edge visual telemetry and precision machine learning models for proactive crop health diagnosis and yield estimation.",
        image: winner3,
        progress: 60,
        accentColor: "#fbbf24",
        textColor: "#fde68a",
        hoverColor: "#fbbf24",
        tech: ["OpenCV", "PyTorch", "Flask", "React Native", "PostgreSQL"],
        impact: "Awarded 2nd Runner Up 3rd Place for impactful sustainable technology application in agriculture."
    },
    {
        id: 4,
        rank: "04",
        position: "Finalist · 4th Place",
        prize: "₹1,500",
        edition: "HACK ODYSSEY",
        version: "3.0",
        team: "Kernal Knight",
        project: "Low-Latency Kernel & System-Level Optimization",
        university: "Velammal College of Engineering and Technology",
        track: "Systems Engineering & CyberSecurity",
        summary: "Developed low-overhead kernel-level optimization routines enabling hardened real-time process monitoring and fault isolation.",
        image: winner4,
        progress: 80,
        accentColor: "#34d399",
        textColor: "#a7f3d0",
        hoverColor: "#34d399",
        tech: ["C++", "Rust", "Linux Kernel", "eBPF", "Assembly"],
        impact: "Recognized as 4th Place Finalist for outstanding low-level systems engineering."
    },
    {
        id: 5,
        rank: "05",
        position: "Finalist · 5th Place",
        prize: "₹1,500",
        edition: "HACK ODYSSEY",
        version: "3.0",
        team: "ABA Agents",
        project: "Autonomous Multi-Agent AI & Distributed Coordination",
        university: "Francis Xavier Engineering College",
        track: "AI & Multi-Agent Intelligence",
        summary: "Created a decentralized multi-agent coordination framework capable of dynamic collaborative problem-solving across heterogeneous environments.",
        image: winner5,
        progress: 100,
        accentColor: "#f472b6",
        textColor: "#fbcfe8",
        hoverColor: "#f472b6",
        tech: ["LangChain", "Python", "FastAPI", "VectorDB", "Next.js"],
        impact: "Recognized as 5th Place Finalist for innovative agentic AI workflows."
    }
];

const Winners = () => {
    const pageRef = useRef(null);
    const [activeModal, setActiveModal] = useState(null);

    useGSAP(() => {
        // Prevent layout resize jumping on mobile address-bar hide/show
        ScrollTrigger.config({ ignoreMobileResize: true });

        const mm = gsap.matchMedia();

        // ════════════ DESKTOP TIMELINE (100% UNTOUCHED) ════════════
        mm.add("(min-width: 768px)", () => {
            const tl4 = gsap.timeline({
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: "top top",
                    end: "+=360%",
                    scrub: 0.8,
                    pin: true,
                    anticipatePin: 1,
                }
            });

            gsap.set(".winners-topText, .winners-bottomText", {
                opacity: 1,
                x: 0
            });

            // Animation sequence:
            // A: Fade marquee ribbon & expand Card 1 to full bleed viewport
            tl4.to(".winners-marquee-container", {
                opacity: 0,
                scale: 0.96,
                ease: "power2.out",
            }, 'a')
                .to(".winners-page4 .winners-background", {
                    width: "100vw",
                    height: "100vh",
                    borderRadius: "0px",
                    y: 0,
                    ease: "power2.inOut",
                }, 'a')
                .to(".winners-page4 .winners-background img", {
                    transform: "scale(1)",
                    ease: "power2.inOut",
                }, 'a')
                .from(".winners-background .winners-topText, .winners-background .winners-bottomText", {
                    opacity: 0,
                    x: 35,
                    ease: "power2.out",
                })
                .to({}, { duration: 0.4 }, "+=0")

                // B: Card 2 enters from bottom, replaces Card 1
                .to("#winners-second", {
                    transform: "translate(-50%, -50%)",
                    ease: "power2.inOut",
                }, 'b')
                .to("#winners-second img", {
                    transform: "scale(1)",
                    ease: "power2.inOut",
                }, 'b')
                .to(".winners-page4 .winners-background", {
                    scale: 0.92,
                    opacity: 0,
                    y: -50,
                    ease: "power2.inOut",
                }, 'b')
                .from("#winners-second .winners-topText, #winners-second .winners-bottomText", {
                    opacity: 0,
                    x: 35,
                    ease: "power2.out",
                })
                .to({}, { duration: 0.4 }, "+=0")

                // C: Card 3 enters from bottom, replaces Card 2
                .to("#winners-third", {
                    transform: "translate(-50%, -50%)",
                    ease: "power2.inOut",
                }, 'c')
                .to("#winners-third img", {
                    transform: "scale(1)",
                    ease: "power2.inOut",
                }, 'c')
                .to("#winners-second", {
                    scale: 0.92,
                    opacity: 0,
                    ease: "power2.inOut",
                }, 'c')
                .from("#winners-third .winners-topText, #winners-third .winners-bottomText", {
                    opacity: 0,
                    x: 35,
                    ease: "power2.out",
                })
                .to({}, { duration: 0.4 }, "+=0")

                // D: Card 4 enters from bottom, replaces Card 3
                .to("#winners-fourth", {
                    transform: "translate(-50%, -50%)",
                    ease: "power2.inOut",
                }, 'd')
                .to("#winners-fourth img", {
                    transform: "scale(1)",
                    ease: "power2.inOut",
                }, 'd')
                .to("#winners-third", {
                    scale: 0.92,
                    opacity: 0,
                    ease: "power2.inOut",
                }, 'd')
                .from("#winners-fourth .winners-topText, #winners-fourth .winners-bottomText", {
                    opacity: 0,
                    x: 35,
                    ease: "power2.out",
                })
                .to({}, { duration: 0.4 }, "+=0")

                // E: Card 5 enters from bottom, replaces Card 4
                .to("#winners-fifth", {
                    transform: "translate(-50%, -50%)",
                    ease: "power2.inOut",
                }, 'e')
                .to("#winners-fifth img", {
                    transform: "scale(1)",
                    ease: "power2.inOut",
                }, 'e')
                .to("#winners-fourth", {
                    scale: 0.92,
                    opacity: 0,
                    ease: "power2.inOut",
                }, 'e')
                .from("#winners-fifth .winners-topText, #winners-fifth .winners-bottomText", {
                    opacity: 0,
                    x: 35,
                    ease: "power2.out",
                })
                .to({}, { duration: 0.4 }, "+=0");
        });

        // ════════════ MOBILE TIMELINE (60-120 FPS JITTER-FREE TOUCH STREAM) ════════════
        mm.add("(max-width: 767px)", () => {
            gsap.set(".winners-topText, .winners-bottomText", {
                opacity: 1,
                x: 0,
            });

            const tl4Mob = gsap.timeline({
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: "top top",
                    end: "+=2600",
                    scrub: 0.35,
                    pin: true,
                    anticipatePin: 0,
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                    preventOverlaps: true,
                }
            });

            tl4Mob.to(".winners-marquee-container", {
                opacity: 0,
                scale: 0.96,
                ease: "none",
                duration: 0.5,
            }, 'a')
                .to(".winners-page4 .winners-background", {
                    opacity: 1,
                    ease: "none",
                    duration: 0.8,
                }, 'a')
                .from(".winners-background .winners-topText, .winners-background .winners-bottomText", {
                    opacity: 0,
                    x: 20,
                    ease: "none",
                    duration: 0.4,
                }, 'a+=0.2')
                .to({}, { duration: 0.2 })

                // B: Card 2
                .to("#winners-second", {
                    transform: "translate(-50%, -50%)",
                    ease: "none",
                    duration: 0.8,
                }, 'b')
                .to(".winners-page4 .winners-background", {
                    scale: 0.94,
                    opacity: 0,
                    ease: "none",
                    duration: 0.8,
                }, 'b')
                .from("#winners-second .winners-topText, #winners-second .winners-bottomText", {
                    opacity: 0,
                    x: 20,
                    ease: "none",
                    duration: 0.4,
                }, 'b+=0.2')
                .to({}, { duration: 0.2 })

                // C: Card 3
                .to("#winners-third", {
                    transform: "translate(-50%, -50%)",
                    ease: "none",
                    duration: 0.8,
                }, 'c')
                .to("#winners-second", {
                    scale: 0.94,
                    opacity: 0,
                    ease: "none",
                    duration: 0.8,
                }, 'c')
                .from("#winners-third .winners-topText, #winners-third .winners-bottomText", {
                    opacity: 0,
                    x: 20,
                    ease: "none",
                    duration: 0.4,
                }, 'c+=0.2')
                .to({}, { duration: 0.2 })

                // D: Card 4
                .to("#winners-fourth", {
                    transform: "translate(-50%, -50%)",
                    ease: "none",
                    duration: 0.8,
                }, 'd')
                .to("#winners-third", {
                    scale: 0.94,
                    opacity: 0,
                    ease: "none",
                    duration: 0.8,
                }, 'd')
                .from("#winners-fourth .winners-topText, #winners-fourth .winners-bottomText", {
                    opacity: 0,
                    x: 20,
                    ease: "none",
                    duration: 0.4,
                }, 'd+=0.2')
                .to({}, { duration: 0.2 })

                // E: Card 5
                .to("#winners-fifth", {
                    transform: "translate(-50%, -50%)",
                    ease: "none",
                    duration: 0.8,
                }, 'e')
                .to("#winners-fourth", {
                    scale: 0.94,
                    opacity: 0,
                    ease: "none",
                    duration: 0.8,
                }, 'e')
                .from("#winners-fifth .winners-topText, #winners-fifth .winners-bottomText", {
                    opacity: 0,
                    x: 20,
                    ease: "none",
                    duration: 0.4,
                }, 'e+=0.2')
                .to({}, { duration: 0.2 });
        });

        return () => mm.revert();

    }, { scope: pageRef });

    // Continuous Dual-Track Flex Ribbon Marquee for 100% collision-free, seamless 60-120fps scrolling
    const renderMarqueeGroup = (ariaHidden = false) => (
        <div 
            className="winners-marquee-group" 
            aria-hidden={ariaHidden ? "true" : undefined}
        >
            {[1, 2, 3, 4].map((num) => (
                <div key={num} className="winners-marquee-item">
                    <span className="winners-marquee-text font-hero-bebas">
                        HACK <span className="winners-marquee-odyssey">ODYSSEY</span>
                    </span>
                    <span 
                        className="winners-badge-exponent-marquee" 
                        title="Version 3.0"
                    >
                        3.0
                    </span>
                </div>
            ))}
        </div>
    );

    const toggleModal = (winner) => {
        setActiveModal(activeModal?.id === winner.id ? null : winner);
    };

    return (
        <section id="winners" className="winners-page4" ref={pageRef}>
            {/* Ambient Lighting matching Prize Pool */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#25104A]/30 rounded-full blur-[170px] pointer-events-none z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[#7C3CFF]/14 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#25104A]/30 rounded-full blur-[170px] pointer-events-none z-0" />

            {/* Seamless Side-Scrolling Background Marquee Text */}
            <div className="winners-marquee-container">
                <div className="winners-marquee-track">
                    {renderMarqueeGroup(false)}
                    {renderMarqueeGroup(true)}
                </div>
            </div>

            {/* ════════════════════ CARD 1: 1ST PLACE WINNER ════════════════════ */}
            <div className="winners-background">
                <img src={WINNERS_DATA[0].image} alt={WINNERS_DATA[0].team} loading="eager" decoding="async" />
                <div className="winners-vignette-overlay" />

                {/* Top-Left Corner: HACK ODYSSEY 3.0 + Position */}
                <div className="winners-topText">
                    <div className="flex flex-col items-start text-left select-none">
                        <div className="relative inline-flex items-start whitespace-nowrap">
                            <h2 className="winners-main-title font-hero-bebas">
                                {WINNERS_DATA[0].edition}
                            </h2>
                            <span 
                                className="winners-badge-exponent"
                                title="Version 3.0"
                            >
                                {WINNERS_DATA[0].version}
                            </span>
                        </div>
                        <p className="winners-subtitle text-[#d8b4fe] text-xs sm:text-sm font-mono font-medium tracking-wider uppercase mt-1 drop-shadow">
                            {WINNERS_DATA[0].position} &middot; {WINNERS_DATA[0].prize}
                        </p>
                    </div>
                </div>

                {/* Bottom Row: Progress (Left) and + Description (Right) */}
                <div className="winners-bottomText">
                    {/* Bottom-Left: Clean Minimal Progress Indicator */}
                    <div className="winners-progress-container select-none">
                        <div className="winners-progress-bar">
                            <div className="winners-progress-line" style={{ width: `${WINNERS_DATA[0].progress}%` }} />
                        </div>
                    </div>

                    {/* Bottom-Right: + Button + Clean Condensed Details */}
                    <div className="winners-card-info-wrap flex items-center gap-3.5 sm:gap-4 max-w-xl text-right justify-end select-none">
                        <div className="flex flex-col items-end">
                            <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base leading-snug drop-shadow">
                                <span className="text-[#d8b4fe] font-bold">{WINNERS_DATA[0].team}</span>
                                <span className="text-white/60 mx-1.5">&middot;</span>
                                <span className="text-white/90">{WINNERS_DATA[0].university}</span>
                            </h3>
                            <p className="text-[#cbd5e1] font-normal text-[11px] sm:text-xs leading-relaxed mt-0.5 drop-shadow line-clamp-1 sm:line-clamp-2">
                                {WINNERS_DATA[0].project}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => toggleModal(WINNERS_DATA[0])}
                            className="winners-plus-btn group cursor-pointer shrink-0"
                            title="View Project Specifications"
                            aria-label="View Project Specifications"
                        >
                            <BsFillPlusCircleFill className="w-7 h-7 sm:w-8 sm:h-8 text-[#f4efe7] group-hover:text-[#a855f7] transition-all transform group-hover:scale-110" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ════════════════════ CARD 2: 2ND PLACE WINNER ════════════════════ */}
            <div id="winners-second" className="winners-background2">
                <img src={WINNERS_DATA[1].image} alt={WINNERS_DATA[1].team} loading="eager" decoding="async" />
                <div className="winners-vignette-overlay" />

                {/* Top-Left Corner */}
                <div className="winners-topText">
                    <div className="flex flex-col items-start text-left select-none">
                        <div className="relative inline-flex items-start whitespace-nowrap">
                            <h2 className="winners-main-title font-hero-bebas">
                                {WINNERS_DATA[1].edition}
                            </h2>
                            <span 
                                className="winners-badge-exponent"
                                title="Version 3.0"
                            >
                                {WINNERS_DATA[1].version}
                            </span>
                        </div>
                        <p className="winners-subtitle text-[#bae6fd] text-xs sm:text-sm font-mono font-medium tracking-wider uppercase mt-1 drop-shadow">
                            {WINNERS_DATA[1].position} &middot; {WINNERS_DATA[1].prize}
                        </p>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="winners-bottomText">
                    <div className="winners-progress-container select-none">
                        <div className="winners-progress-bar">
                            <div className="winners-progress-line" style={{ width: `${WINNERS_DATA[1].progress}%` }} />
                        </div>
                    </div>

                    <div className="winners-card-info-wrap flex items-center gap-3.5 sm:gap-4 max-w-xl text-right justify-end select-none">
                        <div className="flex flex-col items-end">
                            <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base leading-snug drop-shadow">
                                <span className="text-[#7dd3fc] font-bold">{WINNERS_DATA[1].team}</span>
                                <span className="text-white/60 mx-1.5">&middot;</span>
                                <span className="text-white/90">{WINNERS_DATA[1].university}</span>
                            </h3>
                            <p className="text-[#cbd5e1] font-normal text-[11px] sm:text-xs leading-relaxed mt-0.5 drop-shadow line-clamp-1 sm:line-clamp-2">
                                {WINNERS_DATA[1].project}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => toggleModal(WINNERS_DATA[1])}
                            className="winners-plus-btn group cursor-pointer shrink-0"
                            title="View Project Specifications"
                            aria-label="View Project Specifications"
                        >
                            <BsFillPlusCircleFill className="w-7 h-7 sm:w-8 sm:h-8 text-[#f4efe7] group-hover:text-[#38bdf8] transition-all transform group-hover:scale-110" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ════════════════════ CARD 3: 3RD PLACE WINNER ════════════════════ */}
            <div id="winners-third" className="winners-background2">
                <img src={WINNERS_DATA[2].image} alt={WINNERS_DATA[2].team} loading="eager" decoding="async" />
                <div className="winners-vignette-overlay" />

                {/* Top-Left Corner */}
                <div className="winners-topText">
                    <div className="flex flex-col items-start text-left select-none">
                        <div className="relative inline-flex items-start whitespace-nowrap">
                            <h2 className="winners-main-title font-hero-bebas">
                                {WINNERS_DATA[2].edition}
                            </h2>
                            <span 
                                className="winners-badge-exponent"
                                title="Version 3.0"
                            >
                                {WINNERS_DATA[2].version}
                            </span>
                        </div>
                        <p className="winners-subtitle text-[#fde68a] text-xs sm:text-sm font-mono font-medium tracking-wider uppercase mt-1 drop-shadow">
                            {WINNERS_DATA[2].position} &middot; {WINNERS_DATA[2].prize}
                        </p>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="winners-bottomText">
                    <div className="winners-progress-container select-none">
                        <div className="winners-progress-bar">
                            <div className="winners-progress-line" style={{ width: `${WINNERS_DATA[2].progress}%` }} />
                        </div>
                    </div>

                    <div className="winners-card-info-wrap flex items-center gap-3.5 sm:gap-4 max-w-xl text-right justify-end select-none">
                        <div className="flex flex-col items-end">
                            <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base leading-snug drop-shadow">
                                <span className="text-[#fde047] font-bold">{WINNERS_DATA[2].team}</span>
                                <span className="text-white/60 mx-1.5">&middot;</span>
                                <span className="text-white/90">{WINNERS_DATA[2].university}</span>
                            </h3>
                            <p className="text-[#cbd5e1] font-normal text-[11px] sm:text-xs leading-relaxed mt-0.5 drop-shadow line-clamp-1 sm:line-clamp-2">
                                {WINNERS_DATA[2].project}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => toggleModal(WINNERS_DATA[2])}
                            className="winners-plus-btn group cursor-pointer shrink-0"
                            title="View Project Specifications"
                            aria-label="View Project Specifications"
                        >
                            <BsFillPlusCircleFill className="w-7 h-7 sm:w-8 sm:h-8 text-[#f4efe7] group-hover:text-[#fbbf24] transition-all transform group-hover:scale-110" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ════════════════════ CARD 4: 4TH PLACE WINNER ════════════════════ */}
            <div id="winners-fourth" className="winners-background2">
                <img src={WINNERS_DATA[3].image} alt={WINNERS_DATA[3].team} loading="eager" decoding="async" />
                <div className="winners-vignette-overlay" />

                {/* Top-Left Corner */}
                <div className="winners-topText">
                    <div className="flex flex-col items-start text-left select-none">
                        <div className="relative inline-flex items-start whitespace-nowrap">
                            <h2 className="winners-main-title font-hero-bebas">
                                {WINNERS_DATA[3].edition}
                            </h2>
                            <span 
                                className="winners-badge-exponent"
                                title="Version 3.0"
                            >
                                {WINNERS_DATA[3].version}
                            </span>
                        </div>
                        <p className="winners-subtitle text-[#a7f3d0] text-xs sm:text-sm font-mono font-medium tracking-wider uppercase mt-1 drop-shadow">
                            {WINNERS_DATA[3].position} &middot; {WINNERS_DATA[3].prize}
                        </p>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="winners-bottomText">
                    <div className="winners-progress-container select-none">
                        <div className="winners-progress-bar">
                            <div className="winners-progress-line" style={{ width: `${WINNERS_DATA[3].progress}%` }} />
                        </div>
                    </div>

                    <div className="winners-card-info-wrap flex items-center gap-3.5 sm:gap-4 max-w-xl text-right justify-end select-none">
                        <div className="flex flex-col items-end">
                            <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base leading-snug drop-shadow">
                                <span className="text-[#34d399] font-bold">{WINNERS_DATA[3].team}</span>
                                <span className="text-white/60 mx-1.5">&middot;</span>
                                <span className="text-white/90">{WINNERS_DATA[3].university}</span>
                            </h3>
                            <p className="text-[#cbd5e1] font-normal text-[11px] sm:text-xs leading-relaxed mt-0.5 drop-shadow line-clamp-1 sm:line-clamp-2">
                                {WINNERS_DATA[3].project}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => toggleModal(WINNERS_DATA[3])}
                            className="winners-plus-btn group cursor-pointer shrink-0"
                            title="View Project Specifications"
                            aria-label="View Project Specifications"
                        >
                            <BsFillPlusCircleFill className="w-7 h-7 sm:w-8 sm:h-8 text-[#f4efe7] group-hover:text-[#34d399] transition-all transform group-hover:scale-110" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ════════════════════ CARD 5: 5TH PLACE WINNER ════════════════════ */}
            <div id="winners-fifth" className="winners-background2">
                <img src={WINNERS_DATA[4].image} alt={WINNERS_DATA[4].team} loading="eager" decoding="async" />
                <div className="winners-vignette-overlay" />

                {/* Top-Left Corner */}
                <div className="winners-topText">
                    <div className="flex flex-col items-start text-left select-none">
                        <div className="relative inline-flex items-start whitespace-nowrap">
                            <h2 className="winners-main-title font-hero-bebas">
                                {WINNERS_DATA[4].edition}
                            </h2>
                            <span 
                                className="winners-badge-exponent"
                                title="Version 3.0"
                            >
                                {WINNERS_DATA[4].version}
                            </span>
                        </div>
                        <p className="winners-subtitle text-[#fbcfe8] text-xs sm:text-sm font-mono font-medium tracking-wider uppercase mt-1 drop-shadow">
                            {WINNERS_DATA[4].position} &middot; {WINNERS_DATA[4].prize}
                        </p>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="winners-bottomText">
                    <div className="winners-progress-container select-none">
                        <div className="winners-progress-bar">
                            <div className="winners-progress-line" style={{ width: `${WINNERS_DATA[4].progress}%` }} />
                        </div>
                    </div>

                    <div className="winners-card-info-wrap flex items-center gap-3.5 sm:gap-4 max-w-xl text-right justify-end select-none">
                        <div className="flex flex-col items-end">
                            <h3 className="text-white font-semibold text-xs sm:text-sm md:text-base leading-snug drop-shadow">
                                <span className="text-[#f472b6] font-bold">{WINNERS_DATA[4].team}</span>
                                <span className="text-white/60 mx-1.5">&middot;</span>
                                <span className="text-white/90">{WINNERS_DATA[4].university}</span>
                            </h3>
                            <p className="text-[#cbd5e1] font-normal text-[11px] sm:text-xs leading-relaxed mt-0.5 drop-shadow line-clamp-1 sm:line-clamp-2">
                                {WINNERS_DATA[4].project}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => toggleModal(WINNERS_DATA[4])}
                            className="winners-plus-btn group cursor-pointer shrink-0"
                            title="View Project Specifications"
                            aria-label="View Project Specifications"
                        >
                            <BsFillPlusCircleFill className="w-7 h-7 sm:w-8 sm:h-8 text-[#f4efe7] group-hover:text-[#f472b6] transition-all transform group-hover:scale-110" />
                        </button>
                    </div>
                </div>
            </div>

            {/* ════════════════════ INTERACTIVE HUD MODAL ════════════════════ */}
            {activeModal && (
                <div className="winners-modal-backdrop" onClick={() => setActiveModal(null)}>
                    <div className="winners-modal-card" onClick={(e) => e.stopPropagation()}>
                        <div className="flex justify-between items-start border-b border-white/10 pb-3 mb-3">
                            <div>
                                <span className="text-[11px] font-mono text-[#a855f7] font-bold uppercase tracking-wider">
                                    {activeModal.position} &middot; {activeModal.prize}
                                </span>
                                <h3 className="text-lg sm:text-xl font-bold text-white mt-0.5">
                                    {activeModal.team}
                                </h3>
                                <p className="text-xs text-[#cbd5e1]">
                                    {activeModal.university}
                                </p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveModal(null)}
                                className="winners-modal-close-btn text-white/60 hover:text-white transition-colors cursor-pointer p-1.5 -mr-1.5 -mt-1.5"
                                aria-label="Close modal"
                            >
                                <BsXCircleFill className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        <div className="space-y-2.5 text-xs text-[#cbd5e1] winners-modal-body">
                            <div>
                                <span className="text-[10px] font-mono text-[#a855f7] uppercase tracking-wider block mb-0.5">
                                    PROJECT
                                </span>
                                <p className="text-white font-medium">{activeModal.project}</p>
                                <p className="text-white/70 text-[11px] mt-0.5 leading-relaxed">{activeModal.summary}</p>
                            </div>

                            <div className="bg-white/5 p-2.5 rounded-lg border border-white/5">
                                <span className="text-[10px] font-mono text-amber-400 uppercase tracking-wider block mb-0.5">
                                    IMPACT & HIGHLIGHT
                                </span>
                                <p className="text-[#f4efe7] text-[11px] italic">{activeModal.impact}</p>
                            </div>

                            <div>
                                <span className="text-[10px] font-mono text-[#a855f7] uppercase tracking-wider block mb-1">
                                    TECH STACK
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                    {activeModal.tech.map((t, idx) => (
                                        <span key={idx} className="px-2 py-0.5 rounded bg-white/10 text-white text-[10px] font-mono border border-white/10">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default Winners;
