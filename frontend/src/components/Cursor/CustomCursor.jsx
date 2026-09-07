import React, { useEffect } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
    useEffect(() => {
        // Only run on desktop / pointer devices
        if (window.matchMedia('(pointer: coarse)').matches) return;

        const cursor = document.getElementById('crsr');
        if (!cursor) return;

        const onMouseMove = (dets) => {
            gsap.to(cursor, {
                left: dets.clientX,
                top: dets.clientY,
                duration: 0.2,
                ease: "power2.out"
            });
        };

        const onMouseDown = () => {
            gsap.to(cursor, {
                scale: 0.8,
                duration: 0.15,
                ease: "power2.out"
            });
        };

        const onMouseUp = () => {
            gsap.to(cursor, {
                scale: 1.0,
                duration: 0.25,
                ease: "power2.out"
            });
        };

        const onMouseLeaveDoc = () => {
            gsap.to(cursor, { opacity: 0, duration: 0.2 });
        };

        const onMouseEnterDoc = () => {
            const isNearViewMap = document.querySelector('.venue-map-interactive-trigger.is-hovering');
            if (!isNearViewMap) {
                gsap.to(cursor, { opacity: 1, duration: 0.2 });
            }
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mouseleave', onMouseLeaveDoc);
        document.addEventListener('mouseenter', onMouseEnterDoc);

        // Magnetic hover effect for elements with .gravity
        const items = document.querySelectorAll('.gravity');
        const cleanups = [];

        items.forEach((item) => {
            const onElemMouseMove = (e) => {
                const rect = item.getBoundingClientRect();
                const itemCenterX = rect.left + rect.width / 2;
                const itemCenterY = rect.top + rect.height / 2;

                const distanceX = e.clientX - itemCenterX;
                const distanceY = e.clientY - itemCenterY;
                const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

                const threshold = 140;
                const pullStrength = 0.18;

                if (distance < threshold) {
                    const pullX = (distanceX / distance) * pullStrength * (threshold - distance);
                    const pullY = (distanceY / distance) * pullStrength * (threshold - distance);

                    gsap.to(item, {
                        x: pullX,
                        y: pullY,
                        duration: 0.35,
                        ease: "power2.out"
                    });
                }
            };

            const onElemMouseLeave = () => {
                gsap.to(item, {
                    x: 0,
                    y: 0,
                    duration: 0.5,
                    ease: "power3.out"
                });
            };

            item.addEventListener('mousemove', onElemMouseMove);
            item.addEventListener('mouseleave', onElemMouseLeave);

            cleanups.push(() => {
                item.removeEventListener('mousemove', onElemMouseMove);
                item.removeEventListener('mouseleave', onElemMouseLeave);
            });
        });

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mouseleave', onMouseLeaveDoc);
            document.removeEventListener('mouseenter', onMouseEnterDoc);
            cleanups.forEach((c) => c());
        };
    }, []);

    return <div id="crsr" aria-hidden="true"></div>;
};

export default CustomCursor;
