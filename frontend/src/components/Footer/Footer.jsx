import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaLinkedin, FaInstagram, FaGithub, FaWhatsapp } from "react-icons/fa6";
import { MdArrowOutward } from "react-icons/md";
import acmLogo from "../../assets/acm_logo.png";
import acmWLogo from "../../assets/preloader/ACM-W_logo.png";
import ieeeLogo from "../../assets/preloader/IEEE_logo_dark.png";
import gdgLogo from "../../assets/preloader/gdg.svg";
import gfgLogo from "../../assets/preloader/GFG_logo_dark.png";
import RegisterButton from "../Buttons/RegisterButton";
import "./footertitle.css";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const pillCtaRef = useRef(null);
  const dockRef = useRef(null);
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

    // 2. Collaboration Partners Shelf Reveal
    gsap.from(".footer-partners-card", {
      opacity: 0,
      y: 20,
      scale: 0.98,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".footer-partners-wrap",
        start: "top 92%",
      },
    });

    // 3. Smooth Entrance Animation for Mega Title & Exponent Badge (Hero Style)
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

    // 4. Smooth Cinematic Arrival for Footer Register CTA (Synchronized with Navbar CTA handoff)
    if (pillCtaRef.current) {
      gsap.fromTo(
        pillCtaRef.current,
        { y: -30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
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

        {/* Column 2: Professional Clean Navigation Menu (No raw [ INDEX ]) */}
        <div className="footer-top-col flex flex-col items-start lg:items-center flex-1">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-5 sm:w-6 h-[1.5px] bg-[#a855f7] rounded-full inline-block shadow-[0_0_6px_#a855f7]" />
              <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#d8b4fe] uppercase">
                NAVIGATION
              </p>
            </div>
            
            <nav className="footer-nav-list flex flex-col gap-1.5 text-xs sm:text-sm tracking-wider text-[#cbd5e1]">
              <a href="#welcome" className="footer-nav-link flex items-center gap-2 group">
                <span className="text-[10px] font-mono text-[#a855f7]/70 group-hover:text-[#a855f7] transition-colors">01</span>
                <span className="group-hover:text-white transition-colors">THE ODYSSEY</span>
              </a>
              <a href="#prizepool" className="footer-nav-link flex items-center gap-2 group">
                <span className="text-[10px] font-mono text-[#a855f7]/70 group-hover:text-[#a855f7] transition-colors">02</span>
                <span className="group-hover:text-white transition-colors">PRIZE POOL</span>
              </a>
              <a href="#page3" className="footer-nav-link flex items-center gap-2 group">
                <span className="text-[10px] font-mono text-[#a855f7]/70 group-hover:text-[#a855f7] transition-colors">03</span>
                <span className="group-hover:text-white transition-colors">OUR TEAM</span>
              </a>
              <a href="#gallery" className="footer-nav-link flex items-center gap-2 group">
                <span className="text-[10px] font-mono text-[#a855f7]/70 group-hover:text-[#a855f7] transition-colors">04</span>
                <span className="group-hover:text-white transition-colors">GALLERY</span>
              </a>
              <a href="#faq" className="footer-nav-link flex items-center gap-2 group">
                <span className="text-[10px] font-mono text-[#a855f7]/70 group-hover:text-[#a855f7] transition-colors">05</span>
                <span className="group-hover:text-white transition-colors">FAQ &middot; QUESTIONS</span>
              </a>
            </nav>
          </div>
        </div>

        {/* Column 3: Registration Headline & Destination CTA Dock */}
        <div className="footer-top-col flex flex-col items-start lg:items-end flex-1 gap-3.5 w-full lg:w-auto">
          <div className="text-left lg:text-right">
            <div className="flex items-center lg:justify-end gap-2 mb-1">
              <span className="w-5 sm:w-6 h-[1.5px] bg-[#a855f7] rounded-full inline-block shadow-[0_0_6px_#a855f7]" />
              <p className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#d8b4fe] uppercase">
                REGISTRATION
              </p>
            </div>
            <h3 className="font-hero-bebas text-2xl sm:text-3xl tracking-widest text-white uppercase leading-none">
              REGISTER FOR THE ODYSSEY
            </h3>
            <p className="text-[10px] sm:text-xs font-mono text-[#d8b4fe] uppercase tracking-wider mt-1 font-medium">
              SEPTEMBER 25 &ndash; 26, 2026 &middot; LIMITED SLOTS
            </p>
          </div>

          {/* Dedicated Landing Dock for Animated Register Now Button */}
          <div
            id="footer-cta-dock"
            ref={dockRef}
            className="footer-cta-dock relative w-full sm:w-auto flex items-center justify-start lg:justify-end min-h-[50px]"
          >
            <div ref={pillCtaRef} className="footer-cta-pill-wrap inline-flex items-center w-full sm:w-auto justify-start lg:justify-end">
              <RegisterButton
                id="footer-cta-pill"
                href="https://euphoria.kalasalingam.ac.in/"
                className="w-full sm:w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ====================================================================
          COLLABORATION CONSORTIUM SHELF (Organized in Collaboration With)
          ==================================================================== */}
      <div className="footer-partners-wrap w-full px-6 sm:px-12 lg:px-18 py-4 relative z-10">
        <div className="footer-partners-card border border-white/10 rounded-2xl bg-[#120d20]/60 backdrop-blur-xl px-6 py-4.5 flex flex-col lg:flex-row items-center justify-between gap-5 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2.5 shrink-0">
            <span className="w-4 h-[1.5px] bg-[#a855f7] rounded-full inline-block shadow-[0_0_6px_#a855f7]" />
            <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#d8b4fe] uppercase">
              ORGANIZED IN COLLABORATION WITH
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-end gap-4 sm:gap-6 lg:gap-8 w-full lg:w-auto">
            {/* 1. KARE ACM */}
            <div className="partner-item flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#a855f7]/60 hover:bg-[#a855f7]/10 transition-all duration-300 group cursor-default" title="KARE ACM Student Chapter">
              <img src={acmLogo} alt="KARE ACM" className="h-6 w-auto object-contain filter group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.7)] transition-all" />
              <span className="text-[11px] font-mono tracking-wider text-[#cbd5e1] group-hover:text-white transition-colors">KARE ACM</span>
            </div>

            {/* 2. ACM-W */}
            <div className="partner-item flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#ec4899]/60 hover:bg-[#ec4899]/10 transition-all duration-300 group cursor-default" title="ACM-W Women in Computing">
              <img src={acmWLogo} alt="ACM-W" className="h-6 w-auto object-contain transition-all" />
              <span className="text-[11px] font-mono tracking-wider text-[#cbd5e1] group-hover:text-white transition-colors">ACM-W</span>
            </div>

            {/* 3. IEEE Education Society */}
            <div className="partner-item flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#38bdf8]/60 hover:bg-[#38bdf8]/10 transition-all duration-300 group cursor-default" title="IEEE Education Society">
              <img src={ieeeLogo} alt="IEEE Education Society" className="h-6 w-auto object-contain transition-all" />
              <span className="text-[11px] font-mono tracking-wider text-[#cbd5e1] group-hover:text-white transition-colors">IEEE EdSoc</span>
            </div>

            {/* 4. Google Developer Groups (GDG) */}
            <div className="partner-item flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#34a853]/60 hover:bg-white/[0.08] transition-all duration-300 group cursor-default" title="Google Developer Groups">
              <img src={gdgLogo} alt="Google Developer Groups" className="h-6 w-auto object-contain transition-all" />
              <span className="text-[11px] font-mono tracking-wider text-[#cbd5e1] group-hover:text-white transition-colors">GDG</span>
            </div>

            {/* 5. GeeksforGeeks (GFG) */}
            <div className="partner-item flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-white/10 bg-white/[0.03] hover:border-[#22c55e]/60 hover:bg-[#22c55e]/10 transition-all duration-300 group cursor-default" title="GeeksforGeeks Student Chapter">
              <img src={gfgLogo} alt="GeeksforGeeks" className="h-6 w-auto object-contain transition-all" />
              <span className="text-[11px] font-mono tracking-wider text-[#cbd5e1] group-hover:text-white transition-colors">GFG</span>
            </div>
          </div>
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
      {/* ====================================================================
          BOTTOM COLOPHON / FOOTER BAR (Refined Professional Typography)
          ==================================================================== */}
      <div className="footer-colophon w-full px-6 sm:px-12 lg:px-18 py-6 border-t border-white/10 relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-center font-sans text-xs text-[#cbd5e1]">
        
        {/* Col 1: Legal & Copyright */}
        <div className="colophon-col flex flex-col justify-center">
          <p className="text-white font-medium text-xs sm:text-[13px] tracking-wide">
            &copy; 2026 HACK ODYSSEY 4.0
          </p>
          <p className="text-[#94a3b8] text-[11px] font-normal tracking-normal mt-0.5">
            All Rights Reserved &middot; 24H National Hackathon
          </p>
        </div>

        {/* Col 2: Institution & Chapter */}
        <div className="colophon-col flex flex-col justify-center">
          <p className="text-white font-medium text-xs sm:text-[13px] tracking-wide">
            KARE ACM STUDENT CHAPTER
          </p>
          <p className="text-[#94a3b8] text-[11px] font-normal tracking-normal mt-0.5">
            Kalasalingam University &middot; Tamil Nadu, India
          </p>
        </div>

        {/* Col 3: Professional Glassmorphic Social Media Hub with WhatsApp */}
        <div className="colophon-col flex items-center justify-start lg:justify-center gap-3">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/acmkare/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-dock-btn social-btn-linkedin"
            aria-label="KARE ACM on LinkedIn"
            title="LinkedIn"
          >
            <FaLinkedin className="text-lg transition-transform duration-300" />
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/acm_kare"
            target="_blank"
            rel="noopener noreferrer"
            className="social-dock-btn social-btn-instagram"
            aria-label="KARE ACM on Instagram"
            title="Instagram"
          >
            <FaInstagram className="text-lg transition-transform duration-300" />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com/KAREACM"
            target="_blank"
            rel="noopener noreferrer"
            className="social-dock-btn social-btn-github"
            aria-label="KARE ACM on GitHub"
            title="GitHub"
          >
            <FaGithub className="text-lg transition-transform duration-300" />
          </a>

          {/* WhatsApp Community */}
          <a
            href="https://chat.whatsapp.com/HDdBZ4GAqDULHB9UC6eC3g"
            target="_blank"
            rel="noopener noreferrer"
            className="social-dock-btn social-btn-whatsapp"
            aria-label="Join Hack Odyssey WhatsApp Community"
            title="WhatsApp Group"
          >
            <FaWhatsapp className="text-lg transition-transform duration-300" />
          </a>
        </div>

        {/* Col 4: Design Credits */}
        <div className="colophon-col flex flex-col lg:items-end justify-center">
          <p className="text-[#94a3b8] text-[11px] font-normal tracking-normal">
            Organized with Passion by
          </p>
          <p className="text-white font-medium text-xs sm:text-[13px] tracking-wide mt-0.5">
            KARE ACM TECH &amp; DESIGN TEAM
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

