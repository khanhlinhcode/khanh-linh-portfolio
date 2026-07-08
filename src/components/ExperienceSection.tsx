import { BriefcaseBusiness } from 'lucide-react';
import { experience } from '../data/experience';
import type { TranslationDictionary } from '../i18n/translations';
import SectionTitle from './SectionTitle';

export default function ExperienceSection({ t }: { t: TranslationDictionary }) {
  return (
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
  );
}
