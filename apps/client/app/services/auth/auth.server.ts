import { json } from "@remix-run/node";
import { Authenticator } from "remix-auth";
import { sessionStorage } from "../session.server";
import { LoginStrategy } from "./strategies/login.server";
import { SignUpStrategy } from "./strategies/signup.server";
import { safeRedirect } from "~/utils/helpers";

export const authenticator = new Authenticator<string>(sessionStorage);

authenticator
  .use(LoginStrategy, "login")
  .use(SignUpStrategy, "signup");

export async function authenticate(request: Request, strategy: "login" | "signup") {
  const formData = await request.clone().formData();
  const redirectTo = safeRedirect(formData.get("redirectTo"));

  try {
    return await authenticator.authenticate(strategy, request, {
      successRedirect: redirectTo || "/emails",
    });
  } catch (exception) {
    // Remix-auth wraps the error message in a response object
    if (exception instanceof Response) {
      return exception
        .json()
        // Error case - we are able to parse error json
        .then((response) => {
          return json({ error: response.message }, { status: exception.status })
        })
        // Success case - response is not json so we return the response as is
        .catch(() => {
          return exception;
        });
    }
    return json({ error: "An error occurred" }, { status: 500 });
  }
}

export async function logout(request: Request, redirectTo?: string) {
  return await authenticator.logout(request, {
    redirectTo: redirectTo || "/login",
  });
}
