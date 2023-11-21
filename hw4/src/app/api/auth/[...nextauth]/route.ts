import NextAuth from "next-auth"
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm"

import { db } from "@/db"
import { usersTable } from "@/db/schema"
import { authSchema } from "@/validators/auth"


export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  providers: [
    GitHubProvider, 
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        username: { label: "Userame", type: "text", optional: true },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        let validatedCredentials: {
          email: string;
          username?: string;
          password: string;
        };

        try {
          validatedCredentials = authSchema.parse(credentials);
        } catch (error) {
          console.log("Wrong credentials. Try again.");
          return null;
        }
        const { email, username, password } = validatedCredentials;

        const [existedUser] = await db
          .select({
            id: usersTable.displayId,
            username: usersTable.username,
            email: usersTable.email,
            provider: usersTable.provider,
            hashedPassword: usersTable.hashedPassword,
          })
          .from(usersTable)
          .where(eq(usersTable.email, validatedCredentials.email.toLowerCase()))
          .execute();
        if (!existedUser) {
          // Sign up
          if (!username) {
            console.log("Name is required.");
            return null;
          }
          const hashedPassword = await bcrypt.hash(password, 10);
          const [createdUser] = await db
            .insert(usersTable)
            .values({
              username,
              email: email.toLowerCase(),
              hashedPassword,
              provider: "credentials",
            })
            .returning();
          return {
            id: createdUser.displayId,
            name: createdUser.username,
            email: createdUser.email,
          };
        }

        // Sign in
        if (existedUser.provider !== "credentials") {
          console.log(`The email has registered with ${existedUser.provider}.`);
          return null;
        }
        if (!existedUser.hashedPassword) {
          console.log("The email has registered with social account.");
          return null;
        }

        const isValid = await bcrypt.compare(password, existedUser.hashedPassword);
        if (!isValid) {
          console.log("Wrong password. Try again.");
          return null;
        }
        return {
          id: existedUser.id,
          name: existedUser.username,
          email: existedUser.email,
        };
      },
    })
  ],
  callbacks: {
    async session({ session, token }) {
      const email = token.email || session?.user?.email;
      if (!email) return session;
      const [user] = await db
        .select({
          id: usersTable.displayId,
          username: usersTable.username,
          provider: usersTable.provider,
          email: usersTable.email,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email.toLowerCase()))
        .execute();

      return {
        ...session,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          provider: user.provider,
        },
      };
    },
    async jwt({ token, account }) {
      // Sign in with social account, e.g. GitHub, Google, etc.
      if (!account) return token;
      const { name, email } = token;
      const provider = account.provider;
      if (!name || !email || !provider) return token;

      // Check if the email has been registered
      const [existedUser] = await db
        .select({
          id: usersTable.displayId,
        })
        .from(usersTable)
        .where(eq(usersTable.email, email.toLowerCase()))
        .execute();
      if (existedUser) return token;
      if (provider !== "github") return token;

      // Sign up
      await db.insert(usersTable).values({
        username: name,
        email: email.toLowerCase(),
        provider,
      });
      console.log(token);
      return token;
    },
  },
  pages: {
    signIn: "/",
  },
  // // debug: process.env.NODE_ENV === "development",
  // session: {
  //   strategy: "jwt",
  // },
  // secret: process.env.AUTH_SECRET,
});
