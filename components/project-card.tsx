import Image from 'next/image';
import Link from 'next/link';
import type { Project } from '@/data/projects';
import { Stack } from './stack';
import { Reveal } from './motion';
import { ProjectSurface } from './project-surface';

export function ProjectCard({project:p,index,featured=false}:{project:Project;index:number;featured?:boolean}){
 const href=`/projects/${p.slug}`;
 return <Reveal index={index}><ProjectSurface featured={featured}>
  <div className="card-visual">
   <div className="card-window-bar"><span className="window-dots" aria-hidden="true"><i/><i/><i/></span><span>{p.professional?'ATIRAO / PROFESSIONAL':'PERSONAL / EXPLORATION'}</span><span className="card-number">{String(index+1).padStart(2,'0')}</span></div>
   <Link className="cover-link" href={href} aria-label={`Explore ${p.title} case study`}>
    <div className={`cover-frame ${p.coverKind==='screenshot'&&p.professional?'website-screenshot':''}`}>
     <Image src={p.cover} alt={`${p.title} — ${p.caption}`} width={p.coverWidth} height={p.coverHeight} sizes={featured?'(max-width: 700px) 100vw, 60vw':'(max-width: 700px) 100vw, 45vw'} className="project-image"/>
     <span className="card-image-sheen" aria-hidden="true"/>
     <div className="cover-overlay" aria-hidden="true"><span>Explore the project</span><span className="preview-arrow">↗</span></div>
    </div>
   </Link>
   <p className="project-caption">{p.coverLabel}</p>
  </div>
  <div className="card-body">
   <p className="card-category">{p.category}</p>
   <h3>{p.title}</h3>
   <p className="card-description">{p.slug==='at-workflow'?'A team-built agency platform. My focus: employee leave balances, requests, and approvals.':p.description}</p>
   <div className="card-role"><span>MY ROLE</span><p>{p.role}</p></div>
   <div className="card-footer"><Stack names={p.technologies} compact/><Link className="card-cta text-link" href={href} aria-label={`Read ${p.title} case study`}><span>View case study</span><span className="card-arrow" aria-hidden="true">↗</span></Link></div>
  </div>
 </ProjectSurface></Reveal>;
}
