import SideNavbar from "~/components/navbars/SideNavbar";
import { Outlet } from "@remix-run/react";

const BaseLayout = () => {
  return (
    <div className="bg-white flex flex-wrap md:flex-nowrap">
      <SideNavbar/>
      <section className="flex h-screen w-full">
        <div className="w-full overflow-y-scroll">
          <div className="max-w-6xl mx-auto my-10 px-6">
            <Outlet/>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BaseLayout;