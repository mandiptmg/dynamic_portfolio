import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { FaBell, FaUser } from "react-icons/fa";
import { HiOutlineBars3BottomRight } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../../context/Context";
const Navbar = () => {
  const { logout } = useGlobalContext();

  return (
    <nav className="bg-white h-20 grid place-items-center w-full border-b border-gray-300">
      <div className="flex justify-between items-center w-full px-10">
        {/* Menu Button */}
        <button
        // onClick={() => setMenu(!menu)}
        >
          <HiOutlineBars3BottomRight className=" text-cyan-500 text-2xl" />
        </button>
        {/* Logo */}

        {/* Notifications & Profile */}
        <div className="flex items-center gap-4">
          <button>
            <FaBell className="text-cyan-500 text-lg" />
          </button>
          <Popover>
            <PopoverButton className="block text-sm/6 font-semibold ">
              <div className="flex items-center gap-2">
                <button className="p-3 border rounded-full ">
                  <FaUser className=" text-cyan-500 text-lg" />
                </button>
                <div className="text-xs text-left">
                  {/* <span className="text-sm capitalize font-medium">{user?.name}</span> */}
                  <span className="text-sm capitalize font-medium">madnip</span>

                  <br />
                  <span className="text-gray-600 uppercase">role</span>
                </div>
              </div>
            </PopoverButton>
            <PopoverPanel
              transition
              anchor="bottom"
              className="divide-y divide-white/5  shadow-xl  mt-2 min-w-32 rounded-md bg-cyan-500 text-sm/6 transition duration-200 ease-in-out data-[closed]:-translate-y-1 data-[closed]:opacity-0"
            >
              <div className=" font-semibold text-white">
                <Link
                  className="block rounded-t-md p-2 transition hover:bg-cyan-600"
                  to="account"
                >
                  <p className="">Account</p>
                </Link>
                <button
                  onClick={() => logout()}
                  className="rounded-b-md p-2 w-full text-left transition hover:bg-cyan-600"
                >
                  logout
                </button>
              </div>
            </PopoverPanel>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
