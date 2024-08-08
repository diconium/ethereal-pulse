import { User } from '~/models';
import { json } from '@remix-run/node';
import { Authenticator } from 'remix-auth';
import { safeRedirect } from '~/utils/helpers';
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
      if (exception instanceof Error) {
        return json({ error: exception.message }, { status: 500 });
      }
      try {
        const response = await exception.json();
        return json(
          { error: response.message || 'An error occurred' },
          { status: exception.status || 500 },
        );
      } catch (innerException) {
        console.error('Failed to parse error response:', innerException);
        return json({ error: 'An unexpected error occurred' }, { status: 500 });
      }
    }
  }
}

export async function logout(request: Request, redirectTo?: string) {
  return await authenticator.logout(request, {
    redirectTo: redirectTo || '/login',
  });
}
