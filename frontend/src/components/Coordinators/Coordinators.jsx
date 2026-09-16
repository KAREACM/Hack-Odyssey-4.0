import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { useMediaQuery } from 'react-responsive';
import WavyImageCard from './WavyImageCard';

// Primary Coordinator Images
import drDeepalakshmiImg from '../../assets/dr_p_deepalakshmi.jpg';
import drChinnasamyImg from '../../assets/dr_p_chinnasamy.jpeg';
import mrsKrithigaImg from '../../assets/mrs_n_krithiga.jpeg';
import msReshiniImg from '../../assets/ms_reshini.jpg';
import mrRajaSekarImg from '../../assets/Mr RAJA SEKAR R.jpg';
import mrArvindChandranImg from '../../assets/Arvind Chandran.png';
import shaikThahaImg from '../../assets/shaik_thaha.jpg';
import hariniAedullaImg from '../../assets/harini_aedulla.jpg';
import umeshChandraImg from '../../assets/umesh_chandra.jpg';
import karliTejasreeImg from '../../assets/karli_tejasree.jpg';

// Studio Secondary Wavy Artworks
import drDeepalakshmiArt from '../../assets/cursor_art/dr_deepalakshmi_art.jpg';
import drChinnasamyArt from '../../assets/cursor_art/dr_chinnasamy_art.jpg';
import mrsKrithigaArt from '../../assets/cursor_art/mrs_krithiga_art.jpg';
import msReshiniArt from '../../assets/cursor_art/ms_reshini_art.jpg';
import shaikThahaArt from '../../assets/cursor_art/shaik_thaha_art.jpg';
import hariniAedullaArt from '../../assets/cursor_art/harini_aedulla_art.jpg';
import umeshChandraArt from '../../assets/cursor_art/umesh_chandra_art.jpg';
import karliTejasreeArt from '../../assets/cursor_art/karli_tejasree_art.jpg';
import section2Bg from '../../assets/section_2.png';

gsap.registerPlugin(ScrollTrigger);

