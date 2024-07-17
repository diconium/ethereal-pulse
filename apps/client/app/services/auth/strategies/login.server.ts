import bcrypt from "bcryptjs";
import { FormStrategy } from "remix-auth-form";
import { getUserByAttribute } from "~/services/user.server";
import { validateInput } from "~/utils";

export const LoginStrategy = new FormStrategy(async ({ form }) => {
  const email = form.get("email") as string;
  const password = form.get("password") as string;

  validateInput(email, password);

  const user = getUserByAttribute("email", email);

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      return user.id;
    } else {
      throw new Error("Invalid password or email.");
    }
  } else {
    throw new Error("User not found. Please sign up first!");
  }
});
