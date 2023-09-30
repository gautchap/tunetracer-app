import { useContext } from "react";
import { MobileNav } from "@/components/MobileNav";
import { MobileContext } from "@/context/MobileProvider";
import { DesktopNav } from "@/components/DesktopNav";
import { ModeToggle } from "@/components/ThemeToggle";
import { ProfileToggle } from "@/components/ProfileToggle";
import { useSession } from "next-auth/react";
import LoginButton from "@/components/LoginButton";
import { ButtonLoading } from "@/components/ui/buttonloading";

export function NavBar() {
  const isMobile = useContext(MobileContext);
  const { data: session, status } = useSession();

  return (
    <>
      <nav className="container py-2 flex items-center justify-between">
        {isMobile ? <MobileNav /> : <DesktopNav />}
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
    </>
  );
}
