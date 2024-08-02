import { json } from '@remix-run/node';
import { safeRedirect } from '~/utils/helpers';
import { Authenticator } from 'remix-auth';
import { sessionStorage } from '../session.server';
import { LoginStrategy, SignUpStrategy, gitHubStrategy } from './strategies';

export const authenticator = new Authenticator<string>(sessionStorage);

authenticator
  .use(LoginStrategy, 'login')
  .use(SignUpStrategy, 'signup')
  .use(gitHubStrategy, 'github');

export async function authenticate(
  request: Request,
  strategy: 'login' | 'signup' | 'github',
) {
  try {
    const url = new URL(request.url);
    const redirectTo = safeRedirect(url.searchParams.get('redirectTo'));

    const result = await authenticator.authenticate(strategy, request, {
      successRedirect: redirectTo,
    });
    return result;
  } catch (exception) {
    if (exception instanceof Response) {
      // Handle 302 redirect status before logging the error
      if (exception.status === 302) {
        return exception;
      }

      console.error('Authentication failed:', exception);

      // Remix-auth wraps the error message in a response object
      try {
        const response = await exception.json();
        return json({ error: response.message }, { status: exception.status });
      } catch {
        return exception;
      }
    }
    return json({ error: 'An error occurred' }, { status: 500 });
  }
}

export async function logout(request: Request, redirectTo?: string) {
  return await authenticator.logout(request, {
    redirectTo: redirectTo || '/login',
  });
}
