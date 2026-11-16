'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

/** Shared, scroll-driven light trails keep each chapter part of the same scene. */
export function SectionFrame({ id, className, children, labelledBy }: {
  id: string; className: string; children: React.ReactNode; labelledBy: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 10%'] });
  const y = useTransform(scrollYProgress, [0, 1], [55, -25]);
  const scaleX = useTransform(scrollYProgress, [0, 1], [.8, 1.08]);
  const opacity = useTransform(scrollYProgress, [0, 1], [.25, .8]);
  return <section ref={ref} id={id} className={`section-frame ${className}`} aria-labelledby={labelledBy}>
    <div className="section-light" aria-hidden="true">
      <motion.svg viewBox="0 0 1440 180" preserveAspectRatio="none" style={reduced ? undefined : { y, scaleX, opacity }}>
        {Array.from({length:12}, (_, i) => <path key={i} d={`M -80 ${35+i*6} C 350 ${210+i*3}, 900 ${-90+i*9}, 1520 ${65+i*6}`} fill="none" stroke={i%3===0?'#e7a7ce':i%3===1?'#b699f5':'#8ba9ec'} strokeOpacity=".28" strokeWidth=".8" />)}
      </motion.svg>
    </div>
    <div className="shell section-frame-content">{children}</div>
  </section>;
}
