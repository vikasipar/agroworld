import dbConnect from "@/lib/dbConnect";
import Product from "@/models/product";

// Get all categories
export async function getAllCategories() {
  await dbConnect(); // Connect to the database

  const categories = await Product.distinct("Category"); // Fetch unique categories
  return categories;
}

// Get all products
export async function getAllProducts() {
  await dbConnect(); // Connect to the database

  const products = await Product.find({}); // Fetch all products
  return products;
}

// Get product by slug
export async function getProductBySlug(slug: string) {
  await dbConnect(); // Connect to the database

  const product = await Product.findOne({ slug }); // Fetch product by slug
  return product;
}

// Get products by category
export async function getProductsByCategory(category: string) {
  await dbConnect(); // Connect to the database

  const products = await Product.find({ Category: category }); // Fetch products by category
  return products;
}
