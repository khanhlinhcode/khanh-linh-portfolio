export default function SectionTitle({
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
