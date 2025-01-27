import { Link } from "react-router-dom";
import About from "../components/about/About";
import Experience from "../components/about/Experience";
import Service from "../components/service/Service";
import { useGlobalContext } from "../context/Context";
import Loading from "../components/loading/Loading";
const AboutPage = () => {
  const { aboutData, siteSettingData } = useGlobalContext();

  if (!aboutData) {
    return <Loading />;
  }
  const {
    title,
    subSkillTitle,
    projectInquiry,
    inquiryDescription,
    secondImage,
  } = aboutData;

  return (
    <div className="overflow-x-hidden">
      <div
        className={`bg-cover bg-center grid place-items-center text-center`}
        style={{
          backgroundImage: `url(${
            siteSettingData?.aboutCover ||
            "https://c0.wallpaperflare.com/preview/323/1002/408/man-male-wall-hide.jpg"
          })`,
        }}
      >
        <h1 className="text-5xl py-20 w-full h-full bg-black/50 font-semibold uppercase text-white">
          {title}
        </h1>
      </div>
      <div className="w-[90vw] mx-auto py-20">
        <About />
        <div className="py-20">
          <Experience />
        </div>
        <div>
          <h1
            data-aos="fade-right"
            className="text-3xl md:text-6xl font-medium"
          >
            {subSkillTitle}
          </h1>
          <Service />
        </div>
        <div className="flex items-center flex-col-reverse md:flex-row gap-10 md:gap-16">
          <div className="space-y-4">
            <h1 data-aos="fade-up" className="text-3xl md:text-6xl font-medium">
              {projectInquiry}
            </h1>
            <p data-aos="fade-up" className=" text-lg md:text-xl">
              {inquiryDescription}
            </p>

            <Link to="/contact">
              <button
                data-aos="fade-up"
                className="group bg-black px-3 py-2 my-3 inline-flex items-start justify-start rounded-md cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#00ADB5] before:to-[#00ADB5]/70 before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-md hover:before:left-0 text-[#fff] dark:bg-[#474F7A]  flex-col font-semibold text-base"
              >
                Got a new project?
                <span className="text-xs font-thin  font-[Playfair Display]">
                  contact me for a brief
                </span>
              </button>
            </Link>
          </div>
          <div data-aos="fade-left" className="max-w-2xl mx-auto">
            <img
              src={secondImage}
              alt="about"
              width={400}
              height={400}
              className="w-full h-full rounded-full aspect-square object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
