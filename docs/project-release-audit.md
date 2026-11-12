# Featured projects: from prototypes to useful applications

Audit date: 12 November 2026. This document is in the private portfolio repository because it includes a private project's readiness assessment. It should not be copied verbatim into a public portfolio.

## Scope and evidence

Reviewed source trees, API handlers, dependency manifests, setup docs, migrations and available tests for the four selected repositories. This is an initial engineering audit, not a penetration test or an independent reproduction of model-training metrics. No datasets, model weights, private production database or user payloads were downloaded. The only executed project tests in this audit are the new Enterprise RAG foundation tests and its disposable PostgreSQL smoke check; other projects' documented test counts have not been revalidated.

| Project | Reviewed baseline | Current shape | Accent | First release goal |
|---|---|---|---|---|
| Enterprise-RAG-System | `4754ea6e1b30bc9d503937ddc5ece805997c00fc` | FastAPI + Streamlit; retrieval pipeline exists, but setup and persistence need repair | Azure | A workspace-scoped document-to-answer workflow with inspectable excerpts |
| genre-screenplay-lora | `8c27edc4ae80564315bbe2f548100c65e6653c48` | LoRA training/evaluation notebooks, GPU FastAPI serving and single-file HTML UI | Violet | A predictable scene-generation workflow with controlled model serving |
| polyp-detection-faster-rcnn | `19747e7bff78f5dbd7ca589fdbf55a05ebd58004` | Annotation conversion script and training/inference notebook | Azure | A research demonstration with explicit evaluation and visual predictions |
| agentflow (private) | `619ca0759e3f70b139dc2b2c0305ec21c2c11c9c` | React/TypeScript, FastAPI/PostgreSQL, execution history and opt-in queued workflows | Teal | A deployed workflow builder with a proven end-to-end user journey |

## 1. Enterprise RAG — work started

Evidence: `backend/pyproject.toml` had no dependencies, `backend/migrations/versions/` was absent, `document_service.py` used uploaded filenames as storage paths, and document deletion did not remove the external FAISS content. `retrieval_service.py` ranked globally before tenant filtering. The original files under `backend/tests/` executed scripts and could write to the configured database rather than isolating their fixtures. Importing `embedding_service.py` loaded SentenceTransformers weights immediately. Ollama HTTP calls had no timeout or error contract. The Streamlit client assumes localhost and the document picker advertised an unsupported DOCX type.

First implementation: reproducible uv dependencies; configuration and local deployment examples; migrations; guarded uploads and cleanup; active-user checks; bounded transactional vectors and tenant-first ranking; provenance excerpts; provider timeouts; isolated automated tests. FAISS prototype storage is retired, with an explicit old-data migration/re-indexing note. No existing databases or uploaded files were modified.

Verification: 38 automated tests passed using disposable SQLite and stubbed provider responses. A separate fresh PostgreSQL 16 smoke check passed migration upgrade/downgrade, metadata parity, readiness, registration, upload, persisted JSON embeddings, citation retrieval, cross-workspace access checks and deletion. This does not validate answer quality, model latency or real model inference.

Next: connect a real React product workflow using shared components; add bounded ingestion workers/status, usage limits and model-based evaluation. Verify actual Ollama models and resource requirements before choosing hosting. Use pgvector before scaling beyond the deliberately bounded exact scan.

## 2. AgentFlow — preserve the work already present

Evidence: `AGENTS.md`, `README.md`, `backend/app/`, `backend/migrations/`, frontend `src/api/`, `compose.yaml` and checked-in locks. The active system already includes accounts, immutable workflow versions, validation, persisted executions and an opt-in outbox/worker path. Its own documentation distinguishes supported behaviour from planned capabilities and reports an extensive test suite. Those reported counts were not rerun in this audit.

