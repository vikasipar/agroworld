"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import { MdFormatListBulleted } from "react-icons/md";
import { getCookie } from "@/hooks/useCookies";
import MyOrders from "@/components/products/MyOrders";

function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const router = useRouter(); // Initialize the router

  const loggedIn = getCookie("userEmail");

  useEffect(() => {
    // const userData = localStorage.getItem("userData");

    if (loggedIn) {
      if(getCookie('userRole')!=='user'){
        router.push("/");
      }
      setUser({
        name: getCookie("userName"),
        email: getCookie("userEmail"),
        role: getCookie("userRole"),
      });
    } else {
      // Redirect to the login page if userData is not present
      router.push("/auth/login"); // Update to your actual login route
    }
  }, [loggedIn, router]);

  // Prevent rendering of the profile page until user is verified
  if (!user) {
    return null;
  }

  if(!getCookie("userEmail")){
    router.push('auth/login');
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="w-full">
        <h1 className="text-3xl font-semibold my-4 text-left text-yellow-500">
          Hello {user.name}!
        </h1>
        <div className="flex flex-col md:flex-row w-full bg-white shadow-md rounded-lg overflow-hidden min-h-screen">
          <nav className="w-full md:w-1/4 border-r-2 border-gray-300 md:border-r-0 md:border-b-2 md:border-b-gray-300">
            <div className="flex flex-col gap-y-4 my-6 text-lg border-r-2 border-stone-300 p-7 h-full">
              <span className="py-2 px-4 text-center cursor-pointer transition-all duration-300 flex items-center gap-x-2">
                <MdFormatListBulleted /> My Orders
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
