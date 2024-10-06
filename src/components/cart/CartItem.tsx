"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiDelete } from "react-icons/fi";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";

interface CartItemProps {
  product: {
    productId: string;
    EquipmentName: string;
    Category: string;
    url: string;
    slug: string;
    quantity: number;
  };
  onQuantityChange: (productId: string, newQuantity: number) => void;
  onRemoveItem: (productId: string) => void; // Add onRemoveItem prop
}

const CartItem: React.FC<CartItemProps> = ({ product, onQuantityChange, onRemoveItem }) => {
  // Handle quantity increase
  const handleIncreaseQty = () => {
    const newQuantity = product.quantity + 1;
    onQuantityChange(product.slug, newQuantity); // Pass new quantity
  };

  // Handle quantity decrease
  const handleDecreaseQty = () => {
    const newQuantity = product.quantity - 1;
    if (newQuantity > 0) {
      onQuantityChange(product.slug, newQuantity);
    } else {
      onRemoveItem(product.slug); // Remove item if quantity is 0
    }
  };

  return (
    <div className="w-full h-[120px] relative shadow-sm border border-gray-300 duration-300 text-center">
      <span
        className="w-fit absolute mt-[1px] right-0 text-red-400 text-2xl hover:cursor-pointer"
        title="Remove Item"
        onClick={() => onRemoveItem(product.slug)} // Pass product slug for removal
      >
        <FiDelete className="-rotate-90" />
      </span>
      <div className="h-full flex items-center w-full">
        <Image
          src={product.url}
          alt={product.EquipmentName}
          width={520}
          height={120}
          loading="lazy"
          className="object-cover border-b-[1px] border-stone-300 p-3 w-[30%] h-auto aspect-video overflow-hidden m-0"
        />
        <div className="mt-4 text-lg font-semibold flex flex-col text-left w-[40%] ml-3">
          <Link href={`/equipments/${product.slug}`}>
            <p>{product.EquipmentName}</p>
          </Link>
          <p className="font-normal text-base">{product.Category.replace(/-/g, " ")}</p>
        </div>
        <div className="w-[30%] text-left">
          <div className="flex items-center gap-x-2">
            <CiCircleMinus
              className="text-2xl hover:cursor-pointer"
              onClick={handleDecreaseQty} // Handle decrease quantity
            />
            <span className="text-green-700 font-medium">{product.quantity}</span>
            <CiCirclePlus
              className="text-2xl hover:cursor-pointer"
              onClick={handleIncreaseQty} // Handle increase quantity
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
