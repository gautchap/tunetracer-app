import { getAvailableDevices } from "@/api/devices";
import { PlayerContext } from "@/context/PlayerProvider";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useContext } from "react";

export function useDevice() {
    const context = useContext(PlayerContext);
    const { data: session } = useSession();
    const { data: devices } = useQuery({
        queryKey: ["devices"],
        queryFn: () => getAvailableDevices(session!.accessToken),
        enabled: !!session?.accessToken,
    });

    if (context?.device === undefined) throw new Error("error");

    const setDevice = async () => {
        try {
            return await fetch(`https://api.spotify.com/v1/me/player`, {
                method: "PUT",
                body: JSON.stringify({ device_ids: [context.device], play: true }),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
        } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error);
        }
    };

    return { setDevice, devices: devices?.devices };
}
