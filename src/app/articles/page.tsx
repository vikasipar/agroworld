// "use client";
import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import ArticleCard from "@/components/articles/ArticleCard";

export default function ArticlesPage() {
  const topics = [
    {
      topic: "Crops: The Foundation of Agriculture",
      id: "Crops",
      collection: "crops",
      articles: [
        {
          id: 1,
          slug: "670685b13e4e1fa815965c9f",
          name: "Rice (Oryza sativa)",
          img: "/static/articles/rice.webp",
          category: "Crops",
        },
        {
          id: 2,
          slug: "670687963e4e1fa815965ca0",
          name: "Wheat (Triticum aestivum)",
          img: "/static/articles/wheat.jpg",
          category: "Crops",
        },
        {
          id: 3,
          slug: "670688053e4e1fa815965ca1",
          name: "Sugarcane (Saccharum officinarum)",
          img: "/static/articles/sugercane.jpg",
          category: "Crops",
        },
        {
          id: 4,
          slug: "670688893e4e1fa815965ca2",
          name: "Cotton (Gossypium spp.)",
          img: "/static/articles/cotton.jpg",
          category: "Crops",
        },
        {
          id: 5,
          slug: "670689103e4e1fa815965ca3",
          name: "Pulses (e.g., Lentils, Chickpeas)",
          img: "/static/articles/pulses.png",
          category: "Crops",
        },
        {
          id: 6,
          slug: "670689783e4e1fa815965ca4",
          name: "Maize (Zea mays)",
          img: "/static/articles/maize.jpeg",
          category: "Crops",
        },
        {
          id: 7,
          slug: "670689d23e4e1fa815965ca5",
          name: "Barley (Hordeum vulgare)",
          img: "/static/articles/barley.jpg",
          category: "Crops",
        },
      ],
    },
    {
      topic: "Fruits: Nature's Sweet Bounty",
      id: "Fruits",
      collection: "fruits",
      articles: [
        {
          id: 1,
          slug: "67068b853e4e1fa815965caa",
          name: "Mango (Mangifera indica)",
          img: "/static/articles/MANGO.jpg",
          category: "Fruits",
        },
        {
          id: 2,
          slug: "67068cd23e4e1fa815965cab",
          name: "Banana (Musa spp.)",
          img: "/static/articles/Bananas.jpg",
          category: "Fruits",
        },
        {
          id: 3,
          slug: "67068d293e4e1fa815965cac",
          name: "Citrus Fruits (Oranges, Lemons, etc.)",
          img: "/static/articles/citrus.jpg",
          category: "Fruits",
        },
        {
          id: 4,
          slug: "67068d863e4e1fa815965cad",
          name: "Pomegranate (Punica granatum)",
          img: "/static/articles/pomogramet.jpeg",
          category: "Fruits",
        },
        {
          id: 5,
          slug: "67068ef83e4e1fa815965cae",
          name: "Guava (Psidium guajava)",
          img: "/static/articles/Guava.jpg",
          category: "Fruits",
        },
        {
          id: 6,
          slug: "67068f593e4e1fa815965caf",
          name: "Apple (Malus domestica)",
          img: "/static/articles/apple.jpeg",
          category: "Fruits",
        },
        {
          id: 7,
          slug: "67068fa33e4e1fa815965cb0",
          name: "Papaya (Carica papaya)",
          img: "/static/articles/Papaya.jpg",
          category: "Fruits",
        },
      ],
    },
    {
      topic: "Flowers: Blooming Wonders of Nature",
      id: "Flowers",
      collection: "flowers",
      articles: [
        {
          id: 1,
          slug: "670690113e4e1fa815965cb1",
          name: "Marigold (Tagetes spp.)",
          img: "/static/articles/marigold.jpg",
          category: "Flowers",
        },
        {
          id: 2,
          slug: "6706912d3e4e1fa815965cb2",
          name: "Rose (Rosa spp.)",
          img: "/static/articles/rose.jpg",
          category: "Flowers",
        },
        {
          id: 3,
          slug: "6706917c3e4e1fa815965cb3",
          name: "Chrysanthemum (Chrysanthemum morifolium)",
          img: "/static/articles/chrysanthemum.jpg",
          category: "Flowers",
        },
        {
          id: 4,
          slug: "670691d13e4e1fa815965cb4",
          name: "Gerbera (Gerbera jamesonii)",
          img: "/static/articles/gerbera.jpg",
          category: "Flowers",
        },
        {
          id: 5,
          slug: "670692443e4e1fa815965cb5",
          name: "Lily (Lilium spp.)",
          img: "/static/articles/lily.jpg",
          category: "Flowers",
        },
        {
          id: 6,
          slug: "6706928e3e4e1fa815965cb6",
          name: "Tulip (Tulipa spp.)",
          img: "/static/articles/tulip.webp",
          category: "Flowers",
        },
      ],
    },
    {
      topic: "Fertilizers: Enhancing Soil Productivity",
      id: "Fertilizers",
      collection: "fertilizers",
      articles: [
        {
          id: 1,
          slug: "670693513e4e1fa815965cb7",
          name: "Urea",
          img: "/static/articles/urea.jpeg",
          category: "Fertilizers",
        },
        {
          id: 2,
          slug: "6706954b3e4e1fa815965cb8",
          name: "Diammonium Phosphate (DAP)",
          img: "/static/articles/diammonium-phosphate.avif",
          category: "Fertilizers",
        },
        {
          id: 3,
          slug: "670695b43e4e1fa815965cb9",
          name: "Single Super Phosphate (SSP)",
          img: "/static/articles/Single-Super-Phosphate.webp",
          category: "Fertilizers",
        },
        {
          id: 4,
          slug: "670698813e4e1fa815965cba",
          name: "Potassium Chloride (Muriate of Potash - MoP)",
          img: "/static/articles/Potassium-Chloride.webp",
          category: "Fertilizers",
        },
        {
          id: 5,
          slug: "6706d4c73e4e1fa815965cbb",
          name: "Calcium Ammonium Nitrate (CAN)",
          img: "/static/articles/Calcium-Ammonium-Nitrate.webp",
          category: "Fertilizers",
        },
      ],
    },
    {
      topic: "Disease and Controls: Protecting Plant Health",
      id: "Disease",
      collection: "diseases",
      articles: [
        {
          id: 1,
          slug: "67082b7970b3bc77db990c33",
          name: "Powdery Mildew",
          img: "/static/articles/powdery-mildew-jpg.jpg",
          category: "Disease And Controls",
        },
        {
          id: 2,
          slug: "67082d0870b3bc77db990c34",
          name: "Bacterial Blight (Rice)",
          img: "/static/articles/Bacterial-Blight-e.jpg",
          category: "Disease And Controls",
        },
        {
          id: 3,
          slug: "67082da570b3bc77db990c35",
          name: "Fusarium Wilt (Chickpea, Cotton)",
          img: "/static/articles/fusarium-wilt-webp.webp",
          category: "Disease And Controls",
        },
        {
          id: 4,
          slug: "67082e4070b3bc77db990c36",
          name: "Late Blight (Potato, Tomato)",
          img: "/static/articles/late-blight-No-halo.jpg",
          category: "Disease And Controls",
        },
        {
          id: 5,
          slug: "67082ed970b3bc77db990c37",
          name: "Rust Diseases (Wheat)",
          img: "/static/articles/Rust-Disease.jpeg",
          category: "Disease And Controls",
        },
      ],
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-xl md:text-3xl font-semibold my-10 bg-green-200 w-fit pl-6 pr-20 py-1 rounded-r-full">
        Articles
      </h1>

      {topics.map((topic: any, index: any) => (
        <div key={`${topic.name}-${index}`} className="mb-4 md:mb-8">
          <h2
            className="text-lg md:text-3xl font-semibold text-green-500 mb-2 md:mb-4 ml-2"
            id={topic.id}
          >
            {topic.topic}:
          </h2>
          <div className="flex items-center justify-center md:justify-start w-[94%] mx-auto">
            <Carousel className="w-[90%] md:w-[96%] mx-auto my-4 md:my-9">
              <CarouselContent className="space-x-4 md:space-x-10">
                {topic.articles.map((article: any, index: any) => (
                  <CarouselItem
                    className="md:basis-1/4"
                    key={`${article.name}-${index}`}
                  >
                    <ArticleCard
                      article={article}
                      collection={topic.collection}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              <span
                className={`${topic.length > 1 ? "block" : "hidden"} md:${
                  topic.length > 4 ? "block" : "hidden"
                }`}
              >
                <CarouselPrevious />
                <CarouselNext />
              </span>
            </Carousel>
          </div>
        </div>
      ))}
    </div>
  );
}
