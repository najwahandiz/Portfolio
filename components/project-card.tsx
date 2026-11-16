import Link from 'next/link';
import type { Project } from '@/data/projects';
import Image from 'next/image';
import { Reveal } from './motion';
import { ProjectSurface } from './project-surface';
import { Stack } from './stack';

const summaries: Record<string, string> = {
  'at-workflow': 'An agency operations platform. My contribution: employee leave balances, requests, and approvals.',
  'at-boost': 'A responsive business website, designed and built from scratch with a Laravel backend.',
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const learning = !project.professional;
  return <Reveal index={index}>
    <ProjectSurface variant={learning ? 'learning' : 'internship'}>
      {learning && <span className="learning-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
      <Link className="project-thumbnail" href={`/projects/${project.slug}`} aria-label={`Explore ${project.title}`}>
        <Image src={project.cover} alt={`${project.title} — ${project.caption}`} width={project.coverWidth} height={project.coverHeight} sizes={learning ? '(max-width: 700px) 85vw, 220px' : '(max-width: 700px) 90vw, 42vw'} />
      </Link>
      <div className="project-summary">
        <p className="project-kind">{project.category}</p>
        <h3><Link href={`/projects/${project.slug}`}>{project.title}<span className="project-open" aria-hidden="true">↗</span></Link></h3>
        <p className="project-excerpt">{summaries[project.slug] || project.description}</p>
      </div>
      <div className="project-technologies"><Stack names={project.technologies} compact /></div>
    </ProjectSurface>
  </Reveal>;
}
