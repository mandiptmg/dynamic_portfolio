import { headerData, iconData } from "../../data/data";
import { RxCross1 } from "react-icons/rx";
import { motion } from "framer-motion";
import logowhite from "../../assets/about1.jpg";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context/Context";
const MenuItem = () => {
  const { setMenu } = useGlobalContext();

  return (
    <div className="fixed w-full color z-10 overflow-hidden h-screen  bg-black/60 top-0 right-0 ">
      <motion.div
        initial={{ x: "500", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ ease: "easeIn", duration: 0.7 }}
        className="absolute top-0 right-0 h-screen dark:text-white w-2/3 dark:bg-[#222831] bg-white"
      >
        <button
          onClick={() => setMenu(false)}
          className="absolute top-0 right-0 p-3 hover:text-white hover:bg-red-500"
        >
          <RxCross1 className="2xl" />
        </button>
        <div className=" mt-20  flex-col flex items-center ">
          <div className="bg-gray-200  p-1 rounded-full">
            <img
              src={logowhite}
              alt="mandip tamang"
              width={90}
              height={90}
              className="rounded-full object-cover aspect-square"
            />
          </div>
          <div className="my-4 text-center">
            <h1 className="text-xl font-semibold">Mandip Tamang</h1>
            <p className="text-sm  text-gray-500">Full Stack Developer</p>
            <ul className="flex gap-2 justify-center mt-2">
              {iconData.map((item) => (
                <li
                  key={item.id}
                  title={item.title}
                  onClick={() => window.open(item.link)}
                  className="flex items-center hover:scale-110 duration-700 ease-in-out p-2 cursor-pointer bg-gray-400 rounded-full  gap-2 justify-center"
                >
                  <item.icon className="dark:text-black text-white" />
                </li>
              ))}
            </ul>
          </div>

          {headerData.map((item) => (
            <div
              data-aos="fade-up"
              data-delay={300 * item.id}
              key={item.id}
              className="hover:bg-gray-100  dark:hover:bg-gray-700 group w-full"
            >
              <Link to={item.link}>
                <h1
                  onClick={() => setMenu(false)}
                  className="p-4 flex items-center cursor-pointer font-medium w-full  capitalize gap-2"
                >
                  <span className="text-xl font-semibold  group-hover:text-[#00ADB5] ">
                    {item.icon && <item.icon />}
                  </span>
                  {item.title}
                </h1>
              </Link>
            </div>
          ))}
        </div>{" "}
      </motion.div>
    </div>
  );
};

export default MenuItem;
