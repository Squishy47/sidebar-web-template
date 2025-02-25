import { AppSidebar } from "@/components/sidebar/App-sidebar";
import { SidebarProvider } from "./components/ui/sidebar";

import { useState } from "react";
import supabase from "./hooks/useSupabase";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/react-query";
import { trpc } from "./trpc";
import { BreadCrumbs } from "./components/BreadCrumbs";

function App() {
  const [trpcClient] = useState<ReturnType<typeof trpc.createClient>>(() => {
    return trpc.createClient({
      links: [
        httpBatchLink({
          url: import.meta.env.VITE_SERVER_URL,
          async headers() {
            const b = await supabase.auth.getSession();

            return {
              Authorization: b.data.session?.access_token,
            };
          },
        }),
      ],
    });
  });

  const [queryClient] = useState(() => new QueryClient());

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <AppSidebar />
          <BreadCrumbs
            crumbs={[
              {
                label: "Dashboard",
                to: "/app",
              },
            ]}
          />
        </SidebarProvider>
      </QueryClientProvider>
    </trpc.Provider>
  );
}

export default App;
