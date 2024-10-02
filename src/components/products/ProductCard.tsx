import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import StarRating from "./StarRating";
import Link from "next/link";

interface ProductCardProps {
  product: any;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <Link href={`/equipments/${product.slug}`}>
      <Card className="w-[280px] h-[360px] shadow-xl border-2 border-stone-300 hover:shadow-2xl hover:drop-shadow-2xl duration-300 text-center">
        <CardHeader className="h-[290px]">
          <Image
            src={product.url}
            alt={product.EquipmentName}
            width={320}
            height={280}
            loading="lazy"
            className="object-cover border-b-[1px] border-stone-300 p-3 w-[320px] h-[280px] aspect-video overflow-hidden m-0"
          />
          <CardTitle className="mt-4 text-lg font-semibold">
            {product.EquipmentName}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 text-center w-full -my-4">
            {product.Category}
          </p>
        </CardContent>
        <CardFooter>
          <StarRating rating={product.Ratings} />
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ProductCard;
