import React from "react";
import { TbAlertTriangle } from "react-icons/tb";
import { IRequest } from "@/types/modelTypes";
import { useQuery } from "@tanstack/react-query";
import { getCookie } from "@/hooks/useCookies";
import { getRequestsByUserId } from "@/actions/getRequests";

const MyOrders = () => {
  const userId = getCookie("userId");

  // Fetch requests by user ID
  const { isLoading, isError, data, error } = useQuery<IRequest[]>({
    queryKey: ["userRequests", userId],
    queryFn: () => getRequestsByUserId(userId),
    enabled: !!userId, // Enable only if userId exists
  });

  if (isLoading) {
    return <p>Loading your orders...</p>;
  }

  if (isError) {
    return (
      <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-y-8">
        <TbAlertTriangle className="text-6xl text-red-500" />
        <p className="text-xl font-semibold text-stone-500">
          Error loading your orders:{" "}
          {error instanceof Error ? error.message : "Unknown error"}
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-y-8">
        <TbAlertTriangle className="text-6xl text-yellow-300" />
        <p className="text-xl font-semibold text-stone-500">
          You haven't placed any requests yet!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">Sr. No.</th>
            <th className="py-2 px-4 text-left">Product ID</th>
            <th className="py-2 px-4 text-left">Product Name</th>
            <th className="py-2 px-4 text-left">Request</th>
          </tr>
        </thead>
        <tbody>
          {data.map((request: IRequest, index: number) => (
            <tr key={request._id} className="border-b">
              <td className="py-2 px-4 max-w-[10%]">{index + 1}</td>
              <td className="py-2 px-4 max-w-[40%]">{request.productId}</td>
              <td className="py-2 px-4 capitalize max-w-[40%] text-blue-600">
                <a href={`/equipments/${request.productSlug}`}>
                  {request.productSlug.replace(/-/g, " ")}
                </a>
              </td>
              <td
                className={`py-2 px-4 max-w-[10%] font-semibold ${
                  request.requestAccepted ? "text-green-600" : "text-red-500"
                }`}
              >
                {request.requestAccepted ? "Accepted" : "Pending"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-12 p-4 bg-blue-100 border border-blue-300 text-stone-700 rounded-md">
        <p className="text-sm">
          {data.some((request: any) => !request.requestAccepted) && (
            <>
              Some of your requests are{" "}
              <strong className="text-red-500">pending</strong>. Please{" "}
              <strong>
                wait until the provider accepts your request and contacts you
              </strong>
              .
            </>
          )}
          {data.every((request: any) => request.requestAccepted) && (
            <>
              All of your requests have been{" "}
              <strong className="text-green-700">accepted</strong>. The
              <strong>provider will contact you soon</strong> to proceed.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default MyOrders;
