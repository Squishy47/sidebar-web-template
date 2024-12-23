import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Theme, ThemeProvider } from "./components/ui/ThemeProvider.tsx";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/Router.tsx";
import { SidebarProvider } from "./components/ui/sidebar.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme={Theme.System} storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <SidebarProvider>
          <RouterProvider router={router} />
        </SidebarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
