import { Outlet } from "react-router-dom";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../components/Navbar/Navbar";
import HackOdysseyPreloader from "../components/Preloader/HackOdysseyPreloader";
import Footer from "../components/Footer/Footer";
import CustomCursor from "../components/Cursor/CustomCursor";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const MainLayout = () => {

    useGSAP(() => {
        ScrollTrigger.config({
            ignoreMobileResize: true,
        });

        const mm = gsap.matchMedia();

        // Initialize ScrollSmoother exclusively on desktop devices
        // Mobile uses native 120Hz touch momentum scrolling for jitter-free ScrollTrigger pinning
        mm.add("(min-width: 768px)", () => {
            ScrollSmoother.create({
                wrapper: "#smooth-wrapper",
                content: "#smooth-content",
                smooth: 1.5,
                effects: true,
            });
        });

        return () => mm.revert();
    });

    return (
        <>
            <CustomCursor />
            <HackOdysseyPreloader />
            <Navbar />
            <div id="smooth-wrapper">
                <div id="smooth-content">
                    <main>
                        <Outlet /> {/* Hero, About, Contact, etc. */}
                        <Footer />
                    </main>
                </div>
            </div>
        </>
    );
};

export default MainLayout;