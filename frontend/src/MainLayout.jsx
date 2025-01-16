import About from "./components/about/About";
import Contact from "./components/contact/Contact";
import Hero from "./components/hero/Hero";
import Project from "./components/project/Project";
import Service from "./components/service/Service";

const MainLayout = () => {
  return (
    <div>
      <Hero />
      <About />
      <Service />
      <Project />
      <hr className="my-7" />
      <Contact /> 
    
     
    </div>
  );
};

export default MainLayout;
