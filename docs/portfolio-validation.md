# Portfolio implementation and validation

Date: 20 October 2026. Scope: the two supplied portfolio update prompts.

## A. Source verification

See [portfolio-project-evidence.md](portfolio-project-evidence.md) for pinned revisions, inspected implementation paths, owner-provided statements and runtime limitations. Eleven repository snapshots were obtained; the depth of inspection differs and is recorded per repository.

The current checkout was used as visual authority. `impeccable` guided a scoped i18n/content hardening pass; `ponytail` guided reuse of existing components and no dependency expansion. No historical ScrollFilm/Iron Man redesign was reconstructed.

## B. Experience

- Removed `period` from the data type, both records, translation type, translated records and component.
- Replaced the 220px date column with a single-column card and compact location/mode metadata.
- Kept both employers and the existing section heading.
- OneMekong: three contribution-based bullets, not whole-system ownership.
- Tien Phong: edge vision, firmware/MQTT and Flutter/service integration.

## C. Projects and profile

- Eight projects: five existing records corrected and three additions.
- Added Drowsy, Auto Race and YOLOv8. Drowsy has no actions, corner icon, links container or live-deck entry.
- Grouped supporting AI/edge work separately from full-stack/automation work.
- CertChain remains featured; NLP remains the hero's featured project.
- Currency uses source-backed INR/USD/VND labels; no unsupported metrics.
- Auto Video now describes local/self-hosted operation with optional TikTok.
- AI Olympic changed to 2026 following the user's explicit reply; no invented month.
- AI/CV/edge skills and profile copy updated; new project copy and limitations covered in both languages.

## D. Farta

Expanded the card from a chatbot summary into storefront + Laravel API + separate Admin + grounded assistant. Added a public staging/demo live-deck entry and differentiated source links, including Admin **source**, not Admin deployment.

Payments and provider readiness are not presented as verified. The separately named `farta-commerce` architecture was not imported into this project's description.

## E. Public deployment checks

Browser-rendered observations:

- Farta rendered product categories, product names/prices and navigation. The sampled loaded images had no broken-image entries. Separate read-only catalog API request returned JSON.
- CertChain rendered its verification frontend. Marketing metrics present on that external site were not adopted as portfolio evidence.
- Phương Nam rendered restaurant content and telephone reservation links; no telephone call or reservation was initiated.
- NLP Streamlit rendered its sleeping-app screen. No wake-up action was triggered. The portfolio live entry discloses the observed sleeping status.
- NLP Swagger document returned HTTP 200 on a bounded retry after an initial timeout.

No production login, cart mutation, purchase, payment, Admin operation, wallet interaction, model query or generated answer was attempted.

## F. Files changed

| Files | Purpose |
|---|---|
| `src/data/projects.ts` | Typed IDs/group/status/limitations; eight projects and four public entries |
| `src/data/experience.ts` | Date-free employment and revised contributions |
| `src/data/profile.ts` | Edge AI focus and user-confirmed Olympic year |
| `src/data/skills.ts` | CV/edge and deployment technologies |
| `src/i18n/translations.ts` | Complete keyed EN/VI project copy, public statuses, limitations, experience copy |
| `src/components/ProjectCard.tsx` | Stable ID lookup and conditional actions/icon; status and limitations |
| `src/components/ProjectsSection.tsx` | AI/engineering groups, existing card reuse |
| `src/components/ExperienceSection.tsx` | No employment-date rendering |
| `src/components/LiveProjectsSection.tsx` | Commerce entry, status/limitations; no universal “live” indicator |
| `src/styles/cards.css` | Date-column removal and scoped text/group styles |
| `src/styles/live-projects.css` | Index-derived sticky padding for all four cards |
| `package.json` | `test:content` script only; no dependency change |
| `scripts/verify-portfolio.mjs` | Data/i18n/SSR regression checks using existing TypeScript and React |
| `scripts/qa-portfolio.mjs` | Local-preview browser checks through an existing CDP session |
| `docs/portfolio-project-evidence.md` | Source and deployment evidence |
| `docs/portfolio-validation.md` | This report |

