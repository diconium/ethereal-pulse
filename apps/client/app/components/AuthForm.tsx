import { Form, Link, useActionData, useSearchParams } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";

export default function AuthForm({ type }: { type: "login" | "signup" }) {
  const actionData = useActionData<{ error?: string }>();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "";
  const redirectSearchParams = redirectTo ? `?redirectTo=${redirectTo}` : "";

  return (
    <>
      <h2 className="text-xl text-center">
        {type === "login" ? "Log in to Ethereal Pulse" : "Create a new account"}
      </h2>
      {type === "login" ? (
        <Link to={`/signup${redirectSearchParams}`} className="text-center mt-4 font-bold underline">
          Don&apos;t have an account? Sign up here!
        </Link>
      ) : (
        <Link to={`/login${redirectSearchParams}`} className="text-center mt-4 font-bold underline">
          Already have an account? Log in here!
        </Link>
      )}

      <div className="rounded-xl shadow-2xl border-solid border border-gray-600 bg-gray-300 mt-8">
        <Form method="post" className="flex flex-col p-6 gap-4">
          <AuthenticityTokenInput />
  
          {type === "signup" && (
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
          {type === "signup" && (
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

            <input type="hidden" name="redirectTo" value={redirectTo} />
            <button
              type="submit"
              className="rounded-xl border-solid border border-gray-600 bg-gray-600 text-white py-2 px-4 mt-2"
            >
              {type === "login" ? "Login" : "Sign up"}
            </button>
          </div>
        </Form>
      </div>
    </>
  );
}
