import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import TopicCard from "./TopicCard";

function Articles() {
  const topics = [
    {
      name: "Crops: The Foundation of Agriculture",
      id: "Crops",
      img: "https://images.pexels.com/photos/16613054/pexels-photo-16613054/free-photo-of-tall-green-grass.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Fruits: Nature's Sweet Bounty",
      id: "Fruits",
      img: "https://images.pexels.com/photos/220911/pexels-photo-220911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Flowers: Blooming Wonders of Nature",
      id: "Flowers",
      img: "https://images.pexels.com/photos/1075960/pexels-photo-1075960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      name: "Fertilizers: Enhancing Soil Productivity",
      id: "Fertilizers",
      img: "https://th.bing.com/th/id/OIP.KDQZ0wfHvZn8zI1cjO1IXgAAAA?w=300&h=300&rs=1&pid=ImgDetMain",
    },
    {
      name: "Disease and Controls: Protecting Plant Health",
      id: "Disease",
      img: "https://thumbs.dreamstime.com/b/plant-disease-agronomist-junior-agricultural-scientists-research-greenhouse-plants-look-way-to-control-pests-yellowed-252581745.jpg",
    },
  ];

  return (
    <div className="p-4">
      <h2 className="text-xl md:text-3xl font-semibold text-green-500 mb-4">Articles</h2>
      <Carousel className="w-[90%] md:w-[96%] mx-auto my-4 md:my-9">
        <CarouselContent className="space-x-4 md:space-x-10">
          {topics.map((topic: any) => (
            <CarouselItem className="md:basis-1/4" key={topic.name}>
              <TopicCard topic={topic} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <span
          className={`${topics.length > 1 ? "block" : "hidden"} md:${
            topics.length > 4 ? "block" : "hidden"
          }`}
        >
          <CarouselPrevious />
          <CarouselNext />
        </span>
      </Carousel>
    </div>
  );
}

export default Articles;
