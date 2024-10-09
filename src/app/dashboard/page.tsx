"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter for navigation
import ProductForm from "@/components/dashboard/ProductForm";
import MyProducts from "@/components/dashboard/MyProducts";
import { MdFormatListBulleted, MdOutlinePlaylistAdd } from "react-icons/md";
import { CgPlayListCheck } from "react-icons/cg";
import { getCookie } from "@/hooks/useCookies";
import ProductRequests from "@/components/dashboard/ProductRequests";

function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [selectedTab, setSelectedTab] = useState<string>("requests");
  const router = useRouter(); // Initialize the router

  const loggedIn = getCookie("userEmail");

  useEffect(() => {
    if (loggedIn) {
      if (getCookie("userRole") !== "provider") {
        router.push("/");
      }
      setUser({
        name: getCookie("userName"),
        email: getCookie("userEmail"),
        role: getCookie("userRole"),
      });
    } else {
      // Redirect to the login page if user is not logged in
      router.push("/auth/login"); // Update to your actual login route
    }
  }, [loggedIn, router]);

  // Prevent rendering of the profile page until user is verified
  if (!user) {
    return null;
  }

  return (
    <div className="w-full min-h-screen p-6 bg-gray-100">
      <div className="w-full">
        <h1 className="text-3xl font-semibold my-4 text-left text-blue-600">
          Hello {user.name}!
        </h1>
        <div className="flex flex-col md:flex-row w-full bg-white shadow-md rounded-lg overflow-hidden min-h-screen">
          <nav className="w-full md:w-1/4 border-r-2 border-gray-300 md:border-r-0 md:border-b-2 md:border-b-gray-300">
            <div className="flex flex-col gap-y-1 my-6 text-lg border-r-2 border-stone-300 p-7">
              <span
                className={`border-2 border-stone-300 rounded-xl py-2 px-4 text-center cursor-pointer transition-all duration-300 flex items-center gap-x-2 ${
                  selectedTab === "requests"
                    ? "bg-green-500 text-white"
                    : "hover:border-green-500"
                }`}
                onClick={() => setSelectedTab("requests")}
              >
                <CgPlayListCheck /> Equipments Requests
              </span>
              <span
                className={`border-2 border-stone-300 rounded-xl py-2 px-4 text-center cursor-pointer transition-all duration-300 flex items-center gap-x-2 ${
                  selectedTab === "addProduct"
                    ? "bg-green-500 text-white"
                    : "hover:border-green-500"
                }`}
                onClick={() => setSelectedTab("addProduct")}
              >
                <MdOutlinePlaylistAdd /> Add Equipments
              </span>
              <span
                className={`border-2 border-stone-300 rounded-xl py-2 px-4 text-center cursor-pointer transition-all duration-300 flex items-center gap-x-2 ${
                  selectedTab === "myProducts"
                    ? "bg-green-500 text-white"
                    : "hover:border-green-500"
                }`}
                onClick={() => setSelectedTab("myProducts")}
              >
                <MdFormatListBulleted /> My Equipments
              </span>
            </div>
          </nav>
          <div className="w-full md:w-3/4 p-4">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              {/* Conditional rendering of components based on the selected tab */}
              {selectedTab === "addProduct" && <ProductForm />}
              {selectedTab === "myProducts" && <MyProducts />}
              {selectedTab === "requests" && <ProductRequests />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
