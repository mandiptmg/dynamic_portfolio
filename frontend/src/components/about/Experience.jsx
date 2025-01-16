import { experiences } from "../../data/data";
const Experience = () => {
  return (
    <section className="bg-gray-900 text-white py-12">
      <div className=" mx-auto px-6">
        <div data-aos="fade-right">
          <h1 className="font-bold md:text-2xl text-xl color1 uppercase">
            Experience
          </h1>
          <div className="w-16 h-1 bg-[#00ADB5]"></div>
        </div>
        {experiences.map((exp, index) => (
          <div
            data-aos="fade-up"
            key={index}
            className="my-8 border-b border-gray-700 pb-4"
          >
            <h3 className="md:text-2xl font-semibold">{exp.role}</h3>
            <p className="md:text-lg text-teal-400">{exp.company}</p>
            <p className="md:text-sm text-xs  text-gray-400 mb-2">{exp.period}</p>
            <ul className="list-disc list-inside text-gray-300">
              {exp.responsibilities.map((task, i) => (
                <li className="md:text-base text-sm" key={i}>{task}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
