import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "./(models)/UserModel";
import { authConfig } from "./auth.config";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      profile(profile) {
        return profile;
      },
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  secret: process.env.SECRET,
  callbacks: {
    async jwt({ token, user }) {
      // const userExists = await User.findOne({ email: user.email });
      // token.username = userExists.username;
      // console.log({ token: token, user: user });
      return token;
    },
    async signIn({ user, account }) {
      // check if user exists
      const userExists = await User.findOne({ email: user.email });
      if (!userExists) {
        await User.create({
          full_name: user.name,
          messages: [],
          email: user.email,
        });
        return true;
      }
      return true;
    },
    async session({ session, token }) {
      if (session) {
        const userExists = await User.findOne({ email: session.user.email });
        session.user.username = userExists.username;
      }

      // session.user.username = token.username;
      return session;
    },
  },
});
