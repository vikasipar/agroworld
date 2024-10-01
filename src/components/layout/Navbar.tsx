'use client'
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/app/firebase/firebase.config";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "firebase/auth";
import Weather from "./Weather";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const userSession = sessionStorage.getItem("user");

  const handleSignup = () => {
    router.push("/auth/login");
  };

  const handleLogout = () => {
    signOut(auth);
    sessionStorage.removeItem("user");
  };

  return (
    <div className="flex items-start justify-between py-4 px-9">
      <div>
        <Weather/>
        {/* <a href="/" className="text-2xl w-fit font-semibold">
          AgroWorld
        </a> */}
      </div>
      <div className="w-2/5">
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
            {user ? (
              <Button onClick={handleLogout} variant={"primary"}>Logout</Button>
            ) : (
              <Button onClick={handleSignup} variant={"primary"}>Signup</Button>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