Unchanged: `LiquidJourney.tsx`, hero composition, animation controller, framework, dependency versions, `package-lock.json`, `README.md`, `.vscode/`, `.gitignore`. No secrets/configuration edited; no push or deployment.

## G. Validation results

Installed versions read from the lockfile: React/React DOM **19.2.7**, Vite **7.3.6**, TypeScript **5.9.3**, lucide-react **0.561.0**. Node **22.23.2**.

| Command/check | Actual result |
|---|---|
| `npm run test:content` | PASS: eight projects/four public entries, unique IDs, EN/VI coverage, HTTPS links, date-free SSR experience, Drowsy no-action SSR, confirmed Olympic year |
| `npm run build` | PASS: `tsc -b` + Vite production build, 1722 modules transformed |
| `git diff --check` | PASS |
| Impeccable detector over changed component/CSS targets | `[]` findings; not a full accessibility audit |
| Browser/CDP matrix | PASS: widths 320, 375, 768, 1440 × EN/VI × dark/light = 16 combinations |
| Matrix assertions | No document horizontal overflow; correct language/theme; eight project cards/four live entries; no Drowsy actions or employment dates; all local hash targets exist |
| Reduced motion | PASS at desktop: all four live wrappers non-sticky, cards untransformed and not inert |
| Normal-motion deck | PASS: controller ready; padding 0/18/36/54px; programmatic scroll through all four entries |
| Keyboard | Tab from Farta backend source reaches frontend source with a visible outline, not an inert ancestor |
| Runtime exceptions | None captured by `Runtime.exceptionThrown` during the completed local QA pass |

The first content-test draft falsely matched the SVG namespace year `2000`; it was corrected to test visible text while retaining the data-model assertions. The first browser pass passed the matrix but failed its deck-ready assertion because the separate external-audit tab had backgrounded the local page; the controller intentionally suspends on `document.hidden`. The harness now foregrounds its local target and explicitly selects normal motion before checking the deck. The complete confirmation pass passed; these were not hidden as successful first attempts.

### Artifacts

Local artifacts: `/tmp/portfolio-qa-20261020/`.

- `results.json`: per-combination results, reduced-motion state, deck offsets, keyboard focus and runtime exceptions.
- `projects-1440-{en,vi}-{dark,light}.png`: four desktop screenshots.
- `projects-375-{en,vi}-{dark,light}.png`: four mobile screenshots.
- `live-deck-desktop.png`, `experience-desktop.png`.

Representative EN/dark and VI/light desktop, EN/light and VI/dark mobile, experience and live-deck screenshots were visually inspected. The full matrix was DOM-tested; no claim of exhaustive visual review for every scroll position.

### Repeat locally

```sh
npm run test:content
npm run build
npm run preview -- --host 127.0.0.1 --port 4175 --strictPort
```

Open `http://127.0.0.1:4175/`. Check language/theme controls, experience, projects and the four-card live deck.

Optional browser regression: attach an existing permitted BrowserAct Chrome session to that local URL, obtain its CDP WebSocket endpoint, then:

```sh
node scripts/qa-portfolio.mjs '<CDP WebSocket URL>' '/tmp/portfolio-qa-new-run'
```

The browser harness uses Node's native WebSocket and writes screenshots/results only to the requested artifact directory. No browser creation, public app mutations or production dependency installation.

## H. Giới hạn & điều cần kiểm chứng

1. Auto Race/YOLOv8 artifacts and OneMekong responsibility claims still rely on owner-provided information; supply original evidence for independent verification.
2. Currency model/label compatibility and dataset evaluation need the actual model, class-order artifact and original dataset. No ML inference/evaluation was run.
3. No Pi/ESP32 physical-device test, payment test, authenticated chatbot test, on-chain transaction or TikTok OAuth execution.
4. Chrome emulation is not a physical iOS/Android device test. No Safari/Firefox run, screen-reader audit, complete contrast audit, axe run or measured animation FPS. Reduced-motion validation here specifically covers the existing live deck.
5. Repo has no configured lint or general application-test script; none was claimed. The new content regression suite is bounded and does not replace integration tests.
6. Hosted availability can change. Streamlit was sleeping during this audit. Local build success does not establish deploy readiness of external project services.
7. Temporary artifacts may be removed by the OS. No deployment or Git commit was made.
