'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export function AboutSection({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 15%'] });
  const ribbonY = useTransform(scrollYProgress, [0, 1], [65, -35]);
  const ribbonScale = useTransform(scrollYProgress, [0, 1], [.78, 1.12]);
  const ribbonRotate = useTransform(scrollYProgress, [0, 1], [-8, 4]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return <section ref={ref} id="about" className="about section" aria-labelledby="about-title">
    <div className="about-atmosphere" aria-hidden="true" />
    <div className="about-bridge" aria-hidden="true">
      <motion.svg className="about-ribbons" viewBox="0 0 1440 260" preserveAspectRatio="none" style={reduced ? undefined : { y: ribbonY, scale: ribbonScale, rotate: ribbonRotate }}>
        <defs><linearGradient id="about-ribbon-color"><stop stopColor="#86a9ff" stopOpacity=".1" /><stop offset=".4" stopColor="#c4a0fb" stopOpacity=".7" /><stop offset=".75" stopColor="#e8a2ca" stopOpacity=".5" /><stop offset="1" stopColor="#9770f3" stopOpacity=".05" /></linearGradient></defs>
        {Array.from({ length: 18 }, (_, i) => <path key={i} d={`M -100 ${22 + i * 6} C 320 ${260 + i * 2}, 690 ${-110 + i * 9}, 1540 ${100 + i * 6}`} fill="none" stroke="url(#about-ribbon-color)" strokeWidth=".8" />)}
      </motion.svg>
      <div className="about-chapter shell"><span>01 / A LITTLE INTRODUCTION</span><motion.i style={reduced ? undefined : { scaleX: lineScale }} /><span>THE HUMAN BEHIND THE WORK <b>↘</b></span></div>
    </div>
    {children}
  </section>;
}
