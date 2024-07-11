import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    sameSite: "lax",
    path: "/",
    httpOnly: true,
    secrets: [process.env.ACCESS_TOKEN_COOKIE_SECRET_KEY || "access-token-secret-key"],
    secure: process.env.NODE_ENV === "production",
  },
});
