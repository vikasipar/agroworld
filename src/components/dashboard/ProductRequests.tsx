import React from "react";
import { TbAlertTriangle } from "react-icons/tb";
import { IRequest } from "@/types/modelTypes";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useGetCookie } from "@/hooks/useCookies";
import { getRequestsByProviderId, acceptRequest } from "@/actions/getRequests";

const ProductRequests = () => {
  const providerId: any = useGetCookie("userId");
  const queryClient: any = useQueryClient();

  // Fetch requests by provider ID
  const { isLoading, isError, data, error } = useQuery<any>({
    queryKey: ["userRequests", providerId],
    queryFn: () => getRequestsByProviderId(providerId), // Ensure this returns IRequest[]
    enabled: !!providerId,
  });

  // Handle accepting the request
  const mutation = useMutation({
    mutationFn: ({ _id, productId }: { _id: string; productId: string }) =>
      acceptRequest(_id, productId),
    onSuccess: () => {
      queryClient.invalidateQueries(["userRequests", providerId]);
    },
  });

  async function handleRequest(id: string, productId: string) {
    mutation.mutate({ _id: id, productId });
  }

  if (isLoading) {
    return <p>Loading your requests...</p>;
  }

  if (isError) {
    return (
      <div className="w-full h-[50vh] flex flex-col justify-center items-center gap-y-8">
        <TbAlertTriangle className="text-6xl text-red-500" />
        <p className="text-xl font-semibold text-stone-500">
          Error loading your requests:{" "}
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
          You haven't received any requests yet!
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="text-xs md:text-lg w-full md:min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="py-2 px-4 text-left">No.</th>
            <th className="py-2 px-4 text-left">Product</th>
            <th className="py-2 px-4 text-left">Customer</th>
            <th className="py-2 px-4 text-left">Contact</th>
            <th className="py-2 px-4 text-left">Request</th>
          </tr>
        </thead>
        <tbody>
          {data.map((request: IRequest | any, index: number) => (
            <tr key={request._id} className="border-b">
              <td className="py-2 px-4 max-w-[10%]">{index + 1}</td>
              <td className="py-2 px-4 capitalize max-w-[30%] text-blue-600">
                <a href={`/equipments/${request.productSlug}`}>
                  {request.productSlug.replace(/-/g, " ")}
                </a>
              </td>
              <td className="py-2 px-4 max-w-[20%]">{request.senderName}</td>
              <td className="py-2 px-4 max-w-[30%]">{request.senderEmail}</td>
              <td
                className={`py-2 px-4 max-w-[10%] font-semibold border-2 rounded-lg text-sm text-center ${
                  request.requestAccepted
                    ? "text-green-600"
                    : "text-white bg-blue-500 cursor-pointer"
                }`}
                onClick={() =>
                  !request.requestAccepted &&
                  handleRequest(request._id, request.productId)
                }
              >
                {request.requestAccepted ? "Accepted" : "Accept (click)"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-12 p-4 bg-blue-100 border border-blue-300 text-stone-700 rounded-md">
        <p className="text-sm">
          {data.some((request: IRequest) => !request.requestAccepted) && (
            <>
              Some of your requests are{" "}
              <strong className="text-red-500">pending</strong>. Please{" "}
              <strong>accept your requests</strong> and contact the customer for
              further processing.
            </>
          )}
          {data.every((request: IRequest) => request.requestAccepted) && (
            <>
              All of your requests have been{" "}
              <strong className="text-green-700">accepted</strong>. Please{" "}
              <strong>contact the customer</strong> for further process.
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductRequests;
