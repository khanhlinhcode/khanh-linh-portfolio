import { Blocks, Code2, ExternalLink, FileDown, Mail, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import type { Project } from '../data/projects';
import { profile } from '../data/profile';
import type { TranslationDictionary } from '../i18n/translations';
import { AppButton } from './AppButton';

function getProjectCopy(project: Project, t: TranslationDictionary) {
  return t.projects[project.name] ?? {
    category: project.category,
    description: project.description,
    features: project.features,
  };
}

function HeroCvButton({ label, comingSoonLabel }: { label: string; comingSoonLabel: string }) {
  if (profile.cvUrl) {
    return (
      <AppButton href={profile.cvUrl} variant="ghost" download>
        <FileDown size={18} aria-hidden="true" /> {label}
      </AppButton>
    );
  }

  return (
    <AppButton disabled title={comingSoonLabel} variant="ghost">
      <FileDown size={18} aria-hidden="true" /> {comingSoonLabel}
    </AppButton>
  );
}

function HeroShowcase({ featuredProject, t }: { featuredProject: Project; t: TranslationDictionary }) {
  const copy = getProjectCopy(featuredProject, t);
  const focusIcons = [Code2, ShieldCheck, Sparkles, Blocks];

  return (
    <aside className="hero-showcase" aria-label="Portfolio snapshot">
      <div className="status-band">
        <span className="status-dot" aria-hidden="true" />
        <span>{t.hero.status}</span>
      </div>

      <div className="showcase-profile">
        <img src={profile.avatar} alt="" aria-hidden="true" />
        <div>
          <span className="status-pill">{t.hero.dashboard}</span>
          <strong>{profile.name}</strong>
          <small>{profile.location}</small>
        </div>
      </div>

      <div className="showcase-project">
        <div className="project-topline">
          <span>{t.hero.featuredProject}</span>
          <ShieldCheck size={18} aria-hidden="true" />
        </div>
        <h3>{featuredProject.name}</h3>
        <p>{copy.description}</p>
        <div className="mini-stack" aria-label="CertChain stack">
          {featuredProject.stack.slice(0, 7).map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        <div className="showcase-links">
          <a href={featuredProject.github} target="_blank" rel="noopener noreferrer">
            {t.actions.github} <ExternalLink size={14} aria-hidden="true" />
          </a>
          {featuredProject.demo ? (
            <a href={featuredProject.demo} target="_blank" rel="noopener noreferrer">
              Demo <ExternalLink size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </div>

      <div className="focus-grid" aria-label="Main engineering focus areas">
        {t.focusAreas.map((area, index) => {
          const Icon = focusIcons[index] ?? Code2;
          return (
            <div key={area}>
              <Icon size={18} aria-hidden="true" />
              <span>{area}</span>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default function Hero({ featuredProject, t }: { featuredProject: Project; t: TranslationDictionary }) {
  const heroTechnologies = t.hero.focusLine.split(' · ');

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-inner">
        <div className="hero-layout">
          <div className="hero-copy">
            <div className="hero-identity">
              <img src={profile.avatar} alt="Khanh Linh To avatar" />
              <div>
                <span className="eyebrow">{t.hero.identityLabel}</span>
                <strong>{profile.name}</strong>
              </div>
            </div>
            <p className="eyebrow">{t.hero.badge}</p>
            <h1 id="hero-title">{t.hero.headline}</h1>
            <p className="hero-title">{t.hero.title}</p>
            <p className="hero-text">{t.hero.description}</p>
            <div className="hero-actions">
              <AppButton href="#projects">
                <Rocket size={18} aria-hidden="true" /> {t.actions.viewProjects}
              </AppButton>
              <HeroCvButton label={t.actions.downloadCv} comingSoonLabel={t.actions.cvComingSoon} />
              <AppButton href={`mailto:${profile.email}`} variant="secondary">
                <Mail size={18} aria-hidden="true" /> {t.actions.contactMe}
              </AppButton>
            </div>
            <div className="hero-footer" aria-label="Profile focus">
              {heroTechnologies.map((technology) => (
                <span key={technology}>{technology}</span>
              ))}
            </div>
          </div>

          <HeroShowcase featuredProject={featuredProject} t={t} />
        </div>
      </div>
    </section>
  );
}
