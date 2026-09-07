import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MdArrowOutward } from "react-icons/md";
import "./overlay.css";

const ClickIndicator = ({ active }) => {
  const containerRef = useRef(null);
  const pillInnerRef = useRef(null);
  const textRef = useRef(null);
  const iconRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const animTimelineRef = useRef(null);

  // Mouse tracking with magnetic trailing spring (8–14px lag)
  useEffect(() => {
    // Only run on fine pointer devices (desktop / trackpad)
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const handleMouseMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      if (containerRef.current && active) {
        // Damped magnetic follow with subtle spring
        gsap.to(containerRef.current, {
          x: e.clientX,
          y: e.clientY,
          duration: 0.22,
          ease: "power2.out",
          overwrite: "auto",
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  // Entrance & Exit animation specification
  useEffect(() => {
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const container = containerRef.current;
    const pill = pillInnerRef.current;
    const text = textRef.current;
    const icon = iconRef.current;
    const globalCursor = document.getElementById("crsr");

    if (!container || !pill || !text || !icon) return;

    if (animTimelineRef.current) {
      animTimelineRef.current.kill();
    }

    if (active) {
      // 1. Position container immediately at current pointer coords
      gsap.set(container, {
        x: posRef.current.x,
        y: posRef.current.y,
        visibility: "visible",
        opacity: 1,
      });

      // 2. Gracefully suppress the global cursor ring to avoid visual collision
      if (globalCursor) {
        gsap.to(globalCursor, {
          opacity: 0,
          scale: 0.3,
          duration: 0.2,
          ease: "power2.out",
        });
      }

      // 3. Enter sequence (350–450ms total)
      // Normal pointer -> Small scale-up -> Pill expands horizontally -> Text fades in -> Arrow circle appears
      const tl = gsap.timeline();

      tl.fromTo(
        pill,
        { scale: 0.45, scaleX: 0.2, opacity: 0 },
        {
          scale: 1,
          scaleX: 1,
          opacity: 1,
          duration: 0.38,
          ease: "power3.out",
        }
      )
        .fromTo(
          text,
          { opacity: 0, x: -6 },
          {
            opacity: 1,
            x: 0,
            duration: 0.3,
            ease: "power2.out",
          },
          "-=0.24"
        )
        .fromTo(
          icon,
          { scale: 0, rotate: -40, opacity: 0 },
          {
            scale: 1,
            rotate: 0,
            opacity: 1,
            duration: 0.32,
            ease: "back.out(1.4)",
          },
          "-=0.22"
        );

      animTimelineRef.current = tl;
    } else {
      // Exit sequence (250–300ms total)
      // Text disappears -> Arrow disappears -> Pill contracts horizontally -> Cursor returns
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(container, { visibility: "hidden" });
        },
      });

      tl.to([text, icon], {
        opacity: 0,
        scale: 0.7,
        duration: 0.12,
        ease: "power2.in",
      }).to(
        pill,
        {
          scaleX: 0.25,
          scale: 0.4,
          opacity: 0,
          duration: 0.22,
          ease: "power3.in",
        },
        "-=0.06"
      );

      // Restore global cursor
      if (globalCursor) {
        gsap.to(globalCursor, {
          opacity: 1,
          scale: 1,
          duration: 0.25,
          ease: "power2.out",
          delay: 0.05,
        });
      }

      animTimelineRef.current = tl;
    }

    return () => {
      if (animTimelineRef.current) animTimelineRef.current.kill();
    };
  }, [active]);

  // Clean-up on unmount: ensure global cursor is restored
  useEffect(() => {
    return () => {
      const globalCursor = document.getElementById("crsr");
      if (globalCursor) {
        gsap.to(globalCursor, { opacity: 1, scale: 1, duration: 0.2 });
      }
    };
  }, []);

  // Avoid rendering on touch/coarse devices
  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) {
    return null;
  }

  return createPortal(
    <div
      ref={containerRef}
      className="venue-cursor-pill"
      style={{ visibility: "hidden" }}
      aria-hidden="true"
    >
      <div ref={pillInnerRef} className="venue-cursor-pill-inner">
        <span ref={textRef} className="venue-cursor-text">
          VIEW MAP
        </span>
        <div ref={iconRef} className="venue-cursor-icon-badge">
          <MdArrowOutward className="w-3 h-3 text-[#f4efe7]" />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ClickIndicator;