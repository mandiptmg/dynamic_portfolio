import { Link, useLocation } from "react-router-dom";
import { FaDownload } from "react-icons/fa";
import { useGlobalContext } from "../../context/Context";
import Loading from "../loading/Loading";
const About = () => {
  const { aboutData } = useGlobalContext();
  const pathname = useLocation();
  if (!aboutData) {
    return <Loading />;
  }

  const { title, description, resume, firstImage } = aboutData;

  return (
    <div className="py-20 w-[90vw]  mx-auto">
      <div className="md:grid grid-cols-2 flex gap-8 md:gap-0 flex-col md:flex-row justify-between items-center">
        <div className="grid place-items-center">
          <div className="relative">
            <div
              data-aos="fade-right"
              className="w-[50%] -z-10 absolute left-0 -bottom-6 h-[115%] bg-[#00ADB5]/50"
            ></div>
            <img
              data-aos="fade-right"
              data-delay={1}
              src={firstImage}
              width={500}
              height={500}
              className="md:w-[70%] h-full object-contain aspect-square"
              alt="about"
            />
          </div>
        </div>
        <div data-aos="fade-up" className="space-y-3">
          <div>
            <h1 className="font-bold md:text-2xl text-xl color1 uppercase">
              {title}
            </h1>
            <div className="w-16 h-1 bg-[#00ADB5]"></div>
          </div>

          <div className="dark:text-gray-200 text-sm md:text-base text-gray-500">
            <p dangerouslySetInnerHTML={{ __html: description }}></p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={resume} // Path to your file in public directory
              download="resume.pdf" // Name of the file after downloading
              className="px-5 py-2 font-medium bg-[#00ADB5] text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] flex items-center gap-1"
              aria-label="Download PDF"
            >
              <FaDownload className="text-xl sm:text-2xl" />
              <span className="text-base md:text-lg font-semibold">Resume</span>
            </a>

            <button className={pathname === "/about" ? "hidden" : "none"}>
              <Link
                to="/about"
                className="px-5 py-2 font-medium bg-[#00ADB5] text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] flex items-center gap-1"
              >
                <span className="text-base md:text-lg font-semibold">
                  Read More
                </span>
              </Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