const Coordinators = () => {
    const pageRef = useRef(null);
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

    useGSAP(() => {
        if (!pageRef.current) return;

        // 1. Eyebrow Scroll Reveal Animation
        gsap.from('.team-eyebrow', {
            x: isMobile ? 0 : -25,
            y: isMobile ? 15 : 0,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: pageRef.current,
                start: 'top 82%',
            }
        });

        // 2. Sequential Character-by-Character Title Reveal ("not all at once")
        const titleChars = pageRef.current.querySelectorAll('.team-title-char');
        gsap.from(titleChars, {
            yPercent: 120,
            rotateZ: 5,
            opacity: 0,
            stagger: 0.045,
            duration: 1.0,
            ease: 'power4.out',
            scrollTrigger: {
                trigger: pageRef.current,
                start: 'top 76%',
            }
        });

        // 3. Section Underline Expansion from Left
        gsap.fromTo('#page3-underline',
            { scaleX: 0, transformOrigin: 'left center', opacity: 0 },
            {
                scaleX: 1,
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: pageRef.current,
                    start: 'top 72%',
                }
            }
        );

        // 4. Staggered Scroll-Triggered Entrance for Cards & Names
        const cards = pageRef.current.querySelectorAll('.card');
        cards.forEach((card) => {
            gsap.from(card, {
                y: isMobile ? 40 : 60,
                opacity: 0,
                scale: 0.96,
                duration: 0.85,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse',
                }
            });

            // Coordinator name mask reveal
            const cardHeading = card.querySelector('.card-heading-container > h1');
            if (cardHeading) {
                gsap.from(cardHeading, {
                    yPercent: 110,
                    opacity: 0,
                    duration: 0.75,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 88%',
                    }
                });
            }

            // Card bottom accent underline reveal
            const cardLine = card.querySelector('.card-underline');
            if (cardLine) {
                gsap.fromTo(cardLine,
                    { scaleX: 0, transformOrigin: 'left center' },
                    {
                        scaleX: 1,
                        duration: 0.75,
                        ease: 'power2.out',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top 86%',
                        }
                    }
                );
            }
        });

        // 5. Interactive Gravity Circles Reveal & Scroll Parallax (Desktop Only)
        if (!isMobile) {
            const circles = pageRef.current.querySelectorAll('.gravity');
            circles.forEach((circle) => {
                gsap.from(circle, {
                    scale: 0.6,
                    opacity: 0,
                    rotate: -20,
                    duration: 1.0,
                    ease: 'back.out(1.5)',
                    scrollTrigger: {
                        trigger: circle,
                        start: 'top 88%',
                    }
                });

                // Smooth parallax spatial depth on scroll
                gsap.to(circle, {
                    y: -35,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: circle,
                        start: 'top bottom',
                        end: 'bottom top',
                        scrub: 1.2,
                    }
                });
            });
        }

    }, { scope: pageRef, dependencies: [isMobile] });

    return (
        <div id="page3" ref={pageRef} className="relative overflow-hidden bg-[#030206]">
            {/* Cinematic Background Layer matching the Eyebrow Section */}
            <div
                className="absolute inset-0 bg-cover bg-bottom md:bg-center bg-no-repeat opacity-85 pointer-events-none z-0 scale-105"
                style={{ backgroundImage: `url(${section2Bg})` }}
            />

            {/* Seamless Top Blend with Welcome Section */}
            <div className="absolute inset-x-0 top-0 h-40 md:h-64 bg-gradient-to-b from-[#030206] via-[#030206]/85 to-transparent pointer-events-none z-1" />

            {/* Seamless Bottom Blend with Next Section */}
            <div className="absolute inset-x-0 bottom-0 h-40 md:h-64 bg-gradient-to-t from-[#030206] via-[#030206]/85 to-transparent pointer-events-none z-1" />

            {/* Eyebrow with Purple Accent Line matching The Odyssey */}
            <div className="team-eyebrow w-[70%] ml-[30%] max-md:w-[90%] max-md:mx-auto flex items-center gap-2.5 mb-3 sm:mb-4 relative z-10">
                <span className="w-6 md:w-8 h-[1.5px] bg-[#a855f7] inline-block rounded-full shadow-[0_0_6px_#a855f7]"></span>
                <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#8e859f] uppercase">
                    OUR TEAM
                </p>
            </div>

            {/* Main Heading with Sequential Character Reveal */}
            <h1 className="relative z-10 select-none overflow-hidden flex flex-wrap items-baseline" aria-label="OUR TEAM">
                {"OUR TEAM".split(" ").map((word, wordIndex) => (
                    <span key={wordIndex} className="inline-flex overflow-hidden mr-[0.25em] last:mr-0">
                        {word.split("").map((char, charIndex) => (
                            <span
                                key={charIndex}
                                className="team-title-char inline-block will-change-transform"
                            >
                                {char}
                            </span>
                        ))}
                    </span>
                ))}
            </h1>
            <div id="page3-underline" className="relative z-10"></div>
            <div id="img-div-container" className="relative z-10">
                {/* 1. Card 1: Dr. P. Deepalakshmi (Faculty Advisor) */}
                <div className="card">
                    <div className="card-heading-container">
                        <h1>Dr. P. Deepalakshmi</h1>
                    </div>
                    <WavyImageCard
                        primaryImg={drDeepalakshmiImg}
                        secondaryImg={drDeepalakshmiArt}
                        alt="Dr. P. Deepalakshmi"
                    />
                    <div className="card-details">
                        <h6>Faculty Advisor, Dean CSE</h6>
                        <h6>2026</h6>
                    </div>
                    <div className="card-underline"></div>
                </div>

                {/* 2. Card 2: Dr. P. Chinnasamy (Faculty Sponsor) */}
                <div className="card">
                    <div className="card-heading-container">
                        <h1>Dr. P. Chinnasamy</h1>
                    </div>
                    <WavyImageCard
                        primaryImg={drChinnasamyImg}
                        secondaryImg={drChinnasamyArt}
                        alt="Dr. P. Chinnasamy"
                    />
                    <div className="card-details">
                        <h6>Faculty Sponsor, KARE ACM Chapter</h6>
                        <h6>2026</h6>
                    </div>
                    <div className="card-underline"></div>
                </div>

                {/* 3. Circle 1: Arrow pointing DOWN (↓) */}
                <div className="page3-circle1 gravity">
                    <svg className="button__arrow" viewBox="0 0 91 118" fill="white" stroke="white">
                        <path
                            d="M15.2307 57.4152L15.9378 56.708L15.2307 56.0009L14.5236 56.708L15.2307 57.4152ZM34.9813 77.1658L34.2742 77.8729L35.9813 79.58L35.9813 77.1658L34.9813 77.1658ZM0.151478 72.4944L-0.555622 71.7873L-1.26273 72.4944L-0.555622 73.2015L0.151478 72.4944ZM45.29 117.633L44.5828 118.34L45.29 119.047L45.9971 118.34L45.29 117.633ZM60.3692 102.554L61.0763 103.261L61.7839 102.553L61.0758 101.846L60.3692 102.554ZM60.3685 102.553L59.6614 101.846L58.9538 102.553L59.6619 103.261L60.3685 102.553ZM90.427 72.4944L91.1341 73.2015L91.8412 72.4944L91.1341 71.7873L90.427 72.4944ZM75.3478 57.4152L76.0549 56.7081L75.3478 56.001L74.6407 56.7081L75.3478 57.4152ZM56.3065 76.4565L55.3065 76.4565L55.3065 78.8707L57.0136 77.1636L56.3065 76.4565ZM56.3065 0.120074L57.3065 0.120074L57.3065 -0.879926L56.3065 -0.879926L56.3065 0.120074ZM34.9813 0.120076L34.9813 -0.879924L33.9813 -0.879924L33.9813 0.120076L34.9813 0.120076ZM14.5236 58.1223L34.2742 77.8729L35.6884 76.4587L15.9378 56.708L14.5236 58.1223ZM0.858585 73.2015L15.9378 58.1223L14.5236 56.708L-0.555622 71.7873L0.858585 73.2015ZM45.9971 116.926L0.858585 71.7873L-0.555622 73.2015L44.5828 118.34L45.9971 116.926ZM59.662 101.846L44.5828 116.926L45.9971 118.34L61.0763 103.261L59.662 101.846ZM59.6619 103.261L59.6625 103.261L61.0758 101.846L61.0751 101.845L59.6619 103.261ZM61.0756 103.26L91.1341 73.2015L89.7199 71.7873L59.6614 101.846L61.0756 103.26ZM91.1341 71.7873L76.0549 56.7081L74.6407 58.1223L89.7199 73.2015L91.1341 71.7873ZM74.6407 56.7081L55.5994 75.7494L57.0136 77.1636L76.0549 58.1223L74.6407 56.7081ZM57.3065 76.4565L57.3065 0.120074L55.3065 0.120074L55.3065 76.4565L57.3065 76.4565ZM56.3065 -0.879926L34.9813 -0.879924L34.9813 1.12008L56.3065 1.12007L56.3065 -0.879926ZM33.9813 0.120076L33.9813 77.1658L35.9813 77.1658L35.9813 0.120076L33.9813 0.120076Z"
                            fill="#ffffff"
                        />
                    </svg>
                    <span className="circle-text1">
                        Welcome to HackOdyssey 2026 · 36 Hours of Non-Stop Innovation & Code 🚀
                    </span>
                </div>

                {/* 4. Circle 2: Arrow pointing DOWN-RIGHT (↘) */}
                <div className="page3-circle2 gravity">
                    <svg className="button__arrow" viewBox="0 0 91 118" fill="white" stroke="white">
                        <path
                            d="M15.2307 57.4152L15.9378 56.708L15.2307 56.0009L14.5236 56.708L15.2307 57.4152ZM34.9813 77.1658L34.2742 77.8729L35.9813 79.58L35.9813 77.1658L34.9813 77.1658ZM0.151478 72.4944L-0.555622 71.7873L-1.26273 72.4944L-0.555622 73.2015L0.151478 72.4944ZM45.29 117.633L44.5828 118.34L45.29 119.047L45.9971 118.34L45.29 117.633ZM60.3692 102.554L61.0763 103.261L61.7839 102.553L61.0758 101.846L60.3692 102.554ZM60.3685 102.553L59.6614 101.846L58.9538 102.553L59.6619 103.261L60.3685 102.553ZM90.427 72.4944L91.1341 73.2015L91.8412 72.4944L91.1341 71.7873L90.427 72.4944ZM75.3478 57.4152L76.0549 56.7081L75.3478 56.001L74.6407 56.7081L75.3478 57.4152ZM56.3065 76.4565L55.3065 76.4565L55.3065 78.8707L57.0136 77.1636L56.3065 76.4565ZM56.3065 0.120074L57.3065 0.120074L57.3065 -0.879926L56.3065 -0.879926L56.3065 0.120074ZM34.9813 0.120076L34.9813 -0.879924L33.9813 -0.879924L33.9813 0.120076L34.9813 0.120076ZM14.5236 58.1223L34.2742 77.8729L35.6884 76.4587L15.9378 56.708L14.5236 58.1223ZM0.858585 73.2015L15.9378 58.1223L14.5236 56.708L-0.555622 71.7873L0.858585 73.2015ZM45.9971 116.926L0.858585 71.7873L-0.555622 73.2015L44.5828 118.34L45.9971 116.926ZM59.662 101.846L44.5828 116.926L45.9971 118.34L61.0763 103.261L59.662 101.846ZM59.6619 103.261L59.6625 103.261L61.0758 101.846L61.0751 101.845L59.6619 103.261ZM61.0756 103.26L91.1341 73.2015L89.7199 71.7873L59.6614 101.846L61.0756 103.26ZM91.1341 71.7873L76.0549 56.7081L74.6407 58.1223L89.7199 73.2015L91.1341 71.7873ZM74.6407 56.7081L55.5994 75.7494L57.0136 77.1636L76.0549 58.1223L74.6407 56.7081ZM57.3065 76.4565L57.3065 0.120074L55.3065 0.120074L55.3065 76.4565L57.3065 76.4565ZM56.3065 -0.879926L34.9813 -0.879924L34.9813 1.12008L56.3065 1.12007L56.3065 -0.879926ZM33.9813 0.120076L33.9813 77.1658L35.9813 77.1658L35.9813 0.120076L33.9813 0.120076Z"
                            fill="#ffffff"
                        />
                    </svg>
                    <span className="circle-text2">
                        AI, Web3 & Cloud Systems · Mentored by Industry Leaders ✨
                    </span>
                </div>

                {/* 5. Card 3: Mrs. N. Krithiga (Faculty Coordinator) */}
                <div className="card">
                    <div className="card-heading-container">
                        <h1>Mrs. N. Krithiga</h1>
                    </div>
                    <WavyImageCard
                        primaryImg={mrsKrithigaImg}
                        secondaryImg={mrsKrithigaArt}
                        alt="Mrs. N. Krithiga"
                    />
                    <div className="card-details">
                        <h6>Faculty Coordinator, KARE ACM Chapter</h6>
                        <h6>2026</h6>
                    </div>
                    <div className="card-underline"></div>
                </div>

                {/* 6. Card 4: Ms. S. Reshini (Faculty Coordinator) */}
                <div className="card">
                    <div className="card-heading-container">
                        <h1>Ms. S. Reshini</h1>
                    </div>
                    <WavyImageCard
                        primaryImg={msReshiniImg}
                        secondaryImg={msReshiniArt}
                        alt="Ms. S. Reshini"
                    />
                    <div className="card-details">
                        <h6>Faculty Coordinator, KARE ACM Chapter</h6>
                        <h6>2026</h6>
                    </div>
                    <div className="card-underline"></div>
                </div>

                {/* 7. Card 5: Mr. RAJA SEKAR R (Faculty Coordinator) */}
                <div className="card">
                    <div className="card-heading-container">
                        <h1>Mr. RAJA SEKAR R</h1>
                    </div>
                    <WavyImageCard
                        primaryImg={mrRajaSekarImg}
                        secondaryImg={mrRajaSekarImg}
                        alt="Mr. RAJA SEKAR R"
                    />
                    <div className="card-details">
                        <h6>Faculty Coordinator, GDG Campus Body KARE</h6>
                        <h6>2026</h6>
                    </div>
                    <div className="card-underline"></div>
                </div>

                {/* 8. Card 6: Mr. Arvind Chandran (Faculty Coordinator) */}
                <div className="card">
                    <div className="card-heading-container">
                        <h1>Mr. Arvind Chandran</h1>
                    </div>
                    <WavyImageCard
                        primaryImg={mrArvindChandranImg}
                        secondaryImg={mrArvindChandranImg}
                        alt="Mr. Arvind Chandran"
                    />
                    <div className="card-details">
                        <h6>Faculty Coordinator, GDG KARE</h6>
                        <h6>2026</h6>
                    </div>
                    <div className="card-underline"></div>
                </div>

                {/* 9. Circle 3: Arrow pointing DOWN (↓) */}
                <div className="page3-circle1 page3-circle-gdg gravity">
                    <svg className="button__arrow" viewBox="0 0 91 118" fill="white" stroke="white">
                        <path
                            d="M15.2307 57.4152L15.9378 56.708L15.2307 56.0009L14.5236 56.708L15.2307 57.4152ZM34.9813 77.1658L34.2742 77.8729L35.9813 79.58L35.9813 77.1658L34.9813 77.1658ZM0.151478 72.4944L-0.555622 71.7873L-1.26273 72.4944L-0.555622 73.2015L0.151478 72.4944ZM45.29 117.633L44.5828 118.34L45.29 119.047L45.9971 118.34L45.29 117.633ZM60.3692 102.554L61.0763 103.261L61.7839 102.553L61.0758 101.846L60.3692 102.554ZM60.3685 102.553L59.6614 101.846L58.9538 102.553L59.6619 103.261L60.3685 102.553ZM90.427 72.4944L91.1341 73.2015L91.8412 72.4944L91.1341 71.7873L90.427 72.4944ZM75.3478 57.4152L76.0549 56.7081L75.3478 56.001L74.6407 56.7081L75.3478 57.4152ZM56.3065 76.4565L55.3065 76.4565L55.3065 78.8707L57.0136 77.1636L56.3065 76.4565ZM56.3065 0.120074L57.3065 0.120074L57.3065 -0.879926L56.3065 -0.879926L56.3065 0.120074ZM34.9813 0.120076L34.9813 -0.879924L33.9813 -0.879924L33.9813 0.120076L34.9813 0.120076ZM14.5236 58.1223L34.2742 77.8729L35.6884 76.4587L15.9378 56.708L14.5236 58.1223ZM0.858585 73.2015L15.9378 58.1223L14.5236 56.708L-0.555622 71.7873L0.858585 73.2015ZM45.9971 116.926L0.858585 71.7873L-0.555622 73.2015L44.5828 118.34L45.9971 116.926ZM59.662 101.846L44.5828 116.926L45.9971 118.34L61.0763 103.261L59.662 101.846ZM59.6619 103.261L59.6625 103.261L61.0758 101.846L61.0751 101.845L59.6619 103.261ZM61.0756 103.26L91.1341 73.2015L89.7199 71.7873L59.6614 101.846L61.0756 103.26ZM91.1341 71.7873L76.0549 56.7081L74.6407 58.1223L89.7199 73.2015L91.1341 71.7873ZM74.6407 56.7081L55.5994 75.7494L57.0136 77.1636L76.0549 58.1223L74.6407 56.7081ZM57.3065 76.4565L57.3065 0.120074L55.3065 0.120074L55.3065 76.4565L57.3065 76.4565ZM56.3065 -0.879926L34.9813 -0.879924L34.9813 1.12008L56.3065 1.12007L56.3065 -0.879926ZM33.9813 0.120076L33.9813 77.1658L35.9813 77.1658L35.9813 0.120076L33.9813 0.120076Z"
                            fill="#ffffff"
                        />
                    </svg>
                    <span className="circle-text1">
                        Google Developer Groups on Campus · KARE · Connect, Learn & Build 🌐
                    </span>
                </div>

                {/* 10. Circle 4: Arrow pointing DOWN-RIGHT (↘) */}
                <div className="page3-circle2 page3-circle-acm gravity">
                    <svg className="button__arrow" viewBox="0 0 91 118" fill="white" stroke="white">
                        <path
                            d="M15.2307 57.4152L15.9378 56.708L15.2307 56.0009L14.5236 56.708L15.2307 57.4152ZM34.9813 77.1658L34.2742 77.8729L35.9813 79.58L35.9813 77.1658L34.9813 77.1658ZM0.151478 72.4944L-0.555622 71.7873L-1.26273 72.4944L-0.555622 73.2015L0.151478 72.4944ZM45.29 117.633L44.5828 118.34L45.29 119.047L45.9971 118.34L45.29 117.633ZM60.3692 102.554L61.0763 103.261L61.7839 102.553L61.0758 101.846L60.3692 102.554ZM60.3685 102.553L59.6614 101.846L58.9538 102.553L59.6619 103.261L60.3685 102.553ZM90.427 72.4944L91.1341 73.2015L91.8412 72.4944L91.1341 71.7873L90.427 72.4944ZM75.3478 57.4152L76.0549 56.7081L75.3478 56.001L74.6407 56.7081L75.3478 57.4152ZM56.3065 76.4565L55.3065 76.4565L55.3065 78.8707L57.0136 77.1636L56.3065 76.4565ZM56.3065 0.120074L57.3065 0.120074L57.3065 -0.879926L56.3065 -0.879926L56.3065 0.120074ZM34.9813 0.120076L34.9813 -0.879924L33.9813 -0.879924L33.9813 0.120076L34.9813 0.120076ZM14.5236 58.1223L34.2742 77.8729L35.6884 76.4587L15.9378 56.708L14.5236 58.1223ZM0.858585 73.2015L15.9378 58.1223L14.5236 56.708L-0.555622 71.7873L0.858585 73.2015ZM45.9971 116.926L0.858585 71.7873L-0.555622 73.2015L44.5828 118.34L45.9971 116.926ZM59.662 101.846L44.5828 116.926L45.9971 118.34L61.0763 103.261L59.662 101.846ZM59.6619 103.261L59.6625 103.261L61.0758 101.846L61.0751 101.845L59.6619 103.261ZM61.0756 103.26L91.1341 73.2015L89.7199 71.7873L59.6614 101.846L61.0756 103.26ZM91.1341 71.7873L76.0549 56.7081L74.6407 58.1223L89.7199 73.2015L91.1341 71.7873ZM74.6407 56.7081L55.5994 75.7494L57.0136 77.1636L76.0549 58.1223L74.6407 56.7081ZM57.3065 76.4565L57.3065 0.120074L55.3065 0.120074L55.3065 76.4565L57.3065 76.4565ZM56.3065 -0.879926L34.9813 -0.879924L34.9813 1.12008L56.3065 1.12007L56.3065 -0.879926ZM33.9813 0.120076L33.9813 77.1658L35.9813 77.1658L35.9813 0.120076L33.9813 0.120076Z"
                            fill="#ffffff"
                        />
                    </svg>
                    <span className="circle-text2">
                        KARE ACM Student Chapter · Innovate, Collaborate & Build ❤️
                    </span>
                </div>

                {/* 11. Card 7: Shaik Thaha (Chair) */}
                <div className="card">
                    <div className="card-heading-container">
                        <h1>Shaik Thaha</h1>
                    </div>
                    <WavyImageCard
                        primaryImg={shaikThahaImg}
                        secondaryImg={shaikThahaArt}
                        alt="Shaik Thaha"
                    />
                    <div className="card-details">
                        <h6>Chair, KARE ACM Chapter</h6>
                        <h6>2026</h6>
                    </div>
                    <div className="card-underline"></div>
                </div>

                {/* 12. Card 8: Harini Aedulla (Vice Chair) */}
                <div className="card">
                    <div className="card-heading-container">
                        <h1>Harini Aedulla</h1>
                    </div>
                    <WavyImageCard
                        primaryImg={hariniAedullaImg}
                        secondaryImg={hariniAedullaArt}
                        alt="Harini Aedulla"
                    />
                    <div className="card-details">
                        <h6>Vice Chair, KARE ACM Chapter</h6>
                        <h6>2026</h6>
                    </div>
                    <div className="card-underline"></div>
                </div>

                {/* 13. Card 9: Umesh Chandra (President) */}
                <div className="card">
                    <div className="card-heading-container">
                        <h1>Umesh Chandra</h1>
                    </div>
                    <WavyImageCard
                        primaryImg={umeshChandraImg}
                        secondaryImg={umeshChandraArt}
                        alt="Umesh Chandra"
                    />
                    <div className="card-details">
                        <h6>President, KARE ACM Chapter</h6>
                        <h6>2026</h6>
                    </div>
                    <div className="card-underline"></div>
                </div>

                {/* 14. Card 10: Karli Tejasree (Treasurer) */}
                <div className="card">
                    <div className="card-heading-container">
                        <h1>Karli Tejasree</h1>
                    </div>
                    <WavyImageCard
                        primaryImg={karliTejasreeImg}
                        secondaryImg={karliTejasreeArt}
                        alt="Karli Tejasree"
                    />
                    <div className="card-details">
                        <h6>Treasurer, KARE ACM Chapter</h6>
                        <h6>2026</h6>
                    </div>
                    <div className="card-underline"></div>
                </div>

                {/* 15. Circle 5: HackOdyssey 2026 Event Emblem */}
                <div className="page4-circle4 gravity">
                    <div className="flex flex-col items-center justify-center text-center">
                        <span className="font-bold text-white tracking-widest text-[1.4vw] font-plain-reg">HACKODYSSEY</span>
                        <span className="text-[0.9vw] font-mono text-white/90 mt-1">2026 · KARE ACM & GDG</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Coordinators;
