interface RequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
}

export async function getWithApiKey<T>(url: string, headers: Record<string, string> = {}): Promise<T> {
  return requestWithApiKey<T>(url, {
    method: 'GET',
    headers,
  });
}

export async function postWithApiKey<T>(url: string, body: unknown, headers: Record<string, string> = {}): Promise<T> {
  return requestWithApiKey<T>(url, {
    method: 'POST',
    headers,
    body,
  });
}

async function requestWithApiKey<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body } = options;

  const defaultApiKey = process.env.DEFAULT_API_KEY;

  if (!defaultApiKey) {
    throw new Error('API key is missing');
  }

  // Add the API key to the headers
  const finalHeaders: Record<string, string> = {
    ...headers,
    'x-api-key': defaultApiKey,
    'Content-Type': 'application/json',
  };

  // Configure the fetch options
  const fetchOptions: RequestInit = {
    method,
    headers: finalHeaders,
  };

  if (body) {
    fetchOptions.body = JSON.stringify(body);
  }

  // Make the fetch request
  const response = await fetch(url, fetchOptions);

  // Check if the response is ok (status in the range 200-299)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  // Parse and return the JSON response
  return response.json() as Promise<T>;
}
