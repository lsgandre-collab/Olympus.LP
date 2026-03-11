"use client";

import { useEffect, useRef } from "react";

export function GlobalDots() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      alpha: number;
      agentName: string;
    }> = [];

    // Traveling connection lines
    let travelingLines: Array<{
      sourceIdx: number;
      targetIdx: number;
      progress: number; // 0 to 1
      color: string; // "teal" or "gold"
    }> = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // 10 Agent colors
    const AGENT_COLORS: Record<string, [number, number, number]> = {
      Apollo: [139, 92, 246],      // #8b5cf6
      Artemis: [34, 197, 94],      // #22c55e
      Hermes: [59, 130, 246],      // #3b82f6
      Ares: [234, 179, 8],         // #eab308
      Hefesto: [249, 115, 22],     // #f97316
      Demeter: [20, 184, 166],     // #14b8a6
      Atena: [236, 72, 153],       // #ec4899
      Caliope: [168, 85, 247],     // #a855f7
      Plutus: [99, 102, 241],      // #6366f1
      Iris: [212, 175, 119],       // #d4af77
    };

    const AGENT_NAMES = Object.keys(AGENT_COLORS);
    const TEAL = [20, 184, 166];
    const GOLD = [234, 179, 8];
    const PARTICLE_COUNT = 80;
    const CONNECTION_DIST = 250;
    const MIN_ALPHA = 0.15;
    const MAX_ALPHA = 0.45;
    const MAX_TRAVELING_LINES = 8;
    const TRAVELING_LINE_DURATION = 2500; // milliseconds

    function initParticles() {
      particles = [];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const agentName = AGENT_NAMES[i % AGENT_NAMES.length];
        const c = AGENT_COLORS[agentName];
        particles.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: Math.random() * 1.5 + 1.5,
          color: `${c[0]},${c[1]},${c[2]}`,
          alpha: Math.random() * (MAX_ALPHA - MIN_ALPHA) + MIN_ALPHA,
          agentName,
        });
      }
    }

    function createTravelingLine() {
      if (particles.length < 2) return;

      const sourceIdx = Math.floor(Math.random() * particles.length);
      let targetIdx = sourceIdx;

      // Find a nearby target
      let nearbyIndices = [];
      for (let i = 0; i < particles.length; i++) {
        if (i === sourceIdx) continue;
        const dx = particles[i].x - particles[sourceIdx].x;
        const dy = particles[i].y - particles[sourceIdx].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          nearbyIndices.push(i);
        }
      }

      if (nearbyIndices.length === 0) return;

      targetIdx = nearbyIndices[Math.floor(Math.random() * nearbyIndices.length)];
      const color = Math.random() > 0.5 ? "teal" : "gold";

      travelingLines.push({
        sourceIdx,
        targetIdx,
        progress: 0,
        color,
      });
    }

    function draw() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      // Draw particles
      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx!.fill();

        // Enhanced glow
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(${p.color},${p.alpha * 0.4})`;
        ctx!.fill();
      }

      // Update and draw traveling lines
      travelingLines = travelingLines.filter((line) => {
        line.progress += 1 / (TRAVELING_LINE_DURATION / 16); // ~16ms per frame

        if (line.progress > 1) return false; // Remove completed lines

        const source = particles[line.sourceIdx];
        const target = particles[line.targetIdx];

        // Interpolate position
        const currentX = source.x + (target.x - source.x) * line.progress;
        const currentY = source.y + (target.y - source.y) * line.progress;

        // Fade out as it reaches destination
        const opacity = (1 - line.progress) * 0.25;

        const lineColor = line.color === "teal" ? TEAL : GOLD;
        ctx!.strokeStyle = `rgba(${lineColor[0]},${lineColor[1]},${lineColor[2]},${opacity})`;
        ctx!.lineWidth = 2;
        ctx!.lineCap = "round";

        ctx!.beginPath();
        ctx!.moveTo(source.x, source.y);
        ctx!.lineTo(currentX, currentY);
        ctx!.stroke();

        // Glow effect on the line
        ctx!.strokeStyle = `rgba(${lineColor[0]},${lineColor[1]},${lineColor[2]},${opacity * 0.5})`;
        ctx!.lineWidth = 4;
        ctx!.beginPath();
        ctx!.moveTo(source.x, source.y);
        ctx!.lineTo(currentX, currentY);
        ctx!.stroke();

        return true;
      });

      // Create new traveling lines if needed
      while (travelingLines.length < MAX_TRAVELING_LINES && Math.random() > 0.7) {
        createTravelingLine();
      }

      // Update particle positions
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges softly
        if (p.x - p.size < 0 || p.x + p.size > canvas!.width) p.vx *= -1;
        if (p.y - p.size < 0 || p.y + p.size > canvas!.height) p.vy *= -1;

        // Gentle alpha breathing
        p.alpha += (Math.random() - 0.5) * 0.008;
        p.alpha = Math.max(MIN_ALPHA, Math.min(MAX_ALPHA, p.alpha));
      }

      animationId = requestAnimationFrame(draw);
    }

    resize();
    initParticles();
    draw();

    window.addEventListener("resize", () => {
      resize();
      initParticles();
    });

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
      style={{ opacity: 0.8 }}
    />
  );
}
