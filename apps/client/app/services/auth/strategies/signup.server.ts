import bcrypt from "bcryptjs";
import { FormStrategy } from "remix-auth-form";
import { getUserByAttribute, storeUser } from "~/models/user.server";
import { User } from "~/types/auth";
import { validateInput } from "~/utils/auth";

export const SignUpStrategy = new FormStrategy(async ({ form }) => {
  const firstName = form.get("firstName") as string;
  const lastName = form.get("lastName") as string;
  const email = form.get("email") as string;
  const password = form.get("password") as string;
  const confirmPassword = form.get("confirmPassword") as string;

  validateInput(email, password, confirmPassword);

  if (getUserByAttribute("email", email)) {
    throw new Error("User already exists");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user: User = {
    id: crypto.randomUUID(),
    firstName,
    lastName,
    email,
    password: hashedPassword,
  };

  storeUser(user);

  return user.id;
});
