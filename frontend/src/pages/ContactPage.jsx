"use client";
import { iconData } from "../data/data";
import contact from "../assets/contact.png";
import ContactForm from "../components/contactForm/ContactForm";
const ContactPage = () => {
  return (
    <div>
      <div className="bg-cover bg-center  bg-[url(https://c0.wallpaperflare.com/preview/843/976/970/business-background-illustration-people.jpg)] grid place-items-center text-center ">
        <h1 className="text-5xl w-full h-full bg-black/50 py-20 font-semibold uppercase text-white">
          contact me
        </h1>
      </div>

      <div className="py-20 w-[90vw] mx-auto">
        <div className="text-center">
          <h1
            data-aos="fade-right"
            className="text-3xl md:text-6xl color1 text-left font-medium"
          >
            <span className="color dark:text-white">Lets Get in</span> Touch!
          </h1>{" "}
          <div
            data-aos="fade-right"
            className="mt-20 grid gap-4 md:grid-cols-3"
          >
            <div className="w-full h-full grid place-items-center p-4 rounded bg-[#eee] dark:bg-gray-700">
              <img
                data-aos="zoom-in-down"
                src={contact}
                alt="contact"
                width={400}
                height={400}
                className="w-full aspect-[4/2] mx-auto rounded-md object-cover h-full "
              />
              <div data-aos="zoom-in-down" className="text-left space-y-3 ">
                <h1 className="text-lg tracking-widest md:text-xl dark:text-white color font-bold">
                  {" "}
                  Mandip Tamang
                </h1>
                <h1 className="font-medium text-gray-500 dark:text-gray-200">
                  {" "}
                  Full Stack Developer
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-200">
                  I’m a passionate full stack developer creating immersive
                  digital experiences that merge technical skill with design
                  finesse.
                </p>
                <h1 className="uppercase color text-base font-light dark:text-white">
                  find me in
                </h1>
                <div className="flex gap-2 w-full items-center">
                  {iconData.map((icon) => (
                    <div data-delay={200 * icon.id} key={icon.id}>
                      <h1
                        title={icon.title}
                        onClick={() => window.open(`${icon.link}`)}
                        className="text-xl cursor-pointer  color1 p-2 bg-white rounded-full"
                      >
                        {icon.icon && <icon.icon />}
                      </h1>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              data-aos="zoom-in-down"
              className="w-full col-span-2 p-4 rounded bg-[#eee] dark:bg-gray-700
          "
            >
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
