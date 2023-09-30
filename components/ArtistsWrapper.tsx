import { getFavArtists } from "@/api/spotifystats";
import ArtistCard from "./ArtistCard";
import { useQuery } from "@tanstack/react-query";
import { Range } from "@/types/spotifyTypes";

type ArtistsWrapperProps = {
  token: string;
  range: Range;
};

const ArtistsWrapper = ({ token, range }: ArtistsWrapperProps) => {
  const {
    data: artists,
    error,
    isLoading,
  } = useQuery({
    enabled: token !== null,
    queryKey: ["artists", range],
    queryFn: () => getFavArtists({ token, range }),
  });

  if (isLoading) return <p>loading...</p>;
  if (error) return <p>Une erreur est survenue</p>;

  return (
    <>
      <section className="flex flex-wrap gap-3 justify-center">
        {artists?.items.map((artist, index) => (
          <ArtistCard key={artist.id} artist={artist} ranking={index} />
        ))}
      </section>
    </>
  );
};

export default ArtistsWrapper;
