import ArtistCard from "./ArtistCard";
import { FavArtistsType, Range } from "@/types/spotifyTypes";
import { usePreparedArtistQuery } from "@/hooks/usePreparedQuery";
import { ArtistLoader } from "@/components/Loader";

type ArtistsWrapperProps = {
  token: string;
  range: Range;
  initialData?: FavArtistsType;
};

const ArtistsWrapper = ({ token, range, initialData }: ArtistsWrapperProps) => {
  const { fetchArtists, fetchArtistsError, loadingArtists } =
    usePreparedArtistQuery(token, range, initialData);

  if (fetchArtistsError) return <p>Une erreur est survenue</p>;

  return (
    <>
      <section className="flex flex-wrap gap-3 justify-center">
        {loadingArtists &&
          [...Array.from({ length: 10 }).keys()].map((index) => (
            <ArtistLoader key={index} />
          ))}

        {fetchArtists?.items.map((artist, index) => (
          <ArtistCard key={artist.id} artist={artist} ranking={index} />
        ))}
      </section>
    </>
  );
};

export default ArtistsWrapper;
