"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { CldUploadWidget } from "next-cloudinary";
import { useGetCookie } from "@/hooks/useCookies";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    EquipmentName: "",
    Category: "",
    Description: "",
    Brand: "",
    Price: "",
    Location: "",
    Availability: "",
    Specifications: {
      Power: "",
      FuelType: "",
    },
    Accessories: "",
    Ratings: "4", // Default rating
    DeliveryOptions: "",
    ContactInformation: "",
    url: "",
    slug: "",
    provider: "",
  });

  useEffect(() => {
    const userId = useGetCookie("userId");
    if (userId) {
      setFormData((prevData) => ({
        ...prevData,
        provider: userId,
      }));
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSpecificationsChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      Specifications: {
        ...prevData.Specifications,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Generate slug from EquipmentName
    const slug = formData.EquipmentName.replace(/\s+/g, "-").toLowerCase();
    // Convert Category to slug format
    const categorySlug = formData.Category.replace(/\s+/g, "-").toLowerCase();

    const payload = {
      ...formData,
      slug, // Set slug
      Category: categorySlug, // Set category slug
    };

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to submit product data");
      }

      const result = await response.json();
      alert("Product data submitted successfully!");

      // Reset form data
      setFormData({
        EquipmentName: "",
        Category: "",
        Description: "",
        Brand: "",
        Price: "",
        Location: "",
        Availability: "",
        Specifications: {
          Power: "",
          FuelType: "",
        },
        Accessories: "",
        Ratings: "4", // Reset to default rating
        DeliveryOptions: "",
        ContactInformation: "",
        url: "",
        slug: "", // Reset slug
        provider: "", // Reset provider
      });
    } catch (error) {
      console.error("Error submitting product data:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-2 md:space-y-4 w-full md:w-[60%] mx-auto text-sm md:text-base"
    >
      <input
        type="text"
        name="EquipmentName"
        placeholder="Equipment Name*"
        value={formData.EquipmentName}
        onChange={handleChange}
        required
        className="w-full p-1 md:p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="Category"
        placeholder="Category*"
        value={formData.Category}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <textarea
        name="Description"
        placeholder="Description*"
        value={formData.Description}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="Brand"
        placeholder="Brand"
        value={formData.Brand}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="Price"
        placeholder="Price / Rates per hour / Rates per Kilometer*"
        value={formData.Price}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="Location"
        placeholder="Location*"
        value={formData.Location}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="Availability"
        placeholder="Availability*"
        value={formData.Availability}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="Power"
        placeholder="Power (Specifications)"
        value={formData.Specifications.Power}
        onChange={handleSpecificationsChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="FuelType"
        placeholder="Fuel Type (Specifications)"
        value={formData.Specifications.FuelType}
        onChange={handleSpecificationsChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="Accessories"
        placeholder="Accessories"
        value={formData.Accessories}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="DeliveryOptions*"
        placeholder="Delivery Options"
        value={formData.DeliveryOptions}
        onChange={handleChange}
        className="w-full p-2 border border-gray-300 rounded"
      />
      <input
        type="text"
        name="ContactInformation"
        placeholder="Contact Information*"
        value={formData.ContactInformation}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />

      <CldUploadWidget
        uploadPreset="agroworld"
        onSuccess={({ event, info }: any) => {
          if (event === "success" && info?.secure_url) {
            setFormData((prevData) => ({
              ...prevData,
              url: info.secure_url,
            }));
          }
        }}
      >
        {({ open }) => {
          return (
            <button
              type="button"
              className="block w-1/2 border border-stone-500 p-1 text-stone-600 rounded-sm"
              onClick={() => open()}
            >
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>

      <Button type="submit" variant={"primary"}>
        Submit Product
      </Button>
    </form>
  );
};

export default ProductForm;
