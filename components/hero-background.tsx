'use client';

import { useEffect, useRef, useState } from 'react';

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0, phase = 0, lastTime = 0, width = 0, height = 0;
    let visible = true;
    function draw() {
      if (!context) return;
      context.clearRect(0, 0, width, height);
      const center = width * (.5 + Math.sin(phase * .7) * .035);
      const glow = context.createRadialGradient(center, height * .58, 0, center, height * .58, width * .55);
      glow.addColorStop(0, 'rgba(130, 66, 220, .16)');
      glow.addColorStop(.45, 'rgba(86, 55, 160, .07)');
      glow.addColorStop(1, 'rgba(15, 7, 35, 0)');
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);
      for (let strand = 0; strand < 112; strand++) {
        const angle = strand / 112 * Math.PI * 2;
        context.beginPath();
        for (let step = 0; step <= 150; step++) {
          const t = step / 150;
          const waist = .57 + Math.sin(phase * .8) * .035;
          const radius = 48 + Math.pow(Math.abs(t - waist) * 2, 2.4) * width * .77;
          const twist = angle + t * 5.2 + phase + Math.sin(t * 9 + phase * 2) * .16;
          const x = center + Math.cos(twist) * radius;
          const y = height * (-.22 + t * 1.4) + Math.sin(twist) * radius * .22;
          if (step === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        }
        const hue = 270 + Math.sin(angle + phase * .6) * 48;
        const color = context.createLinearGradient(0, 0, width, height);
        color.addColorStop(0, `hsla(${hue - 30}, 90%, 73%, .35)`);
        color.addColorStop(.5, `hsla(${hue}, 85%, 79%, .5)`);
        color.addColorStop(1, `hsla(${hue + 20}, 85%, 68%, .3)`);
        context.strokeStyle = color;
        context.lineWidth = strand % 8 === 0 ? 1.1 : .65;
        context.stroke();
      }
      for (let ring = 0; ring < 48; ring++) {
        const radius = 95 + ring * ring * .65 + Math.sin(phase * 2 + ring * .12) * 14;
        context.beginPath();
        context.ellipse(center, height * .96, radius, 14 + radius * .15, -.05 + Math.sin(phase) * .035, 0, Math.PI * 2);
        context.strokeStyle = `hsla(${260 + ring * 1.3}, 75%, 74%, ${.27 - ring * .0035})`;
        context.stroke();
      }
      // Deterministic drifting lights keep the scene lively without visual noise.
      for (let dot = 0; dot < 38; dot++) {
        const x = ((dot * .618033 + Math.sin(phase * .3 + dot) * .025) % 1) * width;
        const y = ((dot * .381966 - phase * .04 % 1 + 2) % 1) * height;
        const alpha = .2 + (1 + Math.sin(phase * 2 + dot)) * .2;
        context.beginPath();
        context.arc(x, y, dot % 5 === 0 ? 1.7 : .85, 0, Math.PI * 2);
        context.fillStyle = `hsla(${235 + dot % 6 * 16},90%,82%,${alpha})`;
        context.fill();
      }
    }
    function tick(time: number) {
      if (time - lastTime > 30) {
        phase += Math.min(time - lastTime, 60) * .00018;
        lastTime = time;
        draw();
      }
      frame = requestAnimationFrame(tick);
    }
    function syncMotion() {
      cancelAnimationFrame(frame);
      draw();
      if (!paused && !motion.matches && visible && !document.hidden) {
        lastTime = performance.now();
        frame = requestAnimationFrame(tick);
      }
    }
    const resize = new ResizeObserver(([entry]) => {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    });
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      syncMotion();
    });
    resize.observe(canvas);
    observer.observe(canvas);
    motion.addEventListener('change', syncMotion);
    document.addEventListener('visibilitychange', syncMotion);
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      observer.disconnect();
      motion.removeEventListener('change', syncMotion);
      document.removeEventListener('visibilitychange', syncMotion);
    };
  }, [paused]);

  return <>
    <div className="hero-background" aria-hidden="true"><canvas ref={canvasRef} /></div>
    <button className="background-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
      <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span> {paused ? 'Resume background motion' : 'Pause background motion'}
    </button>
  </>;
}
