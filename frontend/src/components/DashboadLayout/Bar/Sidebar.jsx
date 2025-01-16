import {
  FaHome,
  FaGift,
  FaStore,
  FaWallet,
  FaExchangeAlt,
  FaUser,
  FaSignOutAlt,
  FaUsers,
  FaUserShield,
  FaChevronDown,
  FaChevronRight,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
// import { useGlobalContext } from "../../context/Context";
import logo from "../../../assets/logo-black.png";
import { useState } from "react";

// Define menu items
const menuItems = [
  { icon: <FaHome />, label: "Dashboard", path: "" },
  { icon: <FaGift />, label: "Hero", path: "/hero" },
  { icon: <FaStore />, label: "Branches", path: "/branches" },
  { icon: <FaWallet />, label: "Wallet", path: "/wallet" },
  { icon: <FaExchangeAlt />, label: "Transactions", path: "/transactions" },
  { icon: <FaUser />, label: "Account", path: "/account" },
  {
    icon: <FaUserShield />,
    label: "Users",
    isDropdown: true,
    subMenu: [
      { icon: <FaUsers />, label: "all", path: "/users" },
      { icon: <FaUserShield />, label: "Roles", path: "/roles" },
    ],
  },
  { icon: <FaSignOutAlt />, label: "Logout", path: "/logout", isLogout: true },
];

const Sidebar = () => {
  // const { logout } = useGlobalContext();
  const [openDropdown, setOpenDropdown] = useState(false); // State for dropdown toggle

  return (
    <div
      id="sidebar"
      className={`lg:block hidden border-l-2 border bg-white w-64 h-screen`}
    >
      {/* Logo */}
      <div className="mx-auto h-20 grid place-items-center">
        <img src={logo} alt="logo" className="h-16 scale-125 w-16 object-contain" />
      </div>
      <hr />

      {/* Menu Items */}
      <div className="p-4 space-y-4">
        {menuItems.map((item, index) => {
          if (item.isLogout) {
            // Logout Button
            return (
              <button
                key={index}
                // onClick={logout}
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 hover:text-cyan-600 w-full text-left"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          }

          if (item.isDropdown) {
            // Dropdown for Auth
            return (
              <div key={index} className="space-y-2">
                <button
                  onClick={() => setOpenDropdown(!openDropdown)}
                  className="px-4 py-3 flex items-center justify-between rounded-md text-gray-500 hover:text-cyan-600 w-full text-left"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </div>
                  {openDropdown ? (
                    <FaChevronDown className="text-gray-500" />
                  ) : (
                    <FaChevronRight className="text-gray-500" />
                  )}
                </button>
                {/* Submenu */}
                {openDropdown && (
                  <div className="pl-8 space-y-2">
                    {item.subMenu.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={`/dashboard${subItem.path}`}
                        className={({ isActive }) =>
                          `px-4 py-2 flex items-center space-x-4 rounded-md ${
                            isActive
                              ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                              : "text-gray-500 hover:text-cyan-600"
                          }`
                        }
                      >
                        <span className="text-lg">{subItem.icon}</span>
                        <span>{subItem.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          // Regular Menu Item
          return (
            <NavLink
              key={index}
              to={`/dashboard${item.path}`}
              className={({ isActive }) =>
                `px-4 py-3 flex items-center space-x-4 rounded-md ${
                  isActive && window.location.pathname === "/dashboard"
                    ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                    : "text-gray-500 hover:text-cyan-600"
                }`
              }
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
