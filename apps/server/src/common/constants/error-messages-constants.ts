export const ERROR_MESSAGES = {
  INVALID_USER_ID: 'Invalid User Id',
  INVALID_API_KEY: 'Invalid API key',
  API_KEY_MISSING: 'API key is missing',
  API_KEY_REQUIRED: 'API key is required',
  INVALID_API_KEY_ID: 'Invalid API Key Id',
  INVALID_USER_ID_FORMAT: 'Invalid userId format',
  EMAIL_PROVIDER_NOT_SET: 'Email provider not set',
  WEBAPP_API_KEY_NOT_SET: 'WEBAPP_API_KEY is not set',
  INSUFFICIENT_PERMISSIONS: 'Insufficient permissions',
  DATABASE_URI_NOT_DEFINED: 'Database URI is not defined',
  UNSUPPORTED_EMAIL_PROVIDER: 'Unsupported email provider',
  USER_ID_MISSING_IN_HEADERS: 'User ID is missing in the request headers',
  AZURE_CONNECTION_STRING_NOT_SET: 'Azure connection string is undefined',

  DOMAIN_ID_NOT_FOUND: (id: string) => `Domain #${id} not found`,
  API_KEY_ID_NOT_FOUND: (id: string) => `API Key #${id} not found`,
  TEMPLATE_ID_NOT_FOUND: (id: string) => `Template #${id} not found`,
};
