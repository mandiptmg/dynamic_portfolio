import { useLocation } from "react-router-dom";
import { portfolioItems } from "../../data/data";
import Marquee from "react-fast-marquee";

// Split portfolio items into two rows
const firstRow = portfolioItems.slice(0, portfolioItems.length / 2);
const secondRow = portfolioItems.slice(portfolioItems.length / 2);

const Service = () => {
  const pathname = useLocation();
  return (
    <div className="py-20 w-[90vw] mx-auto">
      {/* Section Title */}
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
                  {item.icon && <item.icon />}
                </h1>
                <h1 className="font-semibold text-lg color1 md:text-xl ">
                  {item.title}
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
                  {item.icon && <item.icon />}
                </h1>
                <h1 className="font-semibold text-lg color1 md:text-xl ">
                  {item.title}
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
