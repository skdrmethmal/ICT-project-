import { Navbar } from "@/components/ui/Navbar";
import { Outlet } from "react-router";
import { Footer } from "@/components/ui/Footer";
import { useEffect } from "react";
import { useLocation } from "react-router";
const MainLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default MainLayout;
