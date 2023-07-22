import { FavItemsProps } from "@/types/spotify";

export const getFavArtists = async ({ token, type, range = "medium_term", limit = 21 }: FavItemsProps) => {
    try {
        const response = await fetch(`https://api.spotify.com/v1/me/top/${type}?time_range=${range}&limit=${limit}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const json = await response.json();
        return await json;
    } catch (error) {
        return error;
    }
};
