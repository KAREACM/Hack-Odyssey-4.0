import React, { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./gallery.css";

// 5 Curated Hack Odyssey Landscape Event Images
import gallery4 from "../../assets/gallery_4.jpg";
import gallery5 from "../../assets/gallery_5.jpg";
import gallery3 from "../../assets/gallery_3.jpg";
import gallery1 from "../../assets/gallery_1.jpg";
import gallery2 from "../../assets/gallery_2.jpeg";

gsap.registerPlugin(ScrollTrigger);

const GALLERY_CARDS = [
    {
        id: 1,
        img: gallery4,
        rotate: -6,
        baseTranslateY: 18,
        scale: 0.94,
        type: "outer",
    },
    {
        id: 2,
        img: gallery5,
        rotate: -3,
        baseTranslateY: -6,
        scale: 0.97,
        type: "inner",
    },
    {
        id: 3,
        img: gallery3,
        rotate: 0,
        baseTranslateY: -28,
        scale: 1.0,
        type: "hero",
    },
    {
        id: 4,
        img: gallery1,
        rotate: 3,
        baseTranslateY: -6,
        scale: 0.97,
        type: "inner",
    },
    {
        id: 5,
        img: gallery2,
        rotate: 6,
        baseTranslateY: 18,
        scale: 0.94,
        type: "outer",
    },
];

const Gallery = () => {
    const galleryRef = useRef(null);
    const [hoveredCardId, setHoveredCardId] = useState(null);
    const imageRefs = useRef({});

    useGSAP(() => {
        if (!galleryRef.current) return;

        // MatchMedia for responsive scroll narrative
        const mm = gsap.matchMedia();

        // ════════════ DESKTOP / TABLET TIMELINE (100% UNTOUCHED) ════════════
        mm.add("(min-width: 768px)", () => {
            // Overlay emergence on top of pinned highlights video
            gsap.set(galleryRef.current, {
                marginTop: "-100vh",
            });

            const galleryTl = gsap.timeline({
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: "top top",
                    end: "+=2200",
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            // PHASE 1: Cinematic Card Rise from Below
            galleryTl.from(
                ".gallery-card-item",
                {
                    yPercent: 240,
                    opacity: 0,
                    scale: 0.93,
                    stagger: 0.12,
                    duration: 1.2,
                    ease: "power3.out",
                },
                0
            );

            // PHASE 2 & 3: Coordinated Kinetic Parallax Typography Shift
            galleryTl
                .to(
                    ".ft-anim",
                    {
                        xPercent: 100,
                        yPercent: -100,
                        ease: "none",
                        duration: 1.8,
                    },
                    "<+0.2"
                )
                .to(
                    ".st-anim",
                    {
                        xPercent: 55,
                        yPercent: -100,
                        ease: "none",
                        duration: 1.8,
                    },
                    "<"
                )
                .to(
                    ".tt-anim",
                    {
                        xPercent: -80,
                        yPercent: -100,
                        ease: "none",
                        duration: 1.8,
                    },
                    "<"
                );
        });

        // ════════════ MOBILE TIMELINE (60-120 FPS HORIZONTAL STREAM) ════════════
        mm.add("(max-width: 767px)", () => {
            gsap.set(galleryRef.current, {
                marginTop: 0,
            });

            const trackEl = galleryRef.current?.querySelector(".gallery-pin-container");
            const cardItems = galleryRef.current?.querySelectorAll(".gallery-card-item");
            const pills = galleryRef.current?.querySelectorAll(".pagination-pill");

            // Direct DOM manipulation for buttery 60-120 FPS without React re-renders
            const updateActiveMobileCard = (activeIdx) => {
                if (pills) {
                    pills.forEach((pill, i) => {
                        if (i === activeIdx) {
                            pill.classList.add("active");
                        } else {
                            pill.classList.remove("active");
                        }
                    });
                }

                if (cardItems) {
                    cardItems.forEach((card, i) => {
                        if (i === activeIdx) {
                            card.classList.add("mobile-active");
                        } else {
                            card.classList.remove("mobile-active");
                        }
                    });
                }
            };

            // Initialize active card 0
            updateActiveMobileCard(0);

            // Compute total horizontal shift dynamically on refresh
            const getShiftDistance = () => {
                if (!cardItems || !cardItems[0] || !trackEl) return 0;
                const cardWidth = cardItems[0].offsetWidth;
                const style = window.getComputedStyle(trackEl);
                const gap = parseFloat(style.gap) || 20;
                return (cardWidth + gap) * (cardItems.length - 1);
            };

            const mobTl = gsap.timeline({
                scrollTrigger: {
                    id: "galleryMobST",
                    trigger: galleryRef.current,
                    start: "top top",
                    end: "+=2000",
                    pin: true,
                    scrub: 0.4, // Immediate 1:1 finger tracking on 60-120Hz touch, no lag or rubber-banding
                    anticipatePin: 0, // Eliminates pre-pin 1-frame jump
                    invalidateOnRefresh: true,
                    fastScrollEnd: true,
                    preventOverlaps: true,
                    onUpdate: (self) => {
                        const progress = self.progress;
                        // Smoothly calculate the active card index across 0 to 1
                        const activeIdx = Math.min(
                            cardItems.length - 1,
                            Math.floor(progress * (cardItems.length - 0.05))
                        );
                        updateActiveMobileCard(activeIdx);
                    },
                },
            });

            // Smooth Horizontal Parallax Reel - all cards aligned on the same vertical baseline
            mobTl.to(
                trackEl,
                {
                    x: () => -getShiftDistance(),
                    ease: "none",
                    force3D: true,
                    duration: 3.0,
                },
                0
            );

            // Coordinated Kinetic Background Typography Parallax
            mobTl
                .to(
                    ".ft-anim",
                    {
                        xPercent: 30,
                        yPercent: -35,
                        ease: "none",
                        force3D: true,
                        duration: 3.0,
                    },
                    0
                )
                .to(
                    ".st-anim",
                    {
                        xPercent: 18,
                        yPercent: -35,
                        ease: "none",
                        force3D: true,
                        duration: 3.0,
                    },
                    0
                )
                .to(
                    ".tt-anim",
                    {
                        xPercent: -30,
                        yPercent: -35,
                        ease: "none",
                        force3D: true,
                        duration: 3.0,
                    },
                    0
                );
        });

        return () => mm.revert();
    }, { scope: galleryRef });

    // ════════════ INTERACTIVE MOUSE-FOLLOW & LANDSCAPE EXPLORATION ════════════
    const handleCardMouseEnter = (id) => {
        setHoveredCardId(id);
    };

    const handleCardMouseMove = (e, id) => {
        const imgEl = imageRefs.current[id];
        if (!imgEl) return;

        const cardEl = e.currentTarget;
        const rect = cardEl.getBoundingClientRect();
        const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
        const normY = ((e.clientY - rect.top) / rect.height) * 2 - 1; // -1 to 1

        gsap.to(imgEl, {
            x: normX * 12,
            y: normY * 8,
            scale: 1.08,
            duration: 0.35,
            ease: "power2.out",
            overwrite: "auto",
        });
    };

    const handleCardMouseLeave = (id) => {
        setHoveredCardId(null);
        const imgEl = imageRefs.current[id];
        if (imgEl) {
            gsap.to(imgEl, {
                x: 0,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
                overwrite: "auto",
            });
        }
    };

    // ════════════ MOBILE DIRECT TOUCH / TAP NAVIGATION ════════════
    const handleCardClick = (idx) => {
        if (typeof window === "undefined" || window.innerWidth >= 768) return;
        const mobSt = ScrollTrigger.getById("galleryMobST");
        if (!mobSt) return;
        const targetProgress = idx / (GALLERY_CARDS.length - 1);
        const targetY = mobSt.start + targetProgress * (mobSt.end - mobSt.start);
        window.scrollTo({
            top: targetY,
            behavior: "smooth",
        });
    };

    return (
        <section
            id="gallery"
            ref={galleryRef}
            className="gallery-section relative w-full bg-[#030206] text-[#f4efe7] overflow-hidden select-none z-10"
        >
            {/* Ambient Lighting (No Gradients) */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#25104A] opacity-30 rounded-full blur-[170px] pointer-events-none z-0" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[550px] bg-[#7C3CFF] opacity-15 rounded-full blur-[160px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#25104A] opacity-30 rounded-full blur-[170px] pointer-events-none z-0" />

            <div className="gallery-stage relative w-full h-screen flex items-center justify-center">
                {/* ════════════ OVERSIZED BACKGROUND TYPOGRAPHY (Z-10) ════════════ */}
                <div className="all-title absolute inset-0 size-full flex flex-col items-center justify-center pointer-events-none z-10 select-none">
                    <h1 className="font-hero-bebas text-white first-title ft-anim">
                        MOMENTS
                    </h1>
                    <h1 className="font-hero-bebas text-[#a855f7] sec-title st-anim">
                        DEFINING
                    </h1>
                    <h1 className="font-hero-bebas text-[#f4efe7] third-title tt-anim">
                        ODYSSEY
                    </h1>
                </div>

                {/* ════════════ PINNED GALLERY CONTAINER (Z-20 & Z-30) ════════════ */}
                <div className="gallery-pin-container z-20">
                    {GALLERY_CARDS.map((card, idx) => {
                        const isHovered = hoveredCardId === card.id;
                        const isHero = card.type === "hero";

                        return (
                            <div
                                key={card.id}
                                className={`gallery-card-item ${idx === 0 ? "mobile-active" : ""}`}
                                style={{
                                    zIndex: isHovered ? 40 : isHero ? 30 : card.type === "inner" ? 20 : 10,
                                }}
                                onClick={() => handleCardClick(idx)}
                            >
                                <div
                                    className={`gallery-landscape-card card-${card.type} ${
                                        isHovered ? "card-hovered" : ""
                                    }`}
                                    style={{
                                        transform: `rotate(${card.rotate}deg) translateY(${card.baseTranslateY}px) scale(${
                                            isHovered ? 1.03 : card.scale
                                        })`,
                                    }}
                                    onMouseEnter={() => handleCardMouseEnter(card.id)}
                                    onMouseMove={(e) => handleCardMouseMove(e, card.id)}
                                    onMouseLeave={() => handleCardMouseLeave(card.id)}
                                >
                                    <img
                                        ref={(el) => (imageRefs.current[card.id] = el)}
                                        src={card.img}
                                        alt={`Hack Odyssey Moment ${card.id}`}
                                        className="w-full h-full object-cover select-none pointer-events-none will-change-transform opacity-100"
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ════════════ MINIMALIST EDITORIAL PAGINATION (Z-30) ════════════ */}
                <div className="gallery-mobile-pagination md:hidden z-30">
                    {GALLERY_CARDS.map((card, idx) => (
                        <button
                            key={card.id}
                            type="button"
                            aria-label={`View photo ${idx + 1}`}
                            className={`pagination-pill ${idx === 0 ? "active" : ""}`}
                            onClick={() => handleCardClick(idx)}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;