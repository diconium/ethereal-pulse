import { CSRF } from "remix-utils/csrf/server";
import { createCookie } from "@remix-run/node";

export const cookie = createCookie("csrf", {
	path: "/",
	httpOnly: true,
	secure: process.env.NODE_ENV === "production",
	sameSite: "lax",
	secrets: [process.env.CSRF_COOKIE_SECRET_KEY || "csrf-token-secret-key"],
});

export const csrf = new CSRF({
	cookie,
	formDataKey: "csrf",
	secret: process.env.CSRF_SECRET_KEY,
});