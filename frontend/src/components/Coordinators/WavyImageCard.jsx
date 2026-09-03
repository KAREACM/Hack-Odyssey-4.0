import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const vertexShader = `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`;

const fragmentShader = `
    uniform sampler2D uTexture1;
    uniform sampler2D uTexture2;
    uniform vec2 uMouse;
    uniform float uHover;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uImageRes;

    varying vec2 vUv;

    // 2D Simplex Noise
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m;
        m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x = a0.x * x0.x + h.x * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
    }

    void main() {
        vec2 uv = vUv;
        
        // Exact Aspect Cover UV
        vec2 s = uResolution;
        vec2 i = uImageRes;
        float rs = s.x / max(s.y, 1.0);
        float ri = i.x / max(i.y, 1.0);
        vec2 coverUv = uv;
        if (rs > ri) {
            coverUv.y = (uv.y - 0.5) * (ri / rs) + 0.5;
        } else {
            coverUv.x = (uv.x - 0.5) * (rs / ri) + 0.5;
        }

        // Multi-frequency noise for organic splash boundary
        float n1 = snoise(uv * 4.0 + vec2(uTime * 0.4, uTime * 0.3));
        float n2 = snoise(uv * 8.0 - vec2(uTime * 0.25, uTime * 0.4));
        float noise = n1 * 0.65 + n2 * 0.35;

        // Aspect corrected mouse distance
        vec2 aspectVec = vec2(rs, 1.0);
        vec2 diff = (uv - uMouse) * aspectVec;
        float dist = length(diff);

        // Organic Liquid Gooey Splash around cursor on hover
        float splashRadius = 0.32 * uHover;
        float metaball = splashRadius / (dist + 0.05);
        
        // Smooth organic liquid contour
        float gooey = metaball + noise * 0.35 * uHover;
        
        // Smooth anti-aliased liquid mask threshold
        float threshold = 0.76;
        float aa = 0.04;
        float mask = smoothstep(threshold - aa, threshold + aa, gooey) * uHover;

        // Micro-wave distortion only along the liquid splash boundary (without warping the face)
        vec2 splashWave = vec2(
            sin(uv.y * 10.0 + uTime * 2.0 + noise * 2.5),
            cos(uv.x * 10.0 + uTime * 2.0 + noise * 2.5)
        ) * 0.012 * mask;

        // Base portrait photo is 100% natural, crisp, and undistorted!
        vec4 tex1 = texture2D(uTexture1, coverUv);
        
        // Secondary studio artwork revealed inside the liquid splash
        vec4 tex2 = texture2D(uTexture2, coverUv + splashWave);

        // Smooth liquid splash blend
        vec4 finalColor = mix(tex1, tex2, mask);
        
        // Refined liquid highlight on the splash border
        float edge = smoothstep(threshold - aa, threshold, gooey) * (1.0 - smoothstep(threshold, threshold + aa * 2.0, gooey)) * uHover;
        finalColor.rgb += vec3(0.07, 0.07, 0.07) * edge;

        gl_FragColor = finalColor;
    }
`;

