import { Artist } from "@/types/spotifyTypes";
import { useContext } from "react";
import { MobileContext } from "@/context/MobileProvider";

type ArtistCardProps = {
  artist: Artist;
  ranking: number;
};

const ArtistCard = ({ artist, ranking }: ArtistCardProps) => {
  const isMobile = useContext(MobileContext);

  return (
    <article>
      <p className="font-bold ml-1">
        #{ranking + 1} {artist.name}
      </p>

      <a href={artist.external_urls.spotify}>
        <img
          className="rounded-2xl shadow-lg"
          src={
            artist.images
              ? isMobile
                ? artist.images[1].url
                : artist.images[0].url
              : ""
          }
          alt={artist.name}
          width={isMobile ? 160 : 320}
          // height={isMobile ? 160 : 320}
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 26vw"
        />
      </a>
    </article>
  );
};

export default ArtistCard;
