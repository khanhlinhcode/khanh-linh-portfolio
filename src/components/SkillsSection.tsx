import { Blocks, Code2, Database, Rocket, ShieldCheck, Sparkles } from 'lucide-react';
import { skillGroups } from '../data/skills';
import type { TranslationDictionary } from '../i18n/translations';
import SectionTitle from './SectionTitle';

const skillIconMap = {
  blocks: Blocks,
  code: Code2,
  database: Database,
  rocket: Rocket,
  shield: ShieldCheck,
  sparkles: Sparkles,
};

export default function SkillsSection({ t }: { t: TranslationDictionary }) {
  return (
    <section className="section" id="skills">
      <SectionTitle {...t.sections.skills} />
      <div className="skills-grid">
        {skillGroups.map((group) => {
          const Icon = skillIconMap[group.icon as keyof typeof skillIconMap] ?? Code2;
          return (
            <article className="skill-card" key={group.title}>
              <div className="card-heading">
                <Icon size={21} aria-hidden="true" />
                <h3>{t.skillTitles[group.title] ?? group.title}</h3>
              </div>
              <div className="tags skill-tags">
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
