# Nodus — Phase 0 Specification Validation

Status: Validated for implementation planning
Date: 2026-09-24

## 1. Purpose
Phase 0 validates that the product requirements, user flows, information architecture, wireframe specification, technical architecture, and master build plan can be executed without silently changing the core product contract.

## 2. Source hierarchy
1. Product requirements define product intent and boundaries.
2. User flows define required behavior and journeys.
3. Scope matrix defines V1 inclusion/exclusion.
4. Information architecture defines navigation and entity relationships.
5. Wireframe specification defines interaction and UI behavior.
6. Technical architecture defines implementation constraints.
7. Master build specification defines execution order and coding-agent discipline.

A technical convenience must not override a product requirement without an explicit architecture decision.

## 3. Validated product invariants
- Local-first recording.
- Audio must be durably persisted locally before it is considered safely captured.
- Cloud backup is optional.
- Recording works while offline.
- Interrupted recordings enter a recovery workflow.
- Only persisted, integrity-validated chunks are recoverable.
- Background/screen-off recording must be validated on real devices.
- AI answers must be grounded in available Nodus evidence.
- Grounded answers expose source and timestamp.
- Professor statements and AI inference must remain distinct.
- Explicit professor importance and exam references are automatically detected.
- Personal student highlights are optional, not required for AI importance detection.
- Visual captures receive lecture timestamps.
- OCR preserves the original image and exposes uncertain text for review.
- Professor AI content is editable and approval-controlled.
- Server-side authorization protects courses, lectures, materials, and private objects.
- Provider integrations remain replaceable behind interfaces.
- V1 uses a modular monolith rather than premature microservices.

## 4. Architecture decisions
### ADR-001: Monorepo
Use one repository: athamcore/Nodus. Applications and packages live in directories rather than separate repositories.

### ADR-002: Mobile stack
Use React Native + Expo development build + TypeScript + Expo Router. Native modules may be introduced where reliable background recording requires them.

### ADR-003: Local persistence
Use SQLite for local metadata/state and the device filesystem for audio/image assets.

### ADR-004: Backend
Use Python + FastAPI + Pydantic + SQLAlchemy + PostgreSQL.

### ADR-005: Search
Use PostgreSQL full-text search plus pgvector for hybrid retrieval in V1.

### ADR-006: Storage
Use S3-compatible object storage for cloud assets. Exact provider remains an implementation choice and must be isolated behind StorageProvider.

### ADR-007: AI providers
Do not hard-code a speech, LLM, OCR, vision, or embedding vendor into domain logic.
Required interfaces: SpeechProvider, LLMProvider, EmbeddingProvider, OCRProvider, VisionProvider, StorageProvider.

### ADR-008: Local AI boundary
V1 local-first does not mean all AI inference is offline. Recording and core user data persistence are local-first. Remote AI processing may require connectivity and must be surfaced honestly.

### ADR-009: RAG source chain
The canonical evidence path is: AI Answer → Evidence Source → Timestamp → Transcript Segment → Original Audio.

### ADR-010: Sync model
Entities expose local and remote identity plus sync status. Sync is idempotent and retryable.
States: LOCAL_ONLY, PENDING_UPLOAD, SYNCING, SYNCED, CONFLICT, FAILED, DELETED.

## 5. Main implementation risks
Recording reliability: background execution, screen lock, calls, Bluetooth microphones, low storage, process termination, and device-specific OS behavior can break capture. Mitigation: chunked persistence, recovery state machine, real-device test matrix.

Speech recognition: Indian accents, code-mixing, classroom noise, technical vocabulary, and overlapping speech may reduce accuracy. Mitigation: provider benchmarking, timestamp preservation, confidence/quality metadata, replaceable provider interface.

Grounded AI: retrieval failure or hallucination could make Nodus falsely attribute claims to a professor. Mitigation: evidence threshold, source-linked answers, explicit unsupported-answer state, separate general-knowledge mode, evaluation set.

Privacy/consent: classroom recordings may involve other people and institutional rules. Mitigation: consent UX, clear local/cloud disclosure, deletion controls, access controls, documented deployment requirements.

Cost: audio storage, transcription, embeddings, OCR, and LLM calls can become expensive. Mitigation: asynchronous processing, configurable providers/models, usage metering, retention controls, cost observability.

## 6. Open decisions that do not block Phase 1
- Exact authentication provider.
- Exact cloud storage provider.
- Exact speech provider after benchmark.
- Exact LLM provider/model.
- Exact OCR provider.
- Exact queue implementation.
- Deployment platform.
- Analytics provider.
- Initial supported device matrix.
- Classroom recording consent wording and institutional policy.

These decisions must not cause speculative vendor coupling in the architecture.

## 7. Required implementation checkpoints
- Checkpoint A — before recording: review native recording strategy and device constraints.
- Checkpoint B — before sync: review local/cloud ownership, retries, conflict behavior, and deletion semantics.
- Checkpoint C — before RAG: review evidence schema, retrieval quality, attribution, and unsupported-answer behavior.
- Checkpoint D — before professor publishing: review authorization and provenance.
- Checkpoint E — before production: review security, privacy, observability, backups, migrations, and real-device validation.

## 8. Phase 1 deliverables
- monorepo workspace configuration
- mobile application shell
- FastAPI application shell
- shared TypeScript contracts
- API client package
- validation package
- linting/formatting configuration
- environment templates
- CI workflow
- baseline tests
- developer setup documentation

No recording engine, AI pipeline, production authentication, or cloud synchronization should be implemented in Phase 1.

## 9. Phase 0 conclusion
The specifications are sufficiently aligned to begin repository and application scaffolding.

The implementation agent must stop and request review if it discovers a contradiction that changes user-visible behavior, data ownership, privacy semantics, source attribution, recording reliability, synchronization semantics, authorization, or the V1 scope boundary.