import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AboutSection from './components/AboutSection';
import { BackToTopButton } from './components/BackToTopButton';
import ContactSection from './components/ContactSection';
import CredentialsSection from './components/CredentialsSection';
import ExperienceSection from './components/ExperienceSection';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import SkillsSection from './components/SkillsSection';
import SummaryStrip from './components/SummaryStrip';
import { projects } from './data/projects';
import { profile } from './data/profile';
import { useLanguage } from './hooks/useLanguage';
import { translations } from './i18n/translations';
import './styles/index.css';

function App() {
  const { language, setLanguage } = useLanguage();
  const t = translations[language];
  const featuredProject = projects.find((project) => project.featured) ?? projects[0]!;

  return (
    <>
      <Header language={language} setLanguage={setLanguage} t={t} />

      <main id="top">
        <Hero featuredProject={featuredProject} t={t} />
        <SummaryStrip t={t} />
        <AboutSection t={t} />
        <SkillsSection t={t} />
        <ExperienceSection t={t} />
        <ProjectsSection t={t} />
        <CredentialsSection t={t} />
        <ContactSection t={t} />
      </main>

      <footer className="site-footer">
        <span>{profile.name}</span>
        <span>{t.footer}</span>
      </footer>
      <BackToTopButton />
    </>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
