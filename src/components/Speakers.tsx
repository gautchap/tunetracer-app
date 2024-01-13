import { SpeakerLoudIcon, SpeakerModerateIcon } from "@radix-ui/react-icons";
import { Slider } from "@/components/ui/slider";
import { useSpotifySDK } from "@/hooks/useSpotifySDK";
import { ChangeEvent, memo, useRef, useState, PointerEvent } from "react";

const Speakers = memo(function Speakers() {
    const player = useSpotifySDK();

    const reference = useRef<HTMLSpanElement>(null);

    const [volume, setVolume] = useState<number>(
        (reference?.current?.lastChild?.lastChild as { ariaValueNow?: number })?.ariaValueNow || 0.5
    );

    if (!player)
        return (
            <div className="flex justify-evenly items-center">
                <SpeakerModerateIcon />
                <Slider defaultValue={[volume]} max={1} step={0.001} />
                <SpeakerLoudIcon />
            </div>
        );

    const syncVolume = (vol: number) => {
        player.setVolume(vol);
        setVolume(vol);
    };

    const handleSoundChange = (event: ChangeEvent<HTMLInputElement>) => {
        syncVolume(Number(event.target.ariaValueNow) || 0.5);
    };

    const handleSoundPointer = (event: PointerEvent<HTMLDivElement>) => {
        const divElement = event.target as HTMLDivElement;

        const lastChild = divElement.lastChild as Element | null;

        if (lastChild instanceof HTMLElement) {
            const ariaValueNow = lastChild.getAttribute("aria-valuenow");
            syncVolume(Number(ariaValueNow) || 0.5);
        }
    };

    return (
        <div className="flex justify-evenly items-center">
            <SpeakerModerateIcon onClick={() => syncVolume(0)} />
            <Slider
                className="select-none touch-none"
                onClick={() =>
                    syncVolume(
                        (reference.current?.lastChild?.lastChild as { ariaValueNow?: number })?.ariaValueNow ?? 0.5
                    )
                }
                ref={reference}
                defaultValue={[volume]}
                onPointerUp={handleSoundPointer}
                onChange={handleSoundChange}
                max={1}
                step={0.001}
            />
            <SpeakerLoudIcon onClick={() => syncVolume(1)} />
        </div>
    );
});

export default Speakers;
