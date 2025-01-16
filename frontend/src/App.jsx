import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
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
import HeroSection from "./components/DashboadLayout/HeroSection/HeroSection";
// import UserTable from "./components/DashboadLayout/Table/UserTable";

function App() {
  const token = "ffdfbbdfdbfbfdb";

  const ProtectedRoute = () => {
    return token ? <Outlet /> : <Navigate to="/login" replace />;
  };

  // const PublicRoute = () => {
  //   return token ? <Navigate to="/dashboard" replace /> : <Outlet />;
  // };

  const DashboardLayout = () => {
    const { menu } = useGlobalContext();

    return (
      <div className="flex items-start">
        <div
          className={
            menu
              ? "hidden  duration-300  transition-all transform ease-in-out -translate-x-36"
              : ""
          }
        >
          <Sidebar />
        </div>
        <div className="w-full">
          <Navbar />
          <div className="p-10">
            <Outlet /> {/* Render child routes here */}
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

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="hero" element ={<HeroSection/>} />
            {/* <Route path="users" element={<UserTable />} /> */}
            {/* <Route path="roles" element={<RoleTable />} /> */}
          </Route>
          <Route path="/dashboard/*" element={<DashboardNotFound />} />

        </Route>
      </Routes>
    </>
  );
}

export default App;
