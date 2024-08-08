import { AuthForm } from '~/components';
import { Link, useLocation } from '@remix-run/react';
import { authenticate, authenticator } from '~/services';
import { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';

export default function Login() {
  const location = useLocation();
  const searchParams = location.search;

  return (
    <div className="flex flex-col mx-56 p-16">
      <AuthForm type="login" />
      <div className="mt-4 text-center">
        <Link
          to={`/auth/github${searchParams}`}
          className="text-blue-500 underline"
        >
          Login with GitHub
        </Link>
      </div>
    </div>
  );
}

export async function loader({ request }: LoaderFunctionArgs) {
  return await authenticator.isAuthenticated(request, {
    successRedirect: '/emails',
  });
}

export async function action({ request }: ActionFunctionArgs) {
  return await authenticate(request, 'login');
}
