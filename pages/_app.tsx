import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                <Component {...pageProps} />
            </SessionProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
