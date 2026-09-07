import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import acmLogo from "../../assets/acm_logo.png";
import "./preloaderII.css";

export default function PreloaderII() {
    const rootRef = useRef(null);
    const counterRef = useRef(null);
    const statusTextRef = useRef(null);
    const fillBarRef = useRef(null);
    const microFillRef = useRef(null);
    const invertedLayerRef = useRef(null);
    const capsuleRef = useRef(null);

    const bootStages = [
        "INITIALIZING NEURAL CODE MATRIX...",
        "CONNECTING TO KARE ACM SERVER CLUSTER...",
        "ALLOCATING 24-HOUR INNOVATION RUNTIME...",
        "COMPILING HACK ODYSSEY 4.0 PROTOCOLS...",
        "ACCESS GRANTED // LAUNCHING ODYSSEY 4.0"
    ];

    useGSAP(() => {
        // Initial setup
        gsap.set(rootRef.current, { opacity: 1, yPercent: 0 });
        gsap.set([".preloader-header", ".preloader-telemetry-panel", ".preloader-footer"], {
            opacity: 0,
            y: 20
        });
        gsap.set(capsuleRef.current, {
            scale: 0.9,
            opacity: 0,
            y: 25
        });

        // Entrance animation
        const introTl = gsap.timeline();

        introTl
            .to(capsuleRef.current, {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 1.0,
                ease: "power4.out"
            })
            .to(
                [".preloader-header", ".preloader-telemetry-panel", ".preloader-footer"],
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.12,
                    duration: 0.7,
                    ease: "power3.out"
                },
                "-=0.6"
            );

        // Progress counter timeline (0 -> 100 with dynamic stepping)
        const progressObj = { value: 0 };
        const mainTl = gsap.timeline({ delay: 0.3 });

        mainTl.to(progressObj, {
            value: 100,
            duration: 3.4,
            ease: "power2.inOut",
            onUpdate: () => {
                const currentVal = Math.round(progressObj.value);

                // Update numerical counter
                if (counterRef.current) {
                    counterRef.current.textContent = String(currentVal).padStart(2, "0");
                }

                // Update capsule fill bar
                if (fillBarRef.current) {
                    fillBarRef.current.style.transform = `scaleX(${progressObj.value / 100})`;
                }

                // Update micro meter
                if (microFillRef.current) {
                    microFillRef.current.style.transform = `scaleX(${progressObj.value / 100})`;
                }

                // Update inverted layer clip-path
                if (invertedLayerRef.current) {
                    const rightInset = 100 - progressObj.value;
                    invertedLayerRef.current.style.clipPath = `inset(0 ${rightInset}% 0 0)`;
                }

                // Update dynamic boot stage text
                if (statusTextRef.current) {
                    if (currentVal < 25) {
                        statusTextRef.current.textContent = bootStages[0];
                    } else if (currentVal < 50) {
                        statusTextRef.current.textContent = bootStages[1];
                    } else if (currentVal < 75) {
                        statusTextRef.current.textContent = bootStages[2];
                    } else if (currentVal < 95) {
                        statusTextRef.current.textContent = bootStages[3];
                    } else {
                        statusTextRef.current.textContent = bootStages[4];
                    }
                }
            }
        });

        // Exit timeline upon reaching 100%
        mainTl
            .to(capsuleRef.current, {
                borderColor: "#ffffff",
                duration: 0.3,
                ease: "power2.out"
            })
            .to(
                [".preloader-header", ".preloader-telemetry-panel", ".preloader-footer"],
                {
                    opacity: 0,
                    y: -20,
                    stagger: 0.08,
                    duration: 0.5,
                    ease: "power3.in"
                },
                "+=0.15"
            )
            .to(
                capsuleRef.current,
                {
                    scale: 1.05,
                    opacity: 0,
                    y: -35,
                    duration: 0.6,
                    ease: "power4.in"
                },
                "-=0.3"
            )
            .to(
                rootRef.current,
                {
                    yPercent: -100,
                    duration: 1.0,
                    ease: "power4.inOut",
                    onComplete: () => {
                        if (rootRef.current) {
                            rootRef.current.style.display = "none";
                        }
                    }
                },
                "-=0.2"
            );

    }, { scope: rootRef });

    return (
        <div ref={rootRef} className="preloader-root">
            {/* Cyber Grid & Architectural Lines */}
            <div className="preloader-grid-overlay" />
            <div className="preloader-frame-line-top" />
            <div className="preloader-frame-line-bottom" />

            {/* Solid HUD Corner Markers */}
            <div className="hud-corner hud-corner-tl" />
            <div className="hud-corner hud-corner-tr" />
            <div className="hud-corner hud-corner-bl" />
            <div className="hud-corner hud-corner-br" />

            {/* ════════════ TOP HUD BAR ════════════ */}
            <header className="preloader-header">
                {/* Left: ACM Crest + KARE ACM PRESENTS */}
                <div className="flex items-center gap-3">
                    <img
                        src={acmLogo}
                        alt="KARE ACM Logo"
                        className="w-8 sm:w-10 h-auto object-contain"
                    />
                    <div className="flex flex-col text-left">
                        <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#a855f7]" />
                            <p className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.25em] text-[#d8b4fe] uppercase">
                                KARE ACM PRESENTS
                            </p>
                        </div>
                        <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-white/50 uppercase mt-0.5 hidden sm:inline-block">
                            Association for Computing Machinery
                        </span>
                    </div>
                </div>

                {/* Right: Coordinates & Edition HUD */}
                <div className="flex flex-col items-end text-right">
                    <span className="text-[10px] sm:text-xs font-mono text-[#a855f7] tracking-wider font-semibold">
                        [ 9.5824° N, 77.6766° E ]
                    </span>
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-white/60 uppercase mt-0.5">
                        SEPTEMBER 25–26, 2026
                    </span>
                </div>
            </header>

            {/* ════════════ CENTER STAGE: SOLID DUAL-TONE CAPSULE ════════════ */}
            <main className="preloader-center-stage">
                {/* Solid Minimalist Orbit Ring */}
                <div className="preloader-orbital-ring" />

                {/* Master Capsule Chamber */}
                <div ref={capsuleRef} className="preloader-capsule-chamber">
                    {/* Layer 1: Base Dark Theme Layer */}
                    <div className="preloader-text-base-layer">
                        <h1 className="preloader-title-text text-light-version">
                            HACK ODYSSEY
                        </h1>
                        <div className="preloader-exponent-badge exponent-light">
                            4.0
                        </div>
                    </div>

                    {/* Solid White Progress Fill Bar */}
                    <div ref={fillBarRef} className="preloader-solid-progress-bar">
                        <div className="preloader-energy-edge" />
                    </div>

                    {/* Layer 2: Inverted Black Fill Layer (Dynamically Clipped) */}
                    <div ref={invertedLayerRef} className="preloader-text-inverted-layer">
                        <h1 className="preloader-title-text text-dark-version">
                            HACK ODYSSEY
                        </h1>
                        <div className="preloader-exponent-badge exponent-dark">
                            4.0
                        </div>
                    </div>
                </div>

                {/* Telemetry & Micro-Meter Panel Below Capsule */}
                <div className="preloader-telemetry-panel">
                    {/* Numeric Counter */}
                    <div className="preloader-counter-readout">
                        <span ref={counterRef} className="counter-number">00</span>
                        <span className="text-white/60 text-sm sm:text-base font-mono">%</span>
                    </div>

                    {/* Segmented Micro Track Meter */}
                    <div className="preloader-micro-meter">
                        <div ref={microFillRef} className="preloader-micro-meter-fill" />
                    </div>

                    {/* Dynamic Boot Sequence Stage Ticker */}
                    <div className="preloader-terminal-status">
                        <span className="preloader-status-dot" />
                        <span ref={statusTextRef}>
                            INITIALIZING NEURAL CODE MATRIX...
                        </span>
                    </div>
                </div>
            </main>

            {/* ════════════ BOTTOM HUD FOOTER ════════════ */}
            <footer className="preloader-footer">
                {/* Left: Hackathon Identity */}
                <div className="flex flex-col text-left">
                    <p className="text-[10px] sm:text-xs font-mono font-medium text-white/80 tracking-wider uppercase">
                        24-Hour National Hackathon
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-mono text-[#a199b0] tracking-widest mt-0.5">
                        Enter the Code Dimension · KARE Campus
                    </p>
                </div>

                {/* Center: Audio Wave Frequency Indicator */}
                <div className="preloader-wave-visualizer hidden md:flex" title="Frequency Sync">
                    <div className="preloader-wave-bar" />
                    <div className="preloader-wave-bar" />
                    <div className="preloader-wave-bar" />
                    <div className="preloader-wave-bar" />
                    <div className="preloader-wave-bar" />
                </div>

                {/* Right: Chapter Motto */}
                <div className="flex flex-col text-right sm:items-end">
                    <p className="text-[10px] sm:text-xs font-mono font-medium text-[#d8b4fe] tracking-wider uppercase">
                        KARE ACM Student Chapter
                    </p>
                    <p className="text-[9px] sm:text-[10px] font-mono text-white/50 tracking-widest mt-0.5">
                        Innovate &middot; Collaborate &middot; Build
                    </p>
                </div>
            </footer>
        </div>
    );
}