"use client";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase.config";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import { setCookie, getCookie, deleteCookie } from "@/hooks/useCookies";
import Weather from "./Weather";
import { FaCircleUser } from "react-icons/fa6";
import { IUser } from "@/types/modelTypes";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const [userData, setUserData] = useState<IUser>();

  useEffect(() => {
    // Check if user email exists and store it in the cookie
    if (typeof window !== "undefined" && user?.email) {
      setCookie("userEmail", user.email, 7); // Store the email for 7 days
    }

    // Fetch user data from the database using the stored cookie
    const fetchUserData = async () => {
      const userEmail = getCookie("userEmail");
      if (userEmail) {
        try {
          const res = await fetch(`/api/users/${userEmail}`);
          const data = await res.json();
          if (res.ok) {
            setUserData(data.user);
            // Store the user data in localStorage
            localStorage.setItem("userData", JSON.stringify(data.user));
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
    deleteCookie('userEmail');
    localStorage.removeItem("userData"); // Optionally clear user data on logout
  };

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
          {userData &&
            <li>
            <a href="/profile" className="w-fit flex items-center gap-x-2">
              <FaCircleUser className={`text-2xl ${userData?.role==='user' ?'text-yellow-500':'text-blue-600'}`} /> 
              Profile
              {/* {userData?.name} */}
            </a>
          </li>}
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
