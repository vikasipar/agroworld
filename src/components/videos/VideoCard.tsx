import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";

interface VideoCardProps {
  link: string; // Accept the video link directly
}

const VideoCard: React.FC<VideoCardProps> = ({ link }) => {
  return (
    <Card className="w-[280px] h-[340px] shadow-xl border-2 border-stone-300 hover:shadow-2xl hover:drop-shadow-2xl duration-300 text-center cursor-pointer">
      <CardHeader className="h-[240px] p-0 rounded-lg"> 
        <iframe
          width="280"
          height="160"
          src={link}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </CardHeader>
      <CardContent>
        <CardTitle className="mt-2 text-base font-semibold line-clamp-2">
          Video Demo
        </CardTitle>
      </CardContent>
      <CardFooter>
        {/* Optional footer content */}
      </CardFooter>
    </Card>
  );
};

export default VideoCard;
