import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function DesktopNav() {
    const { data: session } = useSession();
    const { toast } = useToast();

    const handleClick = () => {
        if (!session) {
            toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "You need to log in before access this page.",
                action: (
                    <ToastAction onClick={() => signIn("spotify")} altText="Try again">
                        Log In
                    </ToastAction>
                ),
            });
        }
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
                    <NavigationMenuItem>
                        <Link href="/tracks" legacyBehavior passHref>
                            <NavigationMenuLink onClick={handleClick} className={navigationMenuTriggerStyle()}>
                                Tracks
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/artists" legacyBehavior passHref>
                            <NavigationMenuLink onClick={handleClick} className={navigationMenuTriggerStyle()}>
                                Artists
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/playing" legacyBehavior passHref>
                            <NavigationMenuLink onClick={handleClick} className={navigationMenuTriggerStyle()}>
                                Playing
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
