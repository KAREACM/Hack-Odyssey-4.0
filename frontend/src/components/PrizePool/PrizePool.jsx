import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { 
    BsCashCoin, 
    BsBriefcaseFill, 
    BsRocketTakeoffFill, 
    BsLightningChargeFill 
} from 'react-icons/bs';
import { MdArrowOutward } from 'react-icons/md';
import './prizepool.css';

gsap.registerPlugin(ScrollTrigger);

const OPPORTUNITY_PILLARS = [
    {
        id: "cash",
        icon: BsCashCoin,
        badge: "CONSOLIDATED POOL",
        amount: "₹1,00,000",
        title: "Liquid Cash Grants",
        subtitle: "Direct Bank Disbursal",
        desc: "Direct monetary prizes distributed to champion solutions and track toppers with zero deductions.",
        highlight: "100% Cash Disbursal",
        accentClass: "accent-violet",
        accentColor: "#a855f7"
    },
    {
        id: "internships",
        icon: BsBriefcaseFill,
        badge: "TOP PERFORMERS",
        amount: "FAST-TRACK",
        title: "Internship Offers",
        subtitle: "Direct Hiring & PPIs",
        desc: "Top performers & standout hackers receive direct summer/winter internship offers and pre-placement interviews from sponsor tech leaders.",
        highlight: "Direct Industry Pipeline",
        accentClass: "accent-cyan",
        accentColor: "#38bdf8"
    },
    {
        id: "incubation",
        icon: BsRocketTakeoffFill,
        badge: "VENTURE TRACK",
        amount: "SEED ACCESS",
        title: "Startup Incubation",
        subtitle: "VC Pitches & Mentorship",
        desc: "Priority pitch slots in front of angel syndicates, institutional venture funds, and 1-on-1 architecture reviews with veteran founders.",
        highlight: "1-on-1 Founder Mentorship",
        accentClass: "accent-pink",
        accentColor: "#ec4899"
    },
    {
        id: "perks",
        icon: BsLightningChargeFill,
        badge: "ALL FINALISTS",
        amount: "₹5,00,000+",
        title: "Cloud & Dev Credits",
        subtitle: "Compute & Physical Swag",
        desc: "Exclusive AI cloud credits, premium API quotas, custom handcrafted Hack Odyssey trophies, and limited-edition swag kits.",
        highlight: "Hardware & Swag Kits",
        accentClass: "accent-gold",
        accentColor: "#eab308"
    }
];

const TRUST_STATS = [
    { value: "₹1,00,000", label: "Consolidated Prize Pool" },
    { value: "Top Performers", label: "Direct Internship Offers" },
    { value: "24 Hours", label: "Non-Stop Innovation Sprint" },
    { value: "Pan-India", label: "Elite Collegiate Network" }
];

const FIRST_MESSAGE = "BUILD BOLD, STIR UP YOUR FEARLESS IDEAS AND";
const SECOND_MESSAGE = "THE FUTURE WITH EVERY LINE OF EXTRAORDINARY CODE";
const EDITORIAL_PARAGRAPH = "Rev up your hacker spirit and engineer the extraordinary at Hack Odyssey 4.0, where you're 24 hours away from breakthrough innovation and ultimate glory.";

