"use client";

import {
  isServer,
  QueryClientProvider,
  QueryClient,
  defaultShouldDehydrateQuery,
} from "@tanstack/react-query";
import {useServerInsertedHTML} from "next/navigation";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false, // Disable refetching when window is focused
        refetchOnReconnect: false, // Disable refetching on reconnect
        retry: 2, // Retry failed requests twice
        staleTime: 5 * 60 * 1000, // Data stays fresh for 5 minutes
        refetchInterval: false, // Disable automatic background refetching
        retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff with cap at 30 seconds,
      },
      dehydrate: {
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}
let browserQueryClient: QueryClient | undefined = undefined;
function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  } else {
    // Browser: make a new query client if we don't already have one
    // This is very important, so we don't re-make a new client if React
    // suspends during the initial render. This may not be needed if we
    // have a suspense boundary BELOW the creation of the query client
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}
const ReactQueryProvider = ({children}: {children: React.ReactNode}) => {
  const queryClient = getQueryClient();

  // Ensure server-side inserted HTML is rendered on the client
  useServerInsertedHTML(() => null);

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
