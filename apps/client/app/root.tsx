import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { AuthenticityTokenProvider } from 'remix-utils/csrf/react';
import { authenticator, csrf, getUserById } from './services';
import './styles/tailwind.css';

export async function loader({ request }: LoaderFunctionArgs) {
  const [token, cookieHeader] = await csrf.commitToken();
  const userId = await authenticator.isAuthenticated(request);
  const user = await getUserById(userId);

  if (!cookieHeader) {
    throw new Error('Something went wrong with the CSRF token.');
  }

  return json(
    { csrf: token, user },
    {
      headers: {
        'Set-Cookie': cookieHeader,
      },
    },
  );
}

export const meta: MetaFunction = () => {
  return [
    { title: 'Ethereal Pulse' },

    {
      name: 'description',
      content: 'Welcome! See your emails, templates, and groups of recipients.',
    },
  ];
};

export function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
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
