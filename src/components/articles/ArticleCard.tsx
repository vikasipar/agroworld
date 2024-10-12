'use client'
import React from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation"; // Import useRouter for navigation

interface ArticleCardProps {
  article: any;
  collection: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, collection }) => {
  const router = useRouter(); // Initialize useRouter

  const handleCardClick = () => {
    // Store article image in local storage
    localStorage.setItem("articleImage", article.img);
    // Navigate to the article's detail page and pass the collection as query param
    router.push(`/articles/${collection}/${article.slug}`);
  };

  return (
    <div onClick={handleCardClick}>
      <Card className="w-[280px] h-[360px] shadow-xl border-2 border-stone-300 hover:shadow-2xl hover:drop-shadow-2xl duration-300 text-center hover:cursor-pointer">
        <CardHeader className="h-[240px] p-0"> {/* Adjust the height */ }
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
          <CardTitle className="mt-2 text-sm md:text-base font-semibold line-clamp-2">{article.name}</CardTitle>
          <p className="text-sm text-gray-900 text-center font-medium mt-1 bg-green-300 px-2 w-fit mx-auto line-clamp-1">
            {article.category}
          </p>
        </CardContent>
        <CardFooter>
          {/* Optional footer content */ }
        </CardFooter>
      </Card>
    </div>
  );
};

export default ArticleCard;
