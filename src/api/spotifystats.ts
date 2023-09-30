import {
  FavArtists,
  FavItemsProps,
  FavTracks,
  Range,
} from "@/types/spotifyTypes";
import { fetcher } from "@/api/fetcher";
import { queryClient } from "@/pages/_app";

export const getFavArtists = async ({
  token,
  range,
  limit = 21,
}: FavItemsProps) =>
  fetcher(
    `https://api.spotify.com/v1/me/top/artists?time_range=${range}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      zodSchema: FavArtists,
    },
  );

export const getFavTracks = async ({
  token,
  range = "medium_term",
  limit = 21,
}: FavItemsProps) =>
  fetcher(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${range}&limit=${limit}`,
    {
      headers: { Authorization: `Bearer ${token}` },
      zodSchema: FavTracks,
    },
  );

export const prefetchArtists = async (token: string, range: Range) => {
  await queryClient.prefetchQuery({
    queryKey: ["artists", range],
    queryFn: () => getFavArtists({ token, range }),
  });
};

export const prefetchTracks = async (token: string, range: Range) => {
  await queryClient.prefetchQuery({
    queryKey: ["tracks", range],
    queryFn: () => getFavTracks({ token, range }),
  });
};
