import React from "react";
import { TbAlertTriangle } from "react-icons/tb";

const MyProducts = () => {
  return (
    <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-y-8">
      <TbAlertTriangle className="text-6xl text-yellow-300" />
      <p className="text-xl font-semibold text-stone-500">
        You haven't added any products yet!
      </p>
    </div>
  );
};

export default MyProducts;
