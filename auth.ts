import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import prisma from "./prisma";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  theme: {},
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    authorized({ request, auth }) {
      const pathListRegex = /^(?!\/(features|about|pricing)$)\/\w+$/;
      const { pathname } = request.nextUrl;

      if (pathListRegex.test(pathname)) return !!auth;
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
});
