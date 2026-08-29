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

        // Overlay emergence on top of pinned highlights video
        gsap.set(galleryRef.current, {
            marginTop: "-100vh",
        });

        // MatchMedia for responsive scroll narrative
        const mm = gsap.matchMedia();

        // ════════════ DESKTOP / TABLET TIMELINE ════════════
        mm.add("(min-width: 768px)", () => {
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

            // PHASE 2: Settle & Foreground Focal Composition

            // PHASE 3: Coordinated Kinetic Parallax Typography Shift
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

        // ════════════ MOBILE TIMELINE ════════════
        mm.add("(max-width: 767px)", () => {
            const mobTl = gsap.timeline({
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: "top top",
                    end: "+=1400",
                    pin: true,
                    scrub: 1.2,
                    anticipatePin: 1,
                    invalidateOnRefresh: true,
                },
            });

            mobTl.from(
                ".gallery-card-item",
                {
                    yPercent: 220,
                    opacity: 0,
                    scale: 0.92,
                    stagger: 0.1,
                    duration: 1.0,
                    ease: "power3.out",
                },
                0
            );

            mobTl
                .to(
                    ".ft-anim",
                    {
                        xPercent: 40,
                        yPercent: -60,
                        ease: "none",
                    },
                    "<+0.15"
                )
                .to(
                    ".st-anim",
                    {
                        xPercent: 25,
                        yPercent: -60,
                        ease: "none",
                    },
                    "<"
                )
                .to(
                    ".tt-anim",
                    {
                        xPercent: -40,
                        yPercent: -60,
                        ease: "none",
                    },
                    "<"
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

            <div className="relative w-full h-screen flex items-center justify-center">
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

                {/* ════════════ PINNED FANNED GALLERY RIBBON (Z-20 & Z-30) ════════════ */}
                <div className="gallery-pin-container z-20">
                    {GALLERY_CARDS.map((card) => {
                        const isHovered = hoveredCardId === card.id;
                        const isHero = card.type === "hero";

                        return (
                            <div
                                key={card.id}
                                className="gallery-card-item"
                                style={{
                                    zIndex: isHovered ? 40 : isHero ? 30 : card.type === "inner" ? 20 : 10,
                                }}
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
            </div>
        </section>
    );
};

export default Gallery;