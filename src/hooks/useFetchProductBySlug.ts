import { useQuery } from "@tanstack/react-query";
import { getProductBySlug } from "@/actions/getProduct";
import { IProduct } from "@/types/modelTypes";

export const useFetchProductBySlug = (product: string) => {
  // Fetch the product data by slug
  const { isLoading, isError, data, error } = useQuery<IProduct>({
    queryKey: ["product", product],
    queryFn: () => getProductBySlug(product),
    enabled: !!product,
  });
};
