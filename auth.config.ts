import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

// Edge-compatible configuration
// This file is imported by middleware which runs in Edge Runtime
// DO NOT import Prisma or any Node.js-only dependencies here
export default {
  trustHost: true,
  pages: {
    signIn: '/customer/login',
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return `${baseUrl}/customer/account`;
    },
  },
  providers: [
    Google,
    GitHub,
  ],
} satisfies NextAuthConfig;

