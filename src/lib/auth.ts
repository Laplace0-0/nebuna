import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import { getServerSession } from "next-auth/next";
import { XataClient } from "@/utils/xata";

const xata = new XataClient();

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt", // Explicitly set JWT strategy
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const existingUser = await xata.db.nextauth_users
          .filter({ email: user.email })
          .getFirst();

        if (!existingUser) {
          await xata.db.nextauth_users.create({
            email: user.email,
            name: user.name,
            image: user.image || "", // Handle missing image case
          });
        }
        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    newUser: "/signup",
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};

export const auth = () => getServerSession(authOptions);
