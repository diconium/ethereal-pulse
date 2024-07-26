import { Link } from '@remix-run/react';
import { AuthForm } from '~/components';
import { authenticate, authenticator } from '~/services';
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from '@remix-run/node';

export default function Login() {
  return (
    <div className="flex flex-col mx-56 p-16">
      <AuthForm type="login" />
      <div className="mt-4 text-center">
        <Link to="/auth/github" className="text-blue-500 underline">
          Login with GitHub
        </Link>
      </div>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  if (user) {
    return redirect('/emails');
  }
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticate(request, 'login');
}
