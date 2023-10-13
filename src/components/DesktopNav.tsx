import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Link from "next/link";

export function DesktopNav() {
  return (
    <div className="hidden md:flex">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Home
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/tracks" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Tracks
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/artists" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Artists
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
