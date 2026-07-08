import { useEffect, useState } from 'react';
import { FileDown, Github, Languages, Mail, Menu, Moon, Sun, X } from 'lucide-react';
import { navItems, profile } from '../data/profile';
import { useTheme } from '../hooks/useTheme';
import type { Language, TranslationDictionary } from '../i18n/translations';
import { AppButton } from './AppButton';

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

export default function Header({
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
        <AppButton className="header-action-link optional-action" href={profile.github} variant="secondary" aria-label={t.aria.openGithub}>
          <Github size={16} aria-hidden="true" />
          <span>{t.actions.github}</span>
        </AppButton>
        <AppButton className="header-action-link optional-action" href={`mailto:${profile.email}`} variant="secondary" aria-label={t.aria.contactEmail}>
          <Mail size={16} aria-hidden="true" />
          <span>{t.actions.email}</span>
        </AppButton>
        {profile.cvUrl ? (
          <AppButton className="header-action-link optional-action" href={profile.cvUrl} variant="secondary" download>
            <FileDown size={16} aria-hidden="true" />
            <span>CV</span>
          </AppButton>
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
          <AppButton href={profile.github} variant="secondary" aria-label={t.aria.openGithub}>
            <Github size={16} aria-hidden="true" />
            <span>{t.actions.github}</span>
          </AppButton>
          <AppButton href={`mailto:${profile.email}`} variant="secondary" aria-label={t.aria.contactEmail}>
            <Mail size={16} aria-hidden="true" />
            <span>{t.actions.email}</span>
          </AppButton>
        </div>
      </div>
    </header>
  );
}
