"use client";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase.config";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { setCookie, getCookie, deleteCookie } from "@/hooks/useCookies";
import Weather from "./Weather";
import { IUser } from "@/types/modelTypes";
import { IoMdNotifications } from "react-icons/io";

const Navbar = React.memo(() => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [userData, setUserData] = useState<IUser | null>(null);
  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(
    getCookie("userRole")
  );

  // Initialize userLoggedIn based on cookie presence
  useEffect(() => {
    const emailFromCookie = getCookie("userEmail");
    if (emailFromCookie) {
      setUserLoggedIn(true); // Set userLoggedIn to true if userEmail cookie is present
    }
  }, []);

  // Fetch user data if user is logged in
  useEffect(() => {
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
            setUserRole(data.user.role); // Set userRole from fetched data
          } else {
            console.error("Error fetching user:", data.error);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  const handleSignup = useCallback(() => {
    router.push("/auth/login");
  }, [router]);

  const handleLogout = useCallback(() => {
    signOut(auth);
    deleteCookie("userEmail");
    deleteCookie("userName");
    deleteCookie("userRole");
    deleteCookie("userId");
    setUserLoggedIn(false); // Reset userLoggedIn after logout
    setUserRole(null); // Reset userRole after logout
    router.push("/"); // Redirect to homepage after logout
  }, [router]);

  // Memoize the Navbar content so it only re-renders when userLoggedIn or userRole changes
  const navbarContent = useMemo(() => {
    if (userLoggedIn) {
      if (userRole === "user") {
        return (
          <div className="flex items-start justify-between py-4 px-9">
            <div>
              <Weather />
            </div>
            <div className="w-1/2">
              <ul className="w-full flex justify-between items-center text-lg">
                <li>
                  <a href="/" className="w-fit">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/equipments" className="w-fit">
                    Equipments
                  </a>
                </li>
                <li>
                  <a href="/articles" className="w-fit">
                    Articles
                  </a>
                </li>
                <li>
                  <a href="/profile" className="text-3xl text-green-600 flex">
                    <IoMdNotifications />
                    <span className="h-3 w-3 -ml-3 bg-red-500 rounded-full mt-1"></span>
                  </a>
                </li>
                <li>
                  <Button onClick={handleLogout} variant={"primary"}>
                    Logout
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        );
      } else if (userRole === "provider") {
        return (
          <div className="flex items-start justify-between py-4 px-9">
            <div>
              <Weather />
            </div>
            <div className="w-1/2">
              <ul className="w-full flex justify-between items-center text-lg">
                <li>
                  <a href="/" className="w-fit">
                    Home
                  </a>
                </li>
                <li>
                  <a href="/equipments" className="w-fit">
                    Equipments
                  </a>
                </li>
                <li>
                  <a href="/articles" className="w-fit">
                    Articles
                  </a>
                </li>
                <li>
                  <a
                    href="/dashboard"
                    className="w-fit flex items-center gap-x-2"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <Button onClick={handleLogout} variant={"primary"}>
                    Logout
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        );
      }
    }

    // If not logged in
    return (
      <div className="flex items-start justify-between py-4 px-9">
        <div>
          <Weather />
        </div>
        <div className="w-1/2">
          <ul className="w-full flex justify-between items-center text-lg">
            <li>
              <a href="/" className="w-fit">
                Home
              </a>
            </li>
            <li>
              <a href="/equipments" className="w-fit">
                Equipments
              </a>
            </li>
            <li>
              <a href="/articles" className="w-fit">
                Articles
              </a>
            </li>
            <li>
              <Button onClick={handleSignup} variant={"primary"}>
                Login
              </Button>
            </li>
          </ul>
        </div>
      </div>
    );
  }, [userLoggedIn, userRole, handleLogout, handleSignup]);

  return <>{navbarContent}</>;
});

Navbar.displayName = "Navbar";

export default Navbar;
