import PlayerSkeleton from "@/components/PlayerSkeleton";
import TrackLenght from "@/components/TrackLength";
import { Player } from "@/components/Player";
import Speakers from "@/components/Speakers";
import { Button } from "@/components/ui/button";
import { useDevice } from "@/hooks/useDevice";
import { useCurrentSong } from "@/hooks/useCurrentSong";

export default function PlayerSection() {
    const current = useCurrentSong();

    const devices = useDevice();

    const artistID = current?.track_window.current_track.artists[0].uri.replace("spotify:artist:", "");

    return (
        <>
            <div className="mx-auto">
                <h1 className="text-center text-2xl mb-5">Now playing</h1>
                <div className="text-center space-y-2">
                    {current ? (
                        <>
                            <a
                                target="_blank"
                                href={`https://open.spotify.com/track/${current.track_window.current_track.id}`}
                                rel="noopener noreferrer"
                            >
                                <img
                                    className="rounded-md shadow-xl mx-auto h-[300px] w-[300px]"
                                    width={300}
                                    height={300}
                                    src={current.track_window.current_track.album.images[0].url}
                                    alt={current.track_window.current_track.album.name}
                                />
                            </a>
                            <p className="font-bold">{current.track_window.current_track.name}</p>
                            <a
                                href={`https://open.spotify.com/artist/${artistID}`}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <p className="hover:underline">{current.track_window.current_track.artists[0].name}</p>
                            </a>
                        </>
                    ) : (
                        <PlayerSkeleton />
                    )}
                </div>
            </div>
            <div className="space-y-4">
                <div className="mx-auto w-3/4 md:w-10/12">
                    <TrackLenght />
                </div>
                <div className="mx-auto w-[300px] space-y-4">
                    <Player />
                    <Speakers />
                    <Button onClick={() => devices.setDevice()}>Player</Button>
                </div>
            </div>
        </>
    );
}
