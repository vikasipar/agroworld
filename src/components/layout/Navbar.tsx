"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase.config";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { setCookie, getCookie, deleteCookie } from "@/hooks/useCookies";
import Weather from "./Weather";
import { FaCircleUser } from "react-icons/fa6";
import { IUser } from "@/types/modelTypes";
import { PiShoppingCartSimpleFill } from "react-icons/pi";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname to get the current route
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    if (typeof window !== "undefined" && user?.email) {
      setCookie("userEmail", user.email, 7); // Store email in cookie for 7 days
    }

    const fetchUserData = async () => {
      const userEmail = getCookie("userEmail");
      if (userEmail) {
        try {
          const res = await fetch(`/api/users/${userEmail}`);
          const data = await res.json();
          if (res.ok) {
            setUserData(data.user);
            setCookie("userName", data.user.name, 7);
            setCookie("userRole", data.user.role, 7);
            setCookie("userId", data.user._id, 7);
          } else {
            console.error("Error fetching user:", data.error);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    fetchUserData();
  }, [user]);

  const handleSignup = () => {
    router.push("/auth/login");
  };

  const handleLogout = () => {
    signOut(auth);
    deleteCookie("userEmail");
    deleteCookie("userName");
    deleteCookie("userRole");
    deleteCookie("userId");
  };

  return (
    <div className="flex items-start justify-between py-4 px-9">
      <div>
        <Weather />
      </div>
      <div className="w-1/2">
        <ul className="w-full flex justify-between items-center text-lg">
          <li
            className={`${
              pathname === "/" ? "border-b-2 border-green-600" : ""
            }`}
          >
            <a href="/" className="w-fit">
              Home
            </a>
          </li>
          <li
            className={`${
              pathname === "/equipments" ? "border-b-2 border-green-600" : ""
            }`}
          >
            <a href="/equipments" className="w-fit">
              Equipments
            </a>
          </li>
          <li
            className={`${
              pathname === "/articles" ? "border-b-2 border-green-600" : ""
            }`}
          >
            <a href="/articles" className="w-fit">
              Articles
            </a>
          </li>
          {user && (
            <li>
              {userData?.role === "user" ? (
                <a
                  href="/profile"
                  className={`${
                    pathname === "/profile" ? "border-b-2 border-green-600" : ""
                  } w-fit flex items-center gap-x-2`}
                >
                  Profile
                </a>
              ) : (
                <a
                  href="/dashboard"
                  className={`${
                    pathname === "/dashboard"
                      ? "border-b-2 border-green-600"
                      : ""
                  } w-fit flex items-center gap-x-2`}
                >
                  Dashboard
                </a>
              )}
            </li>
          )}
          {/* {user && (
            <li className="bg-green-600 text-white p-2 rounded-full">
              <a href="/cart" className="w-fit">
                <PiShoppingCartSimpleFill className="text-xl" />
              </a>
            </li>
          )} */}
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
  );
};

export default Navbar;
