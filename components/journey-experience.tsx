'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';

type Chapter={id:string;year:string;label:string;content:React.ReactNode};

function ChapterStep({chapter,index,active,onActive}:{chapter:Chapter;index:number;active:boolean;onActive:(index:number)=>void}){
  const ref=useRef<HTMLLIElement>(null);
  const [ready,setReady]=useState(false);
  const reduced=useReducedMotion();
  const inCenter=useInView(ref,{margin:'-35% 0px -35% 0px',amount:'some'});
  const {scrollYProgress}=useScroll({target:ref,offset:['start 90%','start 40%']});
  const y=useTransform(scrollYProgress,[0,1],[65,0]);
  const opacity=useTransform(scrollYProgress,[0,1],[.3,1]);
  useEffect(()=>setReady(true),[]);
  useEffect(()=>{if(inCenter)onActive(index)},[inCenter,index,onActive]);
  return <li ref={ref} id={`journey-${chapter.id}`} className={`time-chapter ${active?'is-active':''}`}>
    <span className="chapter-node" aria-hidden="true"/>
    <motion.div className="chapter-content" initial={false} style={ready&&!reduced?{y,opacity}:undefined}>{chapter.content}</motion.div>
  </li>;
}

export function JourneyExperience({chapters}:{chapters:Chapter[]}){
  const ref=useRef<HTMLDivElement>(null);
  const [active,setActive]=useState(0);
  const [ready,setReady]=useState(false);
  const reduced=useReducedMotion();
  const {scrollYProgress}=useScroll({target:ref,offset:['start 50%','end 65%']});
  useEffect(()=>setReady(true),[]);
  return <div className="time-experience" ref={ref}>
    <div className="time-intro">
      <p className="eyebrow">A LITTLE OF MY JOURNEY</p>
      <h2 id="journey-title">Let’s go back<br/><em>in time.</em></h2>
      <p className="time-intro-copy">From what I’m building today<br/>to where it all began.</p>
      <div className="time-year" aria-hidden="true"><AnimatePresence mode="wait" initial={false}><motion.span key={chapters[active].year} initial={reduced?false:{opacity:0,y:22}} animate={{opacity:1,y:0}} exit={reduced?undefined:{opacity:0,y:-22}} transition={{duration:.25}}>{chapters[active].year}</motion.span></AnimatePresence><span className="time-year-caption">{String(active+1).padStart(2,'0')} / {String(chapters.length).padStart(2,'0')} · SCROLL BACK IN TIME ↓</span></div>
      <nav className="time-chapters-nav" aria-label="Journey chapters">{chapters.map((chapter,index)=><a key={chapter.id} href={`#journey-${chapter.id}`} aria-current={active===index?'step':undefined}><span aria-hidden="true">{String(index+1).padStart(2,'0')}</span>{chapter.label}</a>)}</nav>
    </div>
    <div className="time-track">
      <div className="time-track-line" aria-hidden="true"><motion.div className="time-track-progress" style={ready&&!reduced?{scaleY:scrollYProgress}:undefined}/></div>
      <ol className="time-chapters">{chapters.map((chapter,index)=><ChapterStep key={chapter.id} chapter={chapter} index={index} active={active===index} onActive={setActive}/>)}</ol>
    </div>
  </div>;
}
