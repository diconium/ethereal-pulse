export const API_BASE_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:5173'
    : process.env.WEBAPP_PUBLIC_URI;

export const API_ROUTES = {
  USERS: '/users',
};
