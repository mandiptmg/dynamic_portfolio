import { Link, useLocation } from "react-router-dom";
import about from "../../assets/about.jpg";
import resume from '../../assets/mandiptamang.pdf'
import { FaDownload } from "react-icons/fa";
const About = () => {
  const pathname = useLocation();
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
              src={about}
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
              about me
            </h1>
            <div className="w-16 h-1 bg-[#00ADB5]"></div>
          </div>

          <div className="space-y-2">
            <p className="dark:text-gray-200 text-sm md:text-base text-gray-500">
              I&apos;m a passionate <strong>Full Stack Developer</strong> with{" "}
              <strong>over 1+ years of experience</strong> crafting
              <strong>responsive and dynamic web applications</strong>. I have a
              strong foundation in <strong>HTML, CSS, and JavaScript</strong>,
              combined with expertise in modern tools like{" "}
              <strong>
                React.js, Next.js, Tailwind CSS, and Redux Toolkit
              </strong>
              to build seamless and engaging user interfaces.
            </p>
            <p className="dark:text-gray-200 text-sm md:text-base text-gray-500">
              On the backend, I’m proficient in{" "}
              <strong>Laravel, Java, Spring Boot, MySQL</strong>, and{" "}
              <strong>MongoDB</strong>, developing{" "}
              <strong>robust backend systems</strong> and{" "}
              <strong>scalable APIs</strong> that power efficient applications.
            </p>
            <p className="dark:text-gray-200 text-sm md:text-base text-gray-500">
              I thrive in <strong>collaborative environments</strong>, blending
              creativity with technical expertise to transform ideas into{" "}
              <strong>functional, visually appealing digital solutions</strong>.
            </p>
            <p className="dark:text-gray-200 text-sm md:text-base text-gray-500">
              <strong>Let’s build something amazing together!</strong>
            </p>
          </div>
          <div className="flex items-center gap-6">
            <a
              href={resume} // Path to your file in public directory
              download="resume.pdf" // Name of the file after downloading
              className="px-5 py-2 font-medium bg-[#00ADB5] text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] flex items-center gap-1"
              aria-label="Download PDF"
            >
              <FaDownload className="text-xl sm:text-2xl" />
              <span className="text-base md:text-lg font-semibold">
                 Resume
              </span>
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
