import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { getUserById } from "./models/user.server";
import { isUserLoggedIn } from "./services/auth.server";
import { getUserIdFromSession } from "./services/session.server";
import { csrf } from "./services/csrf.server";
import "./styles/tailwind.css";

export async function loader({ request }: LoaderFunctionArgs) {
  const isLoggedIn = await isUserLoggedIn(request);
  const userId = await getUserIdFromSession(request);
  const user = getUserById(userId);
  const [token, cookieHeader] = await csrf.commitToken();

  if (!cookieHeader) {
    throw new Error("Something went wrong with the CSRF token.");
  }

  return json({ csrf: token, isLoggedIn, user }, {
    headers: {
      "Set-Cookie": cookieHeader,
    },
  });
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { csrf } = useLoaderData<typeof loader>();
  return (
    <AuthenticityTokenProvider token={csrf}>
      <Outlet />
    </AuthenticityTokenProvider>
  );
}
