import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/prismaClient";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({ 
          where: { email: credentials.email as string } 
        });

        if (!user || !user.password) return null;

        const isValid = await compare(
          credentials.password as string, 
          user.password
        );

        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
});