import { ERROR_MESSAGES } from '~/constant/error-messages-constants';

export function validateInput(
  email: string,
  password: string,
  confirmPassword?: string,
) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof email !== 'string' || email.length === 0) {
    throw new Error(ERROR_MESSAGES.EMAIL_REQUIRED);
  }

  if (!emailPattern.test(email)) {
    return { error: 'Invalid email format.' };
  }

  if (typeof password !== 'string' || password.length < 6) {
    throw new Error(ERROR_MESSAGES.PASSWORD_MIN_LENGTH);
  }

  if (confirmPassword && password !== confirmPassword) {
    throw new Error(ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH);
  }
}
