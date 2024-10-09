import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import ArticleCard from "@/components/articles/ArticleCard";

function ArticlesPage() {
  const topics = [
    {
      topic: "Crops: The Foundation of Agriculture",
      id: "Crops",
      articles: [
        {
          id: 1,
          name: "Rice (Oryza sativa)",
          img: "/static/articles/rice.webp",
          category: "Crops",
        },
        {
          id: 2,
          name: "Wheat (Triticum aestivum)",
          img: "/static/articles/wheat.jpg",
          category: "Crops",
        },
        {
          id: 3,
          name: "Sugarcane (Saccharum officinarum)",
          img: "/static/articles/sugercane.jpg",
          category: "Crops",
        },
        {
          id: 4,
          name: "Cotton (Gossypium spp.)",
          img: "/static/articles/cotton.jpg",
          category: "Crops",
        },
      ],
    },
    {
      topic: "Fruits: Nature's Sweet Bounty",
      id: "Fruits",
      articles: [
        {
          id: 1,
          name: "Mango (Mangifera indica)",
          img: "/static/articles/MANGO.jpg",
          category: "Fruits",
        },
        {
          id: 2,
          name: "Banana (Musa spp.)",
          img: "/static/articles/Bananas.jpg",
          category: "Fruits",
        },
        {
          id: 3,
          name: "Citrus Fruits (Oranges, Lemons, etc.)",
          img: "/static/articles/citrus.jpg",
          category: "Fruits",
        },
        {
          id: 4,
          name: "Pomegranate (Punica granatum)",
          img: "/static/articles/pomogramet.jpeg",
          category: "Fruits",
        },
      ],
    },
    {
      topic: "Flowers: Blooming Wonders of Nature",
      id: "Flowers",
      articles: [
        {
          id: 1,
          name: "Marigold (Tagetes spp.)",
          img: "/static/articles/marigold.jpg",
          category: "Flowers",
        },
        {
          id: 2,
          name: "Rose (Rosa spp.)",
          img: "/static/articles/rose.jpg",
          category: "Flowers",
        },
        {
          id: 3,
          name: "Chrysanthemum (Chrysanthemum morifolium)",
          img: "/static/articles/chrysanthemum.jpg",
          category: "Flowers",
        },
        {
          id: 4,
          name: "Gerbera (Gerbera jamesonii)",
          img: "/static/articles/gerbera.jpg",
          category: "Flowers",
        },
      ],
    },
    {
      topic: "Fertilizers: Enhancing Soil Productivity",
      id: "Fertilizers",
      articles: [
        {
          id: 1,
          name: "Urea",
          img: "/static/articles/urea.jpeg",
          category: "Fertilizers",
        },
        {
          id: 2,
          name: "Diammonium Phosphate (DAP)",
          img: "/static/articles/diammonium-phosphate.avif",
          category: "Fertilizers",
        },
        {
          id: 3,
          name: "Single Super Phosphate (SSP)",
          img: "/static/articles/Single-Super-Phosphate.webp",
          category: "Fertilizers",
        },
        {
          id: 4,
          name: "Potassium Chloride (Muriate of Potash - MoP)",
          img: "/static/articles/Potassium-Chloride.webp",
          category: "Fertilizers",
        },
      ],
    },
    {
      topic: "Disease and Controls: Protecting Plant Health",
      id: "Disease",
      articles: [
        {
          id: 1,
          name: "Powdery Mildew",
          img: "/static/articles/powdery-mildew-jpg.jpg",
          category: "Disease And Controls",
        },
        {
          id: 2,
          name: "Bacterial Blight (Rice)",
          img: "/static/articles/Bacterial-Blight-e.jpg",
          category: "Disease And Controls",
        },
        {
          id: 3,
          name: "Fusarium Wilt (Chickpea, Cotton)",
          img: "/static/articles/fusarium-wilt-webp.webp",
          category: "Disease And Controls",
        },
        {
          id: 4,
          name: "Late Blight (Potato, Tomato)",
          img: "/static/articles/late-blight-No-halo.jpg",
          category: "Disease And Controls",
        },
      ],
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-3xl font-semibold my-10 bg-green-200 w-fit pl-6 pr-20 py-1 rounded-r-full">Articles</h1>

      {topics.map((topic: any, index:any) => (
        <div key={`${topic.name}-${index}`} className="mb-8">
          <h2
            className="text-3xl font-semibold text-green-500 mb-4 ml-2"
            id={topic.id}
          >
            {topic.topic}:
          </h2>
          <div className="flex items-center justify-start">
            <Carousel className="w-[96%] mx-auto my-2">
              <CarouselContent className="space-x-1">
                {topic.articles.map((article: any, index:any) => (
                  <CarouselItem className="basis-1/4" key={`${article.name}-${index}`}>
                    <ArticleCard article={article} />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {topic.articles.length > 4 && (
                <>
                  <CarouselPrevious />
                  <CarouselNext />
                </>
              )}
            </Carousel>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArticlesPage;
