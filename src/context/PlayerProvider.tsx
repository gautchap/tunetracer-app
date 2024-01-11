/* eslint-disable no-undef */
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState, createContext } from "react";

type PlayerContextType = {
    spotifyPlayer: Spotify.Player | null;
    device: String | null;
    currentSong: Spotify.PlaybackState | null;
};

export const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

type PlayerProviderProps = {
    children: ReactNode;
};

export default function PlayerProvider({ children }: PlayerProviderProps) {
    const [spotifyPlayer, setSpotifyPlayer] = useState<Spotify.Player | null>(null);
    const { data: session } = useSession();
    const [isReady, setIsReady] = useState(false);
    const [currentSong, setCurrentSong] = useState<Spotify.PlaybackState | null>(null);
    const [device, setDevice] = useState<String | null>(null);

    useEffect(() => {
        if (session && !isReady) {
            // eslint-disable-next-line github/no-dynamic-script-tag
            const script = document.createElement("script");
            script.src = "https://sdk.scdn.co/spotify-player.js";
            script.async = true;

            document.body.append(script);

            window.onSpotifyWebPlaybackSDKReady = () => {
                const player = new window.Spotify.Player({
                    name: "Web Player",
                    getOAuthToken: (callback) => {
                        callback(session.accessToken);
                    },
                    volume: 0.5,
                });

                player.addListener("ready", async ({ device_id }) => {
                    try {
                        setIsReady(true);
                        setDevice(device_id);
                        return await fetch(`https://api.spotify.com/v1/me/player`, {
                            method: "PUT",
                            body: JSON.stringify({ device_ids: [device_id], play: false }),
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${session.accessToken}`,
                            },
                        });
                    } catch (error) {
                        // eslint-disable-next-line no-console
                        console.log(error);
                    }
                });

                // eslint-disable-next-line github/no-then
                player.connect().then(() => setSpotifyPlayer(player));

                return () => player.disconnect();
            };
        }
    }, [session]);

    useEffect(() => {
        if (!isReady && !spotifyPlayer) return;

        let interval: any = null;

        interval = setInterval(() => {
            // eslint-disable-next-line github/no-then
            spotifyPlayer?.getCurrentState().then((state) => {
                if (!state) return;
                if (state.playback_id.trim() === "") return;

                setCurrentSong(state);
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [spotifyPlayer, isReady]);

    return <PlayerContext.Provider value={{ spotifyPlayer, device, currentSong }}>{children}</PlayerContext.Provider>;
}
