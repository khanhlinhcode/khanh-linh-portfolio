# Portfolio content audit — 20 October 2026

## Scope and evidence standard

Updated the existing React/Vite portfolio, not the historical redesign discussed in chat. The checkout was clean before this task. Both supplied prompts were reviewed; the later prompt's **Drowsy description-only** restriction takes precedence over the earlier request to expose its repository.

- **[Đã xác minh / Source]** means implementation was read at the revision below. It does not prove authorship of every line, deployed revision parity, model quality, or runtime success.
- **[Tác giả cung cấp]** means the two supplied briefs or an explicit user reply support the account, without independent artifacts.
- **[Chưa xác minh / Runtime]** means no end-to-end execution/device test was performed.
- No project accuracy, latency, FPS, dataset size, customer count, revenue, or production-reliability metrics were invented.
- No credentials, private endpoints, Admin deployment URL, or Drowsy repository URL were added to public portfolio data.

Sources supplied by the owner:

1. `c8c4cb4a-667d-4baf-844f-cd14b00b35b0/pasted-text.txt` — initial audit/update brief.
2. `9d564319-fdb2-4544-9d19-f7f68e709ce0/pasted-text.txt` — refined requirements and disclosure restrictions.
3. Explicit reply during this task: AI Olympic year is **2026**. The old March 2025 date was removed, not carried forward with a new year.

## Repository snapshots

Fresh, read-only shallow clones were inspected under `/tmp/portfolio-audit-GcNYtx`. These are remote snapshots, not assertions about any other local checkout or deployed revision.

| Repository | Reviewed revision | Scope |
|---|---|---|
| NLP-Academic-Search-RAG-Engine | `cb8d0bc83b041f3ab04299b81c5015e44042a710` | Retrieval, generation, verification, public API documentation |
| Drowsy source, internal audit identifier only | `5d2ee3a5d31435e5b8775088d346d353d5397bdb` | Pi pipeline, firmware, Flutter HTTP monitoring, service deployment |
| Currency_Backend | `63dd78deec1525348d41767f854afca463922213` | Training scripts, inference labels, model loader |
| Currency_Frontend | `e46b0910f59381bc9c052343d6ba785e7828c59d` | React image upload and `/predict` integration |
| Farta_Market | `d0225be000f58d5a49e51d9b9391c9ea1d8911f9` | React/Vite package and documented storefront/deployment behavior |
| BE_Farta-Market- | `eedc5c6da3c036ea10109896bbb9d466a7d46036` | Sanctum routes, product/cart tools, confirmation flow, payment code and deployment limits |
| websivi-admin | `90645af11d8fb0ae7cd8f900721f9ceebe1a6f14` | Separate React/Vite package; Admin capabilities documented in backend |
| BlockChain | `0f4309f2f6df07410b88bfcfc761c0ab073fae34` | Certificate verification controller and contract presence |
| auto-video-pipeline | `127370a76dd72c70b382db2c6ef56f69d6dbc118` | FFmpeg service, workflow files, documented local operation and optional TikTok |
| OneMekong-Landing | `5356f067a1f009c6b0c2d83c6d5c4fc4b6c3098b` | React/Vite/Framer Motion package, media source and telephone booking section |
| Neon_Lotus | `302a85322405067837eaf0376039e75e08835d5a` | Existing hospitality UI/booking component; not promoted to a new flagship |

## Claim-to-source ledger

### NLP Academic Search & RAG Engine

**Problem:** academic discovery requires both lexical/semantic matching and traceable answers.

