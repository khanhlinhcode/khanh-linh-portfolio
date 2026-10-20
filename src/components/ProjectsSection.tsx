import { projects } from '../data/projects';
import type { TranslationDictionary } from '../i18n/translations';
import ProjectCard from './ProjectCard';
import SectionTitle from './SectionTitle';

export default function ProjectsSection({ t }: { t: TranslationDictionary }) {
  const featuredProject = projects.find((project) => project.featured) ?? projects[0]!;
  const secondaryProjects = projects.filter((project) => project.id !== featuredProject.id);

  return (
    <section className="section" id="projects">
      <SectionTitle {...t.sections.projects} />
      <div className="featured-project">
        <ProjectCard project={featuredProject} t={t} />
      </div>
      {(['ai', 'engineering'] as const).map((group) => (
        <div className="project-group" key={group} role="group" aria-labelledby={`projects-${group}`}>
          <h3 className="project-group-title" id={`projects-${group}`}>{t.projectGroups[group]}</h3>
          <div className="projects-grid">
            {secondaryProjects.filter((project) => project.group === group).map((project) => (
              <ProjectCard project={project} key={project.id} t={t} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
