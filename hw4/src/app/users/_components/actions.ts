import { auth } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";;

import { eq, ne } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session || !session.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  try {
    const currentUser = await db.query.usersTable.findFirst({
      columns: {
        displayId: true,
        username: true,
        email: true,
        provider: true,
      },
      where: eq(usersTable.displayId, session.user.id),
    })

    return {
      id: currentUser?.displayId,
      username: currentUser?.username,
      email: currentUser?.email,
      provider: currentUser?.provider,
    };

  } catch(error) {
    return null;
  }

}

export const getUsers = async () => {
  const session = await auth();
  if (!session || !session?.user?.id) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  try {
    const dbUsers = await db.query.usersTable.findMany({
      where: ne(usersTable.displayId, session.user.id),
    });
    const users = dbUsers.map((dbUser) => {
      return {
        id: dbUser.displayId,
        username: dbUser.username,
        email: dbUser.email,
        provider: dbUser.provider,
      };
    });
    return users;

  } catch (error) {
    return [];
  }
}
