'use client';

import { useState } from 'react';

export function HeroBackground() {
  const [paused, setPaused] = useState(false);
  return <>
    <div className={`hero-background ${paused ? 'is-paused' : ''}`} aria-hidden="true">
      <div className="ambient-light ambient-one" />
      <div className="ambient-light ambient-two" />
      <div className="ambient-rings"><span /><span /><span /></div>
      <div className="ambient-trail trail-one" /><div className="ambient-trail trail-two" />
    </div>
    <button className="background-toggle" type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>
      <span aria-hidden="true">{paused ? '▷' : 'Ⅱ'}</span> {paused ? 'Resume background motion' : 'Pause background motion'}
    </button>
  </>;
}
