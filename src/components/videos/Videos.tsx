import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

function Videos() {
  const videos = [
    "https://www.youtube.com/embed/TfiWMGrRU7w?si=1ZfFiyuMEg8De3tZ",
    "https://www.youtube.com/embed/a3m5U1d06AY?si=3WFD8Dw36LS5yOA0",
    "https://www.youtube.com/embed/VUNm2RBU30g?si=R1sqPTkBTrZashpU",
    "https://www.youtube.com/embed/A78xRFKdJ-4?si=Hf0wFCVnRe-Qyipe",
    "https://www.youtube.com/embed/AV8y8voQnXg?si=M_LrlxnT7Ibqdz8D",
    "https://www.youtube.com/embed/REvCmtM-nXI?si=cNp-BB1DeCSQ3yzr",
    "https://www.youtube.com/embed/8OEZpXiYSHI?si=L-vg4IP0B0BpnzvO",
    "https://www.youtube.com/embed/B7bbs2KtikM?si=YanJ7dJ93zqccY3j",
    "https://www.youtube.com/embed/dALoLMzhbFo?si=626PvBbInE1ANjHP",
    "https://www.youtube.com/embed/SygLKuj_VTc?si=7W6b5zl0qIsMKaVC",
  ];

  return (
    <div className="p-4 w-[96%] mx-auto">
      <h2 className="text-xl md:text-3xl font-semibold text-green-500 mb-4">
        Demonstration Videos
      </h2>
      <Carousel className="w-[92%] mx-auto my-9">
        <CarouselContent className="space-x-4">
          {videos.map((link: string, index: number) => (
            <CarouselItem className="md:basis-1/4" key={index}>
              <iframe
                width="280"
                height="160"
                src={link}
                title={`YouTube video ${index}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </CarouselItem>
          ))}
        </CarouselContent>

        <span
          className={`${videos.length > 1 ? "block" : "hidden"} md:${
            videos.length > 4 ? "block" : "hidden"
          }`}
        >
          <CarouselPrevious />
          <CarouselNext />
        </span>
      </Carousel>
    </div>
  );
}

export default Videos;
