import { useSession } from "next-auth/react";

export const usePlaySong = () => {
    const { data: session } = useSession();

    const playSong = (song: string) => {
        fetch("https://api.spotify.com/v1/me/player/play", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
            },
            body: JSON.stringify({
                uris: [song],
            }),
        });
    };

    return { playSong };
};
