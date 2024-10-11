import React from "react";
import ProductCard from "./ProductCard";
import { CgUnavailable } from "react-icons/cg";

function RelatedProducts({ relatedProducts }: any) {
  return (
    <div>
      <h3 className="mx-4 md:mx-20 font-semibold text-xl md:text-2xl">Related equipment:</h3>
      <div className="w-full">
        <div className="flex flex-wrap items-center justify-center md:justify-start w-[90%] mx-auto gap-4 mt-4 mb-20">
          {relatedProducts.length === 0 ? (
            <p className="text-lg flex items-center space-x-1">
              <CgUnavailable className="text-2xl text-orange-600" />
              <span className="text-yellow-500">
                No related products found.{" "}
                <a
                  href="/equipments"
                  className="text-blue-700 underline font-normal"
                >
                  Show all Equipments.
                </a>
              </span>
            </p>
          ) : (
            relatedProducts.map((similarProduct: any, index: any) => (
              <ProductCard key={index} product={similarProduct} />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default RelatedProducts;
