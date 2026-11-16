'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { HeroBackground } from './hero-background';

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const opacity = useTransform(scrollYProgress, [0, .65], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, .94]);
  return <section ref={ref} className="hero" aria-labelledby="hero-title">
    <HeroBackground />
    <motion.div className="hero-content shell" style={reduced ? undefined : { y, opacity, scale }}>
      <p className="hero-kicker"><span className="status-dot" /> JUNIOR WEB DEVELOPER <span className="kicker-divider">/</span> CASABLANCA, MOROCCO</p>
      <h1 id="hero-title"><span className="hero-title-line">I build websites that</span><span className="hero-title-line hero-title-muted">bring your brand to life.</span></h1>
      <p className="hero-description">Thoughtful interfaces. Purposeful experiences.<br />Websites, dashboards, and workflows built to make a difference.</p>
      <div className="hero-actions">
        <a className="button hero-work" href="#work">Explore my work <span aria-hidden="true">»</span></a>
        <a className="button hero-contact" href="#contact">Let’s talk <span aria-hidden="true">↗</span></a>
      </div>
    </motion.div>
    <div className="hero-bottom shell"><span>DESIGN WITH PURPOSE. CODE WITH CARE.</span><a href="#about">SCROLL TO DISCOVER <span aria-hidden="true">↓</span></a></div>
    <noscript><style>{`.background-toggle{display:none!important}.hero-content,.hero-content *{animation:none!important;opacity:1!important;transform:none!important}`}</style></noscript>
  </section>;
}
