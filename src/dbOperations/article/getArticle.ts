import dbConnect from "@/lib/dbConnect";
import mongoose from "mongoose";

// Fetch article by ID and collection from the database
export async function getArticleById(articleId: string, collection: string) {
  await dbConnect(); // Connect to the database

  // Ensure the articleId is valid and the collection is specified
  if (!mongoose.Types.ObjectId.isValid(articleId)) {
    throw new Error("Invalid article ID");
  }

  // Fetch article by ID from the specified collection
  const article = await mongoose.connection
    .collection(collection)
    .findOne({ _id: new mongoose.Types.ObjectId(articleId) });

  if (!article) {
    throw new Error("Article not found");
  }

  return article;
}
