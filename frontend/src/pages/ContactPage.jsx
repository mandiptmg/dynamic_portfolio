import ContactForm from "../components/contactForm/ContactForm";
import { useGlobalContext } from "../context/Context";
import * as Icons from "react-icons/fa";
import Loading from "../components/loading/Loading";
const ContactPage = () => {
  const { contactData } = useGlobalContext();

  // Function to render icons dynamically
  const renderIcon = (iconName) => {
    const IconComponent = Icons[iconName]; // Get the icon component from react-icons/fa
    return IconComponent ? <IconComponent /> : null; // Render if it exists
  };

  if (!contactData) {
    return <Loading />;
  }

  const { contactImage, name, position, description, subTitle, socialData } =
  contactData;


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
                src={contactImage}
                alt="contact"
                width={400}
                height={400}
                className="w-full aspect-[4/2] mx-auto rounded-md object-cover h-full "
              />
              <div data-aos="zoom-in-down" className="text-left space-y-3 ">
                <h1 className="text-lg tracking-widest md:text-xl dark:text-white color font-bold">
                  {name}
                </h1>
                <h1 className="font-medium text-gray-500 dark:text-gray-200">
                  {position}
                </h1>
                <p
                  className="text-sm text-gray-500 dark:text-gray-200"
                  dangerouslySetInnerHTML={{ __html: description }}
                ></p>
                <h1 className="uppercase color text-base font-light dark:text-white">
                  {subTitle}
                </h1>
                <div className="flex gap-2 w-full items-center">
                  {socialData.map((icon) => (
                    <div data-delay={200 * icon.id} key={icon.id}>
                      <h1
                        title={icon.name}
                        onClick={() => window.open(`${icon.link}`)}
                        className="text-xl cursor-pointer  color1 p-2 bg-white rounded-full"
                      >
                        {renderIcon(icon.icon)}
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
