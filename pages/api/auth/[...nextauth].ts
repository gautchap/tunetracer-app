import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";

export const authOptions: NextAuthOptions = {
    providers: [
        SpotifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: {
                params: {
                    scope: "user-top-read playlist-modify-public playlist-modify-private user-read-recently-played",
                    show_dialog: true,
                },
            },
        }),
    ],
    callbacks: {
        async session({ session, token }) {
            if (session) {
                session = Object.assign({}, session, { id: token.id });
                session = Object.assign({}, session, { access_token: token.access_token });
            }
            return session;
        },
        async jwt({ token, user, account }) {
            if (user) {
                token = Object.assign({}, token, { id: user.id });
            }

            if (account) {
                token = Object.assign({}, token, { access_token: account.access_token });
                token = Object.assign({}, token, { refresh_token: account.refresh_token });
            }

            return token;
        },
    },
    pages: {
        error: "/auth/error",
    },
};

export default NextAuth(authOptions);
