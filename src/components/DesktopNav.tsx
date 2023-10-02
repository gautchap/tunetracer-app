import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Range } from "@/types/spotifyTypes";
import { prefetchArtists, prefetchTracks } from "@/api/spotifystats";
import { useSession } from "next-auth/react";

export function DesktopNav() {
    const { data: session } = useSession();

    const prefetch = async (type: "artists" | "tracks", range: Range) => {
        if (!session) return;
        if (type === "artists") await prefetchArtists(session.accessToken, range);
        if (type === "tracks") await prefetchTracks(session.accessToken, range);
    };

    return (
        <div className="hidden md:flex">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <Link href="/" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem onMouseEnter={() => prefetch("tracks", "medium_term")}>
                        <Link href="/tracks" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Tracks</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem onMouseEnter={() => prefetch("artists", "medium_term")}>
                        <Link href="/artists" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Artists</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/playlists" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Playlists</NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
