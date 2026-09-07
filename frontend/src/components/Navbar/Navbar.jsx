import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/all";
import { IoMdClose } from "react-icons/io";
import { MdArrowOutward } from "react-icons/md";
import { FaLinkedin, FaInstagram, FaGithub, FaWhatsapp } from "react-icons/fa6";
import acmLogo from "../../assets/acm_logo.png";
import RegisterButton from "../Buttons/RegisterButton";
import "./navbar.css";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const menuRef = useRef(null);
  const navCtaRef = useRef(null);

  const menuItems = [
    { name: "The Odyssey", href: "#welcome" },
    { name: "Our Team", href: "#page3" },
    { name: "Prize Pool", href: "#prizepool" },
    { name: "Gallery", href: "#gallery" },
  ];

  // Close menu on Escape key press & prevent background scroll while overlay is open
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  // 1. Spylt-Inspired Magnetic Cursor Hover Effect on Nav Elements & Social Dock
  useGSAP(
    () => {
      const fixedEls = document.querySelectorAll(".nav-logo, .menu-hover");
      const socialEls = isMenuOpen
        ? document.querySelectorAll(".navmenu-social .social-dock-btn")
        : [];
      const linkEls = isMenuOpen
        ? document.querySelectorAll(".navmenu-link")
        : [];

      const crsr = document.getElementById("crsr");
      const disposers = [];

      // Magnetic attraction for interactive buttons (.nav-logo, .menu-hover, .social-dock-btn)
      [...fixedEls, ...socialEls].forEach((el) => {
        const isSocial = el.classList.contains("social-dock-btn");
        const maxOffset = isSocial ? 14 : 12;
        const targetScale = isSocial ? 1.14 : 1.06;

        const onMove = (e) => {
          const b = el.getBoundingClientRect();
          const x = e.clientX - b.left;
          const y = e.clientY - b.top;
          const offsetX = (x / b.width - 0.5) * maxOffset;
          const offsetY = (y / b.height - 0.5) * maxOffset;

          gsap.to(el, {
            x: offsetX,
            y: offsetY,
            scale: targetScale,
            duration: 0.25,
            ease: "power2.out",
          });

          if (crsr) {
            gsap.to(crsr, {
              scale: isSocial ? 1.5 : 1.35,
              borderColor: isSocial ? "#a855f7" : "#ffffffbc",
              duration: 0.2,
              ease: "power2.out",
            });
          }
        };

        const onLeave = () => {
          gsap.to(el, { x: 0, y: 0, scale: 1, duration: 0.35, ease: "power3.out" });

          if (crsr) {
            gsap.to(crsr, {
              scale: 1.0,
              borderColor: "#ffffffbc",
              duration: 0.25,
              ease: "power2.out",
            });
          }
        };

        el.addEventListener("mousemove", onMove);
        el.addEventListener("mouseleave", onLeave);

        disposers.push(() => {
          el.removeEventListener("mousemove", onMove);
          el.removeEventListener("mouseleave", onLeave);
        });
      });

      // Cursor expansion for full-screen nav links
      linkEls.forEach((link) => {
        const onEnter = () => {
          if (crsr) {
            gsap.to(crsr, {
              scale: 2.0,
              borderColor: "rgba(168, 85, 247, 0.75)",
              duration: 0.25,
              ease: "power2.out",
            });
          }
        };

        const onLeave = () => {
          if (crsr) {
            gsap.to(crsr, {
              scale: 1.0,
              borderColor: "#ffffffbc",
              duration: 0.25,
              ease: "power2.out",
            });
          }
        };

        link.addEventListener("mouseenter", onEnter);
        link.addEventListener("mouseleave", onLeave);

        disposers.push(() => {
          link.removeEventListener("mouseenter", onEnter);
          link.removeEventListener("mouseleave", onLeave);
        });
      });

      return () => {
        disposers.forEach((d) => d());
        if (crsr) {
          gsap.to(crsr, { scale: 1.0, borderColor: "#ffffffbc", duration: 0.2 });
        }
      };
    },
    { dependencies: [isMenuOpen] }
  );

  // 2. Cinematic Register Now CTA Transition (Navbar -> Footer)
  useGSAP(() => {
    const navBtn = navCtaRef.current;
    if (!navBtn) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Smooth fluid descent and fade as user scrolls into the footer
    gsap.fromTo(
      navBtn,
      { y: 0, opacity: 1 },
      {
        y: 40,
        opacity: 0,
        duration: 0.45,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#contact",
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );
  });

  // 3. High-Performance Nav Relocation with Accurate Pinned-Section Calculation
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetEl = document.querySelector(href);

    if (targetEl) {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        ScrollTrigger.refresh();

        // Check if the target or its pin has an active ScrollTrigger instance (e.g. pinned Gallery / Winners)
        const matchedST = ScrollTrigger.getAll().find(
          (st) => st.trigger === targetEl || st.pin === targetEl
        );

        // Use ScrollTrigger's exact start scroll coordinate if pinned, or smoother's calculated offset
        const targetPos = matchedST ? matchedST.start : smoother.offset(targetEl, "top top");

        // Directly set ScrollSmoother's internal scrollTop position (prevents snapping back to top)
        smoother.scrollTop(targetPos);
      } else {
        targetEl.scrollIntoView({ behavior: "instant" });
      }
    }

    // Retract menu smoothly, revealing the target section already in place
    setIsMenuOpen(false);
  };

  // 3. Spylt GSAP Slide-Down Menu Expand / Retract Animation
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (isMenuOpen) {
      // Smooth Slide-Down Open Animation
      gsap.fromTo(
        menu,
        { yPercent: -100, opacity: 0, display: "flex" },
        { yPercent: 0, opacity: 1, duration: 0.65, ease: "power3.out", display: "flex" }
      );
      // Stagger in links with upward slide
      gsap.fromTo(
        ".navmenu-link",
        { y: 35, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.07, delay: 0.16, ease: "power3.out" }
      );
      // Stagger in bottom social container & glassmorphic dock buttons
      gsap.fromTo(
        ".navmenu-social",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.45, delay: 0.35, ease: "power3.out" }
      );
      gsap.fromTo(
        ".navmenu-social .social-dock-btn",
        { scale: 0.5, opacity: 0, y: 15 },
        { scale: 1, opacity: 1, y: 0, duration: 0.45, stagger: 0.06, delay: 0.4, ease: "back.out(1.8)" }
      );
    } else {
      // Smooth Slide-Up Close Animation
      gsap.to(menu, {
        yPercent: -100,
        opacity: 0,
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          gsap.set(menu, { display: "none" });
        },
      });
    }
  }, [isMenuOpen]);

  return (
    <>
      {/* Top Navbar Header Bar (Always completely transparent, NO background) */}
      <header className="fixed top-0 left-0 w-full z-[1002] bg-transparent pointer-events-none">
        <nav className="w-full flex items-center justify-between px-3.5 sm:px-6 md:px-14 lg:px-16 py-2.5 sm:py-3.5 md:py-6 relative min-h-[50px] sm:min-h-[56px] md:min-h-[72px] bg-transparent">
          
          {/* Left: ACM Logo (NO background, optically centered) */}
          <div className="flex items-center pointer-events-auto flex-1 justify-start z-10">
            <a
              href="#"
              className="nav-logo flex items-center justify-center cursor-pointer transition-transform select-none"
              title="KARE ACM Student Chapter"
            >
              <img
                src={acmLogo}
                alt="KARE ACM Student Chapter Logo"
                className="w-8 sm:w-9 md:w-11 h-auto object-contain drop-shadow-[0_0_15px_rgba(168,85,247,0.4)]"
              />
            </a>
          </div>

          {/* Center: Hamburger (☰) / Close (✕) Menu Button (True Viewport Center via Absolute Positioning) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto z-20">
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`menu-hover w-9.5 h-9.5 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-full backdrop-blur-xl border text-white flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer group ${
                isMenuOpen
                  ? "bg-white/15 hover:bg-white/25 border-white/40 text-white"
                  : "bg-[#18171f]/85 hover:bg-[#25232e] border-white/15 hover:border-purple-400/40 text-white"
              }`}
              aria-label={isMenuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
            >
              {isMenuOpen ? (
                <IoMdClose className="w-5 h-5 sm:w-5.5 sm:h-5.5 md:w-6 md:h-6 text-white group-hover:rotate-90 group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <div className="flex flex-col items-center justify-center gap-1 sm:gap-1.5">
                  <span className="w-4 sm:w-4.5 md:w-5 h-[1.8px] md:h-[2px] bg-white rounded-full group-hover:w-5 md:group-hover:w-6 transition-all duration-300" />
                  <span className="w-4 sm:w-4.5 md:w-5 h-[1.8px] md:h-[2px] bg-white rounded-full group-hover:w-3.5 md:group-hover:w-4 transition-all duration-300" />
                  <span className="w-4 sm:w-4.5 md:w-5 h-[1.8px] md:h-[2px] bg-white rounded-full group-hover:w-4.5 md:group-hover:w-5 transition-all duration-300" />
                </div>
              )}
            </button>
          </div>

          {/* Right: Action Pill Button (Visible ONLY on Desktop, Hidden on Mobile Responsive) */}
          <div className="hidden md:flex items-center pointer-events-auto flex-1 justify-end z-10">
            <div ref={navCtaRef} className="nav-cta-wrap inline-flex items-center justify-end">
              <RegisterButton
                id="navbar-cta-btn"
                size="navbar"
                className="nav-cta"
                href="https://euphoria.kalasalingam.ac.in/"
                onClick={() => {
                  if (isMenuOpen) {
                    setIsMenuOpen(false);
                  }
                }}
              />
            </div>
          </div>
          {/* Mobile Spacer to balance flex row layout on mobile */}
          <div className="flex md:hidden flex-1 pointer-events-none" aria-hidden="true" />
        </nav>
      </header>

      {/* Expanded Full-Screen Menu Overlay (Ergonomic Layout with Guaranteed Clearances) */}
      <div
        ref={menuRef}
        className="navmenu fixed inset-0 w-full h-[100dvh] bg-[#030206]/98 backdrop-blur-3xl flex flex-col justify-between items-center z-[1000] hidden overflow-hidden select-none px-6 pt-20 sm:pt-24 pb-8 sm:pb-10"
      >
        {/* Subtle Purple Ambient Nebula Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] bg-purple-600/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Centered Navigation Links (Optically Centered in Available Viewport) */}
        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center space-y-2 sm:space-y-3 md:space-y-4 max-w-4xl px-4 w-full">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
              className={`navmenu-link font-hero-bebas uppercase text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] xl:text-[5rem] tracking-tight leading-[1.08] transition-all duration-300 block py-0.5 cursor-pointer ${
                hovered === item.name
                  ? "text-white scale-105 drop-shadow-[0_0_35px_rgba(168,85,247,0.75)]"
                  : hovered
                  ? "text-white/20 scale-95"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Bottom Social Media Hub (Clean Divider Line + 4 Perfectly Centered Icons, No Text) */}
        <div className="relative z-10 navmenu-social shrink-0 flex flex-col items-center justify-center w-full max-w-[260px] sm:max-w-[280px] pt-4 sm:pt-5 border-t border-white/10">
          {/* Single-Row Glassmorphic Social Media Icon Dock (Exact match with Footer) */}
          <div className="flex items-center justify-center gap-3.5 sm:gap-4.5 flex-nowrap">
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
        </div>
      </div>
    </>
  );
};

export default Navbar;
