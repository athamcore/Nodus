/**
 * Nodus API Client
 *
 * Typed API client for communicating with the Nodus backend.
 * Provides type-safe methods for all API endpoints.
 */

// Type imports for future API methods (currently unused but reserved for implementation)
// import type { schemas } from '@nodus/validation';
// import type {
//   User,
//   StudentProfile,
//   ProfessorProfile,
//   Course,
//   CourseMember,
//   Lecture,
//   Recording,
//   TranscriptSegment,
//   Highlight,
//   VisualCapture,
//   OCRNote,
//   Flashcard,
//   StudyQuestion,
//   Material,
//   SearchResult,
//   SyncMetadata,
//   PaginationParams,
// } from '@nodus/shared-types';

// ============================================================================
// Configuration
// ============================================================================

export interface ApiClientConfig {
  baseUrl: string;
  getAccessToken?: () => Promise<string | null>;
  onTokenRefresh?: () => Promise<void>;
}

const DEFAULT_BASE_URL = 'http://localhost:8000/api/v1';

// ============================================================================
// Error Types
// ============================================================================

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }

  static fromResponse(response: Response, data: unknown): ApiError {
    const errorData = data as { code?: string; message?: string; details?: Record<string, unknown> } | null;
    return new ApiError(
      response.status,
      errorData?.code ?? 'UNKNOWN_ERROR',
      errorData?.message ?? response.statusText,
      errorData?.details
    );
  }
}

export class NetworkError extends Error {
  constructor(message: string, public readonly cause?: Error) {
    super(message);
    this.name = 'NetworkError';
  }
}

export class AuthError extends ApiError {
  constructor(message: string, details?: Record<string, unknown>) {
    super(401, 'UNAUTHORIZED', message, details);
    this.name = 'AuthError';
  }
}

// ============================================================================
// HTTP Client
// ============================================================================

class HttpClient {
  private baseUrl: string;
  private getAccessToken: () => Promise<string | null>;
  private onTokenRefresh: () => Promise<void>;

  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.getAccessToken = config.getAccessToken ?? (async () => null);
    this.onTokenRefresh = config.onTokenRefresh ?? (async () => {});
  }

  private async request<T>(
    method: string,
    path: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getAccessToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      (headers as Record<string, string>)['Authorization'] = `Bearer ${token}`;
    }

    const url = `${this.baseUrl}${path}`;

    try {
      const response = await fetch(url, {
        ...options,
        method,
        headers,
      });

      if (response.status === 401) {
        // Try to refresh token once
        await this.onTokenRefresh();
        const newToken = await this.getAccessToken();
        if (newToken) {
          (headers as Record<string, string>)['Authorization'] = `Bearer ${newToken}`;
          const retryResponse = await fetch(url, {
            ...options,
            method,
            headers,
          });
          return this.handleResponse<T>(retryResponse);
        }
        throw new AuthError('Authentication required');
      }

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof ApiError || error instanceof AuthError) {
        throw error;
      }
      throw new NetworkError('Network request failed', error as Error);
    }
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const contentType = response.headers.get('Content-Type');
    const isJson = contentType?.includes('application/json');

    if (!response.ok) {
      const data = isJson ? await response.json() : null;
      throw ApiError.fromResponse(response, data);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    if (!isJson) {
      return undefined as T;
    }

    return response.json();
  }

  async get<T>(path: string, params?: Record<string, unknown>): Promise<T> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value));
        }
      });
    }
    const queryString = searchParams.toString();
    return this.request<T>('GET', `${path}${queryString ? `?${queryString}` : ''}`);
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>('POST', path, { body: JSON.stringify(body) });
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>('PUT', path, { body: JSON.stringify(body) });
  }

  async patch<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>('PATCH', path, { body: JSON.stringify(body) });
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>('DELETE', path);
  }
}

// ============================================================================
// API Client
// ============================================================================

export class NodusApiClient {
  private http: HttpClient;

  constructor(config: ApiClientConfig) {
    this.http = new HttpClient(config);
  }

  // ---------------------------------------------------------------------------
  // Health
  // ---------------------------------------------------------------------------

  async healthCheck() {
    return this.http.get<{ status: string; version: string; environment: string }>('/health');
  }

  async readinessCheck() {
    return this.http.get<{ status: string; checks: Record<string, string> }>('/health/ready');
  }

  async livenessCheck() {
    return this.http.get<{ status: string }>('/health/live');
  }

  // ---------------------------------------------------------------------------
  // Auth (Phase 3+)
  // ---------------------------------------------------------------------------

