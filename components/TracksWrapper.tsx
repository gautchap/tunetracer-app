import { getFavTracks } from "@/api/spotifystats";
import { useQuery } from "@tanstack/react-query";
import { Range } from "@/types/spotifyTypes";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

type TracksWrapperProps = {
  token: string;
  range: Range;
};

const TracksWrapper = ({ token, range }: TracksWrapperProps) => {
  const {
    data: tracks,
    error,
    isLoading,
  } = useQuery({
    enabled: token !== null,
    queryKey: ["tracks", range],
    queryFn: () => getFavTracks({ token, range }),
  });

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>Une erreur est survenue</p>;

  return (
    <>
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
          {tracks?.items.map((track, index) => (
            <TableRow key={track.id}>
              <TableCell className="font-medium flex items-center gap-3">
                #{index + 1}
                <Link href={track.external_urls.spotify}>
                  <img
                    className="rounded-lg shadow-lg"
                    width={50}
                    height={50}
                    src={track.album.images ? track.album.images[2].url : ""}
                    alt={track.name}
                  />
                </Link>
              </TableCell>
              <TableCell>{track.name}</TableCell>
              <TableCell>
                {track.artists.map((artist) => (
                  <p key={artist.id}>{artist.name}</p>
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
