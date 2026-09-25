/**
 * Shared Types smoke test
 * Verifies type definitions are valid and can be imported
 */

import type {
  User,
  UserRole,
  StudentProfile,
  ProfessorProfile,
  Course,
  CourseMember,
  Lecture,
  Recording,
  RecordingStatus,
  StorageMode,
  RecordingChunk,
  ChunkUploadStatus,
  TranscriptSegment,
  Topic,
  HighlightType,
  Highlight,
  VisualLabel,
  VisualCapture,
  OCRNote,
  Flashcard,
  StudyQuestion,
  Material,
  MaterialProvenance,
  SearchResult,
  SearchResultType,
  SyncStatus,
  SyncMetadata,
  ApiResponse,
  ApiError,
} from '../src';

describe('Shared Types', () => {
  it('exports UserRole type', () => {
    // Type-only test - if this compiles, the type exists
    const role: UserRole = 'student';
    expect(role).toBe('student');
  });

  it('exports User interface', () => {
    const user: User = {
      id: 'test-id',
      email: 'test@example.com',
      role: 'student',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };
    expect(user.id).toBe('test-id');
    expect(user.role).toBe('student');
  });

  it('exports StudentProfile interface', () => {
    const profile: StudentProfile = {
      id: 'test-id',
      email: 'student@example.com',
      role: 'student',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      academicProfile: {
        university: 'Test University',
        major: 'Computer Science',
        year: 2,
      },
    };
    expect(profile.academicProfile?.major).toBe('Computer Science');
  });

  it('exports ProfessorProfile interface', () => {
    const profile: ProfessorProfile = {
      id: 'test-id',
      email: 'prof@example.com',
      role: 'professor',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
      department: 'Computer Science',
      title: 'Professor',
    };
    expect(profile.department).toBe('Computer Science');
  });

  it('exports Course interface', () => {
    const course: Course = {
      id: 'course-id',
      name: 'CS 101',
      code: 'CS101',
      professorId: 'prof-id',
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z',
    };
    expect(course.code).toBe('CS101');
  });

  it('exports RecordingStatus type', () => {
    const status: RecordingStatus = 'recording';
    expect(status).toBe('recording');
  });

  it('exports StorageMode type', () => {
    const mode: StorageMode = 'local';
    expect(mode).toBe('local');
  });

  it('exports HighlightType type', () => {
    const type: HighlightType = 'explicitly_important';
    expect(type).toBe('explicitly_important');
  });

  it('exports VisualLabel type', () => {
    const label: VisualLabel = 'diagram';
    expect(label).toBe('diagram');
  });

  it('exports MaterialProvenance type', () => {
    const provenance: MaterialProvenance = 'professor_approved';
    expect(provenance).toBe('professor_approved');
  });

  it('exports SearchResultType type', () => {
    const type: SearchResultType = 'lecture';
    expect(type).toBe('lecture');
  });

  it('exports SyncStatus type', () => {
    const status: SyncStatus = 'synced';
    expect(status).toBe('synced');
  });

  it('exports ApiResponse type', () => {
    const response: ApiResponse<{ data: string }> = {
      data: { data: 'test' },
      meta: { page: 1, limit: 20, total: 1 },
    };
    expect(response.data.data).toBe('test');
  });

  it('exports ApiError type', () => {
    const error: ApiError = {
      code: 'NOT_FOUND',
      message: 'Resource not found',
    };
    expect(error.code).toBe('NOT_FOUND');
  });
});