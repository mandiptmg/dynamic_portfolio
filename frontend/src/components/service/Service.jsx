import { useLocation } from "react-router-dom";
import Marquee from "react-fast-marquee";
import { useGlobalContext } from "../../context/Context";
import * as FaIcons from "react-icons/fa"; // FontAwesome
import * as AiIcons from "react-icons/ai"; // AntDesign
import * as BiIcons from "react-icons/bi"; // BoxIcons
import * as MdIcons from "react-icons/md"; // Material Design
import * as IoIcons from "react-icons/io"; // IonIcons
import * as TbIcons from "react-icons/tb"; // Tabler Icons
import * as SiIcons from "react-icons/si"; // Simple Icons
import Loading from "../loading/Loading";

const Service = () => {
  const { skillData } = useGlobalContext();
  const pathname = useLocation();

  if (!skillData) {
    return <Loading />;
  }

  // Split portfolio items into two rows
  const firstRow = skillData.slice(0, skillData.length / 2);
  const secondRow = skillData.slice(skillData.length / 2);

  // Function to render icons dynamically
  const renderIcon = (iconName) => {
    const libraries = {
      fa: FaIcons,
      ai: AiIcons,
      bi: BiIcons,
      md: MdIcons,
      io: IoIcons,
      tb: TbIcons,
      si: SiIcons,
    };
    
   // Find the library that contains the icon
   for (const lib of Object.values(libraries)) {
    if (iconName in lib) {
      const IconComponent = lib[iconName];
      return IconComponent ? <IconComponent /> : null;
    }
  }
  return null; // Return null if the icon is not found
};

  return (
    <div className="py-20 w-[90vw] mx-auto">
      {/* Section name */}
      <div
        className={`text-center mb-12 ${
          pathname === "/about" ? "hidden" : "none"
        }`}
        data-aos="fade-up"
      >
        <h1 className={` font-bold md:text-2xl text-xl color1 uppercase`}>
          My Services
        </h1>
        <div className="w-16 mx-auto h-1 bg-[#00ADB5] mt-2"></div>
      </div>

      {/* First Marquee (First Row) */}
      <div className="mb-8">
        <Marquee
          pauseOnHover
          speed={50}
          gradient
          gradientColor="dark:#222831 #eee"
          gradientWidth={50}
        >
          {firstRow.map((item) => (
            <div
              key={item.id}
              className="mx-4 p-4 bg-gradient-to-l from-cyan-700 via-cyan-900 to-black border rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <h1 className="text-xl p-2 rounded bg-gray-200 color1 md:text-2xl">
                {renderIcon(item.icon)}
                </h1>
                <h1 className="font-semibold text-lg color1 md:text-xl ">
                  {item.name}
                </h1>
              </div>
              <p className="hidden md:block text-gray-200 dark:text-gray-200 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Second Marquee (Second Row, Reverse Direction) */}
      <div>
        <Marquee
          pauseOnHover
          speed={50}
          gradient
          gradientWidth={50}
          direction="right"
          gradientColor="dark:#222831 #eee"
        >
          {secondRow.map((item) => (
            <div
              data-aos="zoom-in-down"
              data-delay={200 * item.id}
              key={item.id}
              className="mx-4 p-4 bg-gradient-to-l from-cyan-700 via-cyan-900 to-black border rounded-lg shadow-md hover:shadow-lg transition-shadow dark:border-gray-700"
            >
              <div className="flex items-center gap-3">
                <h1 className="text-xl p-2 rounded bg-gray-200 color1 md:text-2xl">
                {renderIcon(item.icon)}
                </h1>
                <h1 className="font-semibold text-lg color1 md:text-xl ">
                  {item.name}
                </h1>
              </div>
              <p className=" hidden md:block text-gray-200 dark:text-gray-200 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default Service;
