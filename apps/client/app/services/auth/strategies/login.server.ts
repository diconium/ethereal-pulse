import bcrypt from "bcryptjs";
import { validateInput } from '~/utils';
import { FormStrategy } from 'remix-auth-form';
import { getUserByAttribute } from '~/services/user.server';
import { ERROR_MESSAGES } from '~/constant/error-messages-constants';

export const LoginStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get('email') as string;
  const password = form.get('password') as string;

  validateInput(email, password);

  const user = await getUserByAttribute('email', email);
  if (!user) {
    throw new Error(ERROR_MESSAGES.USER_NOT_FOUND);
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
  }

  return user._id;
});
