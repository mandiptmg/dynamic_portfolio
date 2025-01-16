import { useGlobalContext } from "../../context/Context";
import hero from "../../assets/hero.png";
import bgImage from "../../assets/bgImage.jpg";
import { FaGithub, FaLinkedin } from "react-icons/fa";
const Hero = () => {
  const { dark } = useGlobalContext();
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-no-repeat pt-20  min-h-[90vh] bg-cover bg-blend-overlay dark:bg-black/50"
    >
      <div className={`w-[90vw]  mx-auto `}>
        <div data-aos="fade-up" className="grid  md:grid-cols-2">
          <div className="grid place-items-center">
            <div className="">
              <h5 className="text-base md:text-lg lg:text-xl dark:text-white color font-normal">
                Hi! I am Mandip, a
              </h5>
              <p className="text-3xl mt-2 capitalize font-bold color1 md:text-3xl lg:text-5xl">
                Full stack developer
              </p>
              <p className="text-sm my-6 dark:text-gray-200 text-gray-600">
                I’m a passionate Full Stack Developer with 1+ years of
                experience crafting visually stunning and user-friendly
                websites. I specialize in modern web technologies to build
                seamless interfaces and robust backends, ensuring both
                aesthetics and performance.
              </p>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => window.open("https://github.com/mandiptmg")}
                  className="px-5 py-2 font-medium bg-[#00ADB5] text-[#EEEEEE] w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] flex items-center gap-1"
                >
                  <FaGithub className="text-xl sm:text-2xl " />{" "}
                  <span className="text-base sm:text-lg font-semibold">
                    Github
                  </span>
                </button>
                <button
                  onClick={() =>
                    window.open("https://www.linkedin.com/in/mandip-tamang/")
                  }
                  className="px-5 py-2 font-medium bg-[#00ADB5] text-[#EEEEEE] w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] flex items-center gap-1"
                >
                  <FaLinkedin className="text-xl sm:text-2xl " />{" "}
                  <span className="text-base md:text-lg font-semibold">
                    Linkedin
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className=" w-full grid mx-auto place-items-center h-full">
            <div data-aos="fade-left" className="relative md:h-[70%]">
              <img
                src={hero}
                alt="logo"
                className={`${
                  dark ? "grayscale" : "none"
                } w-full h-full    object-contain `}
              />

              <div
                className="bg-[#00ADB5]/20 -z-10 w-full h-60 absolute bottom-0 left-0"
                style={{
                  clipPath: "polygon(1% 46%, 100% 8%, 100% 100%, 0% 100%)",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
