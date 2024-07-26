import { authenticator } from '~/services';
import type { LoaderFunctionArgs } from '@remix-run/node';
export async function loader({ request }: LoaderFunctionArgs) {
  return authenticator.authenticate('github', request, {
    successRedirect: '/emails',
    failureRedirect: '/login',
  });
}
