import { createCookie, redirect } from "@remix-run/node";
import type { CreateUserSessionOptions } from "~/types/session";
import { JWT } from "~/utils/jwt";

export const accessTokenCookie = createCookie("accessToken", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  secrets: [process.env.ACCESS_TOKEN_COOKIE_SECRET_KEY || "access-token-secret-key"],
});

export const refreshTokenCookie = createCookie("refreshToken", {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  secrets: [process.env.ACCESS_TOKEN_COOKIE_SECRET_KEY || "refresh-token-secret-key"],
});

export async function getAccessToken(request: Request): Promise<string | null> {
  const cookieHeader = request.headers.get("Cookie");
  return accessTokenCookie.parse(cookieHeader);
}

export async function getRefreshToken(request: Request): Promise<string | null> {
  const cookieHeader = request.headers.get("Cookie");
  return refreshTokenCookie.parse(cookieHeader);
}

/**
 * Creates a user session with the provided tokens.
 * @param accessToken - The access token.
 * @param refreshToken - The refresh token
 * @param options - Optional object for configuring user session.
 * @returns A redirect response with the session token set as a cookie.
 */
export async function createUserSession(
  accessToken: string,
  refreshToken: string,
  options?: CreateUserSessionOptions
) {
  return redirect(options?.redirectTo || '/emails', {
    headers: [
      ["Set-Cookie", await accessTokenCookie.serialize(accessToken, {
        maxAge: options?.remember
          ? 60 * 10 // 10 minutes
          : undefined,
      })],
      ["Set-Cookie", await refreshTokenCookie.serialize(refreshToken, {
        maxAge: options?.remember
          ? 60 * 60 * 24 * 7 // 7 days
          : undefined,
      })],
    ]
  });
}

export async function getUserIdFromSession(request: Request) {
  const jwt = new JWT();
  const accessToken = await getAccessToken(request);

  if (!accessToken) return undefined;

  const { success, data } = jwt.verifyAccessToken(accessToken);

  if (!success || !data) return undefined;

  return data.userId;
}
