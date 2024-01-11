import { PlayerContext } from "@/context/PlayerProvider";
import { useContext } from "react";

export function useSpotifySDK() {
    const context = useContext(PlayerContext);

    if (context?.spotifyPlayer === undefined) throw new Error("error");

    return context.spotifyPlayer;
}
