import {
  Blocks,
  Code2,
  Cpu,
  Database,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react';
import { skillTiers, type SkillGroup } from '../data/skills';
import type { TranslationDictionary } from '../i18n/translations';
import SectionTitle from './SectionTitle';

const skillIconMap = {
  blocks: Blocks,
  code: Code2,
  cpu: Cpu,
  database: Database,
  rocket: Rocket,
  search: Search,
  shield: ShieldCheck,
  sparkles: Sparkles,
  wrench: Wrench,
};

function SkillCard({ group, t }: { group: SkillGroup; t: TranslationDictionary }) {
  const Icon = skillIconMap[group.icon] ?? Code2;

  return (
    <article className="skill-card" data-liquid-hover="card">
      <div className="card-heading">
        <Icon size={21} aria-hidden="true" />
        <h4>{t.skillTitles[group.title] ?? group.title}</h4>
      </div>
      <ul className="skill-tags" aria-label={t.skillTitles[group.title] ?? group.title}>
        {group.items.map((item) => (
          <li data-liquid-hover="chip" key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}

export default function SkillsSection({ t }: { t: TranslationDictionary }) {
  return (
    <section className="section skills-section" id="skills">
      <SectionTitle {...t.sections.skills} />
      <div className="skill-tier-list">
        {skillTiers.map((tier) => {
          const tierCopy = t.skillTiers[tier.id];
          const headingId = `skill-tier-${tier.id}`;

          return (
            <section
              aria-labelledby={headingId}
              className="skill-tier"
              data-tier={tier.id}
              key={tier.id}
            >
              <div className="skill-tier-heading">
                <h3 id={headingId}>{tierCopy.title}</h3>
                <p>{tierCopy.description}</p>
              </div>
              <div className="skills-grid">
                {tier.groups.map((group) => (
                  <SkillCard group={group} key={group.title} t={t} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>
  );
}