The immediate need is release verification and deployment, rather than replacing it with another POC. Follow its AGENTS.md: do not mutate development databases, run integration tests only against guarded disposable PostgreSQL/Redis, and do not treat external side effects as automatically retryable. Existing Groq configuration/free-plan constraints must be preserved. Older fixtures and prototype routes must not be mixed into real accounts.

First release actions: rerun existing checks, verify the registered-user workflow in a browser, test worker/broker restart and cancellation, configure a same-origin HTTPS API, confirm cookie/session behaviour behind the proxy, add monitoring/backup procedures, then apply shared visual tokens gradually. Background Groq execution requires its own recovery policy. Keep source private unless explicitly asked otherwise.

## 3. Genre Screenplay LoRA — serving needs a product boundary

Evidence: `backend/main.py` uses one mutable global ModelState, unloads/reloads the entire base model when switching genres, and exposes a synchronous `/generate` endpoint. Concurrent requests can race model unload/load and generation. The request schema bounds output tokens but does not bound text input lengths. CORS is unrestricted and server exceptions are returned directly. Dependencies are broad ranges, no automated tests were found, and the documented serving path needs a CUDA GPU and gated base-model access. Evaluation numbers in README are author-reported, not independently reproduced here.

First release actions: separate provider/model management from the API; serialise model access or use a bounded inference queue; enforce input limits, request budgets, cancellation semantics and sanitised errors; add fake-provider API tests and a pinned setup. Keep a small sample gallery for cold/offline states, clearly labelled as samples. Build the violet React workflow, then benchmark actual adapter switching, latency and GPU memory. Confirm model/dataset licences and gated access before distributing weights or paid deployment.

Cost driver: a persistent GPU service. Kaggle/ngrok is a development path, not a reliable always-on portfolio URL. Do not select paid hosting before measuring requirements.

## 4. Polyp Detection — turn the notebook into a reproducible research demo

Evidence: tracked files are README, `convert_coco.py` and `faster_rcnn.ipynb`. No trained `.pth`/`.pt` weights, service, tests, dependency lock, or frontend were found. The notebook saves a checkpoint and performs inference, but the inspected code does not define a held-out train/validation/test split or aggregate mAP evaluation. The README discusses a complete pipeline, but deployment artefacts and reported evaluation need to be supplied/reproduced.

First release actions: extract importable data, model, evaluation and inference modules; make conversion path-configurable and validate annotations; define reproducible leakage-aware splits; evaluate mAP/recall and document failure cases; identify a versioned checkpoint and its provenance. Build an image-upload research interface with bounding boxes, thresholds and an explicit 'research demonstration, not for clinical decisions' statement. Do not accept private clinical images in a public demo by default. Bound image decoding dimensions, request sizes and inference concurrency.

Cost driver: checkpoint availability and CPU/GPU latency. Determine those before deploying an API.

## Shared product and portfolio rules

- White is the common background; typography, spacing, controls, navigation and motion behaviour come from Porcelain & Azure.
- Projects select an accent (azure, teal or violet), while success/warning/error colours retain stable meanings.
- Start with complete, narrow user workflows. Add authentication, workers and storage because a workflow needs them, not as decoration.
- Keep real actions separate from samples. Never present simulated outputs as model results.
- Publish live links only after deployments are verified. Until then, show accurate project descriptions and GitHub access where appropriate; AgentFlow remains private.
- Portfolio evidence should include the problem, contribution, architecture, measured results, screenshots, limitations, source link and verified live URL.

## Suggested delivery order

1. Complete and review the RAG backend foundation, then its React workflow and actual-model evaluation.
2. Run AgentFlow's existing acceptance checks and prepare its deployment; it may be nearer to release than the remaining model projects.
3. Harden Screenplay LoRA serving and measure GPU needs.
4. Make Polyp Detection reproducible and evaluated, then ship the research demo.

Each project should have its own reviewed change set and deployment plan. No paid infrastructure, public release, repository visibility change or model downloads were performed during this audit.
