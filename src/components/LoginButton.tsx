import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

type ButtonProps = {
    provider: string;
};

export default function LoginButton({ provider }: ButtonProps) {
    return <Button onClick={() => signIn(provider)}>Sign with {provider}</Button>;
}
