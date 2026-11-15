import { journey } from '@/data/journey';
import { JourneyExperience } from './journey-experience';

export function Journey(){
  return <section className="shell time-journey" aria-labelledby="journey-title">
    <JourneyExperience chapters={journey.map((entry,index)=>({id:entry.id,year:entry.year,label:entry.organization,content:<>
      <div className="chapter-topline"><span>CHAPTER {String(index+1).padStart(2,'0')}</span><span>{entry.category}</span></div>
      <p className="chapter-period">{entry.period}{entry.current&&<span className="chapter-current">Current</span>}</p>
      <h3>{entry.title}</h3><p className="chapter-organization">{entry.organization}</p><p className="chapter-description">{entry.description}</p>
    </>}))}/>
  </section>;
}
