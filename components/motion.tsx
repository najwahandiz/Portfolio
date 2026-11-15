'use client';
import { useEffect, useRef } from 'react';
import { animate, useInView, useReducedMotion } from 'motion/react';
export function Entrance({ children, delay = 0 }: {children: React.ReactNode; delay?: number}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced || !ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const controls = animate(ref.current, {opacity:[0,1], y:[16,0]}, {duration:.6,delay,ease:[.22,1,.36,1]});
    return () => controls.stop();
  }, [reduced, delay]);
  return <div ref={ref}>{children}</div>;
}
export function Reveal({ children, index = 0 }: {children: React.ReactNode; index?: number}) {
  const ref=useRef<HTMLDivElement>(null);
  const inView=useInView(ref,{once:true,amount:.12});
  const reduced=useReducedMotion();
  useEffect(()=>{
    if (!inView || reduced || !ref.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const controls=animate(ref.current,{opacity:[.25,1],y:[52,0],scale:[.97,1]},{duration:.8,delay:(index%2)*.11,ease:[.22,1,.36,1]});
    return ()=>controls.stop();
  },[inView,reduced,index]);
  return <div ref={ref} className="reveal">{children}</div>;
}
