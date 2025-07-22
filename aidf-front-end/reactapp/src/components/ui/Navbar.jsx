import { Button } from "./button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import { useUser } from "@clerk/clerk-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
const Navbar = () => {
  //state of the hamburger menu
  const [isOpen, setIsOpen] = useState(false);
  // const userSlice = useSelector((state) => state.user);
  const { user } = useUser();
  return (
    <>
      <nav className=" flex items-center justify-between bg-black text-white h-[70px] px-8">
        <div className="flex items-center gap-4 ">
          <p className="text-[24px] font-semibold cursor-pointer">Horizone</p>
          <div className="hidden md:flex">
            <Link to="/" className="hover:text-gray-500 px-5">
              Home
            </Link>
            {user?.publicMetadata?.role === "admin" && (
              <Link to="/create-hotel" className="hover:text-gray-500 px-5">
                Create Hotel
              </Link>
            )}
          </div>
        </div>

        {/* desktop menu */}
        <div className="hidden md:flex gap-3 items-center">
          <SignedOut>
            <Link to="/sign-in">
              <Button variant="default">Login</Button>
            </Link>
            <Link to="/sign-up">
              <Button variant="default">Signup</Button>
            </Link>
          </SignedOut>
          <SignedIn>
            <UserButton />
            <Link to="/account">
              <Button variant="default">My Account</Button>
            </Link>
          </SignedIn>

          {/* <div>{userSlice.user.name}</div> */}
        </div>

        {/* hamburger icon */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {isOpen && (
          <div className=" z-100 md:hidden absolute top-[70px] left-0 w-full bg-black backdrop-blur-sm flex flex-col justify-center items-center ">
            <div className="flex flex-col gap-4 p-4 w-full z-index-10">
              <Link
                to="/"
                className="text-white text-center text-[14px] font-semibold hover:text-gray-500"
              >
                Home
              </Link>
              <Link
                to="/create-hotel"
                className="text-white text-center text-[14px] font-semibold hover:text-gray-500"
              >
                Create Hotel
              </Link>
              <SignedOut>
                <Link to="/sign-in">
                  <Button variant="meta_custom">Login</Button>
                </Link>
                <Link to="/sign-up">
                  <Button variant="meta_custom">Sign up</Button>
                </Link>
              </SignedOut>
              <SignedIn>
                <div className="flex flex-row gap-2 justify-center text-white text-center text-[14px] font-semibold hover:text-gray-500">
                  <UserButton />
                  <Link to="/account">
                    <Button variant="default">My Account</Button>
                  </Link>
                </div>
              </SignedIn>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export { Navbar };
