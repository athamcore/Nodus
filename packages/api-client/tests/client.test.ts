/**
 * API Client smoke test
 * Verifies the client can be instantiated and exports expected types
 */

import {
  NodusApiClient,
  ApiError,
  NetworkError,
  AuthError,
  createApiClient,
  getApiClient,
  setApiClient,
  type ApiClientConfig,
} from '../src';

describe('API Client', () => {
  describe('NodusApiClient', () => {
    it('can be instantiated with config', () => {
      const config: ApiClientConfig = {
        baseUrl: 'http://localhost:8000/api/v1',
      };
      const client = new NodusApiClient(config);
      expect(client).toBeInstanceOf(NodusApiClient);
    });

    it('can be instantiated with optional token handlers', () => {
      const config: ApiClientConfig = {
        baseUrl: 'http://localhost:8000/api/v1',
        getAccessToken: async () => 'test-token',
        onTokenRefresh: async () => {},
      };
      const client = new NodusApiClient(config);
      expect(client).toBeInstanceOf(NodusApiClient);
    });
  });

  describe('Error classes', () => {
    it('ApiError can be created', () => {
      const error = new ApiError(400, 'BAD_REQUEST', 'Invalid input', { field: 'email' });
      expect(error.status).toBe(400);
      expect(error.code).toBe('BAD_REQUEST');
      expect(error.message).toBe('Invalid input');
      expect(error.details).toEqual({ field: 'email' });
    });

    it('NetworkError can be created', () => {
      const cause = new Error('Connection refused');
      const error = new NetworkError('Network request failed', cause);
      expect(error.message).toBe('Network request failed');
      expect(error.cause).toBe(cause);
    });

    it('AuthError can be created', () => {
      const error = new AuthError('Token expired', { reason: 'expired' });
      expect(error.status).toBe(401);
      expect(error.code).toBe('UNAUTHORIZED');
      expect(error.message).toBe('Token expired');
    });

    it('ApiError.fromResponse creates error from response', async () => {
      const mockResponse = {
        status: 404,
        statusText: 'Not Found',
        json: async () => ({ code: 'NOT_FOUND', message: 'Resource not found' }),
      } as unknown as Response;

      const error = await ApiError.fromResponse(mockResponse, { code: 'NOT_FOUND', message: 'Resource not found' });
      expect(error.status).toBe(404);
      expect(error.code).toBe('NOT_FOUND');
    });
  });

  describe('Factory functions', () => {
    it('createApiClient creates a client', () => {
      const client = createApiClient({ baseUrl: 'http://test' });
      expect(client).toBeInstanceOf(NodusApiClient);
    });

    it('getApiClient returns default client', () => {
      const client = getApiClient();
      expect(client).toBeInstanceOf(NodusApiClient);
    });

    it('setApiClient replaces default client', () => {
      const customClient = createApiClient({ baseUrl: 'http://custom' });
      setApiClient(customClient);
      const retrieved = getApiClient();
      expect(retrieved).toBe(customClient);
    });
  });

  describe('Health check methods exist', () => {
    it('healthCheck method exists', () => {
      const client = getApiClient();
      expect(typeof client.healthCheck).toBe('function');
    });

    it('readinessCheck method exists', () => {
      const client = getApiClient();
      expect(typeof client.readinessCheck).toBe('function');
    });

    it('livenessCheck method exists', () => {
      const client = getApiClient();
      expect(typeof client.livenessCheck).toBe('function');
    });
  });

  describe('Placeholder methods exist (Phase 1 scaffold)', () => {
    const client = getApiClient();

    // These methods are intentionally not implemented in Phase 1
    // They exist as placeholders for future phases
    it('register is undefined (Phase 3)', () => {
      expect((client as any).register).toBeUndefined();
    });

    it('createCourse is undefined (Phase 5)', () => {
      expect((client as any).createCourse).toBeUndefined();
    });

    it('startRecording is undefined (Phase 7)', () => {
      expect((client as any).startRecording).toBeUndefined();
    });

    it('askLecture is undefined (Phase 13)', () => {
      expect((client as any).askLecture).toBeUndefined();
    });

    it('search is undefined (Phase 17)', () => {
      expect((client as any).search).toBeUndefined();
    });
  });
});