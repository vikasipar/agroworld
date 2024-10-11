const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch article by ID and collection from the API
export async function getArticleById(
  articleId: string | string[],
  collection: string | string[]
): Promise<any> {
  // Send both articleId and collection as part of the request
  const res = await fetch(`${API_URL}/api/articles/${collection}/${articleId}`);

  if (!res.ok) throw new Error("Failed to fetch article data");

  return res.json();
}
