import { forwardRef, useState } from "react";
import { Link } from "react-router";
import {
  Menu as MenuIcon,
  X,
  Search as SearchIcon,
  User as UserIcon,
} from "lucide-react";
import { useUser, SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button"; // shadcn button

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  return (
    <header className="flex justify-center w-full  top-0 z-50 px-4 bg-white">
      <div className="shadow-lg w-full max-w-[1600px] rounded-b-2xl">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left - Logo */}
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-bold">
                <span>Hotelza</span>
                <span className="animate-pulse text-blue-800">AI</span>
              </Link>
            </div>

            {/* Center - Navigation Links */}
            <nav className="hidden md:flex items-center justify-center flex-1">
              <ul className="flex space-x-8">
                <li>
                  <Link
                    to="/"
                    className="font-medium text-gray-700 hover:text-black transition-colors relative group"
                  >
                    Home
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                  </Link>
                </li>
                {user?.publicMetadata?.role === "admin" && (
                  <li>
                    <Link
                      to="/admin-dashboard"
                      className="font-medium text-gray-700 hover:text-black transition-colors relative group"
                    >
                      Admin Dashboard
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-0 transition-transform group-hover:scale-x-100"></span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>

            {/* Right - Auth Buttons & Icons */}
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <SearchIcon size={20} className="text-gray-600" />
              </button>

              <SignedOut>
                <Link to="/sign-in">
                  <Button
                    variant="outline"
                    className="hidden md:flex rounded-full px-4"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button
                    variant="outline"
                    className="hidden md:flex rounded-full px-4"
                  >
                    Signup
                  </Button>
                </Link>
              </SignedOut>

              <SignedIn>
                <div className="hidden md:flex items-center gap-2">
                  <UserButton afterSignOutUrl="/" />
                  <Link to="/account">
                    <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-4 flex items-center gap-2">
                      <UserIcon size={18} />
                      <span>Account</span>
                    </Button>
                  </Link>
                </div>
              </SignedIn>

              {/* Mobile Menu Icon */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X size={24} />
                ) : (
                  <MenuIcon size={24} className="text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden bg-white border-t p-4 space-y-4">
            <Link
              to="/"
              className="block text-gray-700 font-medium hover:text-black"
            >
              Home
            </Link>
            {user?.publicMetadata?.role === "admin" && (
              <Link
                to="/admin-dashboard"
                className="block text-gray-700 font-medium hover:text-black"
              >
                Admin
              </Link>
            )}
            <SignedOut>
              <Link to="/sign-in">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button variant="outline" className="w-full">
                  Signup
                </Button>
              </Link>
            </SignedOut>
            <SignedIn>
              <div className="flex items-center gap-2">
                <UserButton />
                <Link to="/account">
                  <Button variant="default" className="w-full">
                    My Account
                  </Button>
                </Link>
              </div>
            </SignedIn>
          </div>
        )}
      </div>
    </header>
  );
};