**Implementation:** [hybrid_search.py](https://github.com/khanhlinhcode/NLP-Academic-Search-RAG-Engine/blob/cb8d0bc83b041f3ab04299b81c5015e44042a710/src/nlp_academic_search/search/hybrid_search.py) implements sparse/dense fusion, RRF, and corpus-size consistency checks. [generator.py](https://github.com/khanhlinhcode/NLP-Academic-Search-RAG-Engine/blob/cb8d0bc83b041f3ab04299b81c5015e44042a710/src/nlp_academic_search/rag/generator.py) separates generation and typed provider failures. [verification.py](https://github.com/khanhlinhcode/NLP-Academic-Search-RAG-Engine/blob/cb8d0bc83b041f3ab04299b81c5015e44042a710/src/nlp_academic_search/rag/verification.py) validates structured claim judgments and quoted evidence against retrieved titles/abstracts.

**Engineering challenge:** retrieval availability, generation availability, and evidence validity are different gates. Portfolio copy now distinguishes them. The presence of evaluation scripts is not a measured retrieval/RAG score.

**Result/demo:** source-backed implementation, public Streamlit entry point and API docs. No authenticated query, generation request, or quality benchmark was executed.

### Drowsiness Detection — Edge AI & IoT

**Problem:** camera signals need to become observable device alerts on constrained edge hardware.

**Source evidence at the internal revision above (intentionally no repository hyperlink):**

- `PI/drowsy_edge.py`: MediaPipe FaceLandmarker configuration around lines 50–60; MQTT heartbeat/retry settings around 63–88; `_ear_eye` at 1451 and `_head_pose` at 1492; latest-frame state at 2224 onwards and capture/update loops around 2594–2696.
- `drowsy_esp32/src/main.cpp`: C++ LED/buzzer pin and output definitions around 31–53 and MQTT/device state handling.
- `drowsy_esp32/platformio.ini`: ESP32 Arduino environment, PubSubClient and hardware libraries.
- `sleepy_app/lib/services/edge_api_service.dart`: HTTP client, polling timer and error handling.
- `PI/systemd/drowsy-edge.service`: prerequisite checks, service dependencies, restart policy.

**Engineering challenge/result:** latest-frame handling, heartbeat/reconnection, and service startup/recovery exist in source. This audit did not measure a performance improvement or run Pi/ESP32/Flutter on physical devices.

**Disclosure:** `links: []`. No source/demo/docs button, corner icon, empty link container, clickable wrapper, or live-deck entry. Source evidence stays in this audit; the public bundle contains no repository identifier or URL.

### Currency recognition

**Problem/solution:** local image-upload recognition prototype with separate training and API/frontend layers.

The old EUR description was incorrect relative to the reviewed API. [api/inference.py](https://github.com/khanhlinhcode/Currency_Backend/blob/63dd78deec1525348d41767f854afca463922213/api/inference.py) explicitly maps INR, USA/USD and VN/VND labels, including background labels. Country labels are verified from code, not inferred from an old CV.

Training files present: `training/train_baseline.py`, `train_mobilenetv2.py`, `train_efficientnetb0.py`, `train_efficientnetv2b0.py`; evaluation scripts include confusion matrices and classification reports. [api/model_loader.py](https://github.com/khanhlinhcode/Currency_Backend/blob/63dd78deec1525348d41767f854afca463922213/api/model_loader.py) loads the configured artifact but does not establish compatibility between its output head and the API's class list.

**Limit:** the clone did not provide the original model artifacts or dataset needed for output-dimension, label-order, split-integrity, or model-quality verification. Earlier discussions about a specific 25-vs-26 mismatch were not treated as newly verified evidence. No dataset total, metric, model winner, or production-ready claim was published.

Frontend corroboration: `src/pages/Predict.jsx` builds `FormData` and submits it to `/predict` around lines 102–108, with background-label handling around line 200.

### Farta Market — full-stack commerce and grounded assistance

**Architecture:** React/Vite storefront + separate React/Vite Admin + Laravel 12 API, not the separate `farta-commerce` architecture.

- [Storefront README](https://github.com/khanhlinhcode/Farta_Market/blob/d0225be000f58d5a49e51d9b9391c9ea1d8911f9/README.md): catalog, checkout, account flows, explicit cart confirmation, Cloudflare Pages Direct Upload.
- [Backend README](https://github.com/khanhlinhcode/BE_Farta-Market-/blob/eedc5c6da3c036ea10109896bbb9d466a7d46036/README.md): Laravel, Admin capability boundaries, Northflank, staging/demo status, unverified SePay deployment gates.
- [routes/api.php](https://github.com/khanhlinhcode/BE_Farta-Market-/blob/eedc5c6da3c036ea10109896bbb9d466a7d46036/routes/api.php): Sanctum and role/ability middleware.
- [ChatProductTool.php](https://github.com/khanhlinhcode/BE_Farta-Market-/blob/eedc5c6da3c036ea10109896bbb9d466a7d46036/app/Services/Chat/ChatProductTool.php): database filters and reloaded product price/inventory rather than trusting client/LLM commerce facts.
- [ChatCartTool.php](https://github.com/khanhlinhcode/BE_Farta-Market-/blob/eedc5c6da3c036ea10109896bbb9d466a7d46036/app/Services/Chat/ChatCartTool.php): validates cart references and reloads availability.
- `app/Http/Controllers/ChatController.php`, around lines 953–1296: pending-confirmation stages and confirmation offers rather than automatic mutations.
- [PaymentController.php](https://github.com/khanhlinhcode/BE_Farta-Market-/blob/eedc5c6da3c036ea10109896bbb9d466a7d46036/app/Http/Controllers/PaymentController.php): transaction/idempotency handling and SePay webhook verification; missing configuration returns 503.
- [Admin package](https://github.com/khanhlinhcode/websivi-admin/blob/90645af11d8fb0ae7cd8f900721f9ceebe1a6f14/package.json): separate React/Vite application.

**Challenge/result:** source implements bounded shopping assistance and stateful commerce handling. No claim of autonomous purchasing, unrestricted agent action, or a validated vector-RAG deployment was introduced. Auth, chatbot, cart mutation, payments, Admin MFA and webhooks were not exercised in production.

### CertChain

[verifyController.js](https://github.com/khanhlinhcode/BlockChain/blob/0f4309f2f6df07410b88bfcfc761c0ab073fae34/backend/src/controllers/verifyController.js) contains ID/file verification, hash-based on-chain checks, QR URLs, IPFS metadata and revocation fields. `smart-contract/contracts/CertRegistry.sol` is present.

Kept as featured engineering work. The public frontend is not evidence that wallet signing, IPFS persistence or issue/revoke/verify transactions work end to end.

### Auto Video Pipeline

[README](https://github.com/khanhlinhcode/auto-video-pipeline/blob/127370a76dd72c70b382db2c6ef56f69d6dbc118/README.md) describes self-hosted Docker Compose/n8n operation and **optional** TikTok posting. `ffmpeg-api/server.js` contains FFmpeg rendering routes; `n8n-workflows/auto-video-pipeline.json` is present. Replaced the old unconditional automated-publishing claim. No OAuth or unattended-production test performed.

### Auto Race and YOLOv8

Added with explicit **author-provided** status, not “implementation reviewed.”

- Auto Race: supplied brief describes Jetson Nano/JetRacer Pro, camera frames/steering labels, ResNet-18, track iteration, Third Prize with Tracklab.
- YOLOv8: supplied brief describes correct/incorrect/no-mask classes, preparation/annotation/augmentation/training/evaluation.
- Public GitHub repository listing did not establish a matching source repository. No invented GitHub/demo link, photo, training result or benchmark was added.
- Needed for independent verification: competition certificate, training notebooks/configs, dataset provenance and evaluation artifacts.

### Other engineering work and employment

OneMekong-Landing `package.json`, `src/data/media.js`, and `src/components/PhoneBookingSection.jsx` support React/Vite/Framer Motion, Cloudinary, and telephone reservations. Corrected the old NestJS/MongoDB/Redis attribution **for that landing page**. The landing is not evidence of an integrated reservation backend.

Neon_Lotus has hospitality UI and a telephone booking path. It was evaluated but not added as another flagship/live entry: no additional verified deployment outcome was established, and it would duplicate the restaurant showcase.

OneMekong employment contributions (Flutter module, React Admin, REST sync, duplicate booking fix, OTP migration and exchange-rate cron) are **owner-provided responsibilities**, not independently source-verified in this audit. Hotel/cruise/POS replacement claims were omitted for insufficient evidence. Drowsy source corroborates the technical scope of Tien Phong work, not its employment dates or individual authorship.

Both employers remain. Employment period fields and rendering were removed completely; cards no longer reserve a date column.

## Deployment/link audit

Read-only requests on 20 October 2026. No login, purchase, payment simulation, wallet signature, webhook, generated query or Admin action.

| Target | Observed evidence | Limit |
|---|---|---|
| `https://fartamarket.company/` | HTTP 200; browser rendered catalog/product names and prices, no broken loaded images in that view | Staging/demo; not full production readiness |
| `https://api.fartamarket.company/up` | HTTP 200, “Farta Staging / Application up” | Liveness only |
| `https://api.fartamarket.company/api/products` | HTTP 200 JSON product catalog | Read-only catalog, not auth/order/payment proof |
| `https://n-xi-pink.vercel.app/` | HTTP 200, CertChain document | Frontend entry point only |
| `https://phuongnamrestaurant.vercel.app/` | HTTP 200, restaurant document | No actual reservation made |
| `https://nlp-academic-search-api.onrender.com/docs` | Initial 25s timeout; bounded retry returned HTTP 200 Swagger UI | Cold-start/availability variability; docs are not inference readiness |
| `https://nlp-academic-search-api.onrender.com/health/ready` | Initial 25s timeout | Readiness not established by that attempt |
| `https://nlp-academic-search.streamlit.app/` | Initial Node fetch failed; browser rendered Streamlit's “app has gone to sleep” screen | Not permanently broken; no wake-up button clicked or RAG request sent |
| Public project GitHub links | Matching repositories cloned successfully at revisions above | Access/source existence, not successful runtime |

API health and Admin deployment URLs are audit targets only, not public CTA additions. Drowsy has no public CTA at all.

## Validation and remaining work

See `portfolio-validation.md` for exact commands, browser coverage, screenshots and test limitations. Repository metadata and source reviews are bounded snapshots; recheck hosted availability before publishing. No deployment was performed.
