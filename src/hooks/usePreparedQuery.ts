import { FavArtistsType, FavTracksType, Range } from "@/types/spotifyTypes";
import { useQuery } from "@tanstack/react-query";
import { getFavArtists, getFavTracks } from "@/api/spotifystats";

const QUERY_KEY = {
  artists: "artists",
  tracks: "tracks",
  playlists: "playlists",
};

export const usePreparedArtistQuery = (
  token: string,
  range: Range,
  artists?: FavArtistsType,
) => {
  const {
    data: fetchArtists,
    error: fetchArtistsError,
    isLoading: loadingArtists,
  } = useQuery({
    enabled: token !== null,
    queryKey: [QUERY_KEY.artists, range],
    queryFn: () => getFavArtists({ token, range }),
    initialData: artists,
  });

  return { fetchArtists, fetchArtistsError, loadingArtists };
};

export const usePreparedTrackQuery = (
  token: string,
  range: Range,
  tracks?: FavTracksType,
) => {
  const {
    data: fetchTracks,
    error: fetchTracksError,
    isLoading: loadingTracks,
  } = useQuery({
    enabled: token !== null,
    queryKey: [QUERY_KEY.tracks, range],
    queryFn: () => getFavTracks({ token, range }),
    initialData: tracks,
  });

  return { fetchTracks, fetchTracksError, loadingTracks };
};
