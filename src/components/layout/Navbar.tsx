"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase.config";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import {
  useSetCookie,
  useGetCookie,
  useDeleteCookie,
} from "@/hooks/useCookies";
import Weather from "./Weather";
import { IUser } from "@/types/modelTypes";
import { IoMdNotifications } from "react-icons/io";
import { HiOutlineMenu } from "react-icons/hi";
import { HiOutlineXMark } from "react-icons/hi2";
import Sidebar from "./Sidebar";

declare const window: any;

const Navbar = React.memo(() => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sidebar, setSidebar] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Track if component has mounted

  useEffect(() => {
    // Ensure this code only runs in the client side
    if (isMounted) {
      if (sidebar) {
        window.document.body.style.overflow = "hidden";
      } else {
        window.document.body.style.overflow = "auto";
      }
    }
  }, [sidebar, isMounted]);

  useEffect(() => {
    setIsMounted(true); // Mark that the component has mounted (client-side)
    
    const fetchUserData = async () => {
      const userEmail = useGetCookie("userEmail");
      if (userEmail) {
        try {
          const res = await fetch(`/api/users/${userEmail}`);
          const data = await res.json();
          if (res.ok) {
            setUserData(data.user);
            useSetCookie("userName", data.user.name, 7);
            useSetCookie("userRole", data.user.role, 7);
            useSetCookie("userId", data.user._id, 7);
          } else {
            console.error("Error fetching user:", data.error);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    } else {
      setLoading(false);
    }
  }, [user]);

  const handleSignup = () => {
    router.push("/auth/login");
  };

  const handleLogout = () => {
    signOut(auth);
    useDeleteCookie("userEmail");
    useDeleteCookie("userName");
    useDeleteCookie("userRole");
    useDeleteCookie("userId");
    router.push("/");
  };

  // Prevent mismatch by ensuring rendering happens only after the component is mounted on client
  if (!isMounted) {
    return null; // Render nothing on the server side
  }

  return (
    <>
      <div className="hidden lg:flex items-start justify-between py-4 px-9">
        <div>
          <Weather />
        </div>
        <div className="w-1/2">
          <ul className="w-full flex justify-between items-center text-lg">
            <li
              className={`${
                pathname === "/" ? "border-b-2 border-green-400" : ""
              }`}
            >
              <a href="/" className="w-fit">
                Home
              </a>
            </li>
            <li
              className={`${
                pathname === "/equipments" ? "border-b-2 border-green-400" : ""
              }`}
            >
              <a href="/equipments" className="w-fit">
                Equipments
              </a>
            </li>
            <li
              className={`${
                pathname === "/articles" ? "border-b-2 border-green-400" : ""
              }`}
            >
              <a href="/articles" className="w-fit">
                Articles
              </a>
            </li>
            {loading ? (
              <li>Loading...</li>
            ) : (
              user && (
                <li>
                  {userData?.role === "user" ? (
                    <a href="/profile" className="text-3xl text-green-600 flex">
                      <IoMdNotifications />
                      <span className="h-3 w-3 -ml-3 bg-red-500 rounded-full mt-1"></span>
                    </a>
                  ) : (
                    <a
                      href="/dashboard"
                      className={`${
                        pathname === "/dashboard"
                          ? "border-b-2 border-green-400"
                          : ""
                      } w-fit flex items-center gap-x-2`}
                    >
                      Dashboard
                    </a>
                  )}
                </li>
              )
            )}
            <li>
              {user ? (
                <Button onClick={handleLogout} variant={"primary"}>
                  Logout
                </Button>
              ) : (
                <Button onClick={handleSignup} variant={"primary"}>
                  Login
                </Button>
              )}
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full flex lg:hidden items-center justify-between py-2 px-6 bg-white shadow-md h-12 z-[9999999]">
        <span className="text-xl font-semibold text-green-600">
          <a href="/" className="w-fit" onClick={() => setSidebar(false)}>
            AgroWorld
          </a>
        </span>
        {sidebar ? (
          <HiOutlineXMark
            className="text-2xl"
            onClick={() => setSidebar(false)}
          />
        ) : (
          <HiOutlineMenu
            className="text-2xl"
            onClick={() => setSidebar(true)}
          />
        )}
      </div>
      <Sidebar
        sidebar={sidebar}
        pathname={pathname}
        user={user}
        userData={userData}
        handleLogout={handleLogout}
        handleSignup={handleSignup}
        setSidebar={setSidebar}
      />
    </>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
