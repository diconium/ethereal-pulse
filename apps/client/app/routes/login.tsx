import { ActionFunctionArgs, LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import AuthForm from "~/components/AuthForm";
import { isUserLoggedIn, login } from "~/services/auth.server";
import { createUserSession } from "~/services/session.server";
import { safeRedirect } from "~/utils/helpers";

export default function Login() {
  return (
    <div className="flex flex-col mx-56 p-16">
      <AuthForm type="login" />
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  if (await isUserLoggedIn(request)) {
    return redirect("/emails");
  }

  return json({});
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email");
  const password = formData.get("password");
  const remember = formData.get("remember");
  const redirectTo = safeRedirect(formData.get("redirectTo"));

  if (typeof email !== "string" || email.length === 0) {
    return json({ error: "Email is required." }, {
      status: 400,
    });
  }

  if (typeof password !== "string" || password.length < 6) {
    return json({ error: "Password is required and must be at least 6 characters." }, {
      status: 400,
    });
  }

  const response = login(email, password);
  const { accessToken, refreshToken, error } = await response.json();

  if (!response.ok) {
    return json({ error }, {
      status: 401,
    });
  }

  if (!accessToken || !refreshToken) {
    return json({ error: "An error occurred while logging in." }, {
      status: 500,
    });
  }

  return createUserSession(accessToken, refreshToken, {
    redirectTo,
    remember: remember === "on",
  });
}
