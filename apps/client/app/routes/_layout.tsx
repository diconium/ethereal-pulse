import { Outlet } from '@remix-run/react';
import { authenticator } from '~/services';
import { LoaderFunctionArgs } from '@remix-run/node';
import SideNavbar from '~/components/navbars/SideNavbar';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const currentPath = new URL(request.url).pathname;
  const searchParams = new URLSearchParams([['redirectTo', currentPath]]);

  return await authenticator.isAuthenticated(request, {
    failureRedirect: `/login?${searchParams}`,
  });
};

const BaseLayout = () => {
  return (
    <div className="bg-white flex flex-wrap md:flex-nowrap">
      <SideNavbar />
      <section className="flex h-screen w-full">
        <div className="w-full overflow-y-scroll">
          <div className="max-w-6xl mx-auto my-10 px-6">
            <Outlet />
          </div>
        </div>
      </section>
    </div>
  );
};

export default BaseLayout;
