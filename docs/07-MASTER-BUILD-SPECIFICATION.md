# Nodus — V1 Master Build Specification & AI Coding Instructions

## Operating rule

This document is the execution contract for AI coding agents.

The agent must:
1. Read every specification before coding.
2. Identify contradictions, missing requirements, and technical risks.
3. Produce an implementation plan.
4. Work phase-by-phase.
5. Write and run tests.
6. Never fake completed functionality.
7. Never silently remove local-first recording, recovery, provenance, or source grounding.
8. Report IMPLEMENTED separately from VALIDATED ON DEVICE.
9. Stop at architecture/auth/recording/sync/RAG/production review checkpoints.

## Phase 0 — Specification validation

Deliver:
- requirements checklist
- architecture decision record
- unresolved questions
- dependency list
- implementation plan

Do not start feature implementation until Phase 0 is reviewed.

## Phase 1 — Repository foundation

Create:
- monorepo workspace
- mobile app
- API app
- shared packages
- linting/formatting
- environment templates
- CI
- documentation structure

## Phase 2 — Backend foundation

Implement:
- FastAPI application
- configuration
- database connection
- migrations
- health endpoint
- structured errors
- logging
- test framework

## Phase 3 — Authentication

Implement:
- student/professor roles
- registration/login
- session handling
- authorization middleware
- course membership checks

## Phase 4 — Mobile foundation

Implement:
- navigation
- design tokens
- local database
- filesystem layer
- API client
- query/state management
- offline state

## Phase 5 — Courses and lectures

Implement:
- create/join course
- course membership
- lecture metadata
- lecture list/detail

## Phase 6 — Local persistence

Implement:
- recording manifest
- local entities
- durable file storage
- job queue
- crash-safe state transitions

## Phase 7 — Recording engine

Implement and validate:
- microphone capture
- pause/resume
- chunking
- background operation
- screen-off operation
- interruption handling
- storage checks

Do not mark complete until real-device validation.

## Phase 8 — Recovery

Implement:
- unfinished recording detection
- integrity validation
- reconstruction
- recover/delete actions
- safe cleanup

## Phase 9 — Sync

Implement:
- upload queue
- retry/backoff
- resumable uploads where practical
- state reconciliation
- conflict handling
- offline queue visibility

## Phase 10 — Speech-to-text

Implement provider abstraction and asynchronous processing. Preserve timestamps and provider metadata.

## Phase 11 — Transcript

Implement:
- transcript segments
- timestamp navigation
- audio jump
- search indexing
- transcript states

## Phase 12 — AI notes and importance

Implement:
- note generation
- topic extraction
- explicit professor-important detection
- explicit exam-related detection
- AI-detected emphasis
- provenance labels

Do not claim AI-detected emphasis was said by professor.

## Phase 13 — Ask Lecture / RAG

Implement:
- query scoping
- hybrid retrieval
- evidence ranking
- grounded generation
- source/timestamp links
- unsupported-answer behavior
- general explanation as a clearly separate mode

## Phase 14 — Visual capture

Implement:
- camera capture
- lecture timestamp
- local persistence
- upload queue
- labels
- viewer
- audio jump

## Phase 15 — OCR

Implement:
- image preprocessing
- OCR provider
- confidence/uncertainty
- user correction
- original image preservation

## Phase 16 — Professor system

Implement:
- course management
- student management
- materials
- AI-assisted generation
- editor
- approval
- publish
- provenance

## Phase 17 — Search

Implement:
- keyword
- semantic
- filters
- result provenance
- lecture/course scope

## Phase 18 — UI refinement

Only after flows are validated:
- visual system
- typography
- spacing
- accessibility
- polished components
- responsive behavior

## Phase 19 — Security/privacy

Verify:
- authorization
- signed URLs
- secrets
- data deletion
- storage controls
- consent UX
- auditability

## Phase 20 — Reliability

Test:
- network loss
- app crash
- device restart
- storage exhaustion
- duplicate jobs
- provider failures
- sync retries
- malformed AI output

## Phase 21 — Production hardening

- staging deployment
- production configuration
- monitoring
- backups
- migrations
- CI/CD
- incident runbook
- cost controls
- release checklist

## Definition of done

A feature is done only when:
- implemented
- tested
- error states handled
- security reviewed
- observability present where relevant
- offline behavior defined
- documentation updated
- real-device validation completed when applicable

## AI coding discipline

Use small commits with clear messages.

Before changing architecture:
- explain why
- list affected modules
- update architecture documentation
- request review

Never:
- put secrets in source
- claim unsupported APIs work
- silently replace provider abstractions
- bypass authorization
- delete local recording to simplify implementation
- fabricate lecture evidence
- mark mocked flows as production-ready
