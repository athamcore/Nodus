# Nodus — Product Requirements Document
Version 1.0 — Draft for Product Definition

## 1. Executive summary

Nodus is an intelligent academic memory for classrooms. Students can record lectures locally, recover interrupted recordings, process lectures into timestamped transcripts and study resources, ask grounded questions, capture board/slide visuals, scan handwritten notes, and search across their academic memory.

Professors can create courses, publish materials, review AI-assisted content, and approve resources for students.

## 2. Vision

Make classroom teaching persistent, searchable, understandable, and revisitable without forcing students to manually reconstruct everything they heard.

## 3. Problem

Important classroom explanations disappear after class. Notes are incomplete, recordings are difficult to search, visuals lose their relationship to spoken explanation, and generic AI cannot reliably answer what a particular professor actually said.

## 4. Product goals

- Reliable lecture capture.
- Local-first recording with optional cloud backup.
- Recoverable recordings after interruption.
- Timestamped transcription.
- Grounded lecture Q&A.
- Automatic detection of professor-explicit importance and exam references.
- Visual and handwritten-note capture.
- Unified academic search.
- Professor-controlled publishing workflow.

## 5. Non-goals for V1

- Training a proprietary foundational LLM or speech model.
- Perfect offline AI inference.
- Replacing a full LMS.
- Automatic exam prediction.
- Social/gamification systems.
- Perfect handwriting recognition.
- Automatic professor identification.
- Individual speech models for every professor.

## 6. Users

### Student
Needs reliable capture, retrieval, revision, and evidence-backed answers.

### Professor
Needs controlled course/material publishing and optional AI assistance.

## 7. Product principles

- Local-first.
- Source-first.
- Explicit provenance.
- Human control.
- Privacy by design.
- Graceful offline behavior.
- AI should assist, not invent.
- Simple recording interaction.

## 8. Core student journey

Home → Recording Setup → Active Recording → Lecture Saved → Processing → Lecture Overview → Ask Lecture → Grounded Answer → Source → Timestamp → Transcript/Audio.

## 9. Core features

### Recording
- Local persistent recording.
- Background/screen-off operation where OS permits.
- Chunked audio.
- Offline operation.
- Upload queue.
- Recovery of unfinished lectures.

### Lecture intelligence
- Timestamped transcript.
- AI notes.
- Topic extraction.
- Important statement detection.
- Exam-related statement detection.
- Flashcards.
- Questions.

### Provenance
Importance categories:
1. Explicitly Important — professor directly says it is important.
2. Explicitly Examination-Related — professor directly connects it to an exam.
3. AI-Detected Emphasis — inferred from repetition/context.
4. My Highlight — student-created.

AI inference must not be represented as a professor quote.

### Visual capture
Students can photograph boards, slides, diagrams, flowcharts, derivations, graphs, circuits, and notes. Each capture receives a lecture timestamp and can link back to audio.

### Handwritten OCR
Photo → preprocessing/OCR → structured text → AI understanding → user review/correction → saved note. Preserve the original image and surface uncertain text.

### Ask Lecture
Scope to the selected lecture first. Retrieve transcript, notes, highlights, materials, and relevant visual context. Generate an answer only from supported evidence. Show source and timestamp. If evidence is absent, say so.

### Search
Keyword + semantic search across transcripts, notes, materials, flashcards, questions, visuals, and highlights.

## 10. Professor workflow

Create course → enroll students → create lecture → upload material → optionally generate AI content → edit → approve → publish.

Professor content is clearly labeled as AI Generated, Professor Edited, Professor Approved, Student Generated, or Original Lecture.

## 11. Privacy

Recording consent and applicable institutional/legal requirements must be addressed before deployment. Users must understand what is stored locally, what is uploaded, and what AI processing requires network services.

## 12. Success metrics

Reliability:
- recording success
- recovery success
- sync success
- processing success

AI:
- transcription accuracy
- grounded answer accuracy
- source attribution accuracy
- importance detection precision
- OCR correction acceptance

Engagement:
- lectures recorded per active student
- processed lecture opens
- Ask Lecture usage
- notes/flashcards/questions/search usage

Professor:
- courses created
- published content
- professor-approved AI content
- student engagement with published content

## 13. V1 definition of success

A student can reliably record a lecture, survive an interruption, process it, search it, ask a question, and receive a grounded answer linked to the original lecture source. A professor can create a course and publish controlled academic content.
