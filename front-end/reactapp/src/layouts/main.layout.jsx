import { Navbar } from "@/components/ui/Navbar";
import { Outlet } from "react-router";
// import { DialogModel } from "@/components/ui/DialogModel";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />

       {/* <DialogModel /> */}
    </>
  );
};

export default MainLayout;
