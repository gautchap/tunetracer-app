import { useCurrentSong } from "@/hooks/useCurrentSong";
import { useSpotifySDK } from "@/hooks/useSpotifySDK";
import { PauseIcon, PlayIcon, TrackNextIcon, TrackPreviousIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const Player = () => {
    const player = useSpotifySDK();

    const currentSong = useCurrentSong();

    const isLoading = currentSong ? "primary" : "primary/50";

    const [toggle, setToggle] = useState(currentSong?.paused ?? true);

    return (
        <>
            <div className="flex justify-evenly items-center">
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
                        className={`h-16 w-16 bg-${isLoading} rounded-full p-4 text-secondary cursor-pointer`}
                    />
                ) : (
                    <PauseIcon
                        onClick={() => {
                            if (!currentSong) return;
                            setToggle(!toggle);
                            player?.pause();
                        }}
                        className={`h-16 w-16 bg-${isLoading} rounded-full p-4 text-secondary cursor-pointer`}
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
        </>
    );
};
