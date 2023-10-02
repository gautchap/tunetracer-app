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

            <a href={artist.external_urls.spotify}>
                <img
                    className="rounded-2xl shadow-lg hidden md:block"
                    src={artist?.images?.[0]?.url}
                    alt={artist.name}
                    width={320}
                    sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 26vw"
                />
                <img
                    className="rounded-2xl shadow-lg block md:hidden"
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