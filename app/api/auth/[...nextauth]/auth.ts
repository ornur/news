import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import { getUserFromDB } from "@/utils/api";
import { z } from "zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GitHub,
    credentials({
      credentials: {
        phone: { label: "Phone", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const schema = z.object({
            phone: z.string(),
            password: z.string(),
          });
          schema.parse(credentials);
          const user = await getUserFromDB(credentials.phone as string, credentials.password as string);
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          throw new Error("Invalid credentials");
        }
      },
    }),
  ],
});
