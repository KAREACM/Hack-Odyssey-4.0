import React, { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import './winners.css';
import { BsFillPlusCircleFill, BsXCircleFill } from "react-icons/bs";

import winner1 from '../../assets/winner1.jpg';
import winner2 from '../../assets/winner2.jpg';
import winner3 from '../../assets/winner3.jpg';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const WINNERS_DATA = [
    {
        id: 1,
        rank: "01",
        position: "Grand Champion · 1st Place",
        prize: "₹50,000",
        edition: "HACK ODYSSEY",
        version: "3.0",
        team: "Team NeuralPulse",
        project: "Autonomous Bio-Telemetry & Emergency Triage AI",
        university: "IIT Madras",
        track: "AI & Healthcare Systems",
        summary: "Engineered a sub-millisecond edge-AI diagnostic engine integrating real-time ECG synthesis with decentralized paramedic dispatch networks.",
        image: winner1,
        progress: 33,
        accentColor: "#a855f7",
        members: ["Aarav Sharma (ML Lead)", "Kavya Patel (Systems)", "Rohan Iyer (Edge IoT)"],
        tech: ["PyTorch", "Rust", "WebAssembly", "FastAPI", "TensorRT"],
        impact: "Reduced emergency response telemetry latency by 74% in simulated clinical trials."
    },
    {
        id: 2,
        rank: "02",
        position: "1st Runner Up · 2nd Place",
        prize: "₹30,000",
        edition: "HACK ODYSSEY",
        version: "3.0",
        team: "Team CipherZero",
        project: "Zero-Knowledge Cross-Chain Identity Protocol",
        university: "NIT Trichy",
        track: "Web3 & Cryptography",
        summary: "Pioneered zk-SNARK attestation delivering quantum-resistant decentralized multi-chain verification without exposing sensitive user credentials.",
        image: winner2,
        progress: 67,
        accentColor: "#38bdf8",
        members: ["Vikramaditya Nair (ZKP Cryptographer)", "Ananya Sen (Protocol Dev)", "Aditya Verma (Security)"],
        tech: ["Circom", "Solidity", "Rust", "TypeScript", "Noir"],
        impact: "Enabled trustless multi-chain credential verification with zero cryptographic data leaks."
    },
    {
        id: 3,
        rank: "03",
        position: "2nd Runner Up · 3rd Place",
        prize: "₹20,000",
        edition: "HACK ODYSSEY",
        version: "3.0",
        team: "Team GeoVision",
        project: "Hyper-Spectral Geospatial AI for Climate Disaster Mitigation",
        university: "VIT Vellore",
        track: "Geospatial AI & ClimateTech",
        summary: "Deployed lightweight satellite telemetry models delivering automated wildfire propagation forecasts and dynamic evacuation routing 6x faster.",
        image: winner3,
        progress: 100,
        accentColor: "#fbbf24",
        members: ["Sneha Reddy (Geospatial Lead)", "Tanmay Joshi (Computer Vision)", "Priya Sundaram (Backend)"],
        tech: ["GDAL", "TensorFlow", "PostGIS", "React", "Docker"],
        impact: "Simulated real-time evacuation pathways for over 120,000 inhabitants under critical conditions."
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
                    end: "+=220%",
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
                    end: "+=1800",
                    scrub: 0.4, // Responsive 0.4s tracks finger 1:1, eliminating rubber-band lag
                    pin: true,
                    anticipatePin: 0, // 0 prevents the 1-frame pre-pin snap jump
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                    preventOverlaps: true,
                }
            });

            // Linear ease matches the constant finger velocity, removing shaky speed-up/slow-down jerks
            tl4Mob.to(".winners-marquee-container", {
                opacity: 0,
                scale: 0.96,
                ease: "none",
                duration: 0.6,
            }, 'a')
                .to(".winners-page4 .winners-background", {
                    width: "100vw",
                    height: "100vh",
                    borderRadius: "0px",
                    y: 0,
                    ease: "none",
                    duration: 0.8,
                }, 'a')
                .to(".winners-page4 .winners-background img", {
                    scale: 1,
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

                // B: Card 2 glides smoothly up to replace Card 1
                .to("#winners-second", {
                    transform: "translate(-50%, -50%)",
                    ease: "none",
                    duration: 0.8,
                }, 'b')
                .to("#winners-second img", {
                    scale: 1,
                    ease: "none",
                    duration: 0.8,
                }, 'b')
                .to(".winners-page4 .winners-background", {
                    scale: 0.94,
                    opacity: 0,
                    y: -30,
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

                // C: Card 3 glides smoothly up to replace Card 2
                .to("#winners-third", {
                    transform: "translate(-50%, -50%)",
                    ease: "none",
                    duration: 0.8,
                }, 'c')
                .to("#winners-third img", {
                    scale: 1,
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
