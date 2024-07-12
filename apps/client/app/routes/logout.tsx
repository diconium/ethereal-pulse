import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { logout } from "~/services";

export async function loader() {
  return redirect("/");
}

export async function action({ request }: ActionFunctionArgs) {
  return logout(request);
}
