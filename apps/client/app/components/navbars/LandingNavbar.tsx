import fccLogo from '~/assets/images/FCC-Logo-BulbBlackBG.svg';
import { NavLink } from "@remix-run/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { LANDING_PAGE_LINKS } from "~/models/constants/navbarLinks.const";

const LandingNavbar = () => {
  const navLinks = LANDING_PAGE_LINKS;
  const [menuOpened, setMenuOpened] = useState(false);
  const MenuIcon = menuOpened ? XMarkIcon : Bars3Icon;


  function drawLinks() {
    return navLinks.map(navLink => (
      <NavLink to={ navLink.path } className="text-white hover:bg-gray-50 hover:text-black transition-all rounded-md px-3 py-2 " key={ navLink.label }>
        { navLink.label }
      </NavLink>
    ))
  }

  return (
    <nav className="bg-black sticky top-0 z-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 items-stretch justify-start">
            <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
              <img className="h-10 w-auto rounded-full" src={ fccLogo } alt="Ethereal logo"/>
              <span className="text-2xl font-bold ml-3">
                Ethereal Pulse
              </span>
            </NavLink>
            <div className="md:ml-auto hidden md:block">
              <div className="flex space-x-2">
                { drawLinks() }
              </div>
            </div>
            <MenuIcon
              className="ml-auto block md:hidden size-10 cursor-pointer text-gray-50"
              onClick={() => setMenuOpened(!menuOpened)}
            />
          </div>
        </div>
      </div>
      {
        menuOpened && (
          <div className="h-screen w-screen bg-black absolute flex md:hidden flex-col gap-2 p-4">
            { drawLinks() }
          </div>
        )
      }
    </nav>
  );
}
export default LandingNavbar;