/**
 * Nodus Validation Schemas
 *
 * Shared Zod validation schemas for API requests/responses and mobile forms.
 * These are minimal foundation schemas - full domain schemas will be added in later phases.
 */

import { z } from 'zod';

// ============================================================================
// Common Validators
// ============================================================================

export const uuidSchema = z.string().uuid({ message: 'Invalid UUID format' });

export const isoDateTimeSchema = z.string().datetime({ offset: true });

export const positiveIntSchema = z.number().int().positive();

export const nonEmptyStringSchema = z.string().min(1, { message: 'Cannot be empty' });

export const emailSchema = z.string().email({ message: 'Invalid email format' });

// ============================================================================
// Pagination
// ============================================================================

export const paginationSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

export type PaginationParams = z.infer<typeof paginationSchema>;

// ============================================================================
// User & Auth (Phase 3+)
// ============================================================================

export const userRoleSchema = z.enum(['student', 'professor', 'admin']);

export const registerRequestSchema = z.object({
  email: emailSchema,
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
  role: userRoleSchema,
});

export const loginRequestSchema = z.object({
  email: emailSchema,
  password: nonEmptyStringSchema,
});

export const tokenResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  tokenType: z.literal('bearer'),
  expiresIn: z.number().int().positive(),
});

// ============================================================================
// Course (Phase 5+)
// ============================================================================

export const courseCreateSchema = z.object({
  name: z.string().min(1).max(200),
  code: z.string().min(1).max(20).regex(/^[A-Z0-9\s-]+$/),
  description: z.string().max(2000).optional(),
});

export const courseUpdateSchema = courseCreateSchema.partial();

