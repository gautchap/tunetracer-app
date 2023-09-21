import { getFavTracks } from "@/api/spotifystats";
import { Session } from "next-auth";
import { useQuery } from "@tanstack/react-query";
import { Range } from "@/types/spotifyTypes";
import TrackCard from "./TrackCard";

type TracksWrapperProps = {
    session: Session;
    range: Range;
};

const TracksWrapper = ({ session, range }: TracksWrapperProps) => {
    const {
        data: tracks,
        error,
        isLoading,
    } = useQuery({
        enabled: session !== null,
        queryKey: ["tracks", range],
        queryFn: () => getFavTracks({ token: session.accessToken, range }),
    });

    if (isLoading) return <p>loading...</p>;
    if (error) return <p>Une erreur est survenue</p>;

    return (
        <>
            <section
                style={{ width: "100%" }}
                // style={{ display: "flex", flexWrap: "wrap", gap: "2em" }}
            >
                <table style={{ width: "100%" }}>
                    <tbody>{tracks?.items.map((track) => <TrackCard key={track.id} track={track} />)}</tbody>
                </table>
            </section>
        </>
    );
};

export default TracksWrapper;
