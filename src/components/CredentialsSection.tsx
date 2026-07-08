import { Award, GraduationCap, ShieldCheck, Trophy } from 'lucide-react';
import { certifications, education, profile } from '../data/profile';
import type { TranslationDictionary } from '../i18n/translations';
import { AppButton } from './AppButton';
import SectionTitle from './SectionTitle';

export default function CredentialsSection({ t }: { t: TranslationDictionary }) {
  return (
    <section className="section credentials-section" id="credentials">
      <SectionTitle {...t.sections.credentials} />
      <div className="credential-layout">
        <article className="info-block" id="education">
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

      <div className="cert-list" id="certifications">
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
        <AppButton href={profile.certificates} variant="secondary">
          <Award size={18} aria-hidden="true" /> {t.certifications.openFolder}
        </AppButton>
      </div>
    </section>
  );
}
