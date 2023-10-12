import { Artist } from "@/types/spotifyTypes";

type ArtistCardProps = {
  artist: Artist;
  ranking: number;
};

const ArtistCard = ({ artist, ranking }: ArtistCardProps) => {
  return (
    <article>
      <p className="font-bold ml-1">
        #{ranking + 1} {artist.name}
      </p>

      <a
        href={artist.external_urls.spotify}
        className="inline-block overflow-hidden rounded-2xl"
      >
        <img
          className="shadow-lg hidden md:block hover:scale-110 transition"
          src={artist?.images?.[0]?.url}
          alt={artist.name}
          width={320}
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 26vw"
        />
        <img
          className="shadow-lg block md:hidden hover:scale-125 transition"
          src={artist?.images?.[1]?.url}
          alt={artist.name}
          width={160}
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 26vw"
        />
      </a>
    </article>
  );
};

export default ArtistCard;
