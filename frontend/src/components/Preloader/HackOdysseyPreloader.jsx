import React, { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import handTopLeft from "../../assets/preloader/Hand Top Left Corner.png";
import handBottomRight from "../../assets/preloader/Hand Bottom Right Corner.png";
import kareAcmLogo from "../../assets/preloader/acm_logo.png";
import acmWLogo from "../../assets/preloader/ACM-W_logo.png";
import ieeeLogo from "../../assets/preloader/IEEE_logo.png";
import gfgLogo from "../../assets/preloader/GFG LOGO.png";
import heroBg from "../../assets/hero_section.png";
import "./HackOdysseyPreloader.css";

gsap.registerPlugin(MotionPathPlugin);

/**
 * HackOdyssey 4.0 Preloader — Complete Master Cinematic Sequence (Phases 1 → 7)
 *
 * Phase 1: 0.00s → 0.70s (The Opening Shot in Darkness)
 * Phase 2: 0.70s → 2.20s ("The Hands Discover Each Other" — Curved Entry)
 * Phase 3: 2.20s → 2.80s ("The Hands Slow Down / Anticipation" — Deceleration to 3–5px)
 * Phase 4: 2.80s → 3.20s ("Fingertip Contact / Energy Ignition" — Exact Touch, Flash, Pulse, Core)
 * Phase 5: 3.20s → 3.85s ("KARE ACM Identity Formation" — Seeded Radial Reveal, Light Sweep, Stable)
 * Phase 6: 3.85s → 4.55s ("KARE ACM Presents HackOdyssey 4.0" — ACM Anchor, Eyebrow & Word Reveal + Circled 4.0)
 * Phase 7: 4.55s → 5.30s ("Cinematic Outro" — Text Dissolves, Logo Glides to Navbar, Hero Section Revealed)
 *
 * Enhanced: Refined alignment, richer animations, polished transitions
 */
export default function HackOdysseyPreloader() {
  const [isComplete, setIsComplete] = useState(false);
  const [isSkipped, setIsSkipped] = useState(false);

  const containerRef = useRef(null);
  const atmosphereRef = useRef(null);
  const anticipationGlowRef = useRef(null);
  const contactFlashRef = useRef(null);
  const energyPulseRef = useRef(null);
  const centralCoreRef = useRef(null);

  // 4-Partner Collaboration Orbit Refs
  const orbitSvgRef = useRef(null);
  const orbitCircleRef = useRef(null);

  // 4 Organization Logo Wrappers & Halos
  const kareLogoWrapperRef = useRef(null);
  const acmWLogoWrapperRef = useRef(null);
  const ieeeLogoWrapperRef = useRef(null);
  const gfgLogoWrapperRef = useRef(null);

  const kareHaloRef = useRef(null);
  const acmWHaloRef = useRef(null);
  const ieeeHaloRef = useRef(null);
  const gfgHaloRef = useRef(null);

  // Active Orbit Nodes
  const nodeKareRef = useRef(null);
  const nodeAcmWRef = useRef(null);
  const nodeIeeeRef = useRef(null);
  const nodeGfgRef = useRef(null);

  // Central Collaboration Subtitle Group Refs
  const centralContentRef = useRef(null);
  const collabGroupRef = useRef(null);
  const collabEyebrowRef = useRef(null);
  const collabNameKareRef = useRef(null);
  const collabNameGfgRef = useRef(null);
  const collabNameAcmWRef = useRef(null);
  const collabNameIeeeRef = useRef(null);
  const collabSep1Ref = useRef(null);
  const collabSep2Ref = useRef(null);
  const collabSep3Ref = useRef(null);

  // Event Presentation Text Refs
  const eventTitleGroupRef = useRef(null);
  const presentsRef = useRef(null);
  const titleWrapRef = useRef(null);
  const wordHackRef = useRef(null);
  const wordOdysseyRef = useRef(null);
  const versionRef = useRef(null);

  const skipBtnRef = useRef(null);

  const ambientParticlesRef = useRef([]);
  const contactParticlesRef = useRef([]);

  const handAnchorARef = useRef(null);
  const handWrapperARef = useRef(null);
  const handATipRef = useRef(null);
  const topLeftLightRef = useRef(null);

  const handAnchorBRef = useRef(null);
  const handWrapperBRef = useRef(null);
  const handBTipRef = useRef(null);
  const bottomRightLightRef = useRef(null);

  const contactPointRef = useRef(null);

  // Smooth dismiss handler to reveal the underlying website / Hero section
  const handleSkip = useCallback(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.45,
        ease: "power2.inOut",
        onComplete: () => {
          setIsSkipped(true);
          setIsComplete(true);
        },
      });
    } else {
      setIsSkipped(true);
      setIsComplete(true);
    }
  }, []);

  // Keyboard shortcut: Escape to skip
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        handleSkip();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSkip]);

  useGSAP(
    () => {
      if (isSkipped || isComplete) return;

      const prefersReduced =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const isMobile = width < 768;

      const cx = width * 0.5;
      const cy = height * 0.5;

      // Collinear diagonal slope ensuring pure straight diagonal motion
      const diagSlope = cy / cx;

      // Phase 2 intermediate convergence gap along diagonal vector (~32px from center)
      const p2GapX = isMobile ? 22 : 32;
      const p2GapY = p2GapX * diagSlope;

      // Phase 3 anticipation gap along diagonal vector (~2.2px from center)
      const finalGapX = isMobile ? 1.5 : 2.2;
      const finalGapY = finalGapX * diagSlope;

      // Hand fingertip entry starting positions (straight diagonal from outside / corners)
      const startDistX = isMobile ? width * 0.44 : width * 0.43;
      const startDistY = startDistX * diagSlope;

      const startAX = cx - startDistX;
      const startAY = cy - startDistY;
      const startBX = cx + startDistX;
      const startBY = cy + startDistY;

      const p2TargetAX = cx - p2GapX;
      const p2TargetAY = cy - p2GapY;
      const p2TargetBX = cx + p2GapX;
      const p2TargetBY = cy + p2GapY;

      const finalTargetAX = cx - finalGapX;
      const finalTargetAY = cy - finalGapY;
      const finalTargetBX = cx + finalGapX;
      const finalTargetBY = cy + finalGapY;

      const minDim = Math.min(width, height);
      const orbitRadius = isMobile
        ? Math.min(width * 0.38, height * 0.28, minDim * 0.32)
        : Math.min(width * 0.38, height * 0.36, minDim * 0.34);

      const posKare = { x: 0, y: -orbitRadius };
      const posAcmW = { x: orbitRadius, y: 0 };
      const posIeee = { x: 0, y: orbitRadius };
      const posGfg = { x: -orbitRadius, y: 0 };
      const orbitCircumference = 2 * Math.PI * orbitRadius;

      const tl = gsap.timeline({
        defaults: { ease: "power2.out" },
        onComplete: () => setIsComplete(true),
      });

      tl.set([
          atmosphereRef.current, contactPointRef.current, anticipationGlowRef.current,
          contactFlashRef.current, energyPulseRef.current, centralCoreRef.current,
          ambientParticlesRef.current, contactParticlesRef.current, topLeftLightRef.current,
          bottomRightLightRef.current, handWrapperARef.current, handWrapperBRef.current,
          kareLogoWrapperRef.current, acmWLogoWrapperRef.current, ieeeLogoWrapperRef.current,
          gfgLogoWrapperRef.current, kareHaloRef.current, acmWHaloRef.current,
          ieeeHaloRef.current, gfgHaloRef.current, nodeKareRef.current,
          nodeAcmWRef.current, nodeIeeeRef.current, nodeGfgRef.current,
          orbitSvgRef.current, centralContentRef.current, collabGroupRef.current,
          collabEyebrowRef.current, collabNameKareRef.current, collabNameGfgRef.current,
          collabNameAcmWRef.current, collabNameIeeeRef.current, collabSep1Ref.current,
          collabSep2Ref.current, collabSep3Ref.current, eventTitleGroupRef.current,
          presentsRef.current, wordHackRef.current, wordOdysseyRef.current, versionRef.current,
        ], { opacity: 0 });

      if (skipBtnRef.current) tl.set(skipBtnRef.current, { opacity: 0 });

      tl.set(kareLogoWrapperRef.current, { x: 0, y: 0, scale: 1.0 });
      tl.set(acmWLogoWrapperRef.current, { x: posAcmW.x, y: posAcmW.y, scale: 0.85 });
      tl.set(ieeeLogoWrapperRef.current, { x: posIeee.x, y: posIeee.y, scale: 0.88 });
      tl.set(gfgLogoWrapperRef.current, { x: posGfg.x, y: posGfg.y, scale: 0.85 });
      tl.set(nodeKareRef.current, { x: posKare.x, y: posKare.y, scale: 0.5 });
      tl.set(nodeAcmWRef.current, { x: posAcmW.x, y: posAcmW.y, scale: 0.5 });
      tl.set(nodeIeeeRef.current, { x: posIeee.x, y: posIeee.y, scale: 0.5 });
      tl.set(nodeGfgRef.current, { x: posGfg.x, y: posGfg.y, scale: 0.5 });

      if (orbitCircleRef.current) {
        tl.set(orbitCircleRef.current, {
          strokeDasharray: orbitCircumference,
          strokeDashoffset: orbitCircumference,
        });
      }

      tl.set(contactPointRef.current, { opacity: 0.05, scale: 1.0 });
      tl.set(atmosphereRef.current, { scale: 0.92 });
      tl.set(anticipationGlowRef.current, { scale: 0.6 });
      tl.set(contactFlashRef.current, { scale: 0.4 });
      tl.set(energyPulseRef.current, { scale: 0.15 });
      tl.set(handAnchorARef.current, { x: startAX, y: startAY });
      tl.set(handAnchorBRef.current, { x: startBX, y: startBY });
      tl.set([handWrapperARef.current, handWrapperBRef.current], { scale: 1.06, rotation: 0, filter: "blur(1.5px)" });

      ambientParticlesRef.current.forEach((particle, idx) => {
        if (!particle) return;
        tl.to(particle, { opacity: 0.10, duration: 0.55, ease: "sine.inOut" }, 0.10 + idx * 0.04);
      });

      tl.to(atmosphereRef.current, { opacity: 0.15, scale: 1.0, duration: 0.50, ease: "power2.out" }, 0.20);
      tl.to(topLeftLightRef.current, { opacity: 0.55, scale: 0.85, duration: 0.45, ease: "sine.out" }, 0.25);
      tl.to(bottomRightLightRef.current, { opacity: 0.55, scale: 0.85, duration: 0.45, ease: "sine.out" }, 0.40);

      if (skipBtnRef.current) tl.to(skipBtnRef.current, { opacity: 0.85, duration: 0.60, ease: "power2.out" }, 0.80);

      // --- PHASE 1 & 2: Smooth Continuous Diagonal Glide & Deceleration (0.70s → 2.80s) ---
      // Fade in Hand A & Hand B opacity cleanly alongside lights
      tl.to(handWrapperARef.current, { opacity: 1.0, duration: 0.40, ease: "power2.out" }, 0.70);
      tl.to(handWrapperBRef.current, { opacity: 1.0, duration: 0.40, ease: "power2.out" }, 0.75);

      // Softness & Scale settling
      tl.to([handWrapperARef.current, handWrapperBRef.current], { filter: "blur(0px)", scale: 1.0, duration: 1.20, ease: "power2.out" }, 0.75);

      // Single continuous, fluid diagonal deceleration from corner directly to center touch (Zero stops, Zero stutter)
      tl.to(handAnchorARef.current, { x: cx, y: cy, duration: 2.10, ease: "power3.out" }, 0.70);
      tl.to(handAnchorBRef.current, { x: cx, y: cy, duration: 2.05, ease: "power3.out" }, 0.75);

      // Contact point & anticipation glow ramp as hands approach center
      tl.to(contactPointRef.current, { opacity: 0.25, duration: 0.80, ease: "power2.out" }, 1.40);
      tl.to(contactPointRef.current, { opacity: 0.60, scale: 1.25, duration: 0.60, ease: "power2.out" }, 2.20);
      tl.to(anticipationGlowRef.current, { opacity: 0.08, scale: 0.85, duration: 0.30, ease: "sine.inOut" }, 2.20);
      tl.to(anticipationGlowRef.current, { opacity: 0.25, scale: 1.20, duration: 0.30, ease: "power2.out" }, 2.50);
      tl.to(atmosphereRef.current, { opacity: 0.20, duration: 0.60, ease: "sine.inOut" }, 2.20);
      tl.to([topLeftLightRef.current, bottomRightLightRef.current], { opacity: 0.85, scale: 1.10, duration: 0.60, ease: "sine.inOut" }, 2.20);

      // --- PHASE 3: Exact Contact Moment (2.80s → 3.20s) ---
      tl.to(contactPointRef.current, { opacity: 1.0, scale: 2.2, duration: 0.06, ease: "power2.out" }, 2.80);
      tl.to(contactPointRef.current, { opacity: 0, duration: 0.12, ease: "power2.in" }, 2.86);
      tl.to(anticipationGlowRef.current, { opacity: 0, scale: 0.3, duration: 0.04, ease: "power3.in" }, 2.82);
      tl.to(contactFlashRef.current, { opacity: 1.0, scale: 0.90, duration: 0.03, ease: "power4.out" }, 2.86);
      tl.to(contactFlashRef.current, { opacity: 0, scale: 1.25, duration: 0.03, ease: "power2.in" }, 2.89);
      tl.to(energyPulseRef.current, { opacity: 0.75, scale: 0.70, duration: 0.10, ease: "power2.out" }, 2.88);
      tl.to(energyPulseRef.current, { opacity: 0, scale: 0.85, duration: 0.08, ease: "power1.out" }, 2.98);

      contactParticlesRef.current.forEach((particle, idx) => {
        if (!particle) return;
        const angle = (idx / 18) * Math.PI * 2 + (idx % 3) * 0.2;
        const dist = 20 + (idx % 5) * 4;
        tl.fromTo(particle, { x: 0, y: 0, opacity: 0.85, scale: 0.8 }, { x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, opacity: 0, scale: 1.2, duration: 0.20, ease: "power2.out" }, 2.92 + (idx % 4) * 0.01);
      });

      tl.to(centralCoreRef.current, { opacity: 1.0, scale: 1.0, duration: 0.05, ease: "power2.out" }, 3.15);

      // ============================================================
      // 4-PARTNER COLLABORATION ORBIT TIMELINE (WITH LABELS)
      // ============================================================

      tl.addLabel("identityStart", 3.20);
      tl.addLabel("kareReveal", "identityStart+=0.08");
      tl.addLabel("kareMove", "kareReveal+=0.48");
      tl.addLabel("orbitStart", "kareMove+=0.44");
      tl.addLabel("acmWReveal", "orbitStart+=0.00");
      tl.addLabel("ieeeReveal", "acmWReveal+=0.45");
      tl.addLabel("gfgReveal", "ieeeReveal+=0.45");
      tl.addLabel("orbitComplete", "gfgReveal+=0.45");
      tl.addLabel("collaborationComplete", "orbitComplete+=0.25");
      tl.addLabel("presentsReveal", "collaborationComplete+=0.25");
      tl.addLabel("titleReveal", "presentsReveal+=0.20");

      // Step 1: Energy Bloom & Hands Fade
      tl.to([handWrapperARef.current, handWrapperBRef.current, topLeftLightRef.current, bottomRightLightRef.current], {
        opacity: 0,
        duration: 0.25,
        ease: "power2.out",
      }, "identityStart");

      tl.to(centralCoreRef.current, {
        scale: 1.6,
        opacity: 1.0,
        duration: 0.12,
        ease: "sine.out",
      }, "identityStart");

      // Step 2: KARE ACM Large Center Reveal
      tl.fromTo(kareLogoWrapperRef.current,
        { opacity: 0, scale: 1.15, x: 0, y: 0 },
        { opacity: 1.0, scale: 1.40, x: 0, y: 0, duration: 0.34, ease: "power3.out" },
        "kareReveal"
      );
      tl.fromTo(kareHaloRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 0.18, scale: 1.1, duration: 0.34, ease: "power2.out" },
        "kareReveal"
      );

      // Step 3: Recognition Hold happens naturally between kareReveal end and kareMove

      // Step 4 & 5: KARE ACM Moves UP + Scales Down Simultaneously in ONE Tween
      tl.to(kareLogoWrapperRef.current, {
        x: posKare.x,
        y: posKare.y,
        scale: 1.00,
        duration: 0.44,
        ease: "power3.inOut",
      }, "kareMove");

      tl.to(centralCoreRef.current, {
        opacity: 0,
        scale: 0.4,
        duration: 0.26,
        ease: "power2.in",
      }, "kareMove");

      tl.to(kareHaloRef.current, {
        opacity: 0.08,
        scale: 0.9,
        duration: 0.44,
        ease: "power3.inOut",
      }, "kareMove");

      // Step 7: Settle at Top Anchor (-90°)
      tl.to(kareLogoWrapperRef.current, {
        scale: 1.02,
        duration: 0.18,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      }, "kareMove+=0.42");

      // Step 8–11: Circular SVG Orbit Begins at 3 o'clock (0° / Right)
      tl.set(orbitSvgRef.current, { opacity: 1 }, "orbitStart");
      tl.fromTo(orbitCircleRef.current,
        { strokeDashoffset: orbitCircumference },
        { strokeDashoffset: 0, duration: 1.35, ease: "power2.inOut" },
        "orbitStart"
      );

      // Step 12 & 13: ACM-W Reveal at 0° (Right) + Text Synchronization
      tl.fromTo(nodeAcmWRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 0.90, scale: 1.3, duration: 0.15, ease: "power2.out" },
        "acmWReveal"
      );
      tl.to(nodeAcmWRef.current, { opacity: 0.45, scale: 1.0, duration: 0.20 }, "acmWReveal+=0.15");

      tl.fromTo(acmWLogoWrapperRef.current,
        { opacity: 0, scale: 0.88 },
        { opacity: 1.0, scale: 1.00, duration: 0.28, ease: "power3.out" },
        "acmWReveal"
      );
      tl.fromTo(acmWHaloRef.current, { opacity: 0 }, { opacity: 0.08, duration: 0.28 }, "acmWReveal");

      // Reveal ACM-W text fragment
      tl.set(centralContentRef.current, { opacity: 1 }, "acmWReveal");
      tl.set(collabGroupRef.current, { opacity: 1 }, "acmWReveal");
      tl.fromTo(collabNameAcmWRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" },
        "acmWReveal+=0.04"
      );

      // Step 14–16: Orbit Reaches 90° (Bottom / IEEE) + Text Synchronization
      tl.fromTo(nodeIeeeRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 0.90, scale: 1.3, duration: 0.15, ease: "power2.out" },
        "ieeeReveal"
      );
      tl.to(nodeIeeeRef.current, { opacity: 0.45, scale: 1.0, duration: 0.20 }, "ieeeReveal+=0.15");

      tl.fromTo(ieeeLogoWrapperRef.current,
        { opacity: 0, scale: 0.90 },
        { opacity: 1.0, scale: 1.00, duration: 0.28, ease: "power3.out" },
        "ieeeReveal"
      );
      tl.fromTo(ieeeHaloRef.current, { opacity: 0 }, { opacity: 0.08, duration: 0.28 }, "ieeeReveal");

      tl.fromTo([collabSep3Ref.current, collabNameIeeeRef.current],
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" },
        "ieeeReveal+=0.04"
      );

      // Step 17 & 18: Orbit Reaches 180° (Left / GFG) + Text Synchronization
      tl.fromTo(nodeGfgRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 0.90, scale: 1.3, duration: 0.15, ease: "power2.out" },
        "gfgReveal"
      );
      tl.to(nodeGfgRef.current, { opacity: 0.45, scale: 1.0, duration: 0.20 }, "gfgReveal+=0.15");

      tl.fromTo(gfgLogoWrapperRef.current,
        { opacity: 0, scale: 0.88 },
        { opacity: 1.0, scale: 1.00, duration: 0.28, ease: "power3.out" },
        "gfgReveal"
      );
      tl.fromTo(gfgHaloRef.current, { opacity: 0 }, { opacity: 0.08, duration: 0.28 }, "gfgReveal");

      tl.fromTo([collabSep2Ref.current, collabNameGfgRef.current],
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" },
        "gfgReveal+=0.04"
      );

      // Step 19: Orbit Closes at 270° (Top / KARE ACM) + Full Collaboration Settle
      tl.fromTo(nodeKareRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 0.90, scale: 1.3, duration: 0.15, ease: "power2.out" },
        "orbitComplete"
      );
      tl.to(nodeKareRef.current, { opacity: 0.45, scale: 1.0, duration: 0.20 }, "orbitComplete+=0.15");

      tl.fromTo([collabNameKareRef.current, collabSep1Ref.current],
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" },
        "orbitComplete+=0.04"
      );
      tl.fromTo(collabEyebrowRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.28, ease: "power2.out" },
        "orbitComplete+=0.08"
      );

      // Step 23: PRESENTS Reveal
      tl.set(eventTitleGroupRef.current, { opacity: 1 }, "presentsReveal");
      tl.fromTo(presentsRef.current,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
        "presentsReveal"
      );

      // Step 24: HACK ODYSSEY Reveal
      tl.fromTo([wordHackRef.current, wordOdysseyRef.current],
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.38, ease: "power3.out" },
        "titleReveal"
      );

      // Step 25: 4.0 Badge Reveal
      tl.fromTo(versionRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1.0, duration: 0.26, ease: "back.out(1.8)" },
        "titleReveal+=0.12"
      );

      // Outro & Dissolve
      if (skipBtnRef.current) {
        tl.to(skipBtnRef.current, { opacity: 0, duration: 0.20, ease: "power2.in" }, "titleReveal+=0.90");
      }
      tl.to(containerRef.current, { opacity: 0, duration: 0.45, ease: "power2.inOut" }, "titleReveal+=1.05");

    },
    { scope: containerRef, dependencies: [isSkipped, isComplete] }
  );

  if (isComplete || isSkipped) return null;

  const addAmbientParticleRef = (el) => { if (el && !ambientParticlesRef.current.includes(el)) ambientParticlesRef.current.push(el); };
  const addContactParticleRef = (el) => { if (el && !contactParticlesRef.current.includes(el)) contactParticlesRef.current.push(el); };

  return (
    <div ref={containerRef} className="hackodyssey-preloader" role="presentation" aria-hidden="true">
      <div className="hop-background" />
      <div ref={atmosphereRef} className="hop-atmosphere" />
      <div ref={contactPointRef} className="preloader-contact-point hop-contact-point" />
      <div ref={anticipationGlowRef} className="hop-anticipation-glow" />
      <div ref={contactFlashRef} className="hop-contact-flash" />
      <div ref={energyPulseRef} className="hop-energy-pulse" />
      <div ref={centralCoreRef} className="hop-central-core" />
      {/* 5. Circular Collaboration Orbit System (One Continuous Master Orbit SVG) */}
      <svg
        ref={orbitSvgRef}
        className="hop-orbit-svg"
        viewBox={`0 0 ${typeof window !== "undefined" ? window.innerWidth : 1920} ${typeof window !== "undefined" ? window.innerHeight : 1080}`}
        style={{ opacity: 0 }}
      >
        <circle
          ref={orbitCircleRef}
          cx={typeof window !== "undefined" ? window.innerWidth * 0.5 : 960}
          cy={typeof window !== "undefined" ? window.innerHeight * 0.5 : 540}
          r={
            typeof window !== "undefined"
              ? window.innerWidth < 768
                ? Math.min(window.innerWidth * 0.36, window.innerHeight * 0.22, 130)
                : Math.min(window.innerWidth * 0.22, window.innerHeight * 0.25, 200)
              : 200
          }
          className="hop-orbit-circle"
        />
      </svg>

      {/* 6. Active Orbit Node Highlights at 4 Cardinal Positions */}
      <div className="hop-orbit-nodes-layer">
        <div ref={nodeAcmWRef} className="hop-orbit-node hop-node-acmw" style={{ opacity: 0 }} />
        <div ref={nodeIeeeRef} className="hop-orbit-node hop-node-ieee" style={{ opacity: 0 }} />
        <div ref={nodeGfgRef}  className="hop-orbit-node hop-node-gfg"  style={{ opacity: 0 }} />
        <div ref={nodeKareRef} className="hop-orbit-node hop-node-kare" style={{ opacity: 0 }} />
      </div>

      {/* 7. Four Partner Organization Logos around the Orbit */}
      <div className="hop-orbit-logos-layer">
        {/* KARE ACM — Top (-90° / 270°) */}
        <div ref={kareLogoWrapperRef} className="hop-orbit-logo-anchor hop-logo-kare" style={{ opacity: 0 }}>
          <div ref={kareHaloRef} className="hop-partner-halo" />
          <div className="hop-partner-box hop-box-kare">
            <img src={kareAcmLogo} alt="KARE ACM" className="hop-partner-img" draggable="false" loading="eager" />
          </div>
        </div>

        {/* ACM-W — Right (0°) */}
        <div ref={acmWLogoWrapperRef} className="hop-orbit-logo-anchor hop-logo-acmw" style={{ opacity: 0 }}>
          <div ref={acmWHaloRef} className="hop-partner-halo" />
          <div className="hop-partner-box hop-box-acmw">
            <img src={acmWLogo} alt="ACM-W" className="hop-partner-img" draggable="false" loading="eager" />
          </div>
        </div>

        {/* IEEE Education Society — Bottom (90°) */}
        <div ref={ieeeLogoWrapperRef} className="hop-orbit-logo-anchor hop-logo-ieee" style={{ opacity: 0 }}>
          <div ref={ieeeHaloRef} className="hop-partner-halo" />
          <div className="hop-partner-box hop-box-ieee">
            <img src={ieeeLogo} alt="IEEE Education Society" className="hop-partner-img" draggable="false" loading="eager" />
          </div>
        </div>

        {/* GFG — Left (180°) */}
        <div ref={gfgLogoWrapperRef} className="hop-orbit-logo-anchor hop-logo-gfg" style={{ opacity: 0 }}>
          <div ref={gfgHaloRef} className="hop-partner-halo" />
          <div className="hop-partner-box hop-box-gfg">
            <img src={gfgLogo} alt="GeeksforGeeks" className="hop-partner-img" draggable="false" loading="eager" />
          </div>
        </div>
      </div>

      {/* 8. Central Content Area (Collaboration Subtitle + Event Presentation Title) */}
      <div ref={centralContentRef} className="hop-central-content" style={{ opacity: 0 }}>
        {/* Progressive Collaboration Subtitle */}
        <div ref={collabGroupRef} className="hop-collab-group" style={{ opacity: 0 }}>
          <div ref={collabEyebrowRef} className="hop-collab-eyebrow" style={{ opacity: 0 }}>
            A COLLABORATION BETWEEN
          </div>
          <div className="hop-collab-names-line">
            <span ref={collabNameKareRef} className="hop-collab-item" style={{ opacity: 0 }}>
              KARE ACM
            </span>
            <span ref={collabSep1Ref} className="hop-collab-sep" style={{ opacity: 0 }}>
              ×
            </span>
            <span ref={collabNameGfgRef} className="hop-collab-item" style={{ opacity: 0 }}>
              GFG
            </span>
            <span ref={collabSep2Ref} className="hop-collab-sep" style={{ opacity: 0 }}>
              ×
            </span>
            <span ref={collabNameAcmWRef} className="hop-collab-item" style={{ opacity: 0 }}>
              ACM-W
            </span>
            <span ref={collabSep3Ref} className="hop-collab-sep" style={{ opacity: 0 }}>
              ×
            </span>
            <span ref={collabNameIeeeRef} className="hop-collab-item" style={{ opacity: 0 }}>
              IEEE EDUCATION SOCIETY
            </span>
          </div>
        </div>

        {/* Event Presentation Title */}
        <div ref={eventTitleGroupRef} className="hop-event-title-group" style={{ opacity: 0 }}>
          <div ref={presentsRef} className="hop-presents-text" style={{ opacity: 0 }}>
            PRESENTS
          </div>

          <div ref={titleWrapRef} className="hop-title-wrap">
            <span ref={wordHackRef} className="hop-title-word hop-title-hack" style={{ opacity: 0 }}>
              HACK
            </span>
            <div className="hop-odyssey-group">
              <span ref={wordOdysseyRef} className="hop-title-word hop-title-odyssey" style={{ opacity: 0 }}>
                ODYSSEY
              </span>
              <div className="hop-badge-wrap">
                <span ref={versionRef} className="hop-badge-exponent" style={{ opacity: 0 }}>
                  4.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. Localized Contact Particles (Phase 4 — 18 Particles) */}
      <div className="hop-contact-particles-container">
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            ref={addContactParticleRef}
            className="hop-contact-particle"
          />
        ))}
      </div>

      {/* 8. Ambient Microscopic Particles (Phase 1) */}
      <div className="hop-particles-container">
        <div ref={addAmbientParticleRef} className="hop-particle hop-particle-a" />
        <div ref={addAmbientParticleRef} className="hop-particle hop-particle-b" />
        <div ref={addAmbientParticleRef} className="hop-particle hop-particle-c" />
        <div ref={addAmbientParticleRef} className="hop-particle hop-particle-d" />
      </div>

      {/* 9. Hand A (Top-Left) with Fingertip Anchor and Light */}
      <div ref={handAnchorARef} className="hop-hand-anchor hop-hand-anchor-a">
        <div ref={handWrapperARef} className="hop-hand-wrapper">
          <div className="hop-hand-offset hop-hand-offset-a">
            <img
              src={handTopLeft}
              alt="Hand A"
              className="hop-hand-img"
              draggable="false"
              loading="eager"
              decoding="sync"
            />
            <span ref={handATipRef} className="hop-fingertip-anchor" />
          </div>
        </div>
        <div ref={topLeftLightRef} className="hop-light hop-light-top-left">
          <div className="hop-light-bloom" />
          <div className="hop-light-halo" />
          <div className="hop-light-core" />
        </div>
      </div>

      {/* 10. Hand B (Bottom-Right) with Fingertip Anchor and Light */}
      <div ref={handAnchorBRef} className="hop-hand-anchor hop-hand-anchor-b">
        <div ref={handWrapperBRef} className="hop-hand-wrapper">
          <div className="hop-hand-offset hop-hand-offset-b">
            <img
              src={handBottomRight}
              alt="Hand B"
              className="hop-hand-img"
              draggable="false"
              loading="eager"
              decoding="sync"
            />
            <span ref={handBTipRef} className="hop-fingertip-anchor" />
          </div>
        </div>
        <div ref={bottomRightLightRef} className="hop-light hop-light-bottom-right">
          <div className="hop-light-bloom" />
          <div className="hop-light-halo" />
          <div className="hop-light-core" />
        </div>
      </div>

      {/* 11. Temporary Skip Control */}
      <button
        ref={skipBtnRef}
        type="button"
        onClick={handleSkip}
        className="hop-skip-btn"
        aria-label="Skip Intro"
      >
        <span>SKIP</span>
        <span className="hop-skip-key">ESC</span>
      </button>
    </div>
  );
}
