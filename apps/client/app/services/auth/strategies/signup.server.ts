import bcrypt from "bcryptjs";
import { NewUser, User } from '~/models';
import { validateInput } from '~/utils/auth';
import { FormStrategy } from 'remix-auth-form';
import { getUserByAttribute, storeUser } from '~/services/user.server';

export const SignUpStrategy = new FormStrategy(async ({ form }) => {
  const firstName = form.get('firstName') as string;
  const lastName = form.get('lastName') as string;
  const email = form.get('email') as string;
  const password = form.get('password') as string;
  const confirmPassword = form.get('confirmPassword') as string;

  validateInput(email, password, confirmPassword);

  if (await getUserByAttribute('email', email)) {
    throw new Error('User already exists');
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user: NewUser = {
    firstName,
    lastName,
    email,
    password: hashedPassword,
  };

  const userId = await storeUser(user);

  return userId;
});
