import { FavArtists, FavItemsProps, FavTracks } from "@/types/spotifyTypes";
import { fetcher } from "@/api/fetcher";

export const getFavArtists = async ({ token, range, limit = 21 }: FavItemsProps) =>
    fetcher(`https://api.spotify.com/v1/me/top/artists?time_range=${range}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
        zodSchema: FavArtists,
    });

export const getFavTracks = async ({ token, range = "medium_term", limit = 21 }: FavItemsProps) =>
    fetcher(`https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=${limit}`, {
        headers: { Authorization: `Bearer ${token}` },
        zodSchema: FavTracks,
    });
