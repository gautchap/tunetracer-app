import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export function MobileNav() {
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
        <div className="flex items-center md:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <button className="h-5 w-5">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="1em"
                            viewBox="0 0 448 512"
                            className="fill-current bg-transparent text-foreground h-full w-full"
                        >
                            <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
                        </svg>
                    </button>
                </SheetTrigger>
                <SheetContent side="left" className="p-10">
                    <SheetHeader className="text-left">
                        <SheetTitle>
                            <SheetClose asChild>
                                <Link href="/">Home</Link>
                            </SheetClose>
                        </SheetTitle>
                        <hr />
                    </SheetHeader>
                    <div className="flex flex-col gap-2 pt-2">
                        <SheetClose asChild>
                            <Link onClick={handleClick} href="/tracks">
                                Tracks
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link onClick={handleClick} href="/artists">
                                Artists
                            </Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link onClick={handleClick} href="/playing">
                                Playing
                            </Link>
                        </SheetClose>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
