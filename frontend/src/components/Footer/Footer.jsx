import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import acmLogo from "../../assets/acm_logo.png";
import "./footertitle.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const pillCtaRef = useRef(null);
  const megaTitleRef = useRef(null);

  useGSAP(() => {
    if (!footerRef.current) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // 1. Top Header Row Entrance Animation
    gsap.from(".footer-top-col", {
      opacity: 0,
      y: 30,
      duration: 0.9,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
      },
    });

    // 2. Smooth Entrance Animation for Mega Title & Exponent Badge (Hero Style)
    if (megaTitleRef.current) {
      gsap.fromTo(
        megaTitleRef.current,
        {
          y: 40,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".footer-mega-typography-wrap",
            start: "top 90%",
          },
        }
      );
    }

    gsap.from(".footer-badge-exponent", {
      scale: 0,
      opacity: 0,
      rotate: -30,
      duration: 0.8,
      delay: 0.25,
      ease: "back.out(2)",
      scrollTrigger: {
        trigger: ".footer-mega-typography-wrap",
        start: "top 85%",
      },
    });

    // 3. Bottom Colophon Row Reveal
    gsap.from(".colophon-col", {
      opacity: 0,
      y: 15,
      duration: 0.8,
      stagger: 0.08,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer-colophon",
        start: "top 98%",
      },
    });

    // 4. Magnetic CTA Button Physics (Hero & Spylt Style)
    const pill = pillCtaRef.current;
    if (pill) {
      const onMove = (e) => {
        const rect = pill.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(pill, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(pill, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        });
      };

      pill.addEventListener("mousemove", onMove);
      pill.addEventListener("mouseleave", onLeave);

      return () => {
        pill.removeEventListener("mousemove", onMove);
        pill.removeEventListener("mouseleave", onLeave);
      };
    }
  }, { scope: footerRef });

  return (
    <footer
      id="contact"
      ref={footerRef}
      className="hack-footer-section select-none relative z-20 w-full"
    >
      {/* Ambient Purple Nebula Lighting (Matches Hero, PrizePool, Winners) */}
      <div className="footer-ambient-glow" />

      {/* ====================================================================
          TOP BRAND & ACTION BAR (3-Column Balanced Alignment)
          ==================================================================== */}
      <div className="w-full px-6 sm:px-12 lg:px-18 pt-20 sm:pt-24 lg:pt-28 pb-6 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-6 relative z-10">
        
        {/* Column 1: Brand, Eyebrow & KARE ACM Chapter Identity */}
        <div className="footer-top-col flex flex-col items-start gap-2.5 flex-1">
          {/* Eyebrow with Purple Accent Line (Directly from Hero & Welcome) */}
          <div className="flex items-center gap-2 mb-1">
            <span className="w-5 sm:w-6 h-[1.5px] bg-[#a855f7] rounded-full inline-block shadow-[0_0_6px_#a855f7]" />
            <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#d8b4fe] uppercase">
              KARE ACM CHAPTER
            </p>
          </div>

          <div className="flex items-center gap-3">
            <img
              src={acmLogo}
              alt="KARE ACM Student Chapter Logo"
              className="w-10 sm:w-11 h-auto object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]"
            />
            <div className="flex flex-col">
              <span className="font-hero-bebas text-2xl sm:text-3xl tracking-wider text-white uppercase flex items-center gap-1.5 leading-none">
                HACK ODYSSEY
              </span>
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.2em] text-[#a199b0] uppercase mt-0.5">
                KARE ACM STUDENT CHAPTER
              </span>
            </div>
          </div>
          <p className="text-xs text-[#cbd5e1] max-w-xs mt-1 leading-relaxed font-normal">
            The premier 24-hour national hackathon challenging bold engineers to build the future.
          </p>
        </div>

        {/* Column 2: Bracketed Navigation Menu (Matching Reference Image) */}
        <div className="footer-top-col flex flex-col items-start lg:items-center flex-1">
          <div className="footer-bracket-menu flex flex-col gap-1.5 text-xs sm:text-sm tracking-wider text-[#cbd5e1]">
            <div className="text-white font-bold flex items-center gap-1.5 mb-1 text-xs sm:text-sm font-mono tracking-widest">
              <span className="text-[#a855f7]">[</span>
              <span>INDEX</span>
              <span className="text-[#a855f7]">]</span>
            </div>
            <a href="#welcome">THE ODYSSEY</a>
            <a href="#prizepool">PRIZE POOL</a>
            <a href="#page3">OUR TEAM</a>
            <a href="#gallery">GALLERY</a>
            <a href="#contact">CONTACT</a>
          </div>
        </div>

        {/* Column 3: Registration Headline & Hero-Style Pill CTA */}
        <div className="footer-top-col flex flex-col items-start lg:items-end flex-1 gap-3.5 w-full lg:w-auto">
          <div className="text-left lg:text-right">
            <h3 className="font-hero-bebas text-2xl sm:text-3xl tracking-widest text-white uppercase leading-none">
              REGISTER FOR THE ODYSSEY
            </h3>
            <p className="text-[10px] sm:text-xs font-mono text-[#d8b4fe] uppercase tracking-wider mt-1 font-medium">
              OCTOBER 27 – 28, 2026 &middot; LIMITED SLOTS
            </p>
          </div>

          {/* Signature Hack Odyssey Capsule Pill Button */}
          <a
            ref={pillCtaRef}
            href="#prizepool"
            className="footer-cta-pill w-full sm:w-auto px-6 sm:px-7 py-3 rounded-full flex items-center justify-between sm:justify-center gap-4 cursor-pointer font-bold text-xs uppercase tracking-wider group"
          >
            <span className="font-semibold tracking-wider text-[11px] sm:text-xs text-[#181717]">REGISTER NOW</span>
            <span className="cta-arrow-circle w-6 h-6 rounded-full flex items-center justify-center shadow-md">
              <MdArrowOutward className="w-3.5 h-3.5 text-inherit transition-transform duration-300" />
            </span>
          </a>
        </div>
      </div>

      {/* ====================================================================
          CENTERPIECE: MEGA HERO-STYLE TYPOGRAPHY WITH CIRCULAR EXPONENT
          ==================================================================== */}
      <div className="footer-mega-typography-wrap relative z-10 px-4 my-2">
        <div ref={megaTitleRef} className="footer-mega-title select-none">
          <span className="tracking-tight uppercase">HACK ODYSSEY</span>
          {/* Exponential Circled 4.0 Badge (Matching Hero & Winners Exact Component Design) */}
          <span 
            className="footer-badge-exponent"
            title="Version 4.0"
          >
            4.0
          </span>
        </div>
      </div>

      {/* ====================================================================
          BOTTOM COLOPHON / FOOTER BAR (4-Column Balanced Grid with Verified Socials)
          ==================================================================== */}
      <div className="footer-colophon w-full px-6 sm:px-12 lg:px-18 py-6 border-t border-white/10 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 text-xs font-mono tracking-wider text-[#cbd5e1]">
        
        {/* Col 1: Copyright */}
        <div className="colophon-col flex flex-col justify-center">
          <p className="text-white font-semibold">© HACK ODYSSEY 4.0 /</p>
          <p className="text-[#a199b0]">ALL RIGHTS RESERVED</p>
        </div>

        {/* Col 2: Institution & Location */}
        <div className="colophon-col flex flex-col justify-center">
          <p className="text-white">KARE ACM STUDENT CHAPTER</p>
          <p className="text-[#a199b0]">TAMIL NADU, INDIA</p>
        </div>

        {/* Col 3: Social Redirection Links with Prominent Icons */}
        <div className="colophon-col flex items-center gap-4 sm:gap-5">
          <a
            href="https://www.linkedin.com/company/kareacm/"
            target="_blank"
            rel="noopener noreferrer"
            className="colophon-link colophon-link-social flex items-center gap-1.5 text-white hover:text-[#38bdf8]"
            title="KARE ACM LinkedIn"
          >
            <FaLinkedin className="text-base text-[#0a66c2]" />
            <span className="font-semibold">LINKEDIN</span>
          </a>
          <a
            href="https://www.instagram.com/kare_acm/"
            target="_blank"
            rel="noopener noreferrer"
            className="colophon-link colophon-link-social flex items-center gap-1.5 text-white hover:text-[#ec4899]"
            title="KARE ACM Instagram"
          >
            <FaInstagram className="text-base text-[#e4405f]" />
            <span className="font-semibold">INSTAGRAM</span>
          </a>
          <a
            href="https://github.com/KARE-ACM"
            target="_blank"
            rel="noopener noreferrer"
            className="colophon-link colophon-link-social flex items-center gap-1.5 text-white hover:text-[#a855f7]"
            title="KARE ACM GitHub"
          >
            <FaGithub className="text-base text-white" />
            <span className="font-semibold">GITHUB</span>
          </a>
        </div>

        {/* Col 4: Design Credits */}
        <div className="colophon-col flex flex-col lg:items-end justify-center">
          <p className="text-[#a199b0]">ORGANIZED WITH PASSION BY</p>
          <p className="text-white font-semibold">
            KARE ACM TECH & DESIGN TEAM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

