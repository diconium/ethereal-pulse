
import { NavLink } from "@remix-run/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { DEFAULT_LINKS } from "~/models/constants/navbarLinks.const";

const SideNavbar = () => {
  const navLinks = DEFAULT_LINKS;
  const [menuOpened, setMenuOpened] = useState(false);
  const MenuIcon = menuOpened ? XMarkIcon : Bars3Icon;

  const linkClass = ({ isActive }: { isActive: boolean }) => {
    return (
      'inline-flex w-full font-sm text-gray-500 hover:text-black hover:bg-gray-200 rounded-md px-3 py-1 transition-colors' +
      (isActive && ' bg-gray-200')
    );
  };

  function drawLinks() {
    return navLinks.map(navLink => (
      <li key={ navLink.label } className="w-full md:last-of-type:mt-auto">
        <NavLink to={ navLink.path } className={ linkClass }>
          { navLink.label }
        </NavLink>
      </li>
    ))
  }

  return (
    <nav
      className="flex items-center md:flex-col flex-row px-4 py-6 bg-gray-50 border-r-2 border-gray-100 h-[60px] md:h-screen w-screen md:w-[250px] md:min-w-[200px]"
    >
      <div className="flex w-full">
        <NavLink className="flex flex-shrink-0 items-center" to="/emails">
          <span className="text-black text-xl font-bold ml-2">
            Ethereal Pulse
          </span>
        </NavLink>
      </div>
      <div className="hidden md:flex flex-col w-full h-full">
        <ul className="flex flex-col mt-6 flex-1 gap-2">
          { drawLinks() }
        </ul>
      </div>
      <MenuIcon
        className="ml-auto block md:hidden size-10 text-black cursor-pointer"
        onClick={() => setMenuOpened(!menuOpened)}
      />
      {
        menuOpened && (
          <ul className="absolute top-[60px] left-0 h-screen w-screen bg-gray-50 flex md:hidden flex-col gap-2 p-4">
            { drawLinks() }
          </ul>
        )
      }
    </nav>
  )
}

export default SideNavbar;