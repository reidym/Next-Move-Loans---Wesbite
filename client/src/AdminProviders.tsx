import type { ReactNode } from "react";
import { COOKIE_NAME, UNAUTHED_ERR_MSG } from "@shared/const";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink, TRPCClientError } from "@trpc/client";
import superjson from "superjson";
import { trpc } from "@/lib/trpc";
import { startLogin } from "@/const";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";

const queryClient = new QueryClient();

const redirectToLoginIfUnauthorized = (error: unknown) => {
  if (!(error instanceof TRPCClientError) || error.message !== UNAUTHED_ERR_MSG) return;
  startLogin();
};

queryClient.getQueryCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") redirectToLoginIfUnauthorized(event.query.state.error);
});
queryClient.getMutationCache().subscribe(event => {
  if (event.type === "updated" && event.action.type === "error") redirectToLoginIfUnauthorized(event.mutation.state.error);
});

const trpcClient = trpc.createClient({
  links: [httpBatchLink({
    url: "/api/trpc",
    transformer: superjson,
    headers() {
      try {
        const raw = sessionStorage.getItem("manus-cookie");
        if (raw) {
          const prefix = `${COOKIE_NAME}=`;
          const token = raw.split(";").find(item => item.trim().startsWith(prefix))?.trim().slice(prefix.length);
          if (token) return { Authorization: `Bearer ${token}` };
        }
      } catch { /* sessionStorage may be unavailable */ }
      return {};
    },
    fetch(input, init) { return globalThis.fetch(input, { ...(init ?? {}), credentials: "include" }); },
  })],
});

export function AdminProviders({ children }: { children: ReactNode }) {
  return <trpc.Provider client={trpcClient} queryClient={queryClient}><QueryClientProvider client={queryClient}><ThemeProvider defaultTheme="light"><TooltipProvider><Toaster richColors />{children}</TooltipProvider></ThemeProvider></QueryClientProvider></trpc.Provider>;
}

