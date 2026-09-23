# Nodus — V1 Technical Architecture Specification

## 1. Architecture

Use a modular monolith for V1.

Repository:
apps/mobile
apps/api
packages/shared-types
packages/api-client
packages/validation
infrastructure
docs
tests

## 2. Mobile

React Native + Expo development build, TypeScript, Expo Router.

Core:
- Expo SQLite for local metadata
- Expo FileSystem/local filesystem
- native modules where required for reliable background recording
- TanStack Query for server state
- Zustand for local UI state
- typed local data access layer

Background recording must be validated on real Android/iOS devices; simulator success is insufficient.

## 3. Backend

Python + FastAPI.
- Pydantic
- SQLAlchemy
- PostgreSQL
- REST API under /api/v1
- modular domain boundaries
- asynchronous processing workers

## 4. Storage

S3-compatible object storage for cloud audio, visual assets, and materials.

Local-first:
- recording exists locally before upload
- cloud is optional
- upload work is queued
- cloud AI processing may require network access and must be explicit

## 5. Database

PostgreSQL core entities:
User, StudentProfile, ProfessorProfile, Course, CourseMember, Lecture, Recording, RecordingChunk, TranscriptSegment, Topic, Highlight, VisualCapture, Material, Note, Flashcard, Question, Embedding, ProcessingJob.

## 6. Sync

Local states:
LOCAL_ONLY
PENDING_UPLOAD
SYNCING
SYNCED
CONFLICT
FAILED
DELETED

Each synchronized entity should support:
local_id
remote_id
sync_status
created_at
updated_at
last_synced_at

Sync must be idempotent and retryable.

## 7. Recording

Persist audio in chunks with a journal/manifest. Each chunk records sequence, duration, checksum/integrity metadata, local path, and upload state.

Recovery state machine:
RECORDING → PAUSED/ACTIVE → FINALIZING → SAVED → PROCESSING.

If interrupted:
INTERRUPTED → VALIDATING → RECOVERABLE or CORRUPT.

Only persisted valid chunks are recoverable.

## 8. AI pipeline

Audio
→ speech recognition
→ timestamped transcript
→ segmentation
→ topic extraction
→ explicit importance detection
→ AI emphasis detection
→ notes
→ flashcards/questions
→ embeddings/search index.

Provider interfaces:
SpeechProvider
LLMProvider
EmbeddingProvider
OCRProvider
VisionProvider
StorageProvider

Do not hardcode a single vendor across the domain layer.

## 9. RAG

Question
→ query understanding
→ retrieve lecture transcript/notes/highlights/materials/visual context
→ hybrid keyword + vector ranking
→ evidence filtering
→ LLM generation
→ answer + citations/timestamps.

The system must distinguish:
- directly supported lecture evidence
- AI inference
- general knowledge fallback.

## 10. Search

PostgreSQL full-text search + pgvector hybrid retrieval for V1.

Search indexes should preserve entity IDs and provenance.

## 11. Auth and authorization

Roles:
STUDENT
PROFESSOR
ADMIN (future/internal).

Every course/lecture/material access must be authorization-checked server-side.

Use signed URLs for private objects.

## 12. Security

- TLS in transit
- secure credential storage
- least privilege
- server-side authorization
- signed object URLs
- secrets only in environment/secret manager
- no API keys in mobile source
- audit important professor publishing actions

## 13. Observability

Use structured logs, error monitoring such as Sentry, processing job metrics, recording failure metrics, sync failure metrics, and AI provider latency/cost tracking.

## 14. Testing

Unit tests:
- state machines
- sync logic
- provenance
- permission checks
- AI guardrails

Integration:
- API/database
- object storage
- processing jobs

E2E:
- onboarding
- recording
- recovery
- processing
- Ask Lecture
- professor publish

Real-device:
- background recording
- screen lock
- calls/interruption
- Bluetooth microphone
- low storage
- airplane mode
- app termination/relaunch
- battery behavior

## 15. Environments

Development, staging, production.

Never mix production secrets with development.

## 16. Technical rule

No foundational architecture change may be made silently by an AI coding agent. Proposed changes must be documented and reviewed.
