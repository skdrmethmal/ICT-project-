import { Navbar } from "@/components/ui/Navbar";
import { Outlet } from "react-router";
// import { DialogModel } from "@/components/ui/DialogModel";
import { Footer } from "@/components/ui/Footer";
const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />

      {/* <DialogModel /> */}
    </>
  );
};

export default MainLayout;
