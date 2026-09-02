import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { MdArrowOutward } from "react-icons/md";
import faqImage from "../../assets/Faq_image.png";
import "./faq.css";

gsap.registerPlugin(ScrollTrigger);

const FAQ_ITEMS = [
  {
    number: "01",
    question: "Can students from outside KARE participate?",
    answer:
      "Yes. Hack Odyssey is open to college students from outside KARE, so external participants are welcome to take part in the hackathon.",
  },
  {
    number: "02",
    question: "How long is Hack Odyssey?",
    answer:
      "Hack Odyssey is a 24-hour hackathon where participants turn their ideas into working solutions within the given timeframe.",
  },
  {
    number: "03",
    question: "What are the problem statements based on?",
    answer:
      "The problem statements are centered around the United Nations Sustainable Development Goals (SDGs), encouraging participants to build solutions that address meaningful real-world challenges.",
  },
  {
    number: "04",
    question: "Can I choose my own problem or idea?",
    answer:
      "Yes. You can either work on a provided SDG-focused problem statement or develop your own innovative idea, as long as it aligns with the hackathon's innovation focus and rules.",
  },
  {
    number: "05",
    question: "What happens if I have another question?",
    answer:
      "If your question isn't answered here, you can reach out directly to the Hack Odyssey team through WhatsApp.",
  },
];

const TITLE_WORDS = ["FREQUENTLY", "ASKED", "QUESTIONS"];
const SUBTITLE = "Everything you need to know about participating in Hack Odyssey 4.0.";
const SUPPORT_TITLE_WORDS = ["STILL", "HAVE", "QUESTIONS?"];
const SUPPORT_DESC = "Can't find what you're looking for? Talk directly with the Hack Odyssey team.";

