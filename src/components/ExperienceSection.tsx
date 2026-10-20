import { BriefcaseBusiness } from 'lucide-react';
import { experiences } from '../data/experience';
import type { TranslationDictionary } from '../i18n/translations';
import SectionTitle from './SectionTitle';

export default function ExperienceSection({ t }: { t: TranslationDictionary }) {
  return (
    <section className="section" id="experience">
      <SectionTitle {...t.sections.experience} />
      <div className="timeline-list">
        {experiences.map((experience) => {
          const copy = t.experience.items[experience.id];
          const metadata = [experience.location, copy?.mode ?? experience.mode]
            .filter(Boolean)
            .join(t.experience.metadataConnector);

          return (
            <article className="timeline-block" data-liquid-hover="card" key={experience.id}>
              <div className="timeline-meta">
                <BriefcaseBusiness size={22} aria-hidden="true" />
                <small>{metadata}</small>
              </div>
              <div className="timeline-content">
                <h3>{copy?.role ?? experience.role}</h3>
                <p className="timeline-company">{experience.company}</p>
                {experience.tech?.length ? (
                  <div className="tags compact timeline-tech" aria-label={`${t.experience.techLabel}: ${experience.tech.join(', ')}`}>
                    {experience.tech.map((technology) => (
                      <span data-liquid-hover="chip" key={technology}>{technology}</span>
                    ))}
                  </div>
                ) : null}
                <ul>
                  {(copy?.bullets ?? experience.bullets).map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
