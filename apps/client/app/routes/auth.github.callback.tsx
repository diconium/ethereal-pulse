import { safeRedirect } from '~/utils';
import { authenticator } from '~/services';
import type { LoaderFunctionArgs } from '@remix-run/node';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  return authenticator.authenticate('github', request, {
    successRedirect: safeRedirect(url.searchParams.get('redirectTo')),
    failureRedirect: '/login',
  });
}
