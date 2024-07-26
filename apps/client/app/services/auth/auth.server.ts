import { json } from "@remix-run/node";
import { safeRedirect } from '~/utils';
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
  let redirectTo = '/emails';

  if (strategy !== 'github') {
    const formData = await request.clone().formData();
    redirectTo = safeRedirect(formData.get('redirectTo'));
  }

  try {
    const result = await authenticator.authenticate(strategy, request, {
      successRedirect: redirectTo,
    });
    return result;
  } catch (exception) {
    // Handle 302 redirect status before logging the error
    if (exception instanceof Response && exception.status === 302) {
      return exception;
    }

    console.error('Authentication failed:', exception);

    // Remix-auth wraps the error message in a response object
    if (exception instanceof Response) {
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
