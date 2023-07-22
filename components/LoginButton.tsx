import { signIn } from "next-auth/react";

type ButtonProps = {
    provider: string;
};

export default function LoginButton({ provider }: ButtonProps) {
    return <button onClick={() => signIn(provider)}>Sign with {provider}</button>;
}