const PrizePool = () => {
    const sectionRef = useRef(null);
    const boxRef = useRef(null);
    const heroAmountRef = useRef(null);

    useGSAP(() => {
        if (!sectionRef.current) return;

        // Check if user prefers reduced motion
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        // 1. Kinetic Background Words Multi-Directional Parallax Scrub
        gsap.to('.bg-word-compete', {
            xPercent: 14,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            }
        });

        gsap.to('.bg-word-create', {
            xPercent: -12,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            }
        });

        gsap.to('.bg-word-conquer', {
            yPercent: -18,
            xPercent: 8,
            ease: 'none',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            }
        });

        // 2. Eyebrow & Status Pill Scroll Entrance
        gsap.from('.prizepool-eyebrow-container', {
            opacity: 0,
            y: -15,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 78%',
            }
        });

        gsap.from('.prize-status-pill', {
            opacity: 0,
            scale: 0.88,
            duration: 0.8,
            delay: 0.15,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 78%',
            }
        });

        // 3. SpyltMilk First Message Scroll-Scrubbed Color & Vertical Unveil
        const firstWords = sectionRef.current.querySelectorAll('.first-msg-word');
        gsap.to(firstWords, {
            color: '#F5F3FF',
            stagger: 0.08,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '.first-message',
                start: 'top 74%',
                end: 'bottom 45%',
                scrub: 0.8,
            }
        });

        gsap.from(firstWords, {
            yPercent: 120,
            opacity: 0,
            duration: 1.0,
            stagger: 0.04,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.first-message',
                start: 'top 78%',
            }
        });

        // 4. Central Tilted ₹1,00,000 Accent Box Clip-Path Reveal
        const revealTl = gsap.timeline({
            scrollTrigger: {
                trigger: '.hero-prize-scroll-container',
                start: 'top 72%',
            }
        });

        revealTl.fromTo('.hero-prize-box',
            {
                clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
                opacity: 0,
                scale: 0.94,
            },
            {
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
                opacity: 1,
                scale: 1,
                duration: 1.1,
                ease: 'power3.inOut',
            }
        );

        // Vertical unveil for the ₹1,00,000 numbers
        revealTl.from('.hero-prize-amount-inner', {
            yPercent: 120,
            opacity: 0,
            duration: 0.9,
            ease: 'power4.out',
        }, '-=0.6');

        // Flares and beam expansion
        revealTl.from('.hero-prize-flare-left, .hero-prize-flare-right', {
            scaleX: 0,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
        }, '-=0.5');

        // Organic perpetual subtle floating on the tilted card
        gsap.to('.hero-prize-box', {
            y: -8,
            rotate: -2.2,
            yoyo: true,
            repeat: -1,
            duration: 3.2,
            ease: 'sine.inOut',
            delay: 1.2,
        });

        // Dynamic Rolling Odometer Count-Up on the ₹1,00,000 Hero Badge
        const counterObj = { val: 0 };
        ScrollTrigger.create({
            trigger: '.hero-prize-scroll-container',
            start: 'top 76%',
            once: true,
            onEnter: () => {
                gsap.to(counterObj, {
                    val: 100000,
                    duration: 2.2,
                    ease: 'power3.out',
                    onUpdate: () => {
                        if (heroAmountRef.current) {
                            heroAmountRef.current.innerText = `₹${Math.floor(counterObj.val).toLocaleString('en-IN')}`;
                        }
                    }
                });
            }
        });

        // 5. SpyltMilk Second Message Scroll-Scrubbed Color & Vertical Unveil
        const secondWords = sectionRef.current.querySelectorAll('.second-msg-word');
        gsap.to(secondWords, {
            color: '#F5F3FF',
            stagger: 0.08,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: '.second-message',
                start: 'top 75%',
                end: 'bottom 48%',
                scrub: 0.8,
            }
        });

        gsap.from(secondWords, {
            yPercent: 120,
            opacity: 0,
            duration: 1.0,
            stagger: 0.04,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: '.second-message',
                start: 'top 78%',
            }
        });

        // 6. Editorial Description Split Words Reveal
        const paraWords = sectionRef.current.querySelectorAll('.para-word');
        gsap.from(paraWords, {
            yPercent: 130,
            rotate: 2.5,
            opacity: 0,
            stagger: 0.012,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.prize-editorial-desc',
                start: 'top 82%',
            }
        });

        // Supporting Copy & Motif Reveal
        gsap.from('.prizepool-supporting-text', {
            opacity: 0,
            y: 15,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.prize-editorial-desc',
                start: 'top 80%',
            }
        });

        gsap.from('.prizepool-divider-line', {
            scaleX: 0,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.prize-editorial-desc',
                start: 'top 80%',
            }
        });

        gsap.from('.prizepool-diamond', {
            scale: 0,
            rotate: -45,
            opacity: 0,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: {
                trigger: '.prize-editorial-desc',
                start: 'top 80%',
            }
        });

        // 7. 3D Perspective Card Stacking & Spring Entrance for 4 Opportunity Pillars
        const opportunityCards = sectionRef.current.querySelectorAll('.opportunity-card');
        gsap.fromTo(opportunityCards,
            {
                opacity: 0,
                y: 50,
                rotationX: 12,
                scale: 0.95,
                transformPerspective: 1000,
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                scale: 1,
                stagger: 0.12,
                duration: 1.0,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.opportunity-matrix-container',
                    start: 'top 82%',
                }
            }
        );

        // 8. Trust Metrics Strip Entrance
        gsap.from('.trust-item', {
            opacity: 0,
            y: 20,
            stagger: 0.1,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '.prize-trust-strip',
                start: 'top 88%',
            }
        });

        // 9. CTA Button Entrance
        gsap.from('.prize-cta-container', {
            opacity: 0,
            y: 25,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.prize-cta-container',
                start: 'top 92%',
            }
        });

    }, { scope: sectionRef });

    return (
        <section id="prizepool" ref={sectionRef} className="prizepool-section">
            {/* Atmospheric Background Kinetic Typography */}
            <div className="prizepool-bg-word bg-word-compete">COMPETE</div>
            <div className="prizepool-bg-word bg-word-create">CREATE</div>
            <div className="prizepool-bg-word bg-word-conquer">CONQUER</div>

            {/* Ambient Nebula Radial Violet Lighting */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[500px] bg-[#7C3CFF]/14 rounded-full blur-[150px] pointer-events-none z-0" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-[#25104A]/30 rounded-full blur-[170px] pointer-events-none z-0" />

            {/* Top Eyebrow & Live Pulse Badge */}
            <div className="flex flex-col items-center gap-2 relative z-10 select-none">
                <div className="prizepool-eyebrow-container flex items-center justify-center gap-3 md:gap-4 mt-2">
                    <span className="prizepool-eyebrow-line" />
                    <p className="prizepool-eyebrow-text">WHAT'S AT STAKE</p>
                    <span className="prizepool-eyebrow-line" />
                </div>

                <div className="prize-status-pill">
                    <span className="prize-pulse-dot" />
                    <span className="prize-status-pill-text">GRAND PRIZE VAULT UNLOCKED</span>
                </div>
            </div>

            {/* Center Main Composition */}
            <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto w-full px-4 select-none">
                
                {/* 1. First Message: Above Tilted Badge (SpyltMilk Scrubbing Words) */}
                <h1 className="first-message prize-display-font text-center px-4">
                    {FIRST_MESSAGE.split(" ").map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                            <span className="first-msg-word inline-block will-change-transform">
                                {word}
                            </span>
                        </span>
                    ))}
                </h1>

                {/* 2. Central Hero Tilted ₹1,00,000 Accent Box with Live Rolling Odometer */}
                <div className="hero-prize-scroll-container">
                    {/* Left Light Flare Beam */}
                    <div className="hero-prize-flare-left">
                        <div className="hero-prize-flare-dot-left" />
                    </div>

                    {/* Glowing Tilted Accent Container with Clip-Path Reveal */}
                    <div ref={boxRef} className="hero-prize-box">
                        <div className="overflow-hidden">
                            <span ref={heroAmountRef} className="hero-prize-amount hero-prize-amount-inner">
                                ₹1,00,000
                            </span>
                        </div>
                    </div>

                    {/* Right Light Flare Beam */}
                    <div className="hero-prize-flare-right">
                        <div className="hero-prize-flare-dot-right" />
                    </div>
                </div>

                {/* 3. Second Message: Below Tilted Badge (SpyltMilk Scrubbing Words) */}
                <h1 className="second-message prize-display-font text-center px-4 mt-1 sm:mt-2">
                    {SECOND_MESSAGE.split(" ").map((word, i) => (
                        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
                            <span className="second-msg-word inline-block will-change-transform">
                                {word}
                            </span>
                        </span>
                    ))}
                </h1>

                {/* 4. Editorial Description Paragraph */}
                <div className="prize-editorial-desc">
                    <p className="max-w-xl mx-auto">
                        {EDITORIAL_PARAGRAPH.split(" ").map((word, i) => (
                            <span key={i} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
                                <span className="para-word inline-block will-change-transform">
                                    {word}
                                </span>
                            </span>
                        ))}
                    </p>
                    <div className="mt-4 flex flex-col items-center">
                        <p className="prizepool-supporting-text">
                            ONE UNIFIED PRIZE POOL &middot; INFINITE REWARDS &amp; CAREER ACCELERATION
                        </p>
                        <div className="prizepool-divider-motif">
                            <span className="prizepool-divider-line" />
                            <span className="prizepool-diamond" />
                            <span className="prizepool-divider-line" />
                        </div>
                    </div>
                </div>
            </div>

            {/* 4-Pillar Glassmorphic Opportunity Matrix */}
            <div className="opportunity-matrix-container select-none">
                {OPPORTUNITY_PILLARS.map((pillar) => {
                    const IconComponent = pillar.icon;
                    return (
                        <div 
                            key={pillar.id} 
                            className={`opportunity-card group ${pillar.accentClass}`}
                        >
                            {/* Card Ambient Glow Header */}
                            <div className="opportunity-card-glow" />

                            <div className="flex items-center justify-between w-full mb-4">
                                <div className="opportunity-icon-wrap">
                                    <IconComponent className="w-6 h-6" />
                                </div>
                                <span className="opportunity-badge">
                                    {pillar.badge}
                                </span>
                            </div>

                            <div className="text-left w-full">
                                <span className="opportunity-amount">
                                    {pillar.amount}
                                </span>
                                <h3 className="opportunity-title">
                                    {pillar.title}
                                </h3>
                                <p className="opportunity-subtitle">
                                    {pillar.subtitle}
                                </p>
                                <p className="opportunity-desc">
                                    {pillar.desc}
                                </p>
                            </div>

                            <div className="opportunity-footer-tag">
                                <span className="opportunity-dot" />
                                <span>{pillar.highlight}</span>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Trust Metrics Bar */}
            <div className="prize-trust-strip select-none">
                {TRUST_STATS.map((stat, idx) => (
                    <React.Fragment key={idx}>
                        {idx > 0 && <div className="trust-divider" />}
                        <div className="trust-item">
                            <span className="trust-number">{stat.value}</span>
                            <span className="trust-label">{stat.label}</span>
                        </div>
                    </React.Fragment>
                ))}
            </div>

            {/* Strategic Call to Action Strip */}
            <div className="prize-cta-container select-none">
                <a 
                    href="#register" 
                    className="prize-cta-primary group"
                    onClick={(e) => {
                        const target = document.querySelector('#register') || document.querySelector('#prizepool');
                        if (target) {
                            target.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                >
                    <span>CLAIM YOUR STAKE &middot; REGISTER NOW</span>
                    <MdArrowOutward className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
                <p className="prize-cta-subtext">
                    Open to all collegiate innovators nationwide &middot; Verified Participation &middot; Accommodation, Meals &amp; Swag Included
                </p>
            </div>
        </section>
    );
};

export default PrizePool;
