import { useMemo } from "react";
import { NavLink } from "react-router-dom";
import { FaMoon, FaSun } from "react-icons/fa";
import { RiMenu3Fill } from "react-icons/ri";

import { headerData } from "../../data/data";
import MenuItem from "./MenuItem";
import { useGlobalContext } from "../../context/Context";

const Header = () => {
  const { setMenu, menu, dark, setDark, scroll, siteSettingData } = useGlobalContext();

  const toggleDarkMode = () => {
    const newDarkMode = !dark;
    setDark(newDarkMode);
    document.documentElement.classList.toggle("dark", newDarkMode);
    localStorage.setItem("dark-mode", String(newDarkMode));
  };

  const renderedHeaderItems = useMemo(
    () =>
      headerData.map((item) => (
        <NavLink
          key={item.id}
          to={item.link}
          className={({ isActive }) =>
            `px-1 cursor-pointer hover:text-[#1F618D] font-medium capitalize hover:bg-slate-200 ${
              isActive ? "text-[#1F618D] bg-gray-200" : ""
            }`
          }
        >
          {item.title}
        </NavLink>
      )),
    []
  );

  return (
    <div
      className={`${scroll} h-20 sticky top-0 left-0 w-full color  dark:text-white flex justify-between items-center z-40 transition px-1 md:px-7`}
    >
      <NavLink to="/">
        <div className="flex items-center">
          <img
            src={dark ? siteSettingData?.darkLogo : siteSettingData?.logo}
            alt="logo"
            width={90}
            height={90}
            className="aspect-auto object-contain"
          />
          <h1>
            Mandip | <span className="font-semibold color1">Developer</span>
          </h1>
        </div>
      </NavLink>
    
      <div className="hidden md:inline-flex items-center gap-x-7">
        {renderedHeaderItems}
      </div>

      <div className="flex items-center gap-4 pr-2 sm:pr-0 text-xl">
        <button onClick={toggleDarkMode}>
          {dark ? <FaSun /> : <FaMoon />}
        </button>
        <button onClick={() => setMenu(!menu)}>
          <RiMenu3Fill className="text-semibold hover:scale-[1.1] duration-500 text-2xl md:hidden" />
        </button>
      </div>

      {/* Mobile MenuItem */}
      {menu && <MenuItem />}
    </div>
  );
};

export default Header;
