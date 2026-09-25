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
│   ├── validation/      # Shared validation schemas
│   └── tsconfig/        # Shared TypeScript configurations
├── infrastructure/      # Deployment/infrastructure configuration
├── tests/               # Cross-system and acceptance tests
├── docs/                # Product and engineering specifications
└── .github/             # CI/CD workflows
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

**Current stage:** Specification complete / Phase 0 validated / Phase 1 scaffold complete (not feature-complete).

### Phase 1 Implementation Summary

| Component | Status | Notes |
|-----------|--------|-------|
| Monorepo (pnpm workspaces) | ✅ Implemented | 6 packages, pnpm-lock.yaml committed |
| Mobile shell (Expo + TypeScript + Expo Router) | ✅ Scaffold | 4 tabs, placeholder screens, Phase 1 notices |
| API shell (FastAPI + Pydantic) | ✅ Scaffold | Health endpoints, config, logging, security stubs |
| Shared types package | ✅ Implemented | Domain type definitions |
| Validation package | ✅ Implemented | Zod schemas for all domain entities |
| API client package | ✅ Scaffold | Typed client with placeholder methods |
| TypeScript strict mode | ✅ Enforced | All packages |
| ESLint + Prettier (Ruff) | ✅ Configured | All packages |
| pytest + Jest | ✅ Configured | Baseline tests added |
| CI (GitHub Actions) | ✅ Configured | Lint, typecheck, test |

### NOT Implemented in Phase 1 (per scope)

- Audio recording, background recording, screen-off recording
- Recording recovery
- Cloud sync / upload queue
- Speech-to-text / transcription
- AI notes / importance detection
- RAG / Ask Lecture
- OCR / visual capture
- Professor workflows
- Search implementation
- Production authentication (JWT scaffold only)
- Production database (SQLAlchemy scaffold only, no migrations)
- Production storage (interfaces only)

## Prerequisites

- **Node.js** >= 20.0.0
- **pnpm** >= 9.0.0
- **Python** >= 3.11
- **Expo CLI** (for mobile development): `pnpm add -g expo-cli`
- **Git**

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd Nodus

# Install all dependencies (root + all workspaces)
pnpm install

# Or install individually:
# pnpm -r install
```

## Development Commands

### Root Workspace

```bash
# Install all dependencies
pnpm install

# Run lint across all packages
pnpm lint

# Run typecheck across all packages
pnpm typecheck

# Run tests across all packages
pnpm test

# Clean all build artifacts
pnpm clean
```

### Mobile App (`apps/mobile`)

```bash
# Start Expo development server
pnpm dev:mobile
# or
cd apps/mobile && pnpm dev

# Run lint
cd apps/mobile && pnpm lint

# Run typecheck
cd apps/mobile && pnpm typecheck

# Run tests
cd apps/mobile && pnpm test

# Build for production (requires EAS)
cd apps/mobile && pnpm build:ios
cd apps/mobile && pnpm build:android
```

**Mobile Environment Setup:**

```bash
cd apps/mobile
cp .env.example .env
# Edit .env with your configuration
```

### API Server (`apps/api`)

```bash
# Start development server
pnpm dev:api
# or
cd apps/api && pnpm dev

# Run lint
cd apps/api && pnpm lint

# Run format check
cd apps/api && pnpm format:check

# Run typecheck
cd apps/api && pnpm typecheck

# Run tests
cd apps/api && pnpm test
```

**API Environment Setup:**

```bash
cd apps/api
cp .env.example .env
# Edit .env with your configuration
```

### Shared Packages

```bash
# Build all packages
cd packages/shared-types && pnpm build
cd packages/validation && pnpm build
cd packages/api-client && pnpm build

# Run lint/typecheck/test per package
cd packages/shared-types && pnpm lint && pnpm typecheck && pnpm test
cd packages/validation && pnpm lint && pnpm typecheck && pnpm test
cd packages/api-client && pnpm lint && pnpm typecheck && pnpm test
```

## Test Commands

```bash
# All tests
pnpm test

# Mobile only
cd apps/mobile && pnpm test

# API only
cd apps/api && pnpm test

# Packages only
cd packages/shared-types && pnpm test
cd packages/validation && pnpm test
cd packages/api-client && pnpm test
```

## CI/CD

GitHub Actions workflow (`.github/workflows/ci.yml`) runs on every push and PR:

- Mobile: lint, typecheck, test
- Packages: lint, typecheck, test (per package)
- API: lint, format check, typecheck, test with coverage
- Root: install verification

## Architecture Decisions (Unresolved)

The following vendor decisions are intentionally deferred and must not be hardcoded:

| Decision | Status | Phase |
|----------|--------|-------|
| Authentication provider | Deferred | Phase 3 |
| PostgreSQL hosting | Deferred | Phase 2 |
| S3-compatible storage | Deferred | Phase 9 |
| Speech-to-text provider | Deferred | Phase 10 |
| LLM provider | Deferred | Phase 12 |
| OCR provider | Deferred | Phase 15 |
| Embedding provider | Deferred | Phase 11 |
| Deployment platform | Deferred | Phase 21 |
| Queue implementation | Deferred | Phase 2 |

Provider interfaces are defined as TypeScript types in `packages/shared-types` and Zod schemas in `packages/validation`. Actual provider implementations do not exist in Phase 1.

## Contributing

1. Read the specification documents in `docs/`
2. Follow the phased implementation plan
3. Run lint, typecheck, and tests before committing
4. Never commit secrets (use `.env` files, not committed)
5. Keep mocked and production functionality separate
6. Document significant architecture changes

## License

Proprietary — All rights reserved.