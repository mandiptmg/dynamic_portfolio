import { Toaster } from "react-hot-toast";
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import MainLayout from "./MainLayout";
import Header from "./components/header/Header";
import Footer from "./components/header/Footer";
import AboutPage from "./pages/AboutPage";
import Project from "./pages/ProjectPage";
import ContactPage from "./pages/ContactPage";

function App() {
  return (
    <>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/portfolio" element={<Project />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
