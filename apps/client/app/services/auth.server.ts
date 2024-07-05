import bcrypt from "bcryptjs";
import { json, redirect, TypedResponse } from "@remix-run/node";
import {
  getUserByAttribute,
  storeUser,
} from "~/models/user.server";
import type { User } from "~/types/auth";
import { JWT } from "~/utils/jwt";
import { accessTokenCookie, createUserSession, getAccessToken, getRefreshToken, refreshTokenCookie } from "./session.server";

export const login = (email: string, password: string): TypedResponse<{ accessToken?: string, refreshToken?: string, error?: string }> => {
  const jwt = new JWT();
  const user = getUserByAttribute("email", email);

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      return json({
        accessToken: jwt.generateAccessToken(user.id),
        refreshToken: jwt.generateRefreshToken(user.id),
      });
    } else {
      return json({ error: "Invalid password" }, { status: 401 });
    }
  } else {
    return json({ error: "User not found. Please sign up first!" }, { status: 404 });
  }
};

export const signUp = (formData: FormData): TypedResponse<{ accessToken?: string, refreshToken?: string, error?: string }> => {
  const jwt = new JWT();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (getUserByAttribute("email", email)) {
    return json({ error: "User already exists" }, { status: 409 });
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const user: User = {
    id: crypto.randomUUID(),
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email,
    password: hashedPassword,
  };

  storeUser(user);

  return json({
    accessToken: jwt.generateAccessToken(user.id),
    refreshToken: jwt.generateRefreshToken(user.id),
  });
};

export async function logout(request: Request, redirectTo: string = "/") {
  const cookieHeader = request.headers.get("Cookie");

  if (!cookieHeader) return redirect(redirectTo);

  return redirect(redirectTo, {
    headers: [
      ["Set-Cookie", await accessTokenCookie.serialize('', { maxAge: -1 })],
      ["Set-Cookie", await refreshTokenCookie.serialize('', { maxAge: -1 })],
    ]
  });
}

/**
 * Middleware function for authentication.
 * Should be used in the loader and action functions of protected routes.
 * 
 * @param request - The request object.
 * @returns A Promise that resolves to void.
 * @throws Logs out User if tokens are invalid.
 */
export async function authMiddleware(request: Request) {
  const jwt = new JWT();
  const currentPath = new URL(request.url).pathname;
  const searchParams = new URLSearchParams([["redirectTo", currentPath]]);

  const accessToken = await getAccessToken(request);
  
  if (!accessToken) {
    throw await logout(request, `/login?${searchParams}`);
  }

  const { success, error } = jwt.verifyAccessToken(accessToken);

  if (!success) {
    if (error?.name === "TokenExpiredError") {
      await renewAccessToken(request, `/login?${searchParams}`);
    }
  }

  return;
}

export async function renewAccessToken(request: Request, redirectTo: string = "/") {
  const jwt = new JWT();
  const refreshToken = await getRefreshToken(request);

  if (refreshToken) {
    const { success, data } = jwt.verifyRefreshToken(refreshToken);

    if (success && data) {
      const newAccessToken = jwt.generateAccessToken(data.userId);
      const newRefreshToken = jwt.generateRefreshToken(data.userId);

      throw await createUserSession(newAccessToken, newRefreshToken, {
        redirectTo,
      });
    }
  } else {
    throw await logout(request, redirectTo);
  }
}

export async function isUserLoggedIn(request: Request): Promise<boolean> {
  const accessToken = await getAccessToken(request);

  if (!accessToken) return false;

  const jwt = new JWT();
  const { success } = jwt.verifyAccessToken(accessToken);

  return success;
}
