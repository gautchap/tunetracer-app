import NextAuth, { NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";

const refreshAccessToken = async (token: JWT) => {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    }),
    method: "POST",
  });

  const newToken = await response.json();

  const date = new Date();

  return {
    ...token,
    accessToken: newToken.access_token,
    refreshToken: newToken.refresh_token ?? token.refreshToken,
    accessTokenExpires:
      date.setSeconds(date.getSeconds() + newToken.expires_in) / 1000,
  };
};

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      authorization: {
        params: {
          scope:
            "user-top-read user-read-email playlist-modify-public playlist-modify-private user-read-recently-played",
          show_dialog: true,
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },

    async jwt({ token, account }) {
      if (account) {
        token.id = account.providerAccountId;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.accessTokenExpires = account.expires_at;
        return token;
      }
      if (
        token.accessTokenExpires &&
        Date.now() < token.accessTokenExpires * 1000
      ) {
        return token;
      }

      return await refreshAccessToken(token);
    },
  },
  pages: {
    error: "/auth/error",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
