import type { NextAuthConfig } from "next-auth";

import Discord from "next-auth/providers/discord"; 

export default {
  providers: [ 
    Discord({
      clientId: process.env.AUTH_DISCORD_ID,
      clientSecret: process.env.AUTH_DISCORD_SECRET,
      // Discord returns iss=https://discord.com (RFC 9207). Without this,
      // Auth.js expects https://authjs.dev and rejects the callback.
      issuer: "https://discord.com",
      authorization: {
        params: { scope: "identify email" },
      },
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
} satisfies NextAuthConfig;
