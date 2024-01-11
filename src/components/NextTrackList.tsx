import { useCurrentSong } from "@/hooks/useCurrentSong";
import NextTrack from "@/components/NextTrack";

export default function NextTrackList() {
    const current = useCurrentSong();

    return (
        <div className="flex flex-col">
            {current?.track_window.next_tracks.map((track, index) => <NextTrack key={index} track={track} />)}
        </div>
    );
}
