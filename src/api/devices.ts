import { DeviceScheme } from "@/types/spotifyTypes";
import { fetcher } from "./fetcher";

export const getAvailableDevices = (token: string) =>
    fetcher("https://api.spotify.com/v1/me/player/devices", {
        headers: { Authorization: `Bearer ${token}` },
        zodSchema: DeviceScheme,
    });
