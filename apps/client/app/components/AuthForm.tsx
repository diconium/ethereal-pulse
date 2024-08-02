import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const actionData = useActionData<{ error?: string }>();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirectTo') || '';
  const redirectSearchParams = redirectTo ? `?redirectTo=${redirectTo}` : '';

  const isLogin = type === 'login';
  const title = isLogin ? 'Log in to Ethereal Pulse' : 'Create a new account';
  const linkText = isLogin
    ? "Don't have an account? Sign up here!"
    : 'Already have an account? Log in here!';
  const linkTo = isLogin
    ? `/signup${redirectSearchParams}`
    : `/login${redirectSearchParams}`;
  const buttonText = isLogin ? 'Login' : 'Sign up';

  return (
    <>
      <h2 className="text-xl text-center">{title}</h2>
      <Link to={linkTo} className="text-center mt-4 font-bold underline">
        {linkText}
      </Link>

      <div className="rounded-xl shadow-2xl border-solid border border-gray-600 bg-gray-300 mt-8">
        <Form
          method="post"
          action={redirectSearchParams}
          className="flex flex-col p-6 gap-4"
        >
          <AuthenticityTokenInput />

          {!isLogin && (
            <div className="flex flex-col">
              <label htmlFor="firstName">First Name:</label>
              <input
                className="mt-2 rounded-sm"
                type="text"
                name="firstName"
                id="firstName"
                required
              />
              <label htmlFor="lastName" className="mt-4">
                Last Name:
              </label>
              <input
                className="mt-2 rounded-sm"
                type="text"
                name="lastName"
                id="lastName"
                required
              />
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="email">Email:</label>
            <input
              className="mt-2 rounded-sm"
              type="email"
              name="email"
              id="email"
              required
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password:</label>
            <input
              className="mt-2 rounded-sm"
              type="password"
              name="password"
              id="password"
              required
            />
          </div>
          {!isLogin && (
            <div className="flex flex-col">
              <label htmlFor="confirmPassword">Confirm Password:</label>
              <input
                className="mt-2 rounded-sm"
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                required
              />
            </div>
          )}
          <div className="flex flex-col items-center mt-6">
            {actionData?.error && (
              <p className="text-red-600 font-bold">{actionData.error}</p>
            )}
            <button
              type="submit"
              className="rounded-xl border-solid border border-gray-600 bg-gray-600 text-white py-2 px-4 mt-2"
            >
              {buttonText}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