const FAQ = ({ whatsappUrl = "https://chat.whatsapp.com/invite/hackodyssey4" }) => {
  const sectionRef = useRef(null);
  const pillRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 78%",
          once: true,
        },
      });

      // 1. Eyebrow: accent line expands from left, text slides in
      tl.fromTo(
        ".faq-eyebrow-line",
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.6, ease: "power3.out" }
      )
        .from(
          ".faq-eyebrow-text",
          {
            x: -18,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.4"
        )

        // 2. Main Title: Word-by-word upward reveal (not all at once)
        .from(
          ".faq-title-word",
          {
            yPercent: 120,
            opacity: 0,
            stagger: 0.1,
            duration: 0.85,
            ease: "power4.out",
          },
          "-=0.35"
        )

        // 3. Subtitle: Word-by-word progressive reveal
        .from(
          ".faq-sub-word",
          {
            yPercent: 110,
            opacity: 0,
            stagger: 0.025,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.4"
        )

        // 4. Staggered reveal for accordion items
        .from(
          ".faq-row-item",
          {
            y: 35,
            opacity: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: "power3.out",
          },
          "-=0.3"
        )

        // 5. Support card container rise
        .from(
          ".faq-support-card",
          {
            y: 45,
            opacity: 0,
            scale: 0.95,
            duration: 0.85,
            ease: "power3.out",
          },
          "-=0.6"
        )

        // 6. 3D Chat image pop-in with back ease
        .from(
          ".faq-chat-img",
          {
            scale: 0.88,
            y: 30,
            opacity: 0,
            duration: 0.9,
            ease: "back.out(1.4)",
          },
          "-=0.6"
        )

        // 7. Support card title: Word-by-word reveal
        .from(
          ".faq-support-word",
          {
            yPercent: 120,
            opacity: 0,
            stagger: 0.08,
            duration: 0.65,
            ease: "power4.out",
          },
          "-=0.5"
        )

        // 8. Support card description & CTA pill
        .from(
          ".faq-support-desc, .faq-cta-pill",
          {
            y: 20,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        );

      // Subtle perpetual floating animation on 3D chat illustration
      gsap.to(".faq-chat-img-inner", {
        y: -8,
        rotateZ: -1.2,
        yoyo: true,
        repeat: -1,
        duration: 3.2,
        ease: "sine.inOut",
        delay: 1.2,
      });

      // Magnetic interaction on CTA button (matching Hero & Footer physics)
      const pill = pillRef.current;
      if (pill) {
        const onMove = (e) => {
          const rect = pill.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(pill, {
            x: x * 0.22,
            y: y * 0.22,
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
    },
    { scope: sectionRef }
  );

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="faq-section relative w-full pt-28 sm:pt-36 lg:pt-40 pb-28 sm:pb-36 lg:pb-40 px-6 sm:px-10 md:px-14 lg:px-16 text-[#f4efe7] select-none"
    >
      {/* Ambient Lighting matching Hack Odyssey deep atmosphere */}
      <div className="faq-ambient-glow" />
      <div className="faq-ambient-glow-secondary" />

      {/* Top subtle fade from Gallery for intentional visual pause */}
      <div className="absolute inset-x-0 top-0 h-28 sm:h-36 bg-gradient-to-b from-[#030206] to-transparent pointer-events-none z-1" />

      {/* Main Container — Aligned with Hero & Navbar Grid */}
      <div className="w-full max-w-[1440px] mx-auto relative z-10">
        
        {/* Asymmetric 2-Column Desktop Grid — Vertically Centered */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-14 xl:gap-20">
          
          {/* ====================================================================
              LEFT COLUMN: Primary FAQ Accordion
              ==================================================================== */}
          <div className="w-full lg:w-[60%] flex flex-col">
            
            {/* Small Eyebrow with Expanding Purple Accent Line */}
            <div className="flex items-center gap-2.5 mb-4">
              <span className="faq-eyebrow-line w-6 sm:w-7 h-[1.5px] bg-[#9B4DFF] rounded-full inline-block shadow-[0_0_8px_#9B4DFF]" />
              <p className="faq-eyebrow-text text-[11px] sm:text-xs font-mono font-semibold tracking-[0.25em] text-[#d8b4fe] uppercase">
                FAQ &middot; KNOW BEFORE YOU CODE
              </p>
            </div>

            {/* Large Heading — Word-by-Word Sequential Reveal */}
            <h2 className="font-hero-bebas text-4xl sm:text-5xl lg:text-6xl text-white tracking-wide uppercase leading-[0.98] mb-3 select-none flex flex-wrap">
              {TITLE_WORDS.map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden mr-3 sm:mr-4 last:mr-0">
                  <span className="faq-title-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </h2>

            {/* Supporting Description — Word-by-Word Progressive Reveal */}
            <p className="text-xs sm:text-sm md:text-base font-normal text-[#a199b0] leading-relaxed max-w-xl mb-8 sm:mb-12 select-none">
              {SUBTITLE.split(" ").map((word, idx) => (
                <span key={idx} className="inline-block overflow-hidden mr-[0.28em] last:mr-0">
                  <span className="faq-sub-word inline-block will-change-transform">
                    {word}
                  </span>
                </span>
              ))}
            </p>

            {/* Vertically Stacked Accordion List */}
            <div className="w-full border-t border-white/10" role="region" aria-label="Frequently Asked Questions Accordion">
              {FAQ_ITEMS.map((item, index) => {
                const isOpen = openIndex === index;
                const panelId = `faq-panel-${index}`;
                const triggerId = `faq-trigger-${index}`;

                return (
                  <div
                    key={item.number}
                    className="faq-row-item border-b border-white/10 transition-colors duration-300 hover:border-purple-500/30"
                  >
                    {/* Semantic Full-Row Accessible Button */}
                    <button
                      type="button"
                      id={triggerId}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => toggleFaq(index)}
                      className={`faq-row-btn w-full py-5 sm:py-6 flex items-center justify-between gap-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-[#9B4DFF] focus-visible:outline-offset-2 rounded-sm group ${
                        isOpen ? "is-active" : ""
                      }`}
                    >
                      {/* Left: Number + Question text */}
                      <div className="flex items-center gap-3 sm:gap-4 flex-1 pr-2">
                        <span
                          className={`font-mono text-xs sm:text-sm font-semibold tracking-wider transition-colors duration-300 select-none ${
                            isOpen ? "text-[#B56CFF]" : "text-[#9B4DFF]/70 group-hover:text-[#9B4DFF]"
                          }`}
                        >
                          {item.number}
                        </span>
                        <span
                          className={`faq-question-text text-sm sm:text-base lg:text-lg font-medium tracking-tight transition-all duration-300 leading-snug ${
                            isOpen ? "text-white font-semibold" : "text-[#f4efe7]/90"
                          }`}
                        >
                          {item.question}
                        </span>
                      </div>

                      {/* Right: Circular Plus/Minus Indicator */}
                      <span
                        aria-hidden="true"
                        className={`faq-toggle-circle w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center shrink-0 ${
                          isOpen
                            ? "border-[#9B4DFF] bg-[#9B4DFF]/20 text-white shadow-[0_0_14px_rgba(155,77,255,0.4)]"
                            : "border-white/20 text-[#f4efe7]"
                        }`}
                      >
                        <svg
                          className="w-3.5 h-3.5 text-current transition-transform duration-300"
                          viewBox="0 0 16 16"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          {/* Horizontal line */}
                          <line
                            x1="3"
                            y1="8"
                            x2="13"
                            y2="8"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                          />
                          {/* Vertical line (animates out on open) */}
                          <line
                            x1="8"
                            y1="3"
                            x2="8"
                            y2="13"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            className={`transition-all duration-300 origin-center ${
                              isOpen ? "scale-y-0 opacity-0" : "scale-y-100 opacity-100"
                            }`}
                          />
                        </svg>
                      </span>
                    </button>

                    {/* Smooth Disclosure Answer Panel */}
                    <div
                      id={panelId}
                      role="region"
                      aria-labelledby={triggerId}
                      className={`faq-answer-wrapper ${isOpen ? "is-open" : ""}`}
                    >
                      <div className="faq-answer-inner">
                        <p className="pt-1 pb-6 sm:pb-7 text-xs sm:text-sm font-normal text-[#c4bdd0] leading-relaxed pl-7 sm:pl-9 pr-6 sm:pr-10 select-text">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ====================================================================
              RIGHT COLUMN: Secondary Support Card (Vertically Centered)
              ==================================================================== */}
          <div className="w-full lg:w-[40%] flex justify-center lg:justify-end self-center">
            <div className="faq-support-card w-full max-w-[420px] rounded-3xl p-7 sm:p-9 flex flex-col items-center text-center relative overflow-hidden">
              
              {/* Internal subtle glow */}
              <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#9B4DFF]/15 rounded-full blur-3xl pointer-events-none" />

              {/* Chat Support Illustration (Faq_image.png) with Floating Motion */}
              <div className="faq-chat-img w-40 sm:w-48 lg:w-52 aspect-square flex items-center justify-center mb-5 relative z-10">
                <div className="faq-chat-img-inner w-full h-full flex items-center justify-center will-change-transform">
                  <img
                    src={faqImage}
                    alt="Hack Odyssey Support & Inquiries"
                    className="w-full h-full object-contain pointer-events-none drop-shadow-[0_12px_30px_rgba(155,77,255,0.35)]"
                  />
                </div>
              </div>

              {/* Support Card Details */}
              <div className="flex flex-col items-center text-center relative z-10 w-full">
                {/* Heading: Word-by-Word Reveal */}
                <h3 className="font-hero-bebas text-2xl sm:text-3xl text-white tracking-wider uppercase mb-2 leading-none select-none flex flex-wrap justify-center">
                  {SUPPORT_TITLE_WORDS.map((word, idx) => (
                    <span key={idx} className="inline-block overflow-hidden mx-1">
                      <span className="faq-support-word inline-block will-change-transform">
                        {word}
                      </span>
                    </span>
                  ))}
                </h3>
                
                <p className="faq-support-desc text-xs sm:text-sm text-[#a199b0] leading-relaxed mb-6 max-w-[260px] select-none">
                  {SUPPORT_DESC}
                </p>

                {/* Signature Warm Off-White Pill CTA (Matching Register Now Button) */}
                <a
                  ref={pillRef}
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="faq-cta-pill w-full sm:w-auto px-7 py-3 rounded-full flex items-center justify-center gap-3.5 cursor-pointer font-bold text-xs uppercase tracking-wider group"
                  aria-label="Join Hack Odyssey WhatsApp community to ask questions"
                >
                  <span className="font-semibold tracking-wider text-[11px] sm:text-xs text-[#181717]">
                    JOIN WHATSAPP
                  </span>
                  <span className="faq-arrow-circle w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                    <MdArrowOutward className="w-3.5 h-3.5 text-inherit transition-transform duration-300" />
                  </span>
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
