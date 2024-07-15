import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { AuthForm } from "~/components";
import { authenticate, authenticator } from "~/services";

export default function Login() {
  return (
    <div className="flex flex-col mx-56 p-16">
      <AuthForm type="login" />
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/emails",
  });
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticate(request, "login");
}
