/**
 * Nodus Shared Types
 *
 * Core domain types shared between mobile and API.
 * These are minimal foundation types - full domain models will be added in later phases.
 */

// User and Authentication
export type UserRole = 'student' | 'professor' | 'admin';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  createdAt: string; // ISO 8601
  updatedAt: string;
}

export interface StudentProfile extends User {
  role: 'student';
  academicProfile?: {
    university?: string;
    major?: string;
    year?: number;
  };
}

export interface ProfessorProfile extends User {
  role: 'professor';
  department?: string;
  title?: string;
}

// Course and Membership
export interface Course {
  id: string;
  name: string;
  code: string;
  description?: string;
  professorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseMember {
  id: string;
  courseId: string;
  userId: string;
  role: 'student' | 'professor' | 'ta';
  joinedAt: string;
}

// Lecture and Recording
export interface Lecture {
  id: string;
  courseId: string;
  title: string;
  description?: string;
  scheduledAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Recording {
  id: string;
  lectureId: string;
  studentId: string;
  durationSeconds: number;
  status: RecordingStatus;
  storageMode: StorageMode;
  createdAt: string;
  updatedAt: string;
}

export type RecordingStatus =
  | 'recording'
  | 'paused'
  | 'finalizing'
  | 'saved'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'interrupted'
  | 'recoverable'
  | 'corrupt';

export type StorageMode = 'local' | 'local_cloud' | 'cloud';

export interface RecordingChunk {
  id: string;
  recordingId: string;
  sequence: number;
  durationMs: number;
  checksum: string;
  localPath: string;
  uploadStatus: ChunkUploadStatus;
  createdAt: string;
}

export type ChunkUploadStatus = 'pending' | 'uploading' | 'uploaded' | 'failed';

// Transcript and AI
export interface TranscriptSegment {
  id: string;
  recordingId: string;
  sequence: number;
  startMs: number;
  endMs: number;
  text: string;
  confidence: number;
  speakerId?: string;
  createdAt: string;
}

export interface Topic {
  id: string;
  recordingId: string;
  name: string;
  startMs: number;
  endMs: number;
  createdAt: string;
}

export type HighlightType =
  | 'explicitly_important'
  | 'explicitly_exam_related'
  | 'ai_detected_emphasis'
  | 'student_highlight';

export interface Highlight {
  id: string;
  recordingId: string;
  userId?: string; // null for AI-detected
  type: HighlightType;
  transcriptSegmentId?: string;
  startMs: number;
  endMs: number;
  note?: string;
  createdAt: string;
}

// Visual Capture
export type VisualLabel =
  | 'diagram'
  | 'flowchart'
  | 'derivation'
  | 'graph'
  | 'circuit'
  | 'board_notes'
  | 'slide'
  | 'other';

export interface VisualCapture {
  id: string;
  recordingId: string;
  lectureTimestampMs: number;
  localPath: string;
  remoteUrl?: string;
  label: VisualLabel;
  caption?: string;
  createdAt: string;
}

// OCR
export interface OCRNote {
  id: string;
  visualCaptureId: string;
  originalText: string;
  correctedText: string;
  confidence: number;
  uncertainRanges: Array<{ start: number; end: number }>;
  createdAt: string;
  updatedAt: string;
}

// Study Resources
export interface Flashcard {
  id: string;
  recordingId: string;
  question: string;
  answer: string;
  sourceTranscriptSegmentId?: string;
  createdAt: string;
}

export interface StudyQuestion {
  id: string;
  recordingId: string;
  question: string;
  answer?: string;
  sourceTranscriptSegmentId?: string;
  createdAt: string;
}

// Materials
export interface Material {
  id: string;
  courseId: string;
  lectureId?: string;
  title: string;
  type: 'pdf' | 'slides' | 'document' | 'video' | 'link';
  remoteUrl: string;
  provenance: MaterialProvenance;
  createdAt: string;
  updatedAt: string;
}

export type MaterialProvenance =
  | 'original_lecture'
  | 'professor_uploaded'
  | 'ai_generated'
  | 'professor_edited'
  | 'professor_approved'
  | 'student_generated';

// Search
export interface SearchResult {
  id: string;
  type: SearchResultType;
  title: string;
  snippet: string;
  recordingId?: string;
  lectureId?: string;
  courseId?: string;
  timestampMs?: number;
  provenance?: MaterialProvenance;
}

export type SearchResultType =
  | 'lecture'
  | 'transcript'
  | 'note'
  | 'material'
  | 'flashcard'
  | 'question'
  | 'visual'
  | 'highlight';

// Sync
export type SyncStatus =
  | 'local_only'
  | 'pending_upload'
  | 'syncing'
  | 'synced'
  | 'conflict'
  | 'failed'
  | 'deleted';

export interface SyncMetadata {
  localId: string;
  remoteId?: string;
  syncStatus: SyncStatus;
  lastSyncedAt?: string;
  createdAt: string;
  updatedAt: string;
}

// API Response
export interface ApiResponse<T> {
  data: T;
  meta?: {
    page?: number;
    limit?: number;
    total?: number;
  };
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}