import { useCurrentSong } from "@/hooks/useCurrentSong";
import { getTime } from "@/lib/getTime";
import { Progress } from "@/components/ui/progress";

type TrackLenghtProps = {
    size?: "sm" | "md";
};

export default function TrackLenght({ size = "md" }: TrackLenghtProps) {
    const currentSong = useCurrentSong();

    if (!currentSong) return <Progress value={null} />;

    const remainingTime = getTime(currentSong.duration - currentSong.position);

    const currentTime = getTime(currentSong.position);

    return (
        <>
            {size === "md" ? (
                <>
                    <div className="flex justify-between text-secondary-accent-foreground text-xs">
                        <span className="w-6">{currentTime}</span>
                        <span className="w-8">-{remainingTime}</span>
                    </div>
                    <Progress value={(currentSong.position / currentSong.duration) * 100} />
                </>
            ) : (
                <div className="flex justify-between text-secondary-accent-foreground text-xs items-center space-x-1">
                    <span className="w-6">{currentTime}</span>
                    <Progress value={(currentSong.position / currentSong.duration) * 100} />
                    <span className="w-8">-{remainingTime}</span>
                </div>
            )}
        </>
    );
}
