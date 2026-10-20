import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

// Exercise the actual data and components using the project's existing compiler.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const nativeRequire = createRequire(import.meta.url);
const cache = new Map();
function source(relative) {
  const file = path.resolve(root, relative);
  if (cache.has(file)) return cache.get(file).exports;
  const module = { exports: {} };
  cache.set(file, module);
  const { outputText } = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2022 },
    fileName: file,
  });
  const require = (specifier) => {
    if (!specifier.startsWith('.')) return nativeRequire(specifier);
    const base = path.resolve(path.dirname(file), specifier);
    const dependency = [base, `${base}.ts`, `${base}.tsx`].find((candidate) => existsSync(candidate));
    assert.ok(dependency, `Unresolved local import: ${specifier}`);
    return source(dependency);
  };
  new Function('require', 'module', 'exports', outputText)(require, module, module.exports);
  return module.exports;
}

const { projects, liveProjects } = source('src/data/projects.ts');
const { experiences } = source('src/data/experience.ts');
const { awards } = source('src/data/profile.ts');
const { translations } = source('src/i18n/translations.ts');
const ProjectCard = source('src/components/ProjectCard.tsx').default;
const ExperienceSection = source('src/components/ExperienceSection.tsx').default;
const ids = projects.map(({ id }) => id).sort();
assert.equal(new Set(ids).size, projects.length);
assert.equal(projects.length, 8);
assert.ok(projects.find((project) => project.id === 'certchain').featured);
assert.equal(liveProjects.length, 4);
assert.ok(liveProjects.some((project) => project.id === 'farta-market-live'));
assert.ok(!liveProjects.some((project) => /drows/i.test(JSON.stringify(project))));
assert.deepEqual(projects.find((project) => project.id === 'drowsiness-edge-iot').links, []);
assert.ok(!/Drowsy_IOT|admin\.fartamarket\.company/.test(JSON.stringify({ projects, liveProjects })));
assert.ok(experiences.every((experience) => !('period' in experience)));
assert.equal(awards.find((award) => award.id === 'ai-olympic-2026').date, '2026');

for (const [language, t] of Object.entries(translations)) {
  assert.deepEqual(Object.keys(t.projects).sort(), ids, `${language}: exact project coverage`);
  assert.deepEqual(Object.keys(t.liveProjects).sort(), liveProjects.map((project) => project.id).sort());
  for (const project of projects) {
    const copy = t.projects[project.id];
    for (const field of ['category', 'description', 'limitation']) assert.ok(copy[field]?.trim(), `${project.id}: ${field}`);
    assert.ok(copy.features.length > 0);
    const html = renderToStaticMarkup(createElement(ProjectCard, { project, t }));
    assert.ok(!/undefined|href="#"/.test(html));
    if (project.links.length === 0) {
      assert.ok(!/<a\b|<button\b|project-links|project-corner-icon/.test(html), `${project.id}: description only`);
    } else {
      for (const link of project.links) {
        assert.equal(new URL(link.url).protocol, 'https:');
        assert.ok(t.projectLinkLabels[link.kind], `${project.id}: translated link`);
      }
    }
  }
  const experienceHtml = renderToStaticMarkup(createElement(ExperienceSection, { t }));
  const experienceText = experienceHtml.replace(/<[^>]*>/g, ' ');
  assert.ok(!/\b20\d{2}\b|\bPresent\b|\bCurrent\b|Hiện tại|Tháng \d/i.test(experienceText), `${language}: no employment dates`);
  assert.ok(!JSON.stringify(t.experience).includes('"period"'));
  assert.ok(experienceHtml.includes('OneMekong') && experienceHtml.includes('Tien Phong'));
}
console.log('PASS: 8 projects, 4 public entries, EN/VI parity, date-free experience, Drowsy description-only rendering, HTTPS links, and AI Olympic 2026.');
