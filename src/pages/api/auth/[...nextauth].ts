import NextAuth, { NextAuthOptions, TokenSet } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";

const refreshAccessToken = async (token: JWT): Promise<JWT | undefined> => {
  try {
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

    const tokens: TokenSet = await response.json();

    if (!response.ok) throw tokens;

    token = Object.assign({}, token, {
      accessToken: tokens.access_token,
    });
    token = Object.assign({}, token, {
      accessTokenExpires:
        tokens.expires_at && Math.floor(Date.now() / 1000 + tokens.expires_at),
    });
    token = Object.assign({}, token, {
      refreshToken: tokens.refresh_token,
    });
  } catch {
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
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
      if (session && token) {
        session = Object.assign({}, session, { id: token.id });
        session = Object.assign({}, session, {
          accessToken: token.accessToken,
        });
        session = Object.assign({}, session, { error: token.error });
      }
      return session;
    },

    async jwt({ token, user, account }) {
      if (user) {
        token = Object.assign({}, token, { id: user.id });
      }

      if (account) {
        token = Object.assign({}, token, {
          accessToken: account.access_token,
        });
        token = Object.assign({}, token, {
          accessTokenExpires:
            account.expires_at &&
            Math.floor(Date.now() / 1000 + account.expires_at),
        });
        token = Object.assign({}, token, {
          refreshToken: account.refresh_token,
        });
      }

      if (
        token.accessTokenExpires &&
        Date.now() > token.accessTokenExpires * 1000
      ) {
        const newToken = await refreshAccessToken(token);
        if (newToken) return newToken;
      }

      return token;
    },
  },
  pages: {
    error: "/auth/error",
  },
};

export default NextAuth(authOptions);
