export const ERROR_MESSAGES = {
  USER_NOT_FOUND: 'User not found.',
  USER_ALREADY_EXISTS: 'User already exists',
  INVALID_CREDENTIALS: 'Invalid password or email.',
  EMAIL_REQUIRED: 'Email is required.',
  PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters.',
  PASSWORDS_DO_NOT_MATCH: 'Passwords do not match.',
  MISSING_GITHUB_ENV_VARS: 'Missing required GitHub environment variables',
  FAILED_TO_STORE_USER_STATUS: (statusText: string) =>
    `Failed to store user: ${statusText}`,
  FAILED_TO_STORE_USER: 'Failed to store user',
  FAILED_TO_FETCH_USER_BY_ID_STATUS: (statusText: string) =>
    `Failed to fetch user by ID: ${statusText}`,
  FAILED_TO_FETCH_USER_BY_ATTRIBUTE: (attribute: string) =>
    `Failed to fetch user getUserByAttribute ${attribute}`,
};
