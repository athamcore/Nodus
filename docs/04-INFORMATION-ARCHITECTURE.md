# Nodus — Information Architecture

## Student

Home
- Current courses
- Recent lectures
- Recording action
- Processing/sync status

Courses
- Course overview
- Lectures
- Materials
- Visuals
- Study

Search
- Global search
- Filters
- Results

Profile
- Settings
- Storage
- Cloud
- Privacy
- Recording
- Notifications

## Lecture

Lecture Overview
- title/date/duration
- processing state
- notes
- Ask Lecture
- flashcards
- questions
- highlights
- transcript
- visuals
- audio

## Professor

Home
- courses
- recent publishing activity
- drafts

Courses
- course overview
- students
- lectures
- materials

Create
- course
- lecture
- material

Profile
- account
- settings
- privacy

## Core entities

Student, Professor, Course, CourseMember, Lecture, Recording, RecordingChunk, TranscriptSegment, Topic, Highlight, VisualCapture, Material, Note, Flashcard, Question, Embedding, ProcessingJob.

## Provenance chain

AI Answer
→ Evidence Source
→ Timestamp
→ Transcript Segment
→ Original Audio

Visual:
Visual Capture
→ Lecture Timestamp
→ Transcript Context
→ Original Audio

OCR:
OCR Text
→ Original Image
→ User Corrections
→ Saved Note
