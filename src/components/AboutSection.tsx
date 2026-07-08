import type { TranslationDictionary } from '../i18n/translations';
import SectionTitle from './SectionTitle';

export default function AboutSection({ t }: { t: TranslationDictionary }) {
  return (
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
  );
}
