"use client";
import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";

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
    Ratings: "4",
    DeliveryOptions: "",
    ContactInformation: "",
    url: "",
    slug: "",
    provider: "",
  });

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setFormData((prevData) => ({
        ...prevData,
        provider: parsedData._id, // Set provider from userData
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
    //   console.log("Product data submitted successfully:", result);
      alert("Product data submitted successfully!");
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
        Ratings: "4", // Default rating
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
    <form onSubmit={handleSubmit} className="space-y-4 w-[60%] mx-auto">
      <input
        type="text"
        name="EquipmentName"
        placeholder="Equipment Name*"
        value={formData.EquipmentName}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
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
      <input
        type="text"
        name="url"
        placeholder="Product Image URL*"
        value={formData.url}
        onChange={handleChange}
        required
        className="w-full p-2 border border-gray-300 rounded"
      />
      {/* Removed input for slug and provider */}
      <Button type="submit" variant={"primary"}>
        Submit Product
      </Button>
    </form>
  );
};

export default ProductForm;
