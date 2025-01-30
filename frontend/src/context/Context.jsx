/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {  axiosWithoutAuth, publicAxios } from "../Api/Axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const AppContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {
  // State Management
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(false);
  const [scroll, setScroll] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Data State
  const [heroData, setHeroData] = useState(null);
  const [aboutData, setAboutData] = useState(null);
  const [skillData, setSkillData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  // const [headerData, setHeaderData] = useState([]);
  const [socialData, setSocialData] = useState([]);
  const [contactData, setContactData] = useState(null);
  const [siteSettingData, setSiteSettingData] = useState(null);
  const [userData, setUserData] = useState([]);
  const [roleData,setRoleData] = useState([]);
  const [permissionData,setPermissionData] = useState([]);



  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;


  // Fetch Data on Mount
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const endpoints = [
          { url: "/hero", setter: setHeroData },
          { url: "/about", setter: setAboutData },
          { url: "/skills", setter: setSkillData },
          { url: "/projects", setter: setProjectData },
          { url: "/social-data", setter: setSocialData },
          { url: "/contact-details", setter: setContactData },
          { url: "/site-settings", setter: setSiteSettingData },
          // { url: "/headers", setter: setHeaderData },
          { url: "/users", setter: setUserData },
          { url: "/roles", setter: setRoleData },
          { url: "/permissions", setter: setPermissionData },


        ];

        const responses = await Promise.allSettled(
          endpoints.map((endpoint) => publicAxios.get(endpoint.url))
        );

        responses.forEach((response, index) => {
          const { value } = response;
          const { setter } = endpoints[index];

          if (value.data.code === 200) {
            setter(value.data.data || null);
          } else {
            setter(null);
          }
        });
      } catch {
        setError("An unexpected error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    AOS.init({
      offset: 200,
      delay: 100,
      duration: 1000,
      easing: "ease",
    });

    // Load and apply dark mode settings
    const initializeDarkMode = () => {
      const isDarkMode = localStorage.getItem("dark-mode") === "true";
      if (isDarkMode) {
        document.documentElement.classList.add("dark");
        setDark(true);
      } else {
        document.documentElement.classList.remove("dark");
        setDark(false);
      }
    };

    // Update scroll styles
    const handleScroll = () => {
      setScroll(
        window.scrollY > 50 ? "bg-gray-100 dark:bg-[#222831] shadow-xl" : ""
      );
    };

    // Close menu on wider screens
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setMenu(false);
      }
    };

    initializeDarkMode();
    handleScroll();
    handleResize();

    // Event listeners
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);


    // login
    const login = async (email, password) => {
      setLoading(true);
      try {
        const response = await axiosWithoutAuth.post("/login", {
          email,
          password,
        });
        const { accessToken, refreshToken, message } = response.data;
  
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refreshToken", refreshToken);
        navigate("/dashboard");
        toast.success(message, { position: "top-center" });
        window.location.reload();
      } catch (error) {
        const errorResponse = error.response?.data?.message;
        toast.error(errorResponse || "Invalid email or password");
      } finally {
        setLoading(false);
      }
    };

      //logout
  const logout = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await axiosWithoutAuth.post("/logout", {
          token: refreshToken,
        });
        const { message } = response.data;

        toast.success(message, {
          position: "top-center",
        });
        localStorage.clear();
        navigate("/auth/login");
      } catch (error) {
        toast.error(
          error.response?.data?.message || "Failed to logout. Please try again."
        );
      }
    }
  };


  
  return (
    <AppContext.Provider
      value={{
        logout,
        login,
        menu,
        setMenu,
        dark,
        setDark,
        scroll,
        loading,
        heroData,
        // headerData,
        skillData,
        projectData,
        aboutData,
        socialData,
        contactData,
        siteSettingData,
        userData,
        roleData,
        permissionData,
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


export const useGlobalContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within an AppProvider");
  }
  return context;
};
