import { Toaster } from "@/components/ui/toaster";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="preconnect" href="https://sdk.scdn.co/" />
                <link rel="dns-prefetch" href="https://sdk.scdn.co/" />
                <link rel="preload" href="https://sdk.scdn.co/spotify-player.js" as="script" />
            </Head>
            <body>
                <Main />
                <NextScript />
                <Toaster />
            </body>
        </Html>
    );
}
