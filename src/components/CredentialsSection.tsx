import { Award, GraduationCap, ShieldCheck, Trophy } from 'lucide-react';
import { awards, certifications, education, profile } from '../data/profile';
import type { TranslationDictionary } from '../i18n/translations';
import { AppButton } from './AppButton';
import SectionTitle from './SectionTitle';

export default function CredentialsSection({ t }: { t: TranslationDictionary }) {
  return (
    <section className="section credentials-section" id="credentials">
      <SectionTitle {...t.sections.credentials} />
      <div className="credential-layout">
        <article className="info-block" data-liquid-hover="card" id="education">
          <div className="card-heading">
            <GraduationCap size={21} aria-hidden="true" />
            <h3>{education.school}</h3>
          </div>
          <p className="muted">
            {t.education.graduation} · {t.education.classification}
          </p>
          <p>{t.education.degree}</p>
          <p className="subtle-label">{t.education.courseworkLabel}</p>
          <div className="tags">
            {education.coursework.map((item) => (
              <span data-liquid-hover="chip" key={item}>{item}</span>
            ))}
          </div>
        </article>

        <div className="award-list" aria-label="Awards and achievements">
          {awards.map((award) => {
            const copy = t.awards[award.id];
            const metadata = [
              award.organizer,
              award.team ? `${t.awardTeamLabel} ${award.team}` : undefined,
              copy?.date ?? award.date,
            ]
              .filter(Boolean)
              .join(' · ');

            return (
              <article className="info-block award-card" data-liquid-hover="card" key={award.id}>
                <div className="card-heading">
                  <Trophy size={21} aria-hidden="true" />
                  <h3>{copy?.title ?? award.title}</h3>
                </div>
                <p className="muted">{metadata}</p>
                <p>{copy?.description ?? award.description}</p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="cert-list" id="certifications">
        {certifications.map((cert) => {
          const metadata = [cert.issuer, cert.date].filter(Boolean).join(' · ');
          return (
            <div data-liquid-hover="card" key={`${cert.name}-${metadata}`}>
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
        <AppButton href={profile.certificates} variant="secondary">
          <Award size={18} aria-hidden="true" /> {t.certifications.openFolder}
        </AppButton>
      </div>
    </section>
  );
}
