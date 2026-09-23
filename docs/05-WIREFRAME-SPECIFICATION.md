# Nodus — V1 Wireframe & AI Build Specification

## Purpose

This document is the handoff specification for UI/UX and AI coding agents. It describes behavior before visual polish.

## Base frame

Mobile target: 390 × 844 px.

Low-fidelity phase:
- grayscale/neutral
- simple borders
- no decorative gradients
- focus on hierarchy and interaction
- accessible tap targets
- explicit loading/error/empty/offline states

## Critical screens

### 1. Home
Show:
- current courses
- recent lectures
- processing queue
- cloud/local status
- prominent Record action

### 2. Recording Setup
Show:
- course selector
- lecture title
- recording storage mode
- microphone permission state
- storage availability
- Start Recording

### 3. Active Recording
Show:
- elapsed time
- recording state
- local persistence state
- pause/resume
- visual capture
- optional personal highlight
- stop

The capture interaction must remain fast. Labels can be added later.

### 4. Lecture Saved
Show:
- recording duration
- saved locally confirmation
- sync state
- process action/status

### 5. Processing
Show stages:
- recording validated
- audio prepared
- speech recognition
- transcript created
- topics detected
- importance analyzed
- study resources generated
- search index updated

### 6. Lecture Overview
Show:
- title
- date
- duration
- notes
- Ask Lecture
- highlights
- transcript
- visuals
- flashcards
- questions
- audio

### 7. Ask Lecture
Show:
- question input
- suggested questions
- scope indicator
- evidence availability

### 8. Answer + Source
Show:
- answer
- source excerpt
- source type
- timestamp
- Listen from here
- View transcript

Never present AI inference as a direct professor quote.

## Additional states

Unfinished Lecture Recovery:
- detected recording
- approximate duration
- recover/delete
- integrity state

Offline:
- clear Local/Offline badge
- queued actions
- no false sync success

Error:
- human-readable error
- retry
- preserve local work

## Components

- RecordingStatus
- StorageStatus
- SyncStatus
- ProcessingTimeline
- SourceCard
- TimestampLink
- AudioPlayer
- TranscriptSegment
- HighlightBadge
- VisualCaptureCard
- OCRConfidenceMark
- SearchResult
- EmptyState
- ErrorState
- OfflineBanner

## Interaction rule

Every source-related AI result should be navigable to the original evidence. This source chain is a signature interaction, not optional decoration.

## Professor UI

Professor course dashboard → lecture/material creation → processing → editor → approval → publish.

Professor can edit, regenerate, reorder, add text, delete, approve, or publish AI-assisted content.

## AI-agent UI instructions

Do not invent screens that contradict this specification. Implement behavior before visual polish. Preserve local-first semantics and provenance. Use realistic mock data for prototype states but label unimplemented backend functionality honestly.
