import { useSpotifySDK } from "@/hooks/useSpotifySDK";
import { useCurrentSong } from "@/hooks/useCurrentSong";
import { PauseIcon, PlayIcon, TrackNextIcon, TrackPreviousIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import PlayerSkeleton from "@/components/PlayerSkeleton";
import Speakers from "@/components/Speakers";
import TrackLenght from "./TrackLength";
import { useSession } from "next-auth/react";

export default function SidePlayer() {
    const { data: session } = useSession();

    const player = useSpotifySDK();

    const currentSong = useCurrentSong();

    const isLoading = currentSong ? "primary" : "primary/50";

    const [toggle, setToggle] = useState(currentSong?.paused ?? true);

    if (!session) return null;

    const artistID = currentSong?.track_window.current_track.artists[0].uri.replace("spotify:artist:", "");

    return (
        <>
            <div className="h-20 bg-secondary fixed w-full bottom-0 flex items-center px-4 justify-between shadow-inner">
                <div className="w-48">
                    {currentSong ? (
                        <div className="flex justify-center space-x-2">
                            <a
                                target="_blank"
                                href={`https://open.spotify.com/track/${currentSong.track_window.current_track.id}`}
                                rel="noopener noreferrer"
                            >
                                <img
                                    className="rounded-md shadow-xl mx-auto h-16 w-16"
                                    width={64}
                                    height={64}
                                    src={currentSong.track_window.current_track.album.images[1].url}
                                    alt={currentSong.track_window.current_track.album.name}
                                />
                            </a>
                            <div>
                                <p className="font-bold">{currentSong.track_window.current_track.name}</p>
                                <a
                                    href={`https://open.spotify.com/artist/${artistID}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <p className="text-xs hover:underline">
                                        {currentSong.track_window.current_track.artists[0].name}
                                    </p>
                                </a>
                            </div>
                        </div>
                    ) : (
                        <PlayerSkeleton size={"sm"} />
                    )}
                </div>
                <div className="w-1/3">
                    <div className="flex justify-center gap-4 items-center">
                        <TrackPreviousIcon
                            onClick={() => {
                                if (!currentSong) return;
                                setToggle(false);
                                player?.previousTrack();
                            }}
                            className={`h-8 w-8 text-${isLoading} cursor-pointer`}
                        />

                        {toggle ? (
                            <PlayIcon
                                onClick={() => {
                                    if (!currentSong) return;
                                    setToggle(!toggle);
                                    player?.resume();
                                }}
                                className={`h-10 w-10 bg-${isLoading} rounded-full p-2 text-secondary cursor-pointer`}
                            />
                        ) : (
                            <PauseIcon
                                onClick={() => {
                                    if (!currentSong) return;
                                    setToggle(!toggle);
                                    player?.pause();
                                }}
                                className={`h-10 w-10 bg-${isLoading} rounded-full p-2 text-secondary cursor-pointer`}
                            />
                        )}

                        <TrackNextIcon
                            onClick={() => {
                                if (!currentSong) return;
                                setToggle(false);
                                player?.nextTrack();
                            }}
                            className={`h-8 w-8 text-${isLoading} cursor-pointer`}
                        />
                    </div>

                    <TrackLenght size="sm" />
                </div>
                <div className="w-48">
                    <Speakers />
                </div>
            </div>
        </>
    );
}
