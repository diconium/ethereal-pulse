import { Link } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import LandingNavbar from "~/components/navbars/LandingNavbar";
import { authenticator } from "~/services/auth/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/emails",
  });
};

export default function Index() {
  return (
    <div className="flex flex-col w-full h-screen font-sans bg-black text-gray-200">
      <LandingNavbar />
      <section className="flex flex-1 items-center p-6 my-auto text-center md:text-justify max-w-2xl md:mx-auto">
        <div>
          <h1 className="text-6xl font-bold tracking-tight">Email for developers</h1>
          <p className="text-2xl mt-4 mb-8 text-gray-400 ">The best way to reach humans instead of spam folders.
            Deliver transactional and marketing emails at scale. All in a single place.</p>
          <div className="flex flex-col md:flex-row gap-4">
            <Link to='/login' className="inline-flex items-center justify-center bg-gray-200 text-black rounded-3xl p-3 md:px-8 text-lg hover:bg-gray-50 transition-all">
              Get Started <ChevronRightIcon className="size-5 ms-1"/>
            </Link>
            <button className="inline-flex items-center justify-center rounded-3xl px-3 md:px-8 py-2 text-lg hover:bg-white/10 transition-all">
              Documentation <ChevronRightIcon className="size-4 ms-1 mt-0.5"/>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
