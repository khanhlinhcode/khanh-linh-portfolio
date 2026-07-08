import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/projects';
import type { TranslationDictionary } from '../i18n/translations';

function getProjectCopy(project: Project, t: TranslationDictionary) {
  return t.projects[project.name] ?? {
    category: project.category,
    description: project.description,
    features: project.features,
  };
}

export default function ProjectCard({ project, t }: { project: Project; t: TranslationDictionary }) {
  const copy = getProjectCopy(project, t);

  return (
    <article className={`project-card ${project.featured ? 'featured' : ''}`}>
      <div className="project-topline">
        <div className="project-label-stack">
          {project.featured ? <span className="featured-badge">{t.hero.featuredProject}</span> : null}
          <span className="project-category">{copy.category}</span>
        </div>
        <Github className="project-corner-icon" size={18} aria-hidden="true" />
      </div>
      <h3>{project.name}</h3>
      <p>{copy.description}</p>
      <div className="tags compact" aria-label={`${project.name} technology stack`}>
        {project.stack.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
      <ul>
        {copy.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="project-links">
        <a href={project.github} target="_blank" rel="noopener noreferrer">
          {t.actions.github} <ExternalLink size={15} aria-hidden="true" />
        </a>
        {project.demo ? (
          <a href={project.demo} target="_blank" rel="noopener noreferrer">
            {t.actions.liveDemo} <ExternalLink size={15} aria-hidden="true" />
          </a>
        ) : null}
      </div>
    </article>
  );
}
