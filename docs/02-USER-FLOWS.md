# Nodus — User Flows

## Student navigation

Bottom navigation:
- Home
- Courses
- Search
- Profile

Primary floating action:
- Record

## Authentication

Splash → Welcome → Account Type → Student/Professor Sign Up → Verification → Onboarding → Home.

## Student onboarding

Welcome → Academic Profile → Language → Permissions → Recording Introduction → Cloud Preferences → Complete.

Cloud preference options:
- Local only
- Local + cloud backup
- Cloud where applicable

## Recording flow

Home → Recording Setup → Active Recording.

Active Recording supports:
- pause/resume
- elapsed time
- local/cloud status
- capture visual
- optional personal highlight
- end recording

End → Lecture Saved → Processing → Lecture Overview.

## Recovery flow

On launch:
1. Detect unfinished persisted recording.
2. Validate available chunks.
3. Reconstruct recoverable audio.
4. Show recovery screen.
5. Recover or delete.
6. Continue processing after recovery.

Never claim recovery if the required audio chunks were not persisted.

## Ask Lecture

Lecture Overview → Ask Lecture → question → retrieval → grounded answer.

Answer actions:
- View source
- Jump to timestamp
- Listen from here
- View transcript
- Explain more simply

If evidence is absent:
“I couldn’t find this information in the lecture.”

Optional separate general explanation must be clearly distinguished from lecture evidence.

## Visual capture

Active Recording → Camera Capture → save image + lecture timestamp → optional label → return to recording.

Labels:
Diagram, Flowchart, Derivation, Graph, Circuit, Board Notes, Slide, Other.

## OCR flow

Scan Notes → OCR Processing → OCR Review → Correction → Saved Notes.

Uncertain words are highlighted and never silently replaced.

## Search flow

Search → query → filters → results.

Result types:
Lecture, transcript, note, material, flashcard, question, visual, highlight.

## Professor flow

Professor Home → Courses → Course Overview → Students / Lectures.

Create Lecture → Upload Material → Processing → AI Content Generation (optional) → Editor → Professor Approval → Publish.

Professor may skip AI entirely.
