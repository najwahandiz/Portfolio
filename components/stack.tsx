import { logos } from '@/data/technologies';
const aliases: Record<string,string> = { 'Vue 3':'Vue.js', 'Laravel 10':'Laravel', 'Laravel Blade':'Laravel', 'Blade':'Laravel', 'HTML':'HTML5', 'GTM':'Google Tag Manager', 'GA4':'Google Analytics 4', 'GA4 Data API':'Google Analytics 4', 'Google Search Console API':'Google Search Console', 'Gemini':'Google Gemini' };
export function Stack({ names, compact = false }: { names: string[]; compact?: boolean }) {
  const items = new Map<string,string[]>();
  for(const name of names){const src=logos[aliases[name]||name];if(src)items.set(src,[...(items.get(src)||[]),name]);}
  return <ul className={`stack logo-stack ${compact ? 'compact' : ''}`} aria-label="Technologies used">{[...items].map(([src,labels])=><li key={src}><img src={src} width="28" height="28" alt={labels.join(' / ')} title={labels.join(' / ')} loading="lazy"/><span className="logo-tooltip" aria-hidden="true">{labels.join(' / ')}</span></li>)}</ul>;
}
