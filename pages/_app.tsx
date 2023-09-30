import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/context/ThemeProvider";
import dynamic from "next/dynamic";
import { NavBar } from "@/components/NavBar";
const MobileProvider = dynamic(() => import("@/context/MobileProvider"), {
  ssr: false,
});

export const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MobileProvider>
            <NavBar />
            <Component {...pageProps} />
          </MobileProvider>
        </ThemeProvider>
      </SessionProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
