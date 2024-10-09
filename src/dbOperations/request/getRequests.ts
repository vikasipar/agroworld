import dbConnect from "@/lib/dbConnect";
import Request from "@/models/request"; // Ensure the correct path to your Product model

// get Requests by userId
export async function getAllRequests(userId: string) {
  await dbConnect(); // Connect to the database

  // Fetch all products from the same category
  const requestFromSameUser = await Request.find({
    senderId: userId,
  });

  return requestFromSameUser;
}

// get Requests by providerId
export async function getRequestsByProviderId(providerId: string) {
    await dbConnect(); // Connect to the database
  
    // Fetch all products from the same category
    const requestFromSameUser = await Request.find({
        providerId: providerId,
    });
  
    return requestFromSameUser;
  }