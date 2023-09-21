import Image from "next/image";
import { Track } from "@/types/spotifyTypes";

type TrackCardProps = {
    track: Track;
};

const TrackCard = ({ track }: TrackCardProps) => {
    return (
        <tr>
            <td style={{ width: "4em", lineHeight: "0em", padding: "0.5em 0" }}>
                <Image
                    width={50}
                    height={50}
                    // sizes="(max-width: 768px) 80vw, (max-width: 1200px) 40vw, 26vw"
                    src={track.album.images ? track.album.images[2].url : ""}
                    alt={track.name}
                />
            </td>
            <td>
                <div
                    style={{
                        display: "flex",
                        width: "50%",
                        justifyContent: "space-between",
                    }}
                >
                    <p>{track.name}</p>
                    <div>
                        {track.artists.map((artist) => (
                            <p key={artist.id}>{artist.name}</p>
                        ))}
                    </div>
                </div>
            </td>
        </tr>
    );
};

export default TrackCard;
