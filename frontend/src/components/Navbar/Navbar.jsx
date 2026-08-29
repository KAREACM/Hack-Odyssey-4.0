import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { IoMdClose } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa6";
import acmLogo from "../../assets/acm_logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const menuRef = useRef(null);

  const menuItems = [
    { name: "The Odyssey", href: "#welcome" },
    { name: "Prize Pool", href: "#prizepool" },
    { name: "Our Team", href: "#page3" },
    { name: "Gallery", href: "#gallery" },
    { name: "Register Now", href: "#prizepool" },
  ];

  // 1. Spylt-Inspired Magnetic Cursor Hover Effect on Nav Elements
  useGSAP(() => {
    const els = document.querySelectorAll(".nav-logo, .menu-hover, .nav-cta");
    if (!els.length) return;

    const disposers = [];

    els.forEach((el) => {
      const onMove = (e) => {
        const b = el.getBoundingClientRect();
        const x = e.clientX - b.left;
        const y = e.clientY - b.top;
        const offsetX = (x / b.width - 0.5) * 12;
        const offsetY = (y / b.height - 0.5) * 12;
        gsap.to(el, { x: offsetX, y: offsetY, scale: 1.06, duration: 0.25, ease: "power2.out" });
      };

      const onLeave = () => gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.35, ease: "power3.out" });

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      disposers.push(() => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => disposers.forEach((d) => d());
  });

  // 2. Spylt GSAP Slide-Down Menu Expand Animation
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isMenuOpen) {
      // Smooth Slide-Down Open Animation
      gsap.fromTo(
        menu,
        { yPercent: -100, opacity: 0, display: "flex" },
        { yPercent: 0, opacity: 1, duration: 0.75, ease: "power3.out", display: "flex" }
      );
      // Stagger in links with upward slide
      gsap.fromTo(
        ".navmenu-link",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, delay: 0.2, ease: "power3.out" }
      );
      // Stagger in bottom social row
      gsap.fromTo(
        ".navmenu-social",
        { y: 25, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, delay: 0.45, ease: "power3.out" }
      );
    } else {
      // Smooth Slide-Up Close Animation
      gsap.to(menu, {
        yPercent: -100,
        opacity: 0,
        duration: 0.6,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Top Navbar Header Bar (3-Column Balanced Flex Layout at z-[1002] above menu overlay) */}
      <nav className="fixed top-0 left-0 z-[1002] flex items-center justify-between px-6 sm:px-10 md:px-14 lg:px-16 py-5 sm:py-6 w-full bg-transparent pointer-events-none">
        
        {/* Left: ACM Logo (NO background) */}
        <div className="flex items-center pointer-events-auto flex-1 justify-start">
          <a
            href="#"
            className="nav-logo flex items-center justify-center cursor-pointer transition-transform"
            title="KARE ACM Student Chapter"
          >
            <img
              src={acmLogo}
              alt="KARE ACM Student Chapter Logo"
              className="w-10 sm:w-12 h-auto object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
            />
          </a>
        </div>

        {/* Center: Hamburger (☰) / Close (✕) Menu Button (Fixed at same position & dimensions) */}
        <div className="flex items-center justify-center pointer-events-auto">
          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className={`menu-hover w-11 h-11 sm:w-12 sm:h-12 rounded-full backdrop-blur-xl border text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer group ${
              isMenuOpen
                ? "bg-white/15 hover:bg-white/25 border-white/40 text-white"
                : "bg-[#18171f]/85 hover:bg-[#25232e] border-white/15 hover:border-purple-400/40 text-white"
            }`}
            aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
          >
            {isMenuOpen ? (
              <IoMdClose className="w-6 h-6 text-white group-hover:rotate-90 group-hover:scale-110 transition-transform duration-300" />
            ) : (
              <div className="flex flex-col items-center justify-center gap-1.5">
                <span className="w-5 h-[2px] bg-white rounded-full group-hover:w-6 transition-all duration-300" />
                <span className="w-5 h-[2px] bg-white rounded-full group-hover:w-4 transition-all duration-300" />
                <span className="w-5 h-[2px] bg-white rounded-full group-hover:w-5 transition-all duration-300" />
              </div>
            )}
          </button>
        </div>

        {/* Right: Action Pill Button (Spylt Style: FIND STORES -> REGISTER NOW) */}
        <div className="flex items-center pointer-events-auto flex-1 justify-end">
          <a
            href="#prizepool"
            className="nav-cta px-5 sm:px-6 py-2 sm:py-2.5 rounded-full bg-[#f4efe7] hover:bg-white text-[#181717] font-bold text-xs uppercase tracking-wider shadow-lg hover:shadow-[0_0_20px_rgba(244,239,231,0.4)] transition-all duration-300 flex items-center gap-2 group cursor-pointer"
          >
            <span>REGISTER NOW</span>
            <MdArrowOutward className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
        </div>
      </nav>

      {/* Expanded Full-Screen Menu Overlay (Centered Links + Socials, No Right Image) */}
      <div
        ref={menuRef}
        className="navmenu fixed inset-0 w-full h-screen bg-[#030206]/98 backdrop-blur-3xl flex flex-col justify-center items-center z-[1000] hidden overflow-hidden select-none"
      >
        {/* Subtle Purple Ambient Nebula Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Centered Navigation Content */}
        <div className="relative z-10 flex flex-col justify-center items-center text-center space-y-1 sm:space-y-2 max-w-4xl px-6">
          <span className="text-[10px] sm:text-xs font-mono font-semibold tracking-[0.3em] text-[#a855f7] uppercase mb-4 sm:mb-6 opacity-85">
            HACK ODYSSEY 4.0 &middot; NAVIGATION
          </span>

          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className={`navmenu-link font-hero-bebas uppercase text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[6.5rem] tracking-tight transition-all duration-300 block py-1 cursor-pointer ${
                hovered === item.name
                  ? "text-white scale-105 drop-shadow-[0_0_30px_rgba(168,85,247,0.7)]"
                  : hovered
                  ? "text-white/20 scale-95"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {item.name}
            </a>
          ))}

          {/* Bottom Social Links: LinkedIn, Instagram, GitHub */}
          <div className="navmenu-social flex items-center justify-center gap-7 sm:gap-10 text-xs sm:text-sm font-mono tracking-widest text-[#a199b0] mt-8 sm:mt-12 md:mt-14 pt-4 border-t border-white/10 w-full max-w-md">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
            >
              <FaLinkedin className="text-sm sm:text-base text-purple-400 group-hover:scale-110 transition-transform" />
              <span>LinkedIn</span>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
            >
              <FaInstagram className="text-pink-400 group-hover:scale-110 transition-transform text-sm sm:text-base" />
              <span>Instagram</span>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1.5 group cursor-pointer"
            >
              <FaGithub className="text-white group-hover:scale-110 transition-transform text-sm sm:text-base" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
