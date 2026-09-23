# Nodus

**Nodus — Intelligent Academic Memory for the Classroom**

> Never lose what your professor taught.

Nodus is a local-first, cloud-optional AI academic memory platform for students and professors. It captures classroom teaching, preserves original sources, understands lecture content, and makes it searchable and studyable later.

## Repository structure

```
Nodus/
├── apps/
│   ├── mobile/          # React Native + Expo mobile app
│   └── api/             # FastAPI backend
├── packages/
│   ├── shared-types/    # Shared contracts and types
│   ├── api-client/      # Typed API client
│   └── validation/      # Shared validation schemas
├── infrastructure/      # Deployment/infrastructure configuration
├── tests/               # Cross-system and acceptance tests
└── docs/                # Product and engineering specifications
```

## Documentation

Read these before implementation:

1. [PRD](docs/01-PRD.md)
2. [User Flows](docs/02-USER-FLOWS.md)
3. [Scope Matrix](docs/03-SCOPE-MATRIX.md)
4. [Information Architecture](docs/04-INFORMATION-ARCHITECTURE.md)
5. [Wireframe Specification](docs/05-WIREFRAME-SPECIFICATION.md)
6. [Technical Architecture](docs/06-TECHNICAL-ARCHITECTURE.md)
7. [Master Build Specification](docs/07-MASTER-BUILD-SPECIFICATION.md)
8. [Phase 0 Validation](docs/08-PHASE-0-VALIDATION.md)

## Core engineering principles

- **Local-first:** recordings are persisted locally before any upload.
- **Cloud-optional:** cloud backup/storage is a user-controlled option.
- **Recoverable:** interrupted recordings are detected and recoverable when persisted chunks are intact.
- **Grounded AI:** lecture answers must be supported by Nodus evidence.
- **Provenance:** AI answers link back to source, timestamp, transcript, and original audio.
- **Provider abstraction:** speech, LLM, OCR, embeddings, vision, and storage providers are replaceable.
- **Modular monolith first:** avoid premature microservices.
- **No fake completeness:** mocked functionality must be clearly separated from production functionality.

## Product

### Student

Nodus lets students:

- record lectures locally
- continue recording with limited/no connectivity
- recover interrupted recordings
- generate timestamped transcripts
- generate AI study notes
- ask questions about a specific lecture
- see the evidence behind AI answers
- automatically identify professor-explicit important/exam-related statements
- capture boards, slides, diagrams, circuits, graphs, and derivations
- scan handwritten notes with OCR
- create flashcards and study questions
- search across their academic memory

### Professor

Professors can:

- create courses
- manage students
- create lectures
- upload academic materials
- optionally use AI to generate study content
- edit and review AI output
- approve content
- publish materials to students

## Architecture

V1 uses a modular-monolith architecture:

- **Mobile:** React Native + Expo + TypeScript
- **Backend:** Python + FastAPI
- **Database:** PostgreSQL
- **Local database:** SQLite
- **Search:** PostgreSQL full-text search + pgvector
- **Cloud assets:** S3-compatible object storage
- **Processing:** asynchronous background jobs
- **AI:** provider abstractions for speech, LLM, OCR, vision, and embeddings

The exact external providers are intentionally not hard-coded into the product architecture.

## Local-first model

Recording is considered safely captured only after local persistence.

Cloud backup is optional.

If connectivity is unavailable:

1. recording continues locally
2. processing/upload work can be queued
3. queued work resumes when connectivity returns
4. the UI clearly communicates Local, Offline, Syncing, or Synced state

Nodus does **not** promise fully offline AI inference in V1. Remote AI processing may require an internet connection.

## AI provenance

A central Nodus interaction is:

**AI Answer → Evidence Source → Timestamp → Transcript → Original Audio**

Nodus must distinguish:

- what the professor explicitly said
- what Nodus inferred from the lecture
- what comes from general AI knowledge

AI inference must never be presented as a professor quote.

## Build rule

Do not begin feature implementation until Phase 0 of the Master Build Specification has been completed and reviewed.

The implementation process is intentionally phased:

```
Phase 0   Specification validation
Phase 1   Repository foundation
Phase 2   Backend foundation
Phase 3   Authentication
Phase 4   Mobile foundation
Phase 5   Courses and lectures
Phase 6   Local persistence
Phase 7   Recording engine
Phase 8   Recording recovery
Phase 9   Cloud synchronization
Phase 10  Speech-to-text
Phase 11  Transcript system
Phase 12  AI notes and importance detection
Phase 13  Ask Lecture / RAG
Phase 14  Visual capture
Phase 15  OCR
Phase 16  Professor system
Phase 17  Search
Phase 18  UI refinement
Phase 19  Security/privacy
Phase 20  Reliability testing
Phase 21  Production hardening
```

## Development philosophy

Nodus should be built with AI coding tools, but AI agents operate under the repository specifications rather than inventing the product from scratch.

Agents must:

- read the specifications before coding
- identify contradictions before implementation
- work phase-by-phase
- write and run tests
- keep mocked and production functionality separate
- never silently change architecture
- never bypass authorization
- never fabricate lecture evidence
- document significant architecture changes
- distinguish **IMPLEMENTED** from **VALIDATED ON DEVICE**

## Project status

**Current stage:** Specification complete / Phase 0 validated / Phase 1 ready.

The next step is repository and application scaffolding.