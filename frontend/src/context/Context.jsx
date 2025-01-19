import { createContext, useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { axiosInstance } from "../Api/Axios";

const AppContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [scroll, setScroll] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [heroData, setHeroData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [skillData, setSkillData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [headerData, setHeaderData] = useState([]);
  const [socialData, setSocialData] = useState([]);
  const [contactData, setContactData] = useState(null);



  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const [
          heroResult,
          skillResult,
          aboutResult,
          projectResult,
          headerResult,
          socialResult,
          contactResult
        ] = await Promise.allSettled([
          axiosInstance.get("/hero"),
          axiosInstance.get("/skills"),
          axiosInstance.get("/about"),
          axiosInstance.get("/projects"),
          axiosInstance.get("/headers"),
          axiosInstance.get("/social-data"),
          axiosInstance.get("/contact-details"),

        ]);

        if (socialResult.value.data.code === 200) {
          const { data: social } = socialResult.value.data;
          setSocialData(social);
        } else {
          setSocialData(null);
          console.error("social media fetch error:", socialResult.reason);
        }


        if (headerResult.value.data.code === 200) {
          const { data: header } = headerResult.value.data;
          setHeaderData(header);
        } else {
          setHeaderData(null);
          console.error("Header fetch error:", headerResult.reason);
        }

        if (heroResult.value.data.code === 200) {
          const { data: hero } = heroResult.value.data;
          setHeroData(hero);
        } else {
          setHeroData(null);
          console.error("Hero fetch error:", heroResult.reason);
        }

        if (skillResult.value.data.code === 200) {
          const { data: skill } = skillResult.value.data;
          setSkillData(skill);
        } else {
          setSkillData([]);
          console.error("Skills fetch error:", skillResult.reason);
        }

        if (aboutResult.value.data.code === 200) {
          const { data: about } = aboutResult.value.data;
          setAboutData(about);
        } else {
          setAboutData(null);
          console.error("About fetch error:", aboutResult.reason);
        }

        if (projectResult.value.data.code === 200) {
          const { data: project } = projectResult.value.data;
          setProjectData(project);
        } else {
          setProjectData(null);
          console.error("Project fetch error:", projectResult.reason);
        }

        if (contactResult.value.data.code === 200) {
          const { data: contact } = contactResult.value.data;
          setContactData(contact);
        } else {
          setContactData(null);
          console.error("Contact fetch error:", contactResult.reason);
        }


      } catch (error) {
        console.error("Unexpected error:", error);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({
      // Global settings:
      offset: 200, // offset (in px) from the original trigger point
      delay: 100, // values from 0 to 3000, with step 50ms
      duration: 1000, // values from 0 to 3000, with step 50ms
      easing: "ease", // default easing for AOS animations
    });

    const handlerDark = () => {
      const storedValue = localStorage.getItem("dark-mode");
      if (storedValue === "true") {
        document.documentElement.classList.add("dark");
        setDark(true);
      } else {
        setDark(false);
      }
    };

    handlerDark();

    const handlerStickey = () => {
      if (window.scrollY > 50) {
        setScroll("bg-gray-100 dark:bg-[#222831] shadow-xl");
      } else {
        setScroll("");
      }
    };
    handlerStickey();

    const handlerWidth = () => {
      if (window.innerWidth > 768) {
        setMenu(false);
      }
    };

    handlerWidth();

    window.addEventListener("scroll", handlerStickey);
    window.addEventListener("resize", handlerWidth);

    return () => {
      window.removeEventListener("resize", handlerWidth);
      window.removeEventListener("scroll", handlerStickey);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        menu,
        setMenu,
        dark,
        setDark,
        scroll,
        setScroll,
        loading,
        heroData,
        headerData,
        skillData,
        projectData,
        aboutData,
        socialData,
        contactData,
        error,

        currentPage,
        setCurrentPage,
        itemsPerPage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
};
