import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ThemeProvider } from "@/context/ThemeProvider";
import { NavBar } from "@/components/NavBar";
import { Toaster } from "@/components/ui/toaster";
import { Inter } from "next/font/google";
import PlayerProvider from "@/context/PlayerProvider";
import { useRouter } from "next/router";
import SidePlayer from "@/components/SidePlayer";

const inter = Inter({ subsets: ["latin"] });

export const queryClient = new QueryClient();

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
    const router = useRouter();

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider session={session}>
                <PlayerProvider>
                    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
                        <div className={inter.className}>
                            <NavBar />
                            <Component {...pageProps} />
                            <Toaster />
                            {router.pathname !== "/playing" && <SidePlayer />}
                        </div>
                    </ThemeProvider>
                </PlayerProvider>
            </SessionProvider>
            <ReactQueryDevtools />
        </QueryClientProvider>
    );
}
