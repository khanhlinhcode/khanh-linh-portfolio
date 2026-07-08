import { StrictMode, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Award,
  Blocks,
  BriefcaseBusiness,
  CalendarDays,
  Code2,
  Database,
  ExternalLink,
  FileDown,
  Github,
  GraduationCap,
  Languages,
  Mail,
  Menu,
  MapPin,
  Moon,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Sun,
  Trophy,
  X,
} from 'lucide-react';
import { experience } from './data/experience';
import { projects } from './data/projects';
import type { Project } from './data/projects';
import { skillGroups } from './data/skills';
import { certifications, education, navItems, profile } from './data/profile';
import { useLanguage } from './hooks/useLanguage';
import { useTheme } from './hooks/useTheme';
import { translations } from './i18n/translations';
import type { Language, TranslationDictionary } from './i18n/translations';
import './styles.css';

const skillIconMap = {
  blocks: Blocks,
  code: Code2,
  database: Database,
  rocket: Rocket,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

const headerNavOrder = ['about', 'experience', 'projects', 'skills', 'contact'];
const headerNavItems = headerNavOrder
  .map((key) => navItems.find((item) => item.key === key))
  .filter((item): item is (typeof navItems)[number] => item !== undefined);

function useActiveSection() {
  const [activeSection, setActiveSection] = useState(navItems[0].href);

  useEffect(() => {
    const sections = navItems
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    if (!sections.length || !('IntersectionObserver' in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(`#${visibleEntry.target.id}`);
        }
      },
      {
        rootMargin: '-24% 0px -58% 0px',
        threshold: [0.12, 0.32, 0.56],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return activeSection;
}

function useScrolledHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const updateScrollState = () => setIsScrolled(window.scrollY > 8);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, []);

  return isScrolled;
}

function LinkButton({
  href,
  children,
  variant = 'primary',
  download = false,
}: {
  href: string;
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  download?: boolean;
}) {
  const external = href.startsWith('http');

  return (
    <a
      className={`button ${variant}`}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      download={download}
    >
      {children}
    </a>
  );
}

function CvButton({ label, comingSoonLabel, variant = 'ghost' }: { label: string; comingSoonLabel: string; variant?: 'primary' | 'secondary' | 'ghost' }) {
  if (profile.cvUrl) {
    return (
      <LinkButton href={profile.cvUrl} variant={variant} download>
        <FileDown size={18} aria-hidden="true" /> {label}
      </LinkButton>
    );
  }

  return (
    <span className={`button ${variant} is-disabled`} aria-disabled="true" title={comingSoonLabel}>
      <FileDown size={18} aria-hidden="true" /> {comingSoonLabel}
    </span>
  );
}

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-title">
      <div className="section-kicker">
        <span className="section-rule" aria-hidden="true" />
        <span className="eyebrow">{eyebrow}</span>
      </div>
      <div className="section-copy">
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}

function getProjectCopy(project: Project, t: TranslationDictionary) {
  return t.projects[project.name] ?? {
    category: project.category,
    description: project.description,
    features: project.features,
  };
}

function ProjectCard({ project, t }: { project: Project; t: TranslationDictionary }) {
  const copy = getProjectCopy(project, t);

  return (
    <article className={`project-card ${project.featured ? 'featured' : ''}`}>
      <div className="project-topline">
        <span>{copy.category}</span>
        <Github size={18} aria-hidden="true" />
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

function LanguageToggle({
  language,
  setLanguage,
  label,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  label: string;
}) {
  return (
    <div className="language-toggle" aria-label={label} role="group">
      <Languages size={15} aria-hidden="true" />
      {(['en', 'vi'] as Language[]).map((item) => (
        <button
          aria-pressed={language === item}
          className={language === item ? 'is-active' : undefined}
          key={item}
          onClick={() => setLanguage(item)}
          type="button"
        >
          {item.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function Header({
  language,
  setLanguage,
  t,
}: {
  language: Language;
  setLanguage: (language: Language) => void;
  t: TranslationDictionary;
}) {
  const activeSection = useActiveSection();
  const isScrolled = useScrolledHeader();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const ThemeIcon = theme === 'dark' ? Sun : Moon;
  const MenuIcon = isMenuOpen ? X : Menu;

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined;
    }

    const closeMenuOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', closeMenuOnEscape);
    return () => window.removeEventListener('keydown', closeMenuOnEscape);
  }, [isMenuOpen]);

  return (
    <header className={`site-header ${isScrolled ? 'is-scrolled' : ''}`}>
      <a className="brand" href="#top" aria-label="Khanh Linh To portfolio home">
        <span className="brand-mark" aria-hidden="true">KL</span>
        <span className="brand-copy">
          <strong>{profile.name}</strong>
          <small>{t.brandSubtitle}</small>
        </span>
      </a>
      <nav className="site-nav" aria-label={t.aria.primaryNav}>
        {headerNavItems.map((item) => (
          <a
            className={activeSection === item.href ? 'is-active' : undefined}
            href={item.href}
            key={item.href}
          >
            {t.nav[item.key]}
          </a>
        ))}
      </nav>
      <div className="header-actions" aria-label="Quick actions">
        <a className="header-action-link optional-action" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label={t.aria.openGithub}>
          <Github size={16} aria-hidden="true" />
          <span>{t.actions.github}</span>
        </a>
        <a className="header-action-link optional-action" href={`mailto:${profile.email}`} aria-label={t.aria.contactEmail}>
          <Mail size={16} aria-hidden="true" />
          <span>{t.actions.email}</span>
        </a>
        {profile.cvUrl ? (
          <a className="header-action-link optional-action" href={profile.cvUrl} download>
            <FileDown size={16} aria-hidden="true" />
            <span>CV</span>
          </a>
        ) : null}
        <LanguageToggle language={language} setLanguage={setLanguage} label={t.aria.languageToggle} />
        <button className="icon-button" onClick={toggleTheme} type="button" aria-label={t.aria.themeToggle}>
          <ThemeIcon size={17} aria-hidden="true" />
        </button>
        <button
          aria-controls="mobile-header-menu"
          aria-expanded={isMenuOpen}
          aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          className="icon-button menu-button"
          onClick={() => setIsMenuOpen((currentValue) => !currentValue)}
          type="button"
        >
          <MenuIcon size={17} aria-hidden="true" />
        </button>
      </div>
      <div className={`mobile-header-menu ${isMenuOpen ? 'is-open' : ''}`} id="mobile-header-menu">
        <nav aria-label={`${t.aria.primaryNav} mobile`}>
          {headerNavItems.map((item) => (
            <a
              className={activeSection === item.href ? 'is-active' : undefined}
              href={item.href}
              key={item.href}
              onClick={() => setIsMenuOpen(false)}
            >
              {t.nav[item.key]}
            </a>
          ))}
        </nav>
        <div className="mobile-menu-actions">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label={t.aria.openGithub}>
            <Github size={16} aria-hidden="true" />
            <span>{t.actions.github}</span>
          </a>
          <a href={`mailto:${profile.email}`} aria-label={t.aria.contactEmail}>
            <Mail size={16} aria-hidden="true" />
            <span>{t.actions.email}</span>
          </a>
        </div>
      </div>
    </header>
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

function App() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const featuredProject = projects.find((project) => project.featured) ?? projects[0]!;
  const secondaryProjects = projects.filter((project) => project.name !== featuredProject.name);
  const heroTechnologies = t.hero.focusLine.split(' · ');

  return (
    <>
      <Header language={language} setLanguage={setLanguage} t={t} />

      <main id="top">
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
                  <LinkButton href="#projects">
                    <Rocket size={18} aria-hidden="true" /> {t.actions.viewProjects}
                  </LinkButton>
                  <CvButton label={t.actions.downloadCv} comingSoonLabel={t.actions.cvComingSoon} variant="ghost" />
                  <LinkButton href={`mailto:${profile.email}`} variant="secondary">
                    <Mail size={18} aria-hidden="true" /> {t.actions.contactMe}
                  </LinkButton>
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

        <section className="summary-strip" aria-label="Profile highlights">
          {t.summary.map((item) => (
            <div key={item.title}>
              <strong>{item.title}</strong>
              <span>{item.description}</span>
            </div>
          ))}
        </section>

        <section className="section about-section" id="about">
          <SectionTitle {...t.sections.about} />
          <div className="about-grid">
            {t.aboutHighlights.map((item) => (
              <article className="about-card" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="skills">
          <SectionTitle {...t.sections.skills} />
          <div className="skills-grid">
            {skillGroups.map((group) => {
              const Icon = skillIconMap[group.icon as keyof typeof skillIconMap] ?? Code2;
              return (
                <article className="skill-card" key={group.title}>
                  <div className="card-heading">
                    <Icon size={21} aria-hidden="true" />
                    <h3>{t.skillTitles[group.title] ?? group.title}</h3>
                  </div>
                  <div className="tags">
                    {group.items.map((item) => (
                      <span key={item}>{item}</span>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="section" id="experience">
          <SectionTitle {...t.sections.experience} />
          <article className="timeline-block">
            <div className="timeline-meta">
              <BriefcaseBusiness size={22} aria-hidden="true" />
              <span>{experience.period}</span>
              <small>{experience.location}{t.experience.metadataConnector}{experience.mode}</small>
            </div>
            <div className="timeline-content">
              <h3>{t.experience.role}</h3>
              <p className="muted">{experience.company}</p>
              <p className="project-line">{t.experience.projectLabel}: {experience.project}</p>
              <ul>
                {t.experience.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </div>
          </article>
        </section>

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

        <section className="section credentials-section" id="credentials">
          <SectionTitle {...t.sections.credentials} />
          <div className="credential-layout">
            <article className="info-block">
              <div className="card-heading">
                <GraduationCap size={21} aria-hidden="true" />
                <h3>{education.school}</h3>
              </div>
              <p className="muted">
                {education.period} · {t.education.gpaLabel} {education.gpa} · {t.education.classification}
              </p>
              <p>{t.education.degree}</p>
              <p className="subtle-label">{t.education.courseworkLabel}</p>
              <div className="tags">
                {education.coursework.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>

            <article className="info-block">
              <div className="card-heading">
                <Trophy size={21} aria-hidden="true" />
                <h3>{t.award.title}</h3>
              </div>
              <p className="muted">Tracklab team · FPT University Can Tho · 12/2024</p>
              <p>{t.award.description}</p>
            </article>
          </div>

          <div className="cert-list">
            {certifications.map((cert) => {
              const metadata = [cert.issuer, cert.date].filter(Boolean).join(' · ');
              return (
                <div key={`${cert.name}-${metadata}`}>
                  <ShieldCheck size={18} aria-hidden="true" />
                  <span>
                    <strong>{cert.name}</strong>
                    {metadata ? <small>{metadata}</small> : null}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="section-action">
            <LinkButton href={profile.certificates} variant="secondary">
              <Award size={18} aria-hidden="true" /> {t.certifications.openFolder}
            </LinkButton>
          </div>
        </section>

        <section className="section contact-section" id="contact">
          <SectionTitle {...t.sections.contact} />
          <div className="contact-panel">
            <div className="contact-grid">
              <a href={`mailto:${profile.email}`}>
                <Mail size={20} aria-hidden="true" />
                <span>{profile.email}</span>
              </a>
              <a href={`tel:${profile.phone}`}>
                <Phone size={20} aria-hidden="true" />
                <span>{profile.phone}</span>
              </a>
              <a href={profile.github} target="_blank" rel="noopener noreferrer">
                <Github size={20} aria-hidden="true" />
                <span>github.com/khanhlinhcode</span>
              </a>
              <a href={profile.portfolio} target="_blank" rel="noopener noreferrer">
                <ExternalLink size={20} aria-hidden="true" />
                <span>{t.contact.portfolioLabel}</span>
              </a>
              <span>
                <MapPin size={20} aria-hidden="true" />
                <span>{profile.location}</span>
              </span>
              <span>
                <CalendarDays size={20} aria-hidden="true" />
                <span>{t.contact.graduation}</span>
              </span>
            </div>
            <div className="contact-actions">
              <LinkButton href={`mailto:${profile.email}`}>
                <Mail size={18} aria-hidden="true" /> {t.actions.emailMe}
              </LinkButton>
              <LinkButton href={profile.github} variant="secondary">
                <Github size={18} aria-hidden="true" /> {t.actions.viewGithub}
              </LinkButton>
              <CvButton label={t.actions.downloadCv} comingSoonLabel={t.actions.cvComingSoon} />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <span>{profile.name}</span>
        <span>{t.footer}</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
