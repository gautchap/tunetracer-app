import { FavTracksType, Range } from "@/types/spotifyTypes";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useSession } from "next-auth/react";
import { addTrackToPlaylist, createPlaylist } from "@/api/spotifyplaylists";
import { Button } from "@/components/ui/button";
import { usePreparedTrackQuery } from "@/hooks/usePreparedQuery";
import { TrackLoader } from "@/components/Loader";
import { useToast } from "@/components/ui/use-toast";

type TracksWrapperProps = {
  token: string;
  range: Range;
  initialData?: FavTracksType;
};

const TracksWrapper = ({ token, range, initialData }: TracksWrapperProps) => {
  const { data: session } = useSession();

  const { toast } = useToast();

  const { fetchTracks, fetchTracksError, loadingTracks } =
    usePreparedTrackQuery(token, range, initialData);

  if (fetchTracksError) return <p>Une erreur est survenue</p>;

  const handlePlaylist = async () => {
    const today = new Date();

    const text =
      range === "short_term"
        ? "last 4 weeks"
        : range === "medium_term"
        ? "last 6 months"
        : "all time";

    const playlist = await createPlaylist({
      name: `Top tracks ${today.toLocaleDateString()} (${text})`,
      description: `Your favorite tracks ${text} as of ${today.toLocaleDateString()}`,
      token,
      user_id: session!.id,
    });

    const uris = fetchTracks!.items?.map((track) => track.uri);

    try {
      await addTrackToPlaylist({
        token,
        playlist_id: playlist.id,
        uris,
      });
      toast({
        description: "✅ Votre playlist a été créée avec succès",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "❌ Une erreur est survenue",
      });
      // @ts-ignore
      throw new Error(error);
    }
  };

  return (
    <>
      <Button
        className="translate-x-[-50%] left-1/2 relative md:static md:translate-x-0"
        onClick={handlePlaylist}
      >
        Create playlist
      </Button>
      <Table>
        <TableCaption>A list of your recent listened tracks</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Ranking</TableHead>
            <TableHead>Track&apos;s name</TableHead>
            <TableHead>Artist(s)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loadingTracks &&
            [...Array.from({ length: 10 }).keys()].map((index) => (
              <TrackLoader key={index} index={index} />
            ))}
          {fetchTracks?.items.map((track, index) => (
            <TableRow key={track.id}>
              <TableCell className="font-medium flex items-center gap-3">
                #{index + 1}
                <a
                  target="_blank"
                  href={track.external_urls.spotify}
                  className="w-[50px]"
                >
                  <img
                    className="rounded-lg shadow-lg "
                    width={50}
                    height={50}
                    src={track.album.images ? track.album.images[2].url : ""}
                    alt={track.name}
                  />
                </a>
              </TableCell>
              <TableCell>{track.name}</TableCell>
              <TableCell>
                {track.artists.map((artist) => (
                  <Badge key={artist.id} variant="secondary" className="m-1">
                    <a target="_blank" href={artist.external_urls.spotify}>
                      {artist.name}
                    </a>
                  </Badge>
                ))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default TracksWrapper;
