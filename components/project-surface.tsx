'use client';

import { motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import type { PointerEvent } from 'react';

export function ProjectSurface({children,variant}:{children:React.ReactNode;variant:'internship'|'learning'}) {
  const reduced=useReducedMotion();
  const tiltX=useMotionValue(0),tiltY=useMotionValue(0),lift=useMotionValue(0);
  const spring={stiffness:170,damping:24,mass:.65};
  const rotateX=useSpring(tiltX,spring),rotateY=useSpring(tiltY,spring),y=useSpring(lift,spring);
  function move(event:PointerEvent<HTMLElement>){
    if(reduced||event.pointerType!=='mouse')return;
    const rect=event.currentTarget.getBoundingClientRect();
    tiltX.set(-((event.clientY-rect.top)/rect.height-.5)*5);
    tiltY.set(((event.clientX-rect.left)/rect.width-.5)*5);
    lift.set(-7);
  }
  function reset(){tiltX.set(0);tiltY.set(0);lift.set(0);}
  return <motion.article className={`project-card work-card compact-project ${variant}-project`} initial={false}
    style={reduced?undefined:{rotateX,rotateY,y,transformPerspective:1200}}
    onPointerMove={move} onPointerLeave={reset}
    onFocusCapture={()=>{if(!reduced)lift.set(-5)}}
    onBlurCapture={event=>{if(!event.currentTarget.contains(event.relatedTarget))reset()}}>
    {children}
  </motion.article>;
}
