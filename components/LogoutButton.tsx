import { signOut } from "next-auth/react";

export default function LogoutButton() {
    return (
        <button style={{ cursor: "pointer" }} onClick={() => signOut()}>
            Sign Out
        </button>
    );
}
