import { useUser } from "@clerk/clerk-react";
import { User } from "lucide-react";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = () => {
  const { isSignedIn, user } = useUser();
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  return (
    <main>
      <Outlet />
    </main>
  );
};

export default ProtectedLayout;
