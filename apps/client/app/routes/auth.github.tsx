import { authenticator } from '~/services';
import { ActionFunctionArgs, redirect } from '@remix-run/node';

export async function loader({ request }: ActionFunctionArgs) {
  await authenticator.authenticate('github', request, {
    successRedirect: '/emails',
    failureRedirect: '/login',
  });
  return redirect('/emails');
}

export async function action({ request }: ActionFunctionArgs) {
  return authenticator.authenticate('github', request);
}
