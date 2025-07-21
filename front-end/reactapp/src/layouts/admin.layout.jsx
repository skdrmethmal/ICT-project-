import { useUser } from "@clerk/clerk-react";
import { Navigate, Outlet } from "react-router";

const AdminLayout = () => {
  const { user } = useUser();
  if (user?.publicMetadata?.role !== "admin") {
    return <Navigate to="/" />;
  }
  return (
    <main>
      <Outlet />
    </main>
  );
};

export default AdminLayout;
