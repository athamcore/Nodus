/**
 * Validation Schemas smoke test
 * Verifies Zod schemas parse valid data and reject invalid data
 */

import {
  uuidSchema,
  emailSchema,
  paginationSchema,
  userRoleSchema,
  registerRequestSchema,
  loginRequestSchema,
  courseCreateSchema,
  lectureCreateSchema,
  recordingSetupSchema,
  highlightCreateSchema,
  visualCaptureCreateSchema,
  ocrNoteSchema,
  flashcardCreateSchema,
  studyQuestionCreateSchema,
  materialCreateSchema,
  searchQuerySchema,
  syncMetadataSchema,
  healthResponseSchema,
} from '../src';

describe('Validation Schemas', () => {
  describe('uuidSchema', () => {
    it('accepts valid UUID', () => {
      const result = uuidSchema.safeParse('550e8400-e29b-41d4-a716-446655440000');
      expect(result.success).toBe(true);
    });

    it('rejects invalid UUID', () => {
      const result = uuidSchema.safeParse('not-a-uuid');
      expect(result.success).toBe(false);
    });
  });

  describe('emailSchema', () => {
    it('accepts valid email', () => {
      const result = emailSchema.safeParse('test@example.com');
      expect(result.success).toBe(true);
    });

    it('rejects invalid email', () => {
      const result = emailSchema.safeParse('not-an-email');
      expect(result.success).toBe(false);
    });
  });

  describe('paginationSchema', () => {
    it('accepts valid pagination', () => {
      const result = paginationSchema.safeParse({ page: 1, limit: 20 });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });

    it('uses defaults when omitted', () => {
      const result = paginationSchema.safeParse({});
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });

    it('rejects limit over 100', () => {
      const result = paginationSchema.safeParse({ page: 1, limit: 101 });
      expect(result.success).toBe(false);
    });
  });

  describe('userRoleSchema', () => {
    it('accepts student', () => {
      const result = userRoleSchema.safeParse('student');
      expect(result.success).toBe(true);
    });

    it('accepts professor', () => {
      const result = userRoleSchema.safeParse('professor');
      expect(result.success).toBe(true);
    });

    it('rejects invalid role', () => {
      const result = userRoleSchema.safeParse('invalid_role');
      expect(result.success).toBe(false);
    });
  });

  describe('registerRequestSchema', () => {
    it('accepts valid registration', () => {
      const result = registerRequestSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        role: 'student',
      });
      expect(result.success).toBe(true);
    });

    it('accepts admin role', () => {
      const result = registerRequestSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        role: 'admin',
      });
      expect(result.success).toBe(true);
    });

    it('rejects short password', () => {
      const result = registerRequestSchema.safeParse({
        email: 'test@example.com',
        password: 'short',
        role: 'student',
      });
      expect(result.success).toBe(false);
    });

    it('rejects invalid role', () => {
      const result = registerRequestSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
        role: 'invalid_role',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('loginRequestSchema', () => {
    it('accepts valid login', () => {
      const result = loginRequestSchema.safeParse({
        email: 'test@example.com',
        password: 'password123',
      });
      expect(result.success).toBe(true);
    });

    it('rejects missing password', () => {
      const result = loginRequestSchema.safeParse({
        email: 'test@example.com',
        password: '',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('courseCreateSchema', () => {
    it('accepts valid course', () => {
      const result = courseCreateSchema.safeParse({
        name: 'CS 101',
        code: 'CS101',
        description: 'Intro to CS',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid code format', () => {
      const result = courseCreateSchema.safeParse({
        name: 'CS 101',
        code: 'cs101', // lowercase not allowed
      });
      expect(result.success).toBe(false);
    });
  });

  describe('lectureCreateSchema', () => {
    it('accepts valid lecture', () => {
      const result = lectureCreateSchema.safeParse({
        courseId: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Lecture 1',
        description: 'First lecture',
      });
      expect(result.success).toBe(true);
    });

    it('accepts optional scheduledAt', () => {
      const result = lectureCreateSchema.safeParse({
        courseId: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Lecture 1',
        scheduledAt: '2024-01-01T10:00:00Z',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('recordingSetupSchema', () => {
    it('accepts valid recording setup', () => {
      const result = recordingSetupSchema.safeParse({
        courseId: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Lecture 1',
        storageMode: 'local',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid storage mode', () => {
      const result = recordingSetupSchema.safeParse({
        courseId: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Lecture 1',
        storageMode: 'invalid',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('highlightCreateSchema', () => {
    it('accepts valid highlight', () => {
      const result = highlightCreateSchema.safeParse({
        recordingId: '550e8400-e29b-41d4-a716-446655440000',
        type: 'explicitly_important',
        startMs: 1000,
        endMs: 2000,
        note: 'Important!',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid type', () => {
      const result = highlightCreateSchema.safeParse({
        recordingId: '550e8400-e29b-41d4-a716-446655440000',
        type: 'invalid_type',
        startMs: 1000,
        endMs: 2000,
      });
      expect(result.success).toBe(false);
    });
  });

  describe('visualCaptureCreateSchema', () => {
    it('accepts valid visual capture', () => {
      const result = visualCaptureCreateSchema.safeParse({
        recordingId: '550e8400-e29b-41d4-a716-446655440000',
        lectureTimestampMs: 5000,
        label: 'diagram',
        caption: 'A diagram',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid label', () => {
      const result = visualCaptureCreateSchema.safeParse({
        recordingId: '550e8400-e29b-41d4-a716-446655440000',
        lectureTimestampMs: 5000,
        label: 'invalid',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('ocrNoteSchema', () => {
    it('accepts valid OCR note', () => {
      const result = ocrNoteSchema.safeParse({
        id: '550e8400-e29b-41d4-a716-446655440000',
        visualCaptureId: '550e8400-e29b-41d4-a716-446655440001',
        originalText: 'OCR text',
        correctedText: 'Corrected text',
        confidence: 0.95,
        uncertainRanges: [{ start: 0, end: 5 }],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });

    it('rejects confidence out of range', () => {
      const result = ocrNoteSchema.safeParse({
        id: '550e8400-e29b-41d4-a716-446655440000',
        visualCaptureId: '550e8400-e29b-41d4-a716-446655440001',
        originalText: 'OCR text',
        correctedText: 'Corrected text',
        confidence: 1.5,
        uncertainRanges: [],
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('flashcardCreateSchema', () => {
    it('accepts valid flashcard', () => {
      const result = flashcardCreateSchema.safeParse({
        recordingId: '550e8400-e29b-41d4-a716-446655440000',
        question: 'What is X?',
        answer: 'X is Y',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('studyQuestionCreateSchema', () => {
    it('accepts valid study question', () => {
      const result = studyQuestionCreateSchema.safeParse({
        recordingId: '550e8400-e29b-41d4-a716-446655440000',
        question: 'What is X?',
        answer: 'X is Y',
      });
      expect(result.success).toBe(true);
    });

    it('accepts optional answer', () => {
      const result = studyQuestionCreateSchema.safeParse({
        recordingId: '550e8400-e29b-41d4-a716-446655440000',
        question: 'What is X?',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('materialCreateSchema', () => {
    it('accepts valid material', () => {
      const result = materialCreateSchema.safeParse({
        courseId: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Syllabus',
        type: 'pdf',
        remoteUrl: 'https://example.com/syllabus.pdf',
        provenance: 'professor_uploaded',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid provenance', () => {
      const result = materialCreateSchema.safeParse({
        courseId: '550e8400-e29b-41d4-a716-446655440000',
        title: 'Syllabus',
        type: 'pdf',
        remoteUrl: 'https://example.com/syllabus.pdf',
        provenance: 'invalid',
      });
      expect(result.success).toBe(false);
    });
  });

  describe('searchQuerySchema', () => {
    it('accepts valid search query', () => {
      const result = searchQuerySchema.safeParse({
        q: 'recursion',
        scope: 'global',
        types: ['lecture', 'transcript'],
      });
      expect(result.success).toBe(true);
    });

    it('uses defaults when omitted', () => {
      const result = searchQuerySchema.safeParse({ q: 'test' });
      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.scope).toBe('global');
        expect(result.data.page).toBe(1);
        expect(result.data.limit).toBe(20);
      }
    });
  });

  describe('syncMetadataSchema', () => {
    it('accepts valid sync metadata', () => {
      const result = syncMetadataSchema.safeParse({
        localId: '550e8400-e29b-41d4-a716-446655440000',
        remoteId: 'remote-123',
        syncStatus: 'synced',
        lastSyncedAt: '2024-01-01T00:00:00Z',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });

    it('accepts local_only without remoteId', () => {
      const result = syncMetadataSchema.safeParse({
        localId: '550e8400-e29b-41d4-a716-446655440000',
        syncStatus: 'local_only',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-01T00:00:00Z',
      });
      expect(result.success).toBe(true);
    });
  });

  describe('healthResponseSchema', () => {
    it('accepts valid health response', () => {
      const result = healthResponseSchema.safeParse({
        status: 'healthy',
        version: '0.0.1',
        environment: 'development',
      });
      expect(result.success).toBe(true);
    });

    it('rejects invalid status', () => {
      const result = healthResponseSchema.safeParse({
        status: 'invalid',
        version: '0.0.1',
        environment: 'development',
      });
      expect(result.success).toBe(false);
    });
  });
});