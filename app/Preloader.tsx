'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import './Preloader.css';

interface EdgeSegment {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    progress: number;
    delay: number;
    speed: number;
    r: number;
    g: number;
    b: number;
    alpha: number;
    layer: 'edge' | 'guide' | 'scaffold';
}

export default function Preloader() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [phase, setPhase] = useState<'tracing' | 'constructing' | 'reveal' | 'fadeout' | 'hidden'>('tracing');
    const animationRef = useRef<number>(0);
    const timeRef = useRef(0);
    const cameraAngleRef = useRef(0);
    const logoRef = useRef<HTMLImageElement | null>(null);
    const dominantColorRef = useRef<{ r: number; g: number; b: number }>({ r: 180, g: 180, b: 180 });
    const edgesRef = useRef<EdgeSegment[]>([]);
    const logoLoadedRef = useRef(false);
    const logoBoundsRef = useRef({ x: 0, y: 0, w: 0, h: 0 });
    const phaseRef = useRef(phase);

    // Keep phaseRef in sync
    useEffect(() => {
        phaseRef.current = phase;
    }, [phase]);

    // Extract logo edges using alpha-boundary edge detection
    const extractEdges = useCallback((
        img: HTMLImageElement,
        canvasWidth: number,
        canvasHeight: number
    ): { edges: EdgeSegment[]; dominant: { r: number; g: number; b: number }; bounds: { x: number; y: number; w: number; h: number } } => {
        const offscreen = document.createElement('canvas');
        const ctx = offscreen.getContext('2d', { willReadFrequently: true });
        if (!ctx) return { edges: [], dominant: { r: 180, g: 180, b: 180 }, bounds: { x: 0, y: 0, w: 0, h: 0 } };

        const maxLogoSize = Math.min(canvasWidth, canvasHeight) * 0.32;
        const scale = Math.min(maxLogoSize / img.width, maxLogoSize / img.height);
        const logoW = Math.floor(img.width * scale);
        const logoH = Math.floor(img.height * scale);
        const offsetX = Math.floor((canvasWidth - logoW) / 2);
        const offsetY = Math.floor((canvasHeight - logoH) / 2);

        offscreen.width = logoW;
        offscreen.height = logoH;
        ctx.drawImage(img, 0, 0, logoW, logoH);

        const imageData = ctx.getImageData(0, 0, logoW, logoH);
        const data = imageData.data;

        // Sample dominant color from visible pixels
        let totalR = 0, totalG = 0, totalB = 0, count = 0;
        for (let i = 0; i < data.length; i += 4) {
            if (data[i + 3] > 60) {
                totalR += data[i];
                totalG += data[i + 1];
                totalB += data[i + 2];
                count++;
            }
        }
        const dominant = count > 0
            ? { r: Math.round(totalR / count), g: Math.round(totalG / count), b: Math.round(totalB / count) }
            : { r: 180, g: 180, b: 180 };

        // Edge detection: find alpha boundaries
        const edgePoints: { x: number; y: number; r: number; g: number; b: number }[] = [];

        for (let y = 1; y < logoH - 1; y++) {
            for (let x = 1; x < logoW - 1; x++) {
                const idx = (y * logoW + x) * 4;
                const a = data[idx + 3];
                const aUp = data[((y - 1) * logoW + x) * 4 + 3];
                const aDown = data[((y + 1) * logoW + x) * 4 + 3];
                const aLeft = data[(y * logoW + (x - 1)) * 4 + 3];
                const aRight = data[(y * logoW + (x + 1)) * 4 + 3];

                const isEdge = a > 40 && (aUp <= 40 || aDown <= 40 || aLeft <= 40 || aRight <= 40);

                if (isEdge) {
                    edgePoints.push({
                        x: x + offsetX,
                        y: y + offsetY,
                        r: data[idx],
                        g: data[idx + 1],
                        b: data[idx + 2]
                    });
                }
            }
        }

        // Connect nearby edge points into line segments
        const edges: EdgeSegment[] = [];
        const used = new Set<number>();
        const cx = canvasWidth / 2;
        const cy = canvasHeight / 2;

        for (let i = 0; i < edgePoints.length; i++) {
            if (used.has(i)) continue;

            let bestJ = -1;
            let bestDist = 6;

            for (let j = i + 1; j < Math.min(i + 80, edgePoints.length); j++) {
                if (used.has(j)) continue;
                const dx = edgePoints[j].x - edgePoints[i].x;
                const dy = edgePoints[j].y - edgePoints[i].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist > 1.5 && dist < bestDist) {
                    bestDist = dist;
                    bestJ = j;
                }
            }

            if (bestJ !== -1) {
                const p1 = edgePoints[i];
                const p2 = edgePoints[bestJ];

                // Delay: lines closer to center draw first, radiating outward
                const midX = (p1.x + p2.x) / 2;
                const midY = (p1.y + p2.y) / 2;
                const distFromCenter = Math.sqrt((midX - cx) ** 2 + (midY - cy) ** 2);
                const maxRadius = Math.sqrt((logoW / 2) ** 2 + (logoH / 2) ** 2);
                const normalizedDist = distFromCenter / maxRadius;

                edges.push({
                    x1: p1.x, y1: p1.y,
                    x2: p2.x, y2: p2.y,
                    progress: 0,
                    delay: 1.8 + normalizedDist * 2.5 + Math.random() * 0.3,
                    speed: 0.04 + Math.random() * 0.03,
                    r: p1.r, g: p1.g, b: p1.b,
                    alpha: 0,
                    layer: 'edge'
                });

                used.add(bestJ);
            }
        }

        // Construction guide lines (vertical pillars + horizontal beams)
        const bMinX = offsetX;
        const bMaxX = offsetX + logoW;
        const bMinY = offsetY;
        const bMaxY = offsetY + logoH;

        // Vertical guides
        for (let i = 0; i <= 10; i++) {
            const x = bMinX + (logoW * i / 10);
            edges.push({
                x1: x, y1: cy, x2: x, y2: bMinY - 25,
                progress: 0, delay: i * 0.06, speed: 0.018,
                r: dominant.r, g: dominant.g, b: dominant.b,
                alpha: 0, layer: 'guide'
            });
            edges.push({
                x1: x, y1: cy, x2: x, y2: bMaxY + 25,
                progress: 0, delay: i * 0.06 + 0.03, speed: 0.018,
                r: dominant.r, g: dominant.g, b: dominant.b,
                alpha: 0, layer: 'guide'
            });
        }

        // Horizontal guides
        for (let i = 0; i <= 8; i++) {
            const y = bMinY + (logoH * i / 8);
            edges.push({
                x1: cx, y1: y, x2: bMinX - 25, y2: y,
                progress: 0, delay: 0.2 + i * 0.06, speed: 0.018,
                r: dominant.r, g: dominant.g, b: dominant.b,
                alpha: 0, layer: 'guide'
            });
            edges.push({
                x1: cx, y1: y, x2: bMaxX + 25, y2: y,
                progress: 0, delay: 0.2 + i * 0.06 + 0.03, speed: 0.018,
                r: dominant.r, g: dominant.g, b: dominant.b,
                alpha: 0, layer: 'guide'
            });
        }

        // Scaffold diagonals
        const scaffolds = [
            { x1: cx, y1: cy, x2: bMinX - 20, y2: bMinY - 20 },
            { x1: cx, y1: cy, x2: bMaxX + 20, y2: bMinY - 20 },
            { x1: cx, y1: cy, x2: bMinX - 20, y2: bMaxY + 20 },
            { x1: cx, y1: cy, x2: bMaxX + 20, y2: bMaxY + 20 },
            { x1: bMinX, y1: bMinY, x2: bMaxX, y2: bMaxY },
            { x1: bMaxX, y1: bMinY, x2: bMinX, y2: bMaxY },
        ];
        scaffolds.forEach((s, idx) => {
            edges.push({
                ...s, progress: 0, delay: 0.5 + idx * 0.08, speed: 0.02,
                r: dominant.r, g: dominant.g, b: dominant.b,
                alpha: 0, layer: 'scaffold'
            });
        });

        // Measurement rulers
        edges.push({
            x1: bMinX - 35, y1: bMinY, x2: bMinX - 35, y2: bMaxY,
            progress: 0, delay: 0.9, speed: 0.015,
            r: dominant.r, g: dominant.g, b: dominant.b,
            alpha: 0, layer: 'scaffold'
        });
        edges.push({
            x1: bMinX, y1: bMaxY + 35, x2: bMaxX, y2: bMaxY + 35,
            progress: 0, delay: 0.95, speed: 0.015,
            r: dominant.r, g: dominant.g, b: dominant.b,
            alpha: 0, layer: 'scaffold'
        });

        // Measurement ticks
        for (let i = 0; i <= 5; i++) {
            const tickY = bMinY + (logoH * i / 5);
            edges.push({
                x1: bMinX - 40, y1: tickY, x2: bMinX - 30, y2: tickY,
                progress: 0, delay: 1.0 + i * 0.04, speed: 0.05,
                r: dominant.r, g: dominant.g, b: dominant.b,
                alpha: 0, layer: 'scaffold'
            });
        }
        for (let i = 0; i <= 5; i++) {
            const tickX = bMinX + (logoW * i / 5);
            edges.push({
                x1: tickX, y1: bMaxY + 30, x2: tickX, y2: bMaxY + 40,
                progress: 0, delay: 1.05 + i * 0.04, speed: 0.05,
                r: dominant.r, g: dominant.g, b: dominant.b,
                alpha: 0, layer: 'scaffold'
            });
        }

        return {
            edges,
            dominant,
            bounds: { x: offsetX, y: offsetY, w: logoW, h: logoH }
        };
    }, []);

    useEffect(() => {
        if (phase === 'hidden') return;

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        resize();
        window.addEventListener('resize', resize);

        const logo = new Image();
        logo.crossOrigin = 'anonymous';
        logo.src = '/logo.webp';

        logo.onload = () => {
            logoRef.current = logo;
            const { edges, dominant, bounds } = extractEdges(logo, width, height);
            if (edges.length === 0) return;
            dominantColorRef.current = dominant;
            edgesRef.current = edges;
            logoBoundsRef.current = bounds;
            logoLoadedRef.current = true;
        };

        logo.onerror = () => {
            logoLoadedRef.current = true;
        };

        const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);
        const easeInOutCubic = (t: number): number =>
            t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const animate = () => {
            timeRef.current += 0.016;
            const t = timeRef.current;
            const currentPhase = phaseRef.current;

            ctx.clearRect(0, 0, width, height);

            // Slate-900 background
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, width, height);

            if (!logoLoadedRef.current) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            const dc = dominantColorRef.current;

            // Slow cinematic camera orbit
            cameraAngleRef.current += 0.0018;
            const camAngle = cameraAngleRef.current;
            const camX = Math.sin(camAngle) * 4;
            const camY = Math.cos(camAngle * 0.65) * 2.5;

            const edges = edgesRef.current;

            // ─── Draw construction guides & scaffolding ───
            if (currentPhase === 'tracing' || currentPhase === 'constructing') {
                for (let i = 0; i < edges.length; i++) {
                    const seg = edges[i];
                    if (seg.layer === 'edge') continue;
                    if (t < seg.delay) continue;

                    seg.progress = Math.min(1, seg.progress + seg.speed);
                    const p = easeOutQuart(seg.progress);

                    const x1 = seg.x1 + camX;
                    const y1 = seg.y1 + camY;
                    const x2 = seg.x1 + (seg.x2 - seg.x1) * p + camX;
                    const y2 = seg.y1 + (seg.y2 - seg.y1) * p + camY;

                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);

                    if (seg.layer === 'guide') {
                        ctx.strokeStyle = `rgba(${dc.r}, ${dc.g}, ${dc.b}, ${0.12 * p})`;
                        ctx.lineWidth = 0.6;
                    } else {
                        ctx.strokeStyle = `rgba(${dc.r}, ${dc.g}, ${dc.b}, ${0.08 * p})`;
                        ctx.lineWidth = 0.4;
                        ctx.setLineDash([3, 4]);
                    }

                    ctx.stroke();
                    ctx.setLineDash([]);

                    // Node dots at guide endpoints
                    if (seg.progress >= 0.98 && seg.layer === 'guide') {
                        ctx.beginPath();
                        ctx.arc(x2, y2, 1.2, 0, Math.PI * 2);
                        ctx.fillStyle = `rgba(${dc.r}, ${dc.g}, ${dc.b}, ${0.3 * p})`;
                        ctx.fill();
                    }
                }
            }

            // ─── Draw logo edge segments (clean vector lines) ───
            if (currentPhase === 'constructing' || currentPhase === 'reveal') {
                for (let i = 0; i < edges.length; i++) {
                    const seg = edges[i];
                    if (seg.layer !== 'edge') continue;
                    if (t < seg.delay) continue;

                    seg.progress = Math.min(1, seg.progress + seg.speed);
                    const p = easeInOutCubic(seg.progress);
                    seg.alpha = Math.min(0.95, seg.alpha + 0.03);

                    const x1 = seg.x1 + camX;
                    const y1 = seg.y1 + camY;
                    const x2 = seg.x1 + (seg.x2 - seg.x1) * p + camX;
                    const y2 = seg.y1 + (seg.y2 - seg.y1) * p + camY;

                    // Soft glow underneath
                    if (seg.alpha > 0.1) {
                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);
                        ctx.strokeStyle = `rgba(${seg.r}, ${seg.g}, ${seg.b}, ${seg.alpha * 0.15})`;
                        ctx.lineWidth = 4;
                        ctx.stroke();
                    }

                    // Crisp edge stroke
                    ctx.beginPath();
                    ctx.moveTo(x1, y1);
                    ctx.lineTo(x2, y2);
                    ctx.strokeStyle = `rgba(${seg.r}, ${seg.g}, ${seg.b}, ${seg.alpha})`;
                    ctx.lineWidth = 1.2;
                    ctx.stroke();
                }
            }

            // ─── Reveal phase: fade guides, show crisp logo ───
            if (currentPhase === 'reveal') {
               const revealT = Math.min(1, (t - 5.5) * 0.55);
                const guideFade = Math.max(0, 1 - revealT * 2.5);

                // Fade out guides & scaffolding
                if (guideFade > 0) {
                    for (let i = 0; i < edges.length; i++) {
                        const seg = edges[i];
                        if (seg.layer === 'edge') continue;
                        if (seg.progress < 0.5) continue;

                        const x1 = seg.x1 + camX;
                        const y1 = seg.y1 + camY;
                        const x2 = seg.x2 + camX;
                        const y2 = seg.y2 + camY;

                        ctx.beginPath();
                        ctx.moveTo(x1, y1);
                        ctx.lineTo(x2, y2);

                        const baseAlpha = seg.layer === 'guide' ? 0.12 : 0.08;
                        ctx.strokeStyle = `rgba(${dc.r}, ${dc.g}, ${dc.b}, ${baseAlpha * guideFade})`;
                        ctx.lineWidth = seg.layer === 'guide' ? 0.6 : 0.4;
                        if (seg.layer === 'scaffold') ctx.setLineDash([3, 4]);
                        ctx.stroke();
                        ctx.setLineDash([]);
                    }
                }

                // Fade in the crisp original logo image
               if (logoRef.current && revealT > 0.15) {
                    const logoAlpha = Math.min(1, (revealT - 0.15) * 1.5);
                    ctx.save();
                    ctx.globalAlpha = logoAlpha;
                    const img = logoRef.current;
                    const b = logoBoundsRef.current;
                    ctx.drawImage(img, b.x + camX, b.y + camY, b.w, b.h);
                    ctx.restore();
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationRef.current);
            window.removeEventListener('resize', resize);
        };
    }, [extractEdges, phase]);

    // Phase transitions
    useEffect(() => {
        if (phase === 'hidden') return;

        if (phase === 'tracing') {
            const timer = setTimeout(() => setPhase('constructing'), 1000);
            return () => clearTimeout(timer);
        }
        if (phase === 'constructing') {
            const timer = setTimeout(() => setPhase('reveal'), 1500);
            return () => clearTimeout(timer);
        }
        if (phase === 'reveal') {
            const timer = setTimeout(() => setPhase('fadeout'), 2000);
            return () => clearTimeout(timer);
        }
        if (phase === 'fadeout') {
            const timer = setTimeout(() => {
                cancelAnimationFrame(animationRef.current);
                setPhase('hidden');
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [phase]);

    if (phase === 'hidden') return null;

    return (
        <div className={`preloader-container ${phase}`}>
            <canvas ref={canvasRef} className="preloader-canvas" />
        </div>
    );
}
