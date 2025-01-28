import {
  FaHome,
  FaUserAlt,
  FaSignOutAlt,
  FaUsers,
  FaUserTie,
  FaChevronDown,
  FaChevronRight,
  FaStar,
  FaInfoCircle,
  FaBrush,
  FaEnvelope,
  FaUserCog,
  FaLaptopCode,
  FaLock,
  FaServer,
} from "react-icons/fa";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../../assets/logo-black.png";
import { useState, useEffect } from "react";

// Define menu items
const menuItems = [
  { icon: <FaHome />, label: "Dashboard", path: "" },
  { icon: <FaStar />, label: "Hero", path: "/hero" },
  { icon: <FaInfoCircle />, label: "About", path: "/about" },
  { icon: <FaBrush />, label: "Skills", path: "/skill" },
  { icon: <FaLaptopCode />, label: "Portfolio", path: "/portfolio" },
  { icon: <FaUserTie />, label: "Social Media", path: "/social-media" },
  { icon: <FaEnvelope />, label: "Contact", path: "/contact" },

  {
    icon: <FaUserCog />,
    label: "Users",
    isDropdown: true,
    subMenu: [
      { icon: <FaUsers />, label: "All", path: "/users" },
      { icon: <FaUserTie />, label: "Roles", path: "/roles" },
      { icon: <FaLock />, label: "Permissions", path: "/permissions" },
    ],
  },
  {
    icon: <FaServer />,
    label: "Setting",
    isDropdown: true,
    subMenu: [
      { icon: <FaUserAlt />, label: "Header", path: "/header" },
      { icon: <FaLock />, label: "Site Setting", path: "/site-setting" },
    ],
  },
  { icon: <FaSignOutAlt />, label: "Logout", path: "/logout", isLogout: true },
];

const Sidebar = () => {
  const [openDropdownIndex, setOpenDropdownIndex] = useState(null); 
  const location = useLocation(); 

  // Handle dropdown toggle
  const handleDropdownToggle = (index) => {
    setOpenDropdownIndex(openDropdownIndex === index ? null : index);
  };

  // Determine if any submenu is active
  const isSubMenuActive = (subMenu) => {
    return subMenu.some((subItem) => location.pathname === `/dashboard${subItem.path}`);
  };

  // Update the dropdown state based on the active route
  useEffect(() => {
    // Check if any submenu is active and open the corresponding dropdown
    const activeDropdownIndex = menuItems.findIndex(
      (item) => item.isDropdown && isSubMenuActive(item.subMenu)
    );
    setOpenDropdownIndex(activeDropdownIndex !== -1 ? activeDropdownIndex : null);
  }, [location.pathname]);

  return (
    <div
      id="sidebar"
      className="lg:block hidden border-l-2 border bg-white w-64 h-screen overflow-y-auto overflow-hidden"
    >
      {/* Logo */}
      <div className="mx-auto h-20 grid place-items-center">
        <img
          src={logo}
          alt="logo"
          className="w-16  h-16 object-contain"
        />
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
                className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-500 hover:text-cyan-600 w-full text-left"
              >
                <span className="text-lg">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            );
          }

          if (item.isDropdown) {
            // Dropdown for Users and Setting
            return (
              <div key={index} className="space-y-2">
                <button
                  onClick={() => handleDropdownToggle(index)}
                  className="px-4 py-3 flex items-center justify-between rounded-md text-gray-500 hover:text-cyan-600 w-full text-left"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-lg">{item.icon}</span>
                    <span className="no-underline">{item.label}</span>
                  </div>
                  {openDropdownIndex === index ? (
                    <FaChevronDown className="text-gray-500" />
                  ) : (
                    <FaChevronRight className="text-gray-500" />
                  )}
                </button>
                {/* Submenu */}
                {openDropdownIndex === index && (
                  <div className="pl-8 space-y-2">
                    {item.subMenu.map((subItem, subIndex) => (
                      <NavLink
                        key={subIndex}
                        to={`/dashboard${subItem.path}`}
                        className={({ isActive }) =>
                          `px-4 py-2 flex no-underline items-center space-x-4 rounded-md ${
                            isActive ||
                            location.pathname === `/dashboard${subItem.path}`
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
              className={`px-4 py-3 flex items-center no-underline space-x-4 rounded-md ${
                location.pathname === `/dashboard${item.path}`
                  ? "text-white bg-gradient-to-r from-sky-600 to-cyan-400"
                  : "text-gray-500 hover:text-cyan-600"
              }`}
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