const WavyImageCard = ({
    primaryImg,
    secondaryImg,
    alt = "Coordinator portrait",
    className = ""
}) => {
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [isMobile, setIsMobile] = useState(() => {
        if (typeof window !== 'undefined') {
            return window.innerWidth <= 768 || (window.matchMedia && window.matchMedia('(hover: none)').matches);
        }
        return false;
    });

    useEffect(() => {
        const checkMobile = () => {
            const isTouch = window.innerWidth <= 768 || (window.matchMedia && window.matchMedia('(hover: none)').matches);
            setIsMobile(isTouch);
        };
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        if (isMobile) return; // Skip heavy Three.js WebGL rendering on mobile for 60-120 FPS performance

        const container = containerRef.current;
        const canvas = canvasRef.current;
        if (!container || !canvas) return;

        let width = container.clientWidth || 300;
        let height = container.clientHeight || 400;

        const scene = new THREE.Scene();
        const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
        const renderer = new THREE.WebGLRenderer({
            canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

        const renderSingleFrame = (delta = 0) => {
            uniforms.uTime.value += delta;
            uniforms.uHover.value = currentHover;
            uniforms.uMouse.value.set(currentMouse.x, currentMouse.y);
            renderer.render(scene, camera);
        };

        const textureLoader = new THREE.TextureLoader();
        const tex1 = textureLoader.load(primaryImg, (loaded) => {
            if (material.uniforms.uImageRes) {
                material.uniforms.uImageRes.value.set(loaded.image.width, loaded.image.height);
            }
            tex1.needsUpdate = true;
            renderSingleFrame(0);
        });
        const tex2 = textureLoader.load(secondaryImg, () => {
            tex2.needsUpdate = true;
            renderSingleFrame(0);
        });

        tex1.minFilter = THREE.LinearFilter;
        tex1.magFilter = THREE.LinearFilter;
        tex2.minFilter = THREE.LinearFilter;
        tex2.magFilter = THREE.LinearFilter;

        const uniforms = {
            uTexture1: { value: tex1 },
            uTexture2: { value: tex2 },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uHover: { value: 0.0 },
            uTime: { value: 0.0 },
            uResolution: { value: new THREE.Vector2(width, height) },
            uImageRes: { value: new THREE.Vector2(width, height) }
        };

        const material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            uniforms,
            transparent: true
        });

        const geometry = new THREE.PlaneGeometry(2, 2);
        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        let targetHover = 0;
        let currentHover = 0;
        let targetMouse = { x: 0.5, y: 0.5 };
        let currentMouse = { x: 0.5, y: 0.5 };
        let animId = null;
        let isRunning = false;
        let isIntersecting = false;
        let lastTime = performance.now();

        const tick = (time = performance.now()) => {
            if (!isRunning) return;
            const delta = Math.min((time - lastTime) / 1000, 0.05);
            lastTime = time;

            currentHover += (targetHover - currentHover) * 0.09;
            currentMouse.x += (targetMouse.x - currentMouse.x) * 0.12;
            currentMouse.y += (targetMouse.y - currentMouse.y) * 0.12;

            renderSingleFrame(delta);

            const isSettled = targetHover === 0 && Math.abs(currentHover) < 0.001 &&
                Math.abs(targetMouse.x - currentMouse.x) < 0.002 &&
                Math.abs(targetMouse.y - currentMouse.y) < 0.002;

            if (isSettled) {
                currentHover = 0;
                renderSingleFrame(0);
                isRunning = false;
                animId = null;
            } else {
                animId = requestAnimationFrame(tick);
            }
        };

        const startLoop = () => {
            if (isRunning || !isIntersecting) return;
            isRunning = true;
            lastTime = performance.now();
            animId = requestAnimationFrame(tick);
        };

        const stopLoop = () => {
            isRunning = false;
            if (animId) {
                cancelAnimationFrame(animId);
                animId = null;
            }
        };

        const onPointerEnter = () => {
            targetHover = 1.0;
            startLoop();
        };

        const onPointerLeave = () => {
            targetHover = 0.0;
            startLoop();
        };

        const onPointerMove = (e) => {
            const rect = container.getBoundingClientRect();
            targetMouse.x = (e.clientX - rect.left) / rect.width;
            targetMouse.y = 1.0 - (e.clientY - rect.top) / rect.height;
            if (!isRunning) startLoop();
        };

        container.addEventListener('pointerenter', onPointerEnter);
        container.addEventListener('pointerleave', onPointerLeave);
        container.addEventListener('pointermove', onPointerMove);

        const resizeObserver = new ResizeObserver((entries) => {
            for (let entry of entries) {
                const newWidth = entry.contentRect.width;
                const newHeight = entry.contentRect.height;
                if (newWidth > 0 && newHeight > 0) {
                    renderer.setSize(newWidth, newHeight);
                    uniforms.uResolution.value.set(newWidth, newHeight);
                    renderSingleFrame(0);
                }
            }
        });
        resizeObserver.observe(container);

        // Viewport IntersectionObserver to sleep/wake when in/out of view
        const intersectionObserver = new IntersectionObserver((entries) => {
            for (let entry of entries) {
                isIntersecting = entry.isIntersecting;
                if (isIntersecting) {
                    renderSingleFrame(0);
                    if (targetHover > 0 || currentHover > 0.001) {
                        startLoop();
                    }
                } else {
                    stopLoop();
                }
            }
        }, { threshold: 0.05 });
        intersectionObserver.observe(container);

        // Initial render
        renderSingleFrame(0);

        return () => {
            stopLoop();
            intersectionObserver.disconnect();
            resizeObserver.disconnect();
            container.removeEventListener('pointerenter', onPointerEnter);
            container.removeEventListener('pointerleave', onPointerLeave);
            container.removeEventListener('pointermove', onPointerMove);
            geometry.dispose();
            material.dispose();
            tex1.dispose();
            tex2.dispose();
            renderer.dispose();
        };
    }, [primaryImg, secondaryImg, isMobile]);

    return (
        <div
            ref={containerRef}
            className={`img-div relative overflow-hidden bg-[#161616] group ${className}`}
        >
            {!isMobile && (
                <canvas 
                    ref={canvasRef} 
                    className="absolute inset-0 w-full h-full object-cover z-10 transition-transform duration-700 ease-out group-hover:scale-105" 
                />
            )}
            <img
                src={primaryImg}
                alt={alt}
                className={`w-full h-full object-cover select-none pointer-events-none transform-gpu transition-transform duration-700 ease-out group-hover:scale-105 ${
                    isMobile ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                decoding="async"
            />
        </div>
    );
};

export default WavyImageCard;
