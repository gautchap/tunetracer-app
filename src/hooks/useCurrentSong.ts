import { PlayerContext } from "@/context/PlayerProvider";
import { useContext } from "react";

export function useCurrentSong() {
    const context = useContext(PlayerContext);

    if (context?.currentSong === undefined) throw new Error("error");

    return context.currentSong;
}
