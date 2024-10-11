"use client";
import React from "react";
import { useParams, usePathname } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getArticleById } from "@/actions/getArticle";
import Image from "next/image";

function ArticlePage() {
  const { articleId } = useParams(); // Get the articleId from the URL
  const pathname = usePathname(); // Get the current path
  const collection = pathname.split("/")[2]; // Extract 'collection' from the path
  const imgSrc: any = localStorage.getItem("articleImage"); // Retrieve the saved image

  // Fetch the article data by articleId and collection
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["article", articleId, collection], // Include collection in query key
    queryFn: () => getArticleById(articleId, collection), // Pass collection as parameter
    enabled: !!articleId,
  });

  // Conditionally handle error and loading state
  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Error: {error.message}</p>;

  // Destructure the article data
  const { title, descriptions } = data;

  // Helper function to render descriptions based on collection and index
  const renderDescriptions = () => {
    if (!descriptions || descriptions.length === 0) {
      return (
        <p className="text-gray-600">
          No descriptions available for this article.
        </p>
      );
    }

    return descriptions.map((info: any, index: number) => {
      if (index === 0) {
        return (
          <section key={index} className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-green-700">
              Description
            </h2>
            <p className="leading-normal md:leading-relaxed text-base md:text-lg text-justify">{info.details}</p>
          </section>
        );
      } else if (collection === "diseases" && index > 0 && index < 4) {
        return (
          <section key={index} className="mb-8">
            {index === 1 && (
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-green-700">
                Causes
              </h2>
            )}
            <h3 className="text-base md:text-lg font-semibold text-stone-700">
              {info.name}:
            </h3>
            <p className="leading-normal md:leading-relaxed text-base md:text-lg text-justify">{info.details}</p>
          </section>
        );
      } else if (collection === "diseases" && index > 2 && index < 6) {
        return (
          <section key={index} className="mb-8">
            {index === 4 && (
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-green-700">
                Control Methods
              </h2>
            )}
            <h3 className="text-base md:text-lg font-semibold text-stone-700">
              {info.name}:
            </h3>
            <p className="leading-normal md:leading-relaxed text-base md:text-lg text-justify">{info.details}</p>
          </section>
        );
      } else if (collection === "fertilizers" && index > 0 && index < 3) {
        return (
          <section key={index} className="mb-8">
            {index === 1 && (
              <h2 className="text-xl md:text-2xl font-semibold mb-2 text-green-700">
                Uses
              </h2>
            )}
            <h3 className="text-base md:text-lg font-semibold text-stone-700">
              {info.name}:
            </h3>
            <p className="leading-normal md:leading-relaxed text-base md:text-lg text-justify">{info.details}</p>
          </section>
        );
      } else {
        return (
          <section key={index} className="mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-2 text-green-700">
              {info.name}:
            </h2>
            <p className="leading-normal md:leading-relaxed text-base md:text-lg text-justify">{info.details}</p>
          </section>
        );
      }
    });
  };

  return (
    <div className="container mx-auto p-4 md:p-8">
      <article className="bg-white shadow-md rounded-lg p-2 md:p-10">
        <h1 className="text-2xl md:text-4xl font-bold mb-6 text-green-600">{title}</h1>
        <div className="w-[90%] md:w-[60%] mx-auto md:h-[400px] my-8">
          <Image
            src={imgSrc}
            alt={title}
            width={280}
            height={160}
            loading="lazy"
            className="object-cover w-full h-full rounded-sm"
          />
        </div>

        {/* Render the descriptions */}
        {renderDescriptions()}
      </article>
    </div>
  );
}

export default ArticlePage;
