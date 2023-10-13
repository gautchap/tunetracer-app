import { DefaultSession, Account as NextAuthAccount } from "next-auth";
import { JWT as NextAuthJWT } from "next-auth/jwt";

declare module "next-auth" {
  // eslint-disable-next-line no-unused-vars
  interface Session extends DefaultSession {
    id: string;
    accessToken: string;
    error?: string;
    user: {
      image: string | undefined;
    } & DefaultSession["user"];
  }
  // eslint-disable-next-line no-unused-vars
  interface Account extends NextAuthAccount {
    access_token: string;
    refresh_token: string;
    expires_at: number;
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT extends NextAuthJWT {
    id: string;
    accessToken: string;
    refreshToken: string;
    accessTokenExpires?: number;
    error?: "RefreshAccessTokenError";
  }
}
