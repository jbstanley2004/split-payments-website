"use client";

import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    angle: number;
    speed: number;
    targetX: number;
    targetY: number;
    orbitAngle: number;
}

export default function CursorParticles() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, speed: 0, isMoving: false });
    const particlesRef = useRef<Particle[]>([]);
    const requestRef = useRef<number>();
    const timeRef = useRef<number>(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        const container = containerRef.current;
        if (!canvas || !container) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Configuration
        const particleCount = 150; // More particles
        const colors = ["#4A90E2", "#50E3C2", "#007AFF", "#B8E986", "#A0C4FF"];
        const baseSpeed = 0.005; // Very slow base speed
        const orbitRadius = 160; // Larger orbit

        // Initialize particles
        const initParticles = () => {
            particlesRef.current = [];
            for (let i = 0; i < particleCount; i++) {
                const size = Math.random() * 6 + 2; // Larger range for gradient visibility (2-8px)
                // Depth effect: smaller particles are more transparent and move slower
                const depth = size / 8;

                particlesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: 0,
                    vy: 0,
                    size: size,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    angle: Math.random() * Math.PI * 2,
                    speed: (baseSpeed + Math.random() * 0.01) * depth, // Slower deep particles
                    targetX: 0,
                    targetY: 0,
                    orbitAngle: Math.random() * Math.PI * 2,
                });
            }
        };

        // Resize handler
        const handleResize = () => {
            const dpr = window.devicePixelRatio || 1;
            const rect = container.getBoundingClientRect();

            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            ctx.scale(dpr, dpr);

            // Re-init particles if needed, or just let them adjust
            if (particlesRef.current.length === 0) {
                initParticles();
            }
        };

        // Mouse handler
        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Calculate speed
            const dx = x - mouseRef.current.x;
            const dy = y - mouseRef.current.y;
            const speed = Math.sqrt(dx * dx + dy * dy);

            mouseRef.current.prevX = mouseRef.current.x;
            mouseRef.current.prevY = mouseRef.current.y;
            mouseRef.current.x = x;
            mouseRef.current.y = y;
            mouseRef.current.speed = speed;
            mouseRef.current.isMoving = true;

            // Reset moving flag after a delay
            if (timeRef.current) clearTimeout(timeRef.current);
            timeRef.current = window.setTimeout(() => {
                mouseRef.current.isMoving = false;
            }, 100);
        };

        // Animation loop
        const animate = () => {
            if (!ctx || !canvas) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const mouse = mouseRef.current;

            particlesRef.current.forEach((p, i) => {
                // Physics constants - very floaty
                const friction = 0.98; // Very little friction

                if (mouse.isMoving) {
                    // Trail effect: extremely lazy follow
                    const delay = i * 1.5;
                    const trailX = mouse.x - (mouse.x - mouse.prevX) * delay;
                    const trailY = mouse.y - (mouse.y - mouse.prevY) * delay;

                    // Huge spread
                    const spread = Math.min(mouse.speed * 4, 300);
                    p.targetX = trailX + (Math.random() - 0.5) * spread;
                    p.targetY = trailY + (Math.random() - 0.5) * spread;

                    const dx = p.targetX - p.x;
                    const dy = p.targetY - p.y;

                    // Very weak pull
                    p.vx += dx * p.speed * 0.1;
                    p.vy += dy * p.speed * 0.1;
                } else {
                    // Orbit/Float effect
                    p.orbitAngle += 0.001 + (i % 10) * 0.0005; // Extremely slow orbit

                    // Organic breathing
                    const breathing = Math.sin(Date.now() * 0.0005 + i) * 40;
                    const currentRadius = orbitRadius + (i % 100) + breathing;

                    const orbitX = mouse.x + Math.cos(p.orbitAngle) * currentRadius;
                    const orbitY = mouse.y + Math.sin(p.orbitAngle) * currentRadius;

                    const dx = orbitX - p.x;
                    const dy = orbitY - p.y;

                    // Barely perceptible pull towards orbit
                    p.vx += dx * 0.0005;
                    p.vy += dy * 0.0005;
                }

                // Add constant gentle drift based on angle
                p.vx += Math.cos(p.angle) * 0.02;
                p.vy += Math.sin(p.angle) * 0.02;

                // Apply friction
                p.vx *= friction;
                p.vy *= friction;

                // Update position
                p.x += p.vx;
                p.y += p.vy;

                // Draw with radial gradient for soft, glowing effect
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();
            });

            requestRef.current = requestAnimationFrame(animate);
        };

        // Setup
        window.addEventListener("resize", handleResize);
        window.addEventListener("mousemove", handleMouseMove);
        handleResize();
        initParticles();
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("mousemove", handleMouseMove);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            if (timeRef.current) clearTimeout(timeRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <canvas ref={canvasRef} className="block w-full h-full" />
        </div>
    );
}
