import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import Link from "next/link";

interface ArticleCardProps {
  article: any;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <Link href={`/equipments/${article.name}`}>
      <Card className="w-[280px] h-[340px] shadow-xl border-2 border-stone-300 hover:shadow-2xl hover:drop-shadow-2xl duration-300 text-center">
        <CardHeader className="h-[240px] p-0"> {/* Adjust the height */}
          <Image
            src={article.img}
            alt={article.name}
            width={280} // Set the width to match the card's width
            height={160} // Set the height for uniformity
            loading="lazy"
            className="object-cover w-full h-full" // Ensures the image fits within the container
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="mt-2 text-base font-semibold line-clamp-2">{article.name}</CardTitle>
          <p className="text-sm text-gray-900 text-center font-medium mt-1 bg-green-300 px-2 w-fit mx-auto line-clamp-1">
            {article.category}
          </p>
        </CardContent>
        <CardFooter>
          {/* Optional footer content */}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ArticleCard;
