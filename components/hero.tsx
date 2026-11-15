import { HeroBackground } from './hero-background';

export function Hero() {
  return <section className="hero shell" aria-labelledby="hero-title">
    <HeroBackground />
    <div className="hero-welcome" aria-hidden="true">
      <img src="/assets/nh-mark.png" alt="" width="88" height="88" fetchPriority="high" />
      <p>WELCOME TO MY PORTFOLIO</p>
      <span className="welcome-name">Najwa Handiz</span>
      <span className="welcome-rule" />
      <span className="welcome-role">JUNIOR WEB DEVELOPER</span>
    </div>
    <div className="hero-content">
      <div className="hero-kicker"><span className="status-dot" /> JUNIOR WEB DEVELOPER <span className="kicker-divider">/</span> CASABLANCA, MOROCCO</div>
      <h1 id="hero-title" className="text-balance"><span className="hero-title-line">I build websites that</span>{' '}<span className="hero-title-line"><em>showcase your brand</em></span>{' '}<span className="hero-title-line">and drive conversions<span className="rose-period">.</span></span></h1>
      <p className="hero-description">Thoughtful interfaces. Purposeful experiences.<br />From brand websites and conversion dashboards to<br className="desktop-break" /> AI-assisted analysis and CRM automation workflows.</p>
      <a className="button primary" href="#work">Explore my work <span aria-hidden="true">↘</span></a>
      <div className="hero-bottom"><span>DESIGN WITH PURPOSE. CODE WITH CARE.</span><span>SCROLL TO DISCOVER <span aria-hidden="true">↓</span></span></div>
    </div>
    <noscript><style>{`.hero-welcome,.background-toggle{display:none!important}.hero-content,.hero-content *{animation:none!important;opacity:1!important;transform:none!important}.hero-background *{animation:none!important}`}</style></noscript>
  </section>;
}
