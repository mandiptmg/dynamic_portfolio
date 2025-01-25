import { Link } from "react-router-dom";
import { FaArrowUp } from "react-icons/fa";
import { useGlobalContext } from "../../context/Context";

const Project = () => {
  const { projectData } = useGlobalContext();
  return (
    <div className="py-20 w-[90vw] mx-auto">
      <div className="text-center">
        <div data-aos="fade-up" className="grid place-items-center">
          <div>
            <h1 className="font-bold capitalize md:text-2xl text-xl color1">
              my Recent project
            </h1>
            <div className="w-16 mx-auto h-1 bg-[#00ADB5]"></div>
          </div>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-3 md:grid-cols-2 ">
          {projectData
            .slice(-6)
            .reverse()
            .map((project) => (
              <div
                key={project.id}
                data-aos="zoom-in-down"
                data-delay={200 * project.id}
                onClick={() => window.open(`${project.link}`)}
                className="w-full group hover:scale-[1.04] duration-700 relative cursor-pointer "
              >
                <div className="h-[300px] shadow1 rounded-t-md overflow-hidden w-full">
                  <img
                    src={project.image}
                    alt={project.name}
                    width={470}
                    height={40}
                    className="w-full h-[2500px]  translate-y-0  group-hover:-translate-y-[77.5%] transition-all hover:ease-in duration-[4s] cursor-pointer"
                  />
                </div>
                <h1 className="group-hover:text-white border border-[#00ADB5]/70 shadow-2xl  md:text-xl text-sm text-left capitalize text-black group-hover:bg-[#00ADB5]/70 rounded-lg dark:text-white mt-4 items-center flex justify-between   w-full py-2 px-4 duration-700">
                  {project.name}
                  <FaArrowUp className="p-1 rounded-full rotate-45 text-2xl bg-[#00ADB5]/70 text-gray-200 group-hover:bg-white font-thin group-hover:text-black" />
                </h1>
              </div>
            ))}
        </div>
        <Link to="/portfolio">
          <button
            data-aos="fade-up"
            className="inline-flex mt-10 uppercase font-semibold bg-[#00ADB5] text-sm shadow-xl hover:scale-[1.1] text-white  duration-700 md:text-base items-center gap-2 px-4 py-2 rounded"
          >
            see more{" "}
            <span
              className="loader border-t-2  rounded-full border-yellow-500 bg-yellow-300 animate-spin
aspect-square w-6 flex justify-center items-center text-yellow-700"
            >
              😎
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Project;
