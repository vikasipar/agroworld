import React from "react";
// import Weather from "./Weather";
import { Button } from "../ui/button";

interface SidebarProps {
  sidebar: boolean;
  pathname: string;
  user: any;
  userData: any;
  handleLogout: () => void;
  handleSignup: () => void;
  setSidebar: (value: boolean) => void; // Define setSidebar function to accept a boolean
}

const Sidebar: React.FC<SidebarProps> = ({
  sidebar,
  pathname,
  user,
  userData,
  handleLogout,
  handleSignup,
  setSidebar,
}) => {
  // Function to handle closing the sidebar
  const closeSidebar = () => {
    setSidebar(false);
  };

  const handleLogoutHere = () => {
    setSidebar(false);
    handleLogout();
  };

  const handleSignupHere = () => {
    setSidebar(false);
    handleSignup();
  };

  return (
    <div
      className={`flex flex-col justify-center items-center lg:hidden bg-white h-dvh w-full top-14 z-[99999] fixed space-y-9 duration-500 ${
        sidebar ? "left-0" : "-left-[100%]"
      }`}
    >
      <div className="w-full h-[90%] my-auto">
        <ul className="w-full flex flex-col justify-between items-center text-lg space-y-9 mt-20">
          <li
            className={`${
              pathname === "/" ? "border-b-2 border-green-400" : ""
            }`}
          >
            <a href="/" className="w-fit" onClick={closeSidebar}>
              Home
            </a>
          </li>
          <li
            className={`${
              pathname === "/equipments" ? "border-b-2 border-green-400" : ""
            }`}
          >
            <a href="/equipments" className="w-fit" onClick={closeSidebar}>
              Equipments
            </a>
          </li>
          <li
            className={`${
              pathname === "/articles" ? "border-b-2 border-green-400" : ""
            }`}
          >
            <a href="/articles" className="w-fit" onClick={closeSidebar}>
              Articles
            </a>
          </li>
          {user && (
            <>
              {userData?.role === "user" ? (
                <li
                  className={`${
                    pathname === "/profile" ? "border-b-2 border-green-400" : ""
                  }`}
                >
                  <a href="/profile" className="w-fit" onClick={closeSidebar}>
                    Profile
                  </a>
                </li>
              ) : (
                <li
                  className={`${
                    pathname === "/dashboard"
                      ? "border-b-2 border-green-400"
                      : ""
                  }`}
                >
                  <a href="/dashboard" className="w-fit" onClick={closeSidebar}>
                    Dashboard
                  </a>
                </li>
              )}
            </>
          )}
          <li>
            {user ? (
              <Button onClick={handleLogoutHere} variant={"primary"}>
                Logout
              </Button>
            ) : (
              <Button onClick={handleSignupHere} variant={"primary"}>
                Login
              </Button>
            )}
          </li>
        </ul>
        {/* <div className="mt-20">
          <Weather />
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
