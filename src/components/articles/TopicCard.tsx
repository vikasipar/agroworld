import React from "react";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

interface Topic {
  name: string;
  img: string;
  id: string;
}

const TopicCard: React.FC<{ topic: Topic }> = ({ topic }) => {
  return (
    <Link href={`/articles/#${topic.id}`}>
      <Card className="w-[280px] h-[340px] md:shadow-xl border md:border-2 border-stone-100 md:border-stone-300 hover:shadow-2xl hover:drop-shadow-2xl duration-300 text-center">
        <CardHeader className="h-[240px] p-0"> {/* Adjust the height */}
          <Image
            src={topic.img}
            alt={topic.name}
            width={280} // Set the width to match the card's width
            height={140} // Set the height for uniformity
            loading="lazy"
            className="object-cover w-full h-full" // Ensures the image fits within the container
          />
        </CardHeader>
        <CardContent>
          <CardTitle className="mt-2 text-base md:text-lg font-semibold line-clamp-2">{topic.name}</CardTitle>
          <p className="text-sm text-gray-900 text-center font-medium mt-1 bg-green-300 px-2 w-fit mx-auto line-clamp-1">
            {/* {topic.category} */}
          </p>
        </CardContent>
        <CardFooter>
          {/* Optional footer content */}
        </CardFooter>
      </Card>
    </Link>
  );
};

export default TopicCard;
