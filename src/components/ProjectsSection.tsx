import { projects } from '../data/projects';
import type { TranslationDictionary } from '../i18n/translations';
import ProjectCard from './ProjectCard';
import SectionTitle from './SectionTitle';

export default function ProjectsSection({ t }: { t: TranslationDictionary }) {
  const featuredProject = projects.find((project) => project.featured) ?? projects[0]!;
  const secondaryProjects = projects.filter((project) => project.name !== featuredProject.name);

  return (
    <section className="section" id="projects">
      <SectionTitle {...t.sections.projects} />
      <div className="featured-project">
        <ProjectCard project={featuredProject} t={t} />
      </div>
      <div className="projects-grid">
        {secondaryProjects.map((project) => (
          <ProjectCard project={project} key={project.name} t={t} />
        ))}
      </div>
    </section>
  );
}
