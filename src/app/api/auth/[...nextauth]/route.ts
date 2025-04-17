import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email: credentials.email },
          });

          if (!user) return null;

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            username: user.username,
          } as User;
        } catch (error) {
          console.error("Erro na autenticação:", error);
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (account?.provider === "google") {
        const existingUser = await prisma.user.findUnique({
          where: { email: token.email! },
        });

        if (!existingUser) {
          const newUser = await prisma.user.create({
            data: {
              email: token.email!,
              username: profile?.name || token.name || "Usuário Google",
              password: "",
              points: 0,
              house: "Gryffindor",
            },
          });

          token.id = newUser.id;
          token.username = newUser.username;
        } else {
          token.id = existingUser.id;
          token.username = existingUser.username;
        }
      }

      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = (user as any).username;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const userByEmail = await prisma.user.findUnique({
        where: { email: token.email ?? "" },
      });
      session.user = {
        ...session.user,
        id: userByEmail?.id ?? "",
        email: token.email as string,
        username: token.name as string,
        image: token.picture as string | undefined,
      };

      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
