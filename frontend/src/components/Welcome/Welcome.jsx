import { useGSAP } from "@gsap/react";
import gsap from "gsap/all";
import { useMediaQuery } from "react-responsive";
import { welcomeLinesLG, welcomeLinesSM } from "../../constants/welcome";
import eyebrow1 from "../../assets/eyebrow_1.jpg";
import eyebrow2 from "../../assets/eyebrow_2.jpg";
import section2Bg from "../../assets/section_2.png";

const Welcome = () => {
    const isMobile = useMediaQuery({ maxWidth: 768 });
    const welcomeLines = isMobile ? welcomeLinesSM : welcomeLinesLG;

    useGSAP(() => {
        const lines = gsap.utils.toArray(".clip-text-welcome");
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".welcome-section",
                start: "top 75%",
                end: "bottom 80%",
                scrub: 1,
            },
        });

        tl.to(lines, {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            stagger: 0.25,
        });

        tl.from(".welcome-image-card", {
            y: 25,
            opacity: 0.8,
            scale: 0.98,
            stagger: 0.15,
            ease: "power2.out",
            duration: 0.8,
        }, "-=0.3");

        tl.from(".welcome-statement", {
            y: 20,
            opacity: 0.7,
            ease: "power2.out",
            duration: 0.8,
        }, "<");
    });

    return (
        <section id="welcome" className="welcome-section w-full min-h-screen text-[#f4efe7] px-6 sm:px-12 md:px-16 lg:px-24 pt-24 md:pt-32 pb-24 relative overflow-hidden bg-[#030206]">
            {/* Cinematic Background Layer - shifted lower so top remains deep cinematic black */}
            <div
                className="absolute inset-x-0 bottom-0 top-24 md:top-36 bg-cover bg-bottom bg-no-repeat opacity-85 pointer-events-none z-0 scale-105"
                style={{ backgroundImage: `url(${section2Bg})` }}
            />

            {/* Deep Cinematic Black Top Fade */}
            <div className="absolute inset-x-0 top-0 h-48 md:h-72 bg-gradient-to-b from-[#030206] via-[#030206]/95 to-transparent pointer-events-none z-1" />

            {/* Seamless Bottom Blend with Next Section */}
            <div className="absolute inset-x-0 bottom-0 h-40 md:h-56 bg-gradient-to-t from-[#030206] via-[#030206]/70 to-transparent pointer-events-none z-1" />

            <div className="max-w-6xl mx-auto relative z-10">
                {/* Eyebrow with Purple Accent Line */}
                <div className="flex items-center gap-2.5 mb-6 md:mb-8">
                    <span className="w-6 md:w-8 h-[1.5px] bg-[#a855f7] inline-block rounded-full shadow-[0_0_6px_#a855f7]"></span>
                    <p className="text-[11px] sm:text-xs font-semibold tracking-[0.22em] text-[#8e859f] uppercase">
                        THE ODYSSEY
                    </p>
                </div>

                {/* Editorial Statement with Refined Scale */}
                <div className="flex flex-col gap-1.5 mb-14 md:mb-20">
                    <div className="w-full md:w-[92%] lg:w-[86%] text-[24px] sm:text-[30px] md:text-[38px] lg:text-[44px] leading-[1.24] md:leading-[1.18] font-normal tracking-[-0.012em]">
                        <div className="w-full welcome-text flex flex-col justify-center items-start">
                            {welcomeLines.map((text, index) => (
                                <span key={index} className="relative block text-darkBrown">
                                    {text}
                                    <span className="clip-text-welcome">{text}</span>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Second Part: Proportional Organic Visuals + Statement */}
                <div className="flex md:flex-row flex-col justify-between items-start md:items-center gap-8 md:gap-12 pt-2">
                    {/* Left: Sleek Organic Pill Visuals */}
                    <div className="flex flex-row justify-start items-center gap-3 sm:gap-4 welcome-image-card">
                        <div className="overflow-hidden rounded-[2.2rem] sm:rounded-[2.6rem] md:rounded-[3rem] w-36 sm:w-44 md:w-52 lg:w-56 aspect-[16/11] border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.12)] group">
                            <img
                                src={eyebrow1}
                                alt="Hackathon team collaborating"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        <div className="overflow-hidden rounded-[2.2rem] sm:rounded-[2.6rem] md:rounded-[3rem] w-36 sm:w-44 md:w-52 lg:w-56 aspect-[16/11] border border-purple-500/20 shadow-[0_0_20px_rgba(168,85,247,0.12)] group">
                            <img
                                src={eyebrow2}
                                alt="Developer coding at hackathon"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                    </div>

                    {/* Right: Refined Statement Block Matching Reference */}
                    <div className="md:w-1/2 w-full welcome-statement flex flex-col justify-center">
                        <p className="text-lg sm:text-xl md:text-2xl lg:text-[1.7rem] text-[#c7c2d1] leading-[1.32] md:leading-[1.28] font-normal tracking-[-0.2px]">
                            <span>One challenge.</span><br />
                            <span>One team.</span><br />
                            <span><strong className="font-bold text-white">One</strong> idea at a time.</span>
                        </p>
                        <div className="flex items-center gap-2 mt-5 md:mt-6">
                            <span className="w-4 h-[1.5px] bg-[#a855f7] inline-block"></span>
                            <span className="text-[10px] sm:text-[11px] tracking-[0.22em] font-semibold text-[#716886] uppercase">
                                KARE &middot; ACM STUDENT CHAPTER
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Welcome;