import { getFavArtists } from "@/api/spotifystats";
import { Session } from "next-auth";
import ArtistCard from "./ArtistCard";
import { useQuery } from "@tanstack/react-query";
import { Range } from "@/types/spotifyTypes";

type ArtistsWrapperProps = {
    session: Session;
    range: Range;
};

const ArtistsWrapper = ({ session, range }: ArtistsWrapperProps) => {
    const {
        data: artists,
        error,
        isLoading,
    } = useQuery({
        enabled: session !== null,
        queryKey: ["artists", range],
        queryFn: () => getFavArtists({ token: session.accessToken, range }),
    });

    if (isLoading) return <p>loading...</p>;
    if (error) return <p>Une erreur est survenue</p>;

    return (
        <>
            <section style={{ display: "flex", flexWrap: "wrap", gap: "2em" }}>
                {artists?.items.map((artist) => <ArtistCard key={artist.id} artist={artist} />)}
            </section>
        </>
    );
};

export default ArtistsWrapper;
