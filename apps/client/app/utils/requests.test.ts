
import { getWithApiKey, postWithApiKey } from "./requests";
import { describe, it, expect, vi, beforeAll, afterEach, beforeEach } from 'vitest';


describe('requests.ts', () => {
  const mockFetch = vi.fn();
  const defaultApiKey = 'mock-default-api-key';
  beforeAll(() => {
    global.fetch = mockFetch;
    process.env['DEFAULT_API_KEY'] = defaultApiKey;
  });

  beforeEach(() => {
    process.env['DEFAULT_API_KEY'] = defaultApiKey;
  });

  afterEach(() => {
    mockFetch.mockClear();
  });

  it('should make a GET request with the API key', async () => {
    const mockResponse = { data: 'test' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const result = await getWithApiKey('https://api.example.com/data');

    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/data', {
      method: 'GET',
      headers: {
        'x-api-key': defaultApiKey,
        'Content-Type': 'application/json',
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it('should make a POST request with the API key and body', async () => {
    const mockResponse = { data: 'test' };
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const body = { key: 'value' };
    const result = await postWithApiKey('https://api.example.com/data', body);

    expect(mockFetch).toHaveBeenCalledWith('https://api.example.com/data', {
      method: 'POST',
      headers: {
        'x-api-key': defaultApiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the API key is missing', async () => {
    delete process.env.DEFAULT_API_KEY;

    await expect(getWithApiKey('https://api.example.com/data')).rejects.toThrow('API key is missing');
  });

  it('should throw an error if the response is not ok', async () => {
    mockFetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getWithApiKey('https://api.example.com/data')).rejects.toThrow('HTTP error! status: 404');
  });
});

