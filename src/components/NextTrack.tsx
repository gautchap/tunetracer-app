/* eslint-disable no-undef */
import { usePlaySong } from "@/hooks/usePlaySong";
import { getTime } from "@/lib/getTime";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { memo } from "react";

const NextTrack = memo(function NextTrack({ track }: { track: Spotify.Track }) {
    const { playSong } = usePlaySong();

    return (
        <div className="flex items-center my-2">
            <div className="flex items-center w-2/3">
                <HamburgerMenuIcon className="h-4 w-4" />
                <img
                    width={64}
                    height={64}
                    className="cursor-pointer"
                    onClick={() => playSong(track.uri)}
                    src={track.album.images[1].url}
                    alt={track.name}
                />
                <div>
                    <p className="font-bold">{track.name}</p>
                    <p>{track.artists[0].name}</p>
                </div>
            </div>
            <div className="w-1/3">
                <p>{getTime(track.duration_ms)}</p>
                <p>2016</p>
            </div>
        </div>
    );
});
export default NextTrack;
