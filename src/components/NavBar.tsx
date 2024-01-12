import { MobileNav } from "@/components/MobileNav";
import { DesktopNav } from "@/components/DesktopNav";
import { ModeToggle } from "@/components/ThemeToggle";
import { ProfileToggle } from "@/components/ProfileToggle";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton";
import { ButtonLoading } from "@/components/ui/buttonloading";

export function NavBar() {
    const { data: session, status } = useSession();

    return (
        <>
            <header className="py-2 fixed w-full top-0 bg-background/95 supports-[backdrop-filter]:bg-background/60 supports-[backdrop-filter]:backdrop-blur-lg z-10 shadow-sm">
                <nav className="flex items-center justify-between container">
                    <MobileNav />
                    <DesktopNav />
                    <div className="flex items-center gap-4">
                        {status === "loading" ? (
                            <ButtonLoading>Loading ...</ButtonLoading>
                        ) : session ? (
                            <ProfileToggle session={session} />
                        ) : (
                            <LoginButton provider={"spotify"} />
                        )}
                        <ModeToggle />
                    </div>
                </nav>
            </header>
        </>
    );
}
