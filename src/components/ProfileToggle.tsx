import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut } from "next-auth/react";
import { PinRightIcon } from "@radix-ui/react-icons";
import { Session } from "next-auth";

type ProfileToggleProps = {
  session: Session | null;
};

export function ProfileToggle({ session }: ProfileToggleProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar>
            <AvatarImage src={session?.user?.image} />
            <AvatarFallback>
              {session?.user?.name?.toUpperCase().slice(0, 2)}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex justify-between items-center"
        >
          <p className="font-medium text-red-500 hover:text-red-500">
            Sign out
          </p>
          <PinRightIcon className="text-red-500" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
