import { IRequest } from "@/types/modelTypes";
import axios from "axios";
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// get requests by userId
export async function getRequestsByUserId(
  userId: string | null
): Promise<IRequest> {
  const res = await fetch(`${API_URL}/api/request/${userId}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

// get requests by providerId
export async function getRequestsByProviderId(
  providerId: string | null
): Promise<IRequest> {
  const res = await fetch(`${API_URL}/api/accept/${providerId}`);
  if (!res.ok) throw new Error("Network response was not ok");
  return res.json();
}

// Function to accept a request by its ID
export const acceptRequest = async (_id: string, productId: string): Promise<void> => {
    try {
      const response = await axios.patch(`/api/request/${_id}/accept`, { productId });
      return response.data;
    } catch (error) {
      throw new Error(
        error instanceof Error
          ? error.message
          : "An error occurred while accepting the request."
      );
    }
  };
  
