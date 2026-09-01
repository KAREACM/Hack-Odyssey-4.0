import React, { useRef, useState, useEffect, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import handTopLeft from "../../assets/preloader/Hand Top Left Corner.png";
import handBottomRight from "../../assets/preloader/Hand Bottom Right Corner.png";
import kareAcmLogo from "../../assets/preloader/acm_logo.png";
import acmWLogo from "../../assets/preloader/ACM-W_logo.png";
import ieeeLogo from "../../assets/preloader/IEEE_logo_dark.png";
import gfgLogo from "../../assets/preloader/GFG_logo_dark.png";
import "./HackOdysseyPreloader.css";

gsap.registerPlugin(MotionPathPlugin);

/**
 * HackOdyssey 4.0 Preloader — Master Cinematic Sequence
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

  // 4 Spaced Segmented Arc Refs (with clean gaps around logos)
  const orbitSvgRef = useRef(null);
  const arc1Ref = useRef(null);
  const arc2Ref = useRef(null);
  const arc3Ref = useRef(null);
  const arc4Ref = useRef(null);

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

      const getArcLength = (deg) => (deg * Math.PI / 180) * orbitRadius;
      const arc1Len = getArcLength(62);
      const arc2Len = getArcLength(58);
      const arc3Len = getArcLength(58);
      const arc4Len = getArcLength(62);

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

      if (arc1Ref.current) tl.set(arc1Ref.current, { strokeDasharray: arc1Len, strokeDashoffset: arc1Len });
      if (arc2Ref.current) tl.set(arc2Ref.current, { strokeDasharray: arc2Len, strokeDashoffset: arc2Len });
      if (arc3Ref.current) tl.set(arc3Ref.current, { strokeDasharray: arc3Len, strokeDashoffset: arc3Len });
      if (arc4Ref.current) tl.set(arc4Ref.current, { strokeDasharray: arc4Len, strokeDashoffset: arc4Len });

      // 1. Initialize static properties (Contact point starts invisible so no static dot sits in the center)
      tl.set(contactPointRef.current, { opacity: 0, scale: 0.4 });
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
      tl.to(topLeftLightRef.current, { opacity: 0.70, scale: 0.90, duration: 0.45, ease: "sine.out" }, 0.25);
      tl.to(bottomRightLightRef.current, { opacity: 0.70, scale: 0.90, duration: 0.45, ease: "sine.out" }, 0.40);

      if (skipBtnRef.current) tl.to(skipBtnRef.current, { opacity: 0.85, duration: 0.60, ease: "power2.out" }, 0.80);

      // --- PHASE 1 & 2: Smooth Continuous Diagonal Glide & Deceleration (0.70s → 2.80s) ---
      // Hands fade in cleanly alongside their fingertip energy lights
      tl.to(handWrapperARef.current, { opacity: 1.0, duration: 0.40, ease: "power2.out" }, 0.70);
      tl.to(handWrapperBRef.current, { opacity: 1.0, duration: 0.40, ease: "power2.out" }, 0.75);

      // Softness & Scale settling
      tl.to([handWrapperARef.current, handWrapperBRef.current], { filter: "blur(0px)", scale: 1.0, duration: 1.20, ease: "power2.out" }, 0.75);

      // Single continuous, fluid diagonal deceleration from corner directly to center touch (Zero stops, Zero stutter)
      tl.to(handAnchorARef.current, { x: cx, y: cy, duration: 2.10, ease: "power3.out" }, 0.70);
      tl.to(handAnchorBRef.current, { x: cx, y: cy, duration: 2.05, ease: "power3.out" }, 0.75);

      // Anticipation buildup: As fingertips approach within 45px (2.20s → 2.80s), an electric bridge hums between them
      tl.to(anticipationGlowRef.current, { opacity: 0.18, scale: 0.95, duration: 0.35, ease: "sine.inOut" }, 2.20);
      tl.to(anticipationGlowRef.current, { opacity: 0.45, scale: 1.40, duration: 0.25, ease: "power2.out" }, 2.55);
      tl.to(atmosphereRef.current, { opacity: 0.22, duration: 0.60, ease: "sine.inOut" }, 2.20);
      tl.to([topLeftLightRef.current, bottomRightLightRef.current], { opacity: 1.0, scale: 1.25, duration: 0.60, ease: "power2.in" }, 2.20);

      // --- PHASE 3: Exact Contact Moment, Radiant Flash & Explosive Sparks (2.80s → 2.95s) ---
      // The central singularity ignites only upon physical contact (Zero stray dot before touch)
      tl.fromTo(contactPointRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1.0, scale: 3.2, duration: 0.05, ease: "power4.out" },
        2.80
      );
      tl.to(contactPointRef.current, { opacity: 0, scale: 4.0, duration: 0.12, ease: "power2.in" }, 2.85);
      tl.to(anticipationGlowRef.current, { opacity: 0, scale: 0.2, duration: 0.04, ease: "power3.in" }, 2.81);

      // Brilliant Contact Flash
      tl.fromTo(contactFlashRef.current, { opacity: 0, scale: 0.4 }, { opacity: 1.0, scale: 2.5, duration: 0.08, ease: "power4.out" }, 2.80);
      tl.to(contactFlashRef.current, { opacity: 0, scale: 3.2, duration: 0.18, ease: "power2.in" }, 2.88);

      // Expanding Energy Shockwave Pulse
      tl.fromTo(energyPulseRef.current, { opacity: 1.0, scale: 0.10 }, { opacity: 0, scale: 2.2, duration: 0.35, ease: "power2.out" }, 2.81);

      // 18 Radiant Contact Spark Particles shooting outward with sparkling trail
      contactParticlesRef.current.forEach((particle, idx) => {
        if (!particle) return;
        const angle = (idx / 18) * Math.PI * 2 + ((idx * 7) % 5) * 0.15;
        const dist = isMobile ? (24 + (idx % 6) * 6) : (35 + (idx % 6) * 10);
        tl.fromTo(
          particle,
          { x: 0, y: 0, opacity: 1.0, scale: 1.0 },
          {
            x: Math.cos(angle) * dist,
            y: Math.sin(angle) * dist,
            opacity: 0,
            scale: 0.2,
            duration: 0.32 + (idx % 4) * 0.04,
            ease: "power3.out",
          },
          2.81 + (idx % 3) * 0.015
        );
      });

      // Ignited Central Core (✦)
      tl.fromTo(centralCoreRef.current, { opacity: 0, scale: 0.2 }, { opacity: 1.0, scale: 1.8, duration: 0.09, ease: "power2.out" }, 2.83);

      // --- PHASE 4: Immediate Seamless KARE ACM Logo Manifestation (Zero Delay! 2.92s) ---
      tl.addLabel("identityStart", 2.92);
      tl.addLabel("kareReveal", "identityStart+=0.04");
      tl.addLabel("kareMove", "kareReveal+=0.36");
      tl.addLabel("orbitStart", "kareMove+=0.42");
      tl.addLabel("acmWReveal", "orbitStart+=0.34");
      tl.addLabel("ieeeReveal", "acmWReveal+=0.36");
      tl.addLabel("gfgReveal", "ieeeReveal+=0.36");
      tl.addLabel("orbitComplete", "gfgReveal+=0.36");
      tl.addLabel("collaborationComplete", "orbitComplete+=0.25");
      tl.addLabel("presentsReveal", "collaborationComplete+=0.22");
      tl.addLabel("titleReveal", "presentsReveal+=0.22");

      // Hands dissolve right as energy core expands into ACM logo
      tl.to([handWrapperARef.current, handWrapperBRef.current, topLeftLightRef.current, bottomRightLightRef.current], {
        opacity: 0,
        duration: 0.22,
        ease: "power2.out",
      }, "identityStart");

      // KARE ACM Logo blooms immediately from the core
      tl.fromTo(kareLogoWrapperRef.current,
        { opacity: 0, scale: 0.65, x: 0, y: 0 },
        { opacity: 1.0, scale: 1.45, x: 0, y: 0, duration: 0.32, ease: "back.out(1.4)" },
        "kareReveal"
      );
      tl.fromTo(kareHaloRef.current,
        { opacity: 0, scale: 0.6 },
        { opacity: 0.22, scale: 1.25, duration: 0.32, ease: "power2.out" },
        "kareReveal"
      );

      // Core softly dissolves as logo takes flight
      tl.to(centralCoreRef.current, {
        opacity: 0,
        scale: 0.4,
        duration: 0.24,
        ease: "power2.in",
      }, "kareMove");

      // KARE ACM glides smoothly to Top Orbit position (-90°)
      tl.to(kareLogoWrapperRef.current, {
        x: posKare.x,
        y: posKare.y,
        scale: 1.00,
        duration: 0.42,
        ease: "power3.inOut",
      }, "kareMove");

      tl.to(kareHaloRef.current, {
        opacity: 0.08,
        scale: 0.9,
        duration: 0.42,
        ease: "power3.inOut",
      }, "kareMove");

      tl.to(kareLogoWrapperRef.current, {
        scale: 1.02,
        duration: 0.16,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1,
      }, "kareMove+=0.38");

      // Reveal central content container & initial KARE ACM title
      tl.set(centralContentRef.current, { opacity: 1 }, "kareMove+=0.32");
      tl.set(collabGroupRef.current, { opacity: 1 }, "kareMove+=0.32");
      tl.fromTo(collabEyebrowRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" },
        "kareMove+=0.34"
      );
      tl.fromTo(collabNameKareRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.24, ease: "power2.out" },
        "kareMove+=0.36"
      );

      // --- PHASE 5: Continuous Clockwise Orbit Sweep & Synchronous Partner Revelations ---
      // Arc 1: Top (284°) to Right (346°)
      tl.set(orbitSvgRef.current, { opacity: 1 }, "orbitStart");
      tl.fromTo(arc1Ref.current,
        { strokeDashoffset: arc1Len },
        { strokeDashoffset: 0, duration: 0.36, ease: "power1.inOut" },
        "orbitStart"
      );

      // Step: ACM-W Node & Logo + Synchronized "× ACM-W" Text
      tl.fromTo(nodeAcmWRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 0.90, scale: 1.3, duration: 0.14, ease: "power2.out" },
        "acmWReveal"
      );
      tl.to(nodeAcmWRef.current, { opacity: 0.45, scale: 1.0, duration: 0.20, ease: "power2.in" }, "acmWReveal+=0.14");

      tl.fromTo(acmWLogoWrapperRef.current,
        { opacity: 0, scale: 0.88 },
        { opacity: 1.0, scale: 1.00, duration: 0.26, ease: "power3.out" },
        "acmWReveal"
      );
      tl.fromTo(acmWHaloRef.current, { opacity: 0 }, { opacity: 0.08, duration: 0.26 }, "acmWReveal");

      // Synchronous "× ACM-W" reveal
      tl.fromTo([collabSep1Ref.current, collabNameAcmWRef.current],
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
        "acmWReveal+=0.04"
      );

      // Arc 2: Right (14°) to Bottom (72°) - seamless continuation
      tl.fromTo(arc2Ref.current,
        { strokeDashoffset: arc2Len },
        { strokeDashoffset: 0, duration: 0.36, ease: "power1.inOut" },
        "acmWReveal+=0.02"
      );

      // Step: IEEE Node & Logo + Synchronized "× IEEE EDUCATION SOCIETY" Text
      tl.fromTo(nodeIeeeRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 0.90, scale: 1.3, duration: 0.14, ease: "power2.out" },
        "ieeeReveal"
      );
      tl.to(nodeIeeeRef.current, { opacity: 0.45, scale: 1.0, duration: 0.20 }, "ieeeReveal+=0.14");

      tl.fromTo(ieeeLogoWrapperRef.current,
        { opacity: 0, scale: 0.90 },
        { opacity: 1.0, scale: 1.00, duration: 0.26, ease: "power3.out" },
        "ieeeReveal"
      );
      tl.fromTo(ieeeHaloRef.current, { opacity: 0 }, { opacity: 0.08, duration: 0.26 }, "ieeeReveal");

      // Synchronous "× IEEE" reveal
      tl.fromTo([collabSep2Ref.current, collabNameIeeeRef.current],
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
        "ieeeReveal+=0.04"
      );

      // Arc 3: Bottom (108°) to Left (166°) - seamless continuation
      tl.fromTo(arc3Ref.current,
        { strokeDashoffset: arc3Len },
        { strokeDashoffset: 0, duration: 0.36, ease: "power1.inOut" },
        "ieeeReveal+=0.02"
      );

      // Step: GFG Node & Logo + Synchronized "× GFG" Text
      tl.fromTo(nodeGfgRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 0.90, scale: 1.3, duration: 0.14, ease: "power2.out" },
        "gfgReveal"
      );
      tl.to(nodeGfgRef.current, { opacity: 0.45, scale: 1.0, duration: 0.20 }, "gfgReveal+=0.14");

      tl.fromTo(gfgLogoWrapperRef.current,
        { opacity: 0, scale: 0.88 },
        { opacity: 1.0, scale: 1.00, duration: 0.26, ease: "power3.out" },
        "gfgReveal"
      );
      tl.fromTo(gfgHaloRef.current, { opacity: 0 }, { opacity: 0.08, duration: 0.26 }, "gfgReveal");

      // Synchronous "× GFG" reveal
      tl.fromTo([collabSep3Ref.current, collabNameGfgRef.current],
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.22, ease: "power2.out" },
        "gfgReveal+=0.04"
      );

      // Arc 4: Left (194°) to Top (256°) - completes closed constellation
      tl.fromTo(arc4Ref.current,
        { strokeDashoffset: arc4Len },
        { strokeDashoffset: 0, duration: 0.36, ease: "power1.inOut" },
        "gfgReveal+=0.02"
      );

      // Constellation Closed at Top Node (KARE ACM)
      tl.fromTo(nodeKareRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 0.90, scale: 1.3, duration: 0.15, ease: "power2.out" },
        "orbitComplete"
      );
      tl.to(nodeKareRef.current, { opacity: 0.45, scale: 1.0, duration: 0.20 }, "orbitComplete+=0.15");

      // Unified subtle constellation gleam across the collaboration line
      tl.to(collabGroupRef.current, {
        filter: "drop-shadow(0 0 12px rgba(192, 132, 252, 0.6))",
        duration: 0.28,
        yoyo: true,
        repeat: 1,
        ease: "sine.inOut",
      }, "orbitComplete+=0.04");

      // --- PHASE 6: Smooth Stage Transition & Grand Event Presentation ---
      // Clear the stage: Gracefully dissolve the collaboration subtitle and soften the partner ring
      tl.to(collabGroupRef.current, {
        opacity: 0,
        y: -14,
        duration: 0.35,
        ease: "power2.inOut",
      }, "collaborationComplete");

      tl.to([
        orbitSvgRef.current,
        kareLogoWrapperRef.current,
        acmWLogoWrapperRef.current,
        ieeeLogoWrapperRef.current,
        gfgLogoWrapperRef.current,
        nodeAcmWRef.current,
        nodeIeeeRef.current,
        nodeGfgRef.current,
        nodeKareRef.current,
      ], {
        opacity: 0.10,
        scale: 1.08,
        duration: 0.45,
        ease: "power2.inOut",
      }, "collaborationComplete+=0.05");

      // Reveal PRESENTS in clean, unobstructed center stage
      tl.set(eventTitleGroupRef.current, { opacity: 1 }, "presentsReveal");
      tl.fromTo(presentsRef.current,
        { opacity: 0, y: 12, letterSpacing: "0.32em" },
        { opacity: 1, y: 0, letterSpacing: "0.45em", duration: 0.32, ease: "power3.out" },
        "presentsReveal"
      );

      // Reveal HACK ODYSSEY with cinematic typographic weight
      tl.fromTo([wordHackRef.current, wordOdysseyRef.current],
        { opacity: 0, y: 22, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1.0, duration: 0.42, stagger: 0.08, ease: "power4.out" },
        "titleReveal"
      );

      // Punchy circled 4.0 exponent badge entrance
      tl.fromTo(versionRef.current,
        { opacity: 0, scale: 0.2, rotation: -15 },
        { opacity: 1, scale: 1.0, rotation: 0, duration: 0.32, ease: "back.out(2.0)" },
        "titleReveal+=0.16"
      );

      // Soft ambient nebula expansion
      tl.fromTo(atmosphereRef.current,
        { opacity: 0.22, scale: 1.0 },
        { opacity: 0.40, scale: 1.25, duration: 0.45, yoyo: true, repeat: 1, ease: "sine.inOut" },
        "titleReveal"
      );

      // --- PHASE 7: Master Cinematic Outro (Seamless Camera Push-Through to Live Website) ---
      if (skipBtnRef.current) {
        tl.to(skipBtnRef.current, { opacity: 0, duration: 0.20, ease: "power2.in" }, "titleReveal+=1.15");
      }

      // Ethereal forward push through the title
      tl.to(titleWrapRef.current, {
        scale: 1.08,
        filter: "blur(3px)",
        opacity: 0,
        duration: 0.55,
        ease: "power2.in",
      }, "titleReveal+=1.20");

      tl.to(presentsRef.current, {
        opacity: 0,
        y: -8,
        duration: 0.30,
        ease: "power2.in",
      }, "titleReveal+=1.20");

      // Smooth cinematic aperture dissolve revealing the website beneath
      tl.to(containerRef.current, {
        opacity: 0,
        scale: 1.03,
        duration: 0.65,
        ease: "power2.inOut",
      }, "titleReveal+=1.30");

    },
    { scope: containerRef, dependencies: [isSkipped, isComplete] }
  );

  if (isComplete || isSkipped) return null;

  const addAmbientParticleRef = (el) => { if (el && !ambientParticlesRef.current.includes(el)) ambientParticlesRef.current.push(el); };
  const addContactParticleRef = (el) => { if (el && !contactParticlesRef.current.includes(el)) contactParticlesRef.current.push(el); };

  const width = typeof window !== "undefined" ? window.innerWidth : 1920;
  const height = typeof window !== "undefined" ? window.innerHeight : 1080;
  const cx = width * 0.5;
  const cy = height * 0.5;
  const minDim = Math.min(width, height);
  const isMobile = width < 768;
  const orbitRadius = isMobile
    ? Math.min(width * 0.38, height * 0.28, minDim * 0.32)
    : Math.min(width * 0.38, height * 0.36, minDim * 0.34);

  const toRad = Math.PI / 180;
  const getArcD = (startDeg, endDeg) => {
    const x1 = cx + orbitRadius * Math.cos(startDeg * toRad);
    const y1 = cy + orbitRadius * Math.sin(startDeg * toRad);
    const x2 = cx + orbitRadius * Math.cos(endDeg * toRad);
    const y2 = cy + orbitRadius * Math.sin(endDeg * toRad);
    let diff = endDeg - startDeg;
    while (diff < 0) diff += 360;
    const largeArc = diff > 180 ? 1 : 0;
    return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${orbitRadius.toFixed(2)} ${orbitRadius.toFixed(2)} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
  };

  return (
    <div ref={containerRef} className="hackodyssey-preloader" role="presentation" aria-hidden="true">
      <div className="hop-background" />

      <div ref={atmosphereRef} className="hop-atmosphere" />

      <div ref={contactPointRef} className="preloader-contact-point hop-contact-point" />

      <div ref={anticipationGlowRef} className="hop-anticipation-glow" />

      <div ref={contactFlashRef} className="hop-contact-flash" />
      <div ref={energyPulseRef} className="hop-energy-pulse" />
      <div ref={centralCoreRef} className="hop-central-core" />

      <svg
        ref={orbitSvgRef}
        className="hop-orbit-svg"
        viewBox={`0 0 ${width} ${height}`}
        style={{ opacity: 0 }}
      >
        <path
          ref={arc1Ref}
          d={getArcD(284, 346)}
          className="hop-orbit-arc"
        />
        <path
          ref={arc2Ref}
          d={getArcD(14, 72)}
          className="hop-orbit-arc"
        />
        <path
          ref={arc3Ref}
          d={getArcD(108, 166)}
          className="hop-orbit-arc"
        />
        <path
          ref={arc4Ref}
          d={getArcD(194, 256)}
          className="hop-orbit-arc"
        />
      </svg>

      <div className="hop-orbit-nodes-layer">
        <div ref={nodeAcmWRef} className="hop-orbit-node hop-node-acmw" style={{ opacity: 0 }} />
        <div ref={nodeIeeeRef} className="hop-orbit-node hop-node-ieee" style={{ opacity: 0 }} />
        <div ref={nodeGfgRef}  className="hop-orbit-node hop-node-gfg"  style={{ opacity: 0 }} />
        <div ref={nodeKareRef} className="hop-orbit-node hop-node-kare" style={{ opacity: 0 }} />
      </div>

      <div className="hop-orbit-logos-layer">
        <div ref={kareLogoWrapperRef} className="hop-orbit-logo-anchor hop-logo-kare" style={{ opacity: 0 }}>
          <div ref={kareHaloRef} className="hop-partner-halo hop-halo-kare" />
          <div className="hop-partner-box hop-box-kare">
            <img src={kareAcmLogo} alt="KARE ACM" className="hop-partner-img" draggable="false" loading="eager" />
          </div>
        </div>

        <div ref={acmWLogoWrapperRef} className="hop-orbit-logo-anchor hop-logo-acmw" style={{ opacity: 0 }}>
          <div ref={acmWHaloRef} className="hop-partner-halo hop-halo-acmw" />
          <div className="hop-partner-box hop-box-acmw">
            <img src={acmWLogo} alt="ACM-W" className="hop-partner-img" draggable="false" loading="eager" />
          </div>
        </div>

        <div ref={ieeeLogoWrapperRef} className="hop-orbit-logo-anchor hop-logo-ieee" style={{ opacity: 0 }}>
          <div ref={ieeeHaloRef} className="hop-partner-halo hop-halo-ieee" />
          <div className="hop-partner-box hop-box-ieee">
            <img src={ieeeLogo} alt="IEEE Education Society" className="hop-partner-img" draggable="false" loading="eager" />
          </div>
        </div>

        <div ref={gfgLogoWrapperRef} className="hop-orbit-logo-anchor hop-logo-gfg" style={{ opacity: 0 }}>
          <div ref={gfgHaloRef} className="hop-partner-halo hop-halo-gfg" />
          <div className="hop-partner-box hop-box-gfg">
            <img src={gfgLogo} alt="GeeksforGeeks" className="hop-partner-img" draggable="false" loading="eager" />
          </div>
        </div>
      </div>

      <div ref={centralContentRef} className="hop-central-content" style={{ opacity: 0 }}>
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
            <span ref={collabNameAcmWRef} className="hop-collab-item" style={{ opacity: 0 }}>
              ACM-W
            </span>
            <span ref={collabSep2Ref} className="hop-collab-sep" style={{ opacity: 0 }}>
              ×
            </span>
            <span ref={collabNameIeeeRef} className="hop-collab-item" style={{ opacity: 0 }}>
              IEEE EDUCATION SOCIETY
            </span>
            <span ref={collabSep3Ref} className="hop-collab-sep" style={{ opacity: 0 }}>
              ×
            </span>
            <span ref={collabNameGfgRef} className="hop-collab-item" style={{ opacity: 0 }}>
              GFG
            </span>
          </div>
        </div>

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
