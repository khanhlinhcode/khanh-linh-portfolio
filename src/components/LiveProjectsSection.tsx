import { ArrowUpRight, Blocks, BrainCircuit, Check, UtensilsCrossed } from 'lucide-react';
import type { CSSProperties } from 'react';
import { liveProjects, type LiveProjectKind } from '../data/projects';
import { useStackedProjectDeck } from '../hooks/useStackedProjectDeck';
import type { TranslationDictionary } from '../i18n/translations';
import SectionTitle from './SectionTitle';

type ProjectStackStyle = CSSProperties & {
  '--stack-index': number;
};

function ProjectIcon({ kind }: { kind: LiveProjectKind }) {
  if (kind === 'blockchain') {
    return <Blocks size={22} aria-hidden="true" />;
  }

  if (kind === 'product') {
    return <UtensilsCrossed size={22} aria-hidden="true" />;
  }

  return <BrainCircuit size={22} aria-hidden="true" />;
}

function ProjectPreview({
  hint,
  kind,
  title,
}: {
  hint?: string;
  kind: LiveProjectKind;
  title: string;
}) {
  if (kind === 'blockchain') {
    return (
      <div className="live-project-visual live-project-visual--blockchain" aria-hidden="true">
        <span className="chain-node chain-node--primary"><Check size={20} /></span>
        <span className="chain-link" />
        <span className="chain-node" />
        <span className="chain-link" />
        <span className="chain-node" />
        <strong>{title}</strong>
      </div>
    );
  }

  if (kind === 'product') {
    return (
      <div className="live-project-visual live-project-visual--restaurant" aria-hidden="true">
        <span className="restaurant-monogram">PN</span>
        <div>
          <strong>{title}</strong>
          {hint ? <span>{hint}</span> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="live-project-visual live-project-visual--nlp" aria-hidden="true">
      <span className="nlp-query">{hint}</span>
      <span className="nlp-result nlp-result--strong" />
      <span className="nlp-result" />
      <span className="nlp-result nlp-result--short" />
      <strong>{title}</strong>
    </div>
  );
}

export default function LiveProjectsSection({ t }: { t: TranslationDictionary }) {
  const deckRef = useStackedProjectDeck();

  return (
    <section className="section live-projects-section" id="live-work">
      <SectionTitle {...t.sections.liveProjects} />

      <div className="live-projects-shell">
        <div className="live-projects-status">
          <span className="live-status-dot" aria-hidden="true" />
          <span>{t.liveShowcase.status}</span>
        </div>

        <div className="live-projects-grid" data-project-deck ref={deckRef}>
          {liveProjects.map((project, index) => {
            const copy = t.liveProjects[project.id];

            return (
              <div
                className="live-project-sticky"
                data-project-sticky
                key={project.id}
                style={{ '--stack-index': index + 1 } as ProjectStackStyle}
              >
                <a
                  className={`live-project-card live-project-card--${project.kind}`}
                  data-liquid-hover="card"
                  data-project-page
                  href={project.url}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <ProjectPreview hint={copy.previewHint} kind={project.kind} title={copy.previewTitle} />

                  <div className="live-project-content">
                    <div className="live-project-meta">
                      <span className="live-project-icon"><ProjectIcon kind={project.kind} /></span>
                      <span>{copy.category}</span>
                    </div>
                    <h3>{project.name}</h3>
                    <p>{copy.description}</p>
                    <span className="live-project-footer">
                      <span className="live-project-domain">{new URL(project.url).hostname}</span>
                      <span className="live-project-link">
                        {t.liveShowcase.openProject}
                        <ArrowUpRight size={17} aria-hidden="true" />
                      </span>
                    </span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
