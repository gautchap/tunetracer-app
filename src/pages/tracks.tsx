import TracksWrapper from "@/components/TracksWrapper";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFavTracks, prefetchTracks } from "@/api/spotifystats";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import Head from "next/head";
import { FavTracksType } from "@/types/spotifyTypes";

type TracksProps = {
    token: string;
    tracks: FavTracksType;
};

export default function Tracks({ token, tracks }: TracksProps) {
    return (
        <>
            <Head>
                <title>Tracks - TuneTracer</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className="container px-0 sm:px-4">
                {token && (
                    <Tabs defaultValue="medium_term" className="flex flex-col my-4 md:my-8 mx-auto">
                        <TabsList className="m-auto">
                            <TabsTrigger value="short_term" onMouseEnter={() => prefetchTracks(token, "short_term")}>
                                4 last weeks
                            </TabsTrigger>
                            <TabsTrigger value="medium_term">6 last months</TabsTrigger>
                            <TabsTrigger value="long_term" onMouseEnter={() => prefetchTracks(token, "long_term")}>
                                All time
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="short_term">
                            <TracksWrapper token={token} range="short_term" />
                        </TabsContent>
                        <TabsContent value="medium_term">
                            <TracksWrapper token={token} range="medium_term" initialData={tracks} />
                        </TabsContent>
                        <TabsContent value="long_term">
                            <TracksWrapper token={token} range="long_term" />
                        </TabsContent>
                    </Tabs>
                )}
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getServerSession(context.req, context.res, authOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }

    const tracks = await getFavTracks({
        token: session.accessToken,
        range: "medium_term",
    });

    if (!tracks) {
        return { props: { token: null, artists: null } };
    }

    return {
        props: { token: session.accessToken, tracks },
    };
};
