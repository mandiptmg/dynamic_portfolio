import { useGlobalContext } from "../../context/Context";
import * as Icons from "react-icons/fa";
import Loading from "../loading/Loading";
const Hero = () => {
  const { dark, heroData, socialData } = useGlobalContext();

  if (!heroData) {
    return <Loading />;
  }

  const { name, position, image, bgImage, description } = heroData;

  const filteredSocials = socialData.filter((social) =>
    ["GitHub", "LinkedIn"].includes(social.name)
  );

   // Function to render icons dynamically
    const renderIcon = (iconName) => {
      const IconComponent = Icons[iconName]; // Get the icon component from react-icons/fa
      return IconComponent ? <IconComponent /> : null; // Render if it exists
    };

  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="bg-no-repeat pt-20  min-h-[89vh] bg-cover bg-blend-overlay    dark:bg-black/50"
    >
      <div className={`w-[90vw]  mx-auto `}>
        <div data-aos="fade-up" className="grid  md:grid-cols-2">
          <div className="grid place-items-center">
            <div className="">
              <h5 className="text-base md:text-lg lg:text-xl dark:text-white color font-normal">
                {name}
              </h5>
              <p className="text-3xl mt-2 capitalize font-bold color1 md:text-3xl lg:text-5xl">
                {position}
              </p>
              <div
                className="text-sm my-6 dark:text-gray-200 text-gray-600"
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
              <div className="flex items-center gap-4">
                {filteredSocials.map((social) => {
                  return (
                    <button
                      key={social.id}
                      onClick={() => window.open(social.link)}
                      className="px-5 py-2 font-medium bg-[#00ADB5] text-[#EEEEEE] w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] flex items-center gap-1"
                    >
                      <span className="text-xl sm:text-2xl">
                        {renderIcon(social.icon)}
                      </span>
                      <span className="text-base sm:text-lg font-semibold">
                        {social.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" w-full grid mx-auto place-items-center h-full">
            <div data-aos="fade-left" className="relative md:h-[70%]">
              <img
                src={image}
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
