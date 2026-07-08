import { CalendarDays, ExternalLink, FileDown, Github, Mail, MapPin, Phone } from 'lucide-react';
import { profile } from '../data/profile';
import type { TranslationDictionary } from '../i18n/translations';
import { AppButton } from './AppButton';
import SectionTitle from './SectionTitle';

function CvButton({
  label,
  comingSoonLabel,
  variant = 'ghost',
}: {
  label: string;
  comingSoonLabel: string;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  if (profile.cvUrl) {
    return (
      <AppButton href={profile.cvUrl} variant={variant} download>
        <FileDown size={18} aria-hidden="true" /> {label}
      </AppButton>
    );
  }

  return (
    <AppButton disabled title={comingSoonLabel} variant={variant}>
      <FileDown size={18} aria-hidden="true" /> {comingSoonLabel}
    </AppButton>
  );
}

export default function ContactSection({ t }: { t: TranslationDictionary }) {
  return (
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
          <AppButton href={`mailto:${profile.email}`}>
            <Mail size={18} aria-hidden="true" /> {t.actions.emailMe}
          </AppButton>
          <AppButton href={profile.github} variant="secondary">
            <Github size={18} aria-hidden="true" /> {t.actions.viewGithub}
          </AppButton>
          <CvButton label={t.actions.downloadCv} comingSoonLabel={t.actions.cvComingSoon} />
        </div>
      </div>
    </section>
  );
}
