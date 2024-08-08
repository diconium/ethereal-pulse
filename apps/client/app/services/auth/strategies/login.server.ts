import bcrypt from "bcryptjs";
import { validateInput } from '~/utils';
import { FormStrategy } from 'remix-auth-form';
import { getUserByAttribute } from '~/services/user.server';

export const LoginStrategy = new FormStrategy(async ({ form }) => {
  try {
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    validateInput(email, password);

    const user = await getUserByAttribute('email', email);
    if (!user) {
      throw new Error('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error('Invalid password or email.');
    }

    return user._id;
  } catch (error) {
    console.error('Error in LoginStrategy:', error);
    throw error;
  }
});
