'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';

export function AboutReveal({children, distance=48}:{children:React.ReactNode;distance?:number}) {
  const ref=useRef<HTMLDivElement>(null);
  const [ready,setReady]=useState(false);
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:['start 95%','start 50%']});
  const y=useTransform(scrollYProgress,[0,1],[distance,0]);
  const opacity=useTransform(scrollYProgress,[0,1],[.4,1]);
  useEffect(()=>setReady(true),[]);
  const enabled=ready&&!reduced;
  return <motion.div ref={ref} className="about-scroll-reveal" initial={false} style={enabled?{y,opacity}:undefined}>{children}</motion.div>;
}
