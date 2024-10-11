import { NextResponse } from "next/server";
import { getArticleById } from "@/dbOperations/article/getArticle";

// Dynamic API route to get article by ID and collection
export async function GET(
  _req: Request,
  { params }: { params: { articleId: string; collection: string } }
) {
  try {
    // Fetch the article using both articleId and collection
    const article = await getArticleById(params.articleId, params.collection);

    // Check if the article exists
    if (!article) {
      return NextResponse.json(
        { message: "Article not found!" },
        { status: 404 }
      );
    }

    // Return the article data if found
    return NextResponse.json(article, { status: 200 });
  } catch (error: any) {
    // Handle errors and return an appropriate response
    return NextResponse.json(
      { message: "GET article Error", error: error.message },
      { status: 500 }
    );
  }
}
