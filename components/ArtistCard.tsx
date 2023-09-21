import Image from "next/image";
import { Artist } from "@/types/spotifyTypes";

type ArtistCardProps = {
    artist: Artist;
};

const ArtistCard = ({ artist }: ArtistCardProps) => {
    return (
        <div>
            <p>{artist.name}</p>
            <a href={artist.external_urls.spotify}>
                <Image
                    src={artist.images ? artist.images[0].url : ""}
                    alt={artist.name}
                    width={320}
                    height={320}
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 26vw"
                />
            </a>
        </div>
    );
};

export default ArtistCard;
