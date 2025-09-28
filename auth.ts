import NextAuth from 'next-auth';
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/prisma/prismaClient";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: { strategy: "jwt" },
    providers: [Google, GitHub],
});