  // async register(data: z.infer<typeof schemas.registerRequest>) { ... }
  // async login(data: z.infer<typeof schemas.loginRequest>) { ... }
  // async refreshToken() { ... }
  // async logout() { ... }

  // ---------------------------------------------------------------------------
  // Courses (Phase 5+)
  // ---------------------------------------------------------------------------

  // async createCourse(data: z.infer<typeof schemas.courseCreateSchema>) { ... }
  // async getCourses(params?: PaginationParams) { ... }
  // async getCourse(id: string) { ... }
  // async updateCourse(id: string, data: z.infer<typeof schemas.courseUpdateSchema>) { ... }
  // async deleteCourse(id: string) { ... }
  // async joinCourse(courseCode: string) { ... }
  // async getCourseMembers(courseId: string) { ... }

  // ---------------------------------------------------------------------------
  // Lectures (Phase 5+)
  // ---------------------------------------------------------------------------

  // async createLecture(data: z.infer<typeof schemas.lectureCreateSchema>) { ... }
  // async getLectures(courseId: string, params?: PaginationParams) { ... }
  // async getLecture(id: string) { ... }
  // async updateLecture(id: string, data: Partial<z.infer<typeof schemas.lectureCreateSchema>>) { ... }
  // async deleteLecture(id: string) { ... }

  // ---------------------------------------------------------------------------
  // Recordings (Phase 6+)
  // ---------------------------------------------------------------------------

  // async startRecording(data: z.infer<typeof schemas.recordingSetupSchema>) { ... }
  // async getRecordings(lectureId: string) { ... }
  // async getRecording(id: string) { ... }
  // async updateRecordingStatus(id: string, status: string) { ... }
  // async uploadChunk(recordingId: string, chunk: Blob, metadata: z.infer<typeof schemas.recordingChunkSchema>) { ... }
  // async finalizeRecording(id: string) { ... }

  // ---------------------------------------------------------------------------
  // Transcript (Phase 11+)
  // ---------------------------------------------------------------------------

  // async getTranscript(recordingId: string) { ... }
  // async getTranscriptSegment(id: string) { ... }

  // ---------------------------------------------------------------------------
  // AI Notes & Highlights (Phase 12+)
  // ---------------------------------------------------------------------------

  // async getHighlights(recordingId: string) { ... }
  // async createHighlight(data: z.infer<typeof schemas.highlightCreateSchema>) { ... }

  // ---------------------------------------------------------------------------
  // Visual Capture (Phase 14+)
  // ---------------------------------------------------------------------------

  // async uploadVisual(data: z.infer<typeof schemas.visualCaptureCreateSchema>, file: Blob) { ... }
  // async getVisuals(recordingId: string) { ... }

  // ---------------------------------------------------------------------------
  // OCR (Phase 15+)
  // ---------------------------------------------------------------------------

  // async processOCR(visualCaptureId: string) { ... }
  // async updateOCRNote(id: string, correctedText: string) { ... }

  // ---------------------------------------------------------------------------
  // Ask Lecture / RAG (Phase 13+)
  // ---------------------------------------------------------------------------

  // async askLecture(lectureId: string, question: string) { ... }

  // ---------------------------------------------------------------------------
  // Search (Phase 17+)
  // ---------------------------------------------------------------------------

  // async search(params: z.infer<typeof schemas.searchQuerySchema>) { ... }

  // ---------------------------------------------------------------------------
  // Professor (Phase 16+)
  // ---------------------------------------------------------------------------

  // async createMaterial(data: z.infer<typeof schemas.materialCreateSchema>) { ... }
  // async approveMaterial(id: string) { ... }
  // async publishMaterial(id: string) { ... }

  // ---------------------------------------------------------------------------
  // Sync (Phase 9+)
  // ---------------------------------------------------------------------------

  // async syncEntity(entityType: string, data: unknown, metadata: z.infer<typeof schemas.syncMetadataSchema>) { ... }
  // async getSyncStatus(entityType: string, localId: string) { ... }
}

// ============================================================================
// Factory
// ============================================================================

let clientInstance: NodusApiClient | null = null;

export function createApiClient(config: ApiClientConfig): NodusApiClient {
  return new NodusApiClient(config);
}

export function getApiClient(): NodusApiClient {
  if (!clientInstance) {
    clientInstance = new NodusApiClient({
      baseUrl: DEFAULT_BASE_URL,
    });
  }
  return clientInstance;
}

export function setApiClient(client: NodusApiClient): void {
  clientInstance = client;
}