"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { MdFormatListBulleted } from "react-icons/md";
import { getCookie } from "@/hooks/useCookies";
import MyOrders from "@/components/profile/MyOrders";

function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter(); // Initialize the router

  const loggedIn = getCookie("userEmail");

  // Move all useEffects outside of conditional checks
  useEffect(() => {
    if (loggedIn) {
      const userRole = getCookie("userRole");
      if (userRole !== "user") {
        router.push("/"); // Redirect if not a user
      } else {
        // Set user details if logged in
        setUser({
          name: getCookie("userName"),
          email: getCookie("userEmail"),
          role: userRole,
        });
      }
    } else {
      // Redirect to login if not logged in
      router.push("/auth/login");
    }
  }, [loggedIn, router]);

  const userEmail = getCookie("userEmail");

  useEffect(() => {
    if (!userEmail) {
      router.push("/auth/login");
    }
  }, [userEmail, router]);

  // Prevent rendering of the profile page until user is verified
  if (!user) {
    return null; // Return null or a loading spinner here
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="w-full">
        <h1 className="text-xl md:text-3xl font-semibold my-4 text-left text-yellow-500">
          Hello {user.name}!
        </h1>
        <div className="flex flex-col md:flex-row w-full bg-white shadow-md rounded-lg overflow-hidden min-h-screen">
          <nav className="w-full md:w-1/4 border-r-2 border-gray-300 md:border-r-0 md:border-b-2 md:border-b-gray-300">
            <div className="flex flex-col gap-y-4 my-6 text-lg border-r-2 border-stone-300 p-7 h-full">
              <span className="py-2 px-4 text-base md:text-lg text-center cursor-pointer transition-all duration-300 flex items-center gap-x-2">
                <MdFormatListBulleted /> Orders status
              </span>
            </div>
          </nav>
          <div className="w-full md:w-3/4 p-4">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <MyOrders />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
