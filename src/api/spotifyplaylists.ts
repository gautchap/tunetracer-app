import { fetcher } from "@/api/fetcher";
import { CreatePlaylistResponseSchema } from "@/types/spotifyTypes";

type createPlaylistType = {
  token: string;
  user_id: string;
  name: string;
  description: string;
};

type addTrackToPlaylistType = {
  token: string;
  playlist_id: string;
  uris: string[];
};

export const createPlaylist = async ({
  token,
  user_id,
  name,
  description,
}: createPlaylistType) =>
  fetcher(`https://api.spotify.com/v1/users/${user_id}/playlists`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      name,
      description,
    },
    zodSchema: CreatePlaylistResponseSchema,
  });

export const addTrackToPlaylist = async ({
  token,
  playlist_id,
  uris,
}: addTrackToPlaylistType) =>
  fetcher(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      uris,
    },
  });
