import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Header from "./components/header/Header";
import Footer from "./components/header/Footer";
import AboutPage from "./pages/AboutPage";
import Project from "./pages/ProjectPage";
import ContactPage from "./pages/ContactPage";
import { DashboardNotFound, PublicNotFound } from "./components/404/NotFound";
import Sidebar from "./components/DashboadLayout/Bar/Sidebar";
import Navbar from "./components/DashboadLayout/Bar/Navbar";
import { useGlobalContext } from "./context/Context";
import Dashboard from "./components/DashboadLayout/Dashboard/Dashboard";
import HeroSection from "./components/DashboadLayout/Section/HeroSection";
import AboutSection from "./components/DashboadLayout/Section/AboutSection";
import SkillTable from "./components/DashboadLayout/Table/SkillTable";
import PortfolioTable from "./components/DashboadLayout/Table/PortfolioTable";
import HeaderTable from "./components/DashboadLayout/Table/HeaderTable";
import SocialTable from "./components/DashboadLayout/Table/SocialTable";
import ContactSection from "./components/DashboadLayout/Contact/ContactSection";
import SettingSection from "./components/DashboadLayout/Section/SettingSection";
import { useEffect } from "react";
import Login from "./Auth/Login";
import ForgotPassword from "./Auth/Forget-Password/ForgetPassword";
import UserTable from "./components/DashboadLayout/Table/UserTable";
import RoleTable from "./components/DashboadLayout/Table/RoleTable";
import EditRole from "./pages/role/EditRole";
import CreateRole from "./pages/role/CreateRole";

function App() {
  const token = localStorage.getItem("token");

  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  const ProtectedRoute = () => {
    return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
  };

  const PublicRoute = () => {
    return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
  };

  const DashboardLayout = () => {
    const { menu } = useGlobalContext();

    return (
      <div className="flex items-start">
        <div
          className={
            menu
              ? "hidden   duration-300  transition-all transform ease-in-out -translate-x-36"
              : "sticky top-0"
          }
        >
          <Sidebar />
        </div>
        <div className="w-full">
          <Navbar />
          <div className="p-10">
            <Outlet />
          </div>
        </div>
      </div>
    );
  };

  const MainLayouts = () => {
    return (
      <>
        <Header />
        <div>
          <Outlet />
        </div>
        <Footer />
      </>
    );
  };

  return (
    <>
      <Toaster />
      <Routes>
        {/* public and main layout  */}
        <Route element={<MainLayouts />}>
          <Route path="/" element={<MainLayout />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/portfolio" element={<Project />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/*" element={<PublicNotFound />} />
        </Route>

        <Route element={<PublicRoute />}>
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/forgot-password" element={<ForgotPassword />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="hero" element={<HeroSection />} />
            <Route path="about" element={<AboutSection />} />
            <Route path="skill" element={<SkillTable />} />
            <Route path="portfolio" element={<PortfolioTable />} />
            <Route path="header" element={<HeaderTable />} />
            <Route path="social-media" element={<SocialTable />} />
            <Route path="contact" element={<ContactSection />} />
            <Route path="site-setting" element={<SettingSection />} />

            <Route path="users" element={<UserTable />} />
            <Route path="roles" element={<RoleTable />} />
            <Route path="roles/create-role" element={<CreateRole />} />
            <Route path="roles/edit/:id" element={<EditRole />} />
          </Route>
          <Route path="/dashboard/*" element={<DashboardNotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
