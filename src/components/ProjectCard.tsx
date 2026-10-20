import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '../data/projects';
import type { TranslationDictionary } from '../i18n/translations';

function getProjectCopy(project: Project, t: TranslationDictionary) {
  return t.projects[project.id];
}

export default function ProjectCard({ project, t }: { project: Project; t: TranslationDictionary }) {
  const copy = getProjectCopy(project, t);
  const hasGithubLink = project.links.some((link) => link.kind === 'github');

  return (
    <article className={`project-card ${project.featured ? 'featured' : ''}`} data-liquid-hover="card" data-project-id={project.id}>
      <div className="project-topline">
        <div className="project-label-stack">
          {project.featured ? (
            <span className="featured-badge" data-liquid-hover="chip">{t.hero.featuredProject}</span>
          ) : null}
          <span className="project-category">{copy.category}</span>
        </div>
        {project.links.length > 0 && (hasGithubLink ? (
          <Github className="project-corner-icon" size={18} aria-hidden="true" />
        ) : (
          <ExternalLink className="project-corner-icon" size={18} aria-hidden="true" />
        ))}
      </div>
      <h3>{project.name}</h3>
      <span className="project-status">{t.projectStatuses[project.status]}</span>
      <p>{copy.description}</p>
      <div className="tags compact" aria-label={`${project.name} technology stack`}>
        {project.stack.map((item) => (
          <span data-liquid-hover="chip" key={item}>{item}</span>
        ))}
      </div>
      <ul>
        {copy.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <p className="project-limitation">{copy.limitation}</p>
      {project.links.length > 0 && <div className="project-links" aria-label={project.name}>
        {project.links.map((link) => {
          const label = (link.kind && t.projectLinkLabels[link.kind]) || link.label;

          return (
            <a
              aria-label={`${label} — ${project.name}`}
              data-liquid-hover="control"
              href={link.url}
              key={`${link.kind ?? link.label}-${link.url}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              {label} <ExternalLink size={15} aria-hidden="true" />
            </a>
          );
        })}
      </div>}
    </article>
  );
}
