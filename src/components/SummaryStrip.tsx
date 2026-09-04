import type { TranslationDictionary } from '../i18n/translations';

export default function SummaryStrip({ t }: { t: TranslationDictionary }) {
  return (
    <section className="summary-strip" aria-label="Profile highlights">
      {t.summary.map((item) => (
        <div data-liquid-hover="card" key={item.title}>
          <strong>{item.title}</strong>
          <span>{item.description}</span>
        </div>
      ))}
    </section>
  );
}
