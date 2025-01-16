
import logoWhite from "../../assets/logo-white.png";
import { headerData, iconData } from "../../data/data";
import { FaArrowUp } from "react-icons/fa";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  useEffect(() => {
    const handleScroll = () => {
      const lookElement = document.querySelector(".look");
      if (!lookElement) return;

      if (window.scrollY === 0) {
        lookElement.classList.add("hidden");
      } else {
        lookElement.classList.remove("hidden");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });
  return (
    <div className="pt-4 bg-black/90  w-full">
      <div className="grid items-center  grid-cols-12">
        <div className="col-span-4 grid place-items-center">
          <Link to="/">
            {" "}
            <img
              src={logoWhite}
              width={200}
              height={200}
              className="aspect-square inline-flex object-contain"
              alt="log"
            />
          </Link>
        </div>
        <div className="text-center grid md:place-items-center place-items-start col-span-8 text-gray-400">
          <div className="space-y-4">
            <div className="flex justify-center items-center gap-4">
              {iconData.map((icon) => (
                <div key={icon.id}>
                  <Link to={icon.link}>
                    <h1
                      title={icon.title}
                      className="text-sm sm:text-2xl rounded-full text-gray-600 hover:scale-[1.1] duration-700 bg-gray-100 p-2"
                    >
                      {icon.icon && <icon.icon />}
                    </h1>
                  </Link>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-4">
              {headerData.map((item) => (
                <div key={item.id}>
                  <Link to={item.link}>
                    <h1 className="capitalize text-sm sm:text-base cursor-pointer font-medium">
                      {item.title}
                    </h1>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-black text-center py-5">
        <p className="text-white text-xs sm:text-sm">
          Copyright &copy;2024,Design by{" "}
          <span className="font-thin">MANDIP TAMANG</span>
        </p>
      </div>
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="cursor-pointer look  bg-gray-800  px-3 py-2 rounded-md text-white tracking-wider shadow-xl animate-bounce text-sm md:text-xl fixed bottom-5 duration-700 hover:animate-none hover:scale-[1.1] right-2"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default Footer;