export const courseResponseSchema = z.object({
  id: uuidSchema,
  name: z.string(),
  code: z.string(),
  description: z.string().nullable(),
  professorId: uuidSchema,
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

export const courseMemberSchema = z.object({
  id: uuidSchema,
  courseId: uuidSchema,
  userId: uuidSchema,
  role: z.enum(['student', 'professor', 'ta']),
  joinedAt: isoDateTimeSchema,
});

// ============================================================================
// Lecture (Phase 5+)
// ============================================================================

export const lectureCreateSchema = z.object({
  courseId: uuidSchema,
  title: z.string().min(1).max(300),
  description: z.string().max(2000).optional(),
  scheduledAt: isoDateTimeSchema.optional(),
});

export const lectureResponseSchema = z.object({
  id: uuidSchema,
  courseId: uuidSchema,
  title: z.string(),
  description: z.string().nullable(),
  scheduledAt: isoDateTimeSchema.nullable(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

// ============================================================================
// Recording (Phase 6+)
// ============================================================================

export const recordingStatusSchema = z.enum([
  'recording',
  'paused',
  'finalizing',
  'saved',
  'processing',
  'completed',
  'failed',
  'interrupted',
  'recoverable',
  'corrupt',
]);

export const storageModeSchema = z.enum(['local', 'local_cloud', 'cloud']);

export const recordingSetupSchema = z.object({
  courseId: uuidSchema,
  title: z.string().min(1).max(300),
  storageMode: storageModeSchema,
});

export const recordingChunkSchema = z.object({
  id: uuidSchema,
  recordingId: uuidSchema,
  sequence: z.number().int().nonnegative(),
  durationMs: positiveIntSchema,
  checksum: z.string().min(1),
  localPath: z.string().min(1),
  uploadStatus: z.enum(['pending', 'uploading', 'uploaded', 'failed']),
  createdAt: isoDateTimeSchema,
});

// ============================================================================
// Transcript (Phase 11+)
// ============================================================================

export const transcriptSegmentSchema = z.object({
  id: uuidSchema,
  recordingId: uuidSchema,
  sequence: z.number().int().nonnegative(),
  startMs: z.number().int().nonnegative(),
  endMs: z.number().int().positive(),
  text: z.string(),
  confidence: z.number().min(0).max(1),
  speakerId: z.string().optional(),
  createdAt: isoDateTimeSchema,
});

// ============================================================================
// Highlights (Phase 12+)
// ============================================================================

export const highlightTypeSchema = z.enum([
  'explicitly_important',
  'explicitly_exam_related',
  'ai_detected_emphasis',
  'student_highlight',
]);

export const highlightCreateSchema = z.object({
  recordingId: uuidSchema,
  type: highlightTypeSchema,
  transcriptSegmentId: uuidSchema.optional(),
  startMs: z.number().int().nonnegative(),
  endMs: z.number().int().positive(),
  note: z.string().max(1000).optional(),
});

// ============================================================================
// Visual Capture (Phase 14+)
// ============================================================================

export const visualLabelSchema = z.enum([
  'diagram',
  'flowchart',
  'derivation',
  'graph',
  'circuit',
  'board_notes',
  'slide',
  'other',
]);

export const visualCaptureCreateSchema = z.object({
  recordingId: uuidSchema,
  lectureTimestampMs: z.number().int().nonnegative(),
  label: visualLabelSchema,
  caption: z.string().max(500).optional(),
});

// ============================================================================
// OCR (Phase 15+)
// ============================================================================

export const ocrNoteSchema = z.object({
  id: uuidSchema,
  visualCaptureId: uuidSchema,
  originalText: z.string(),
  correctedText: z.string(),
  confidence: z.number().min(0).max(1),
  uncertainRanges: z.array(
    z.object({
      start: z.number().int().nonnegative(),
      end: z.number().int().positive(),
    })
  ),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

// ============================================================================
// Study Resources (Phase 12+)
// ============================================================================

export const flashcardCreateSchema = z.object({
  recordingId: uuidSchema,
  question: z.string().min(1).max(1000),
  answer: z.string().min(1).max(5000),
  sourceTranscriptSegmentId: uuidSchema.optional(),
});

export const studyQuestionCreateSchema = z.object({
  recordingId: uuidSchema,
  question: z.string().min(1).max(1000),
  answer: z.string().max(5000).optional(),
  sourceTranscriptSegmentId: uuidSchema.optional(),
});

// ============================================================================
// Materials (Phase 16+)
// ============================================================================

export const materialProvenanceSchema = z.enum([
  'original_lecture',
  'professor_uploaded',
  'ai_generated',
  'professor_edited',
  'professor_approved',
  'student_generated',
]);

export const materialCreateSchema = z.object({
  courseId: uuidSchema,
  lectureId: uuidSchema.optional(),
  title: z.string().min(1).max(300),
  type: z.enum(['pdf', 'slides', 'document', 'video', 'link']),
  remoteUrl: z.string().url(),
  provenance: materialProvenanceSchema,
});

// ============================================================================
// Search (Phase 17+)
// ============================================================================

export const searchQuerySchema = z.object({
  q: z.string().min(1).max(500),
  scope: z.enum(['global', 'course', 'lecture']).default('global'),
  courseId: uuidSchema.optional(),
  lectureId: uuidSchema.optional(),
  types: z.array(
    z.enum(['lecture', 'transcript', 'note', 'material', 'flashcard', 'question', 'visual', 'highlight'])
  ).optional(),
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().max(100).default(20),
});

// ============================================================================
// Sync (Phase 9+)
// ============================================================================

export const syncStatusSchema = z.enum([
  'local_only',
  'pending_upload',
  'syncing',
  'synced',
  'conflict',
  'failed',
  'deleted',
]);

export const syncMetadataSchema = z.object({
  localId: uuidSchema,
  remoteId: z.string().optional(),
  syncStatus: syncStatusSchema,
  lastSyncedAt: isoDateTimeSchema.optional(),
  createdAt: isoDateTimeSchema,
  updatedAt: isoDateTimeSchema,
});

// ============================================================================
// Health (Phase 1)
// ============================================================================

export const healthResponseSchema = z.object({
  status: z.enum(['healthy', 'degraded', 'unhealthy']),
  version: z.string(),
  environment: z.string(),
});

// ============================================================================
// Utility: Schema Composition
// ============================================================================

/**
 * Create a paginated response schema for any item type.
 */
export function createPaginatedResponseSchema<T extends z.ZodTypeAny>(itemSchema: T) {
  return z.object({
    items: z.array(itemSchema),
    meta: z.object({
      page: z.number().int().positive(),
      limit: z.number().int().positive(),
      total: z.number().int().nonnegative(),
      totalPages: z.number().int().nonnegative(),
    }),
  });
}

// ============================================================================
// Export all schemas as a namespace for convenience
// ============================================================================

export const schemas = {
  uuid: uuidSchema,
  isoDateTime: isoDateTimeSchema,
  pagination: paginationSchema,
  userRole: userRoleSchema,
  registerRequest: registerRequestSchema,
  loginRequest: loginRequestSchema,
  tokenResponse: tokenResponseSchema,
  courseCreate: courseCreateSchema,
  courseUpdate: courseUpdateSchema,
  courseResponse: courseResponseSchema,
  courseMember: courseMemberSchema,
  lectureCreate: lectureCreateSchema,
  lectureResponse: lectureResponseSchema,
  recordingStatus: recordingStatusSchema,
  storageMode: storageModeSchema,
  recordingSetup: recordingSetupSchema,
  recordingChunk: recordingChunkSchema,
  transcriptSegment: transcriptSegmentSchema,
  highlightType: highlightTypeSchema,
  highlightCreate: highlightCreateSchema,
  visualLabel: visualLabelSchema,
  visualCaptureCreate: visualCaptureCreateSchema,
  ocrNote: ocrNoteSchema,
  flashcardCreate: flashcardCreateSchema,
  studyQuestionCreate: studyQuestionCreateSchema,
  materialProvenance: materialProvenanceSchema,
  materialCreate: materialCreateSchema,
  searchQuery: searchQuerySchema,
  syncStatus: syncStatusSchema,
  syncMetadata: syncMetadataSchema,
  healthResponse: healthResponseSchema,
} as const;