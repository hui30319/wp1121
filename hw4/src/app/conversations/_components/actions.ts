import { auth } from "@/app/api/auth/[...nextauth]/route"
import { redirect } from "next/navigation";
import { publicEnv } from "@/lib/env/public";

import { ne } from "drizzle-orm";

import { db } from "@/db";
import { usersTable } from "@/db/schema";

export const getUsers = async () => {
  const session = await auth();
  if (!session || !session?.user?.email) {
    redirect(publicEnv.NEXT_PUBLIC_BASE_URL);
  }
  try {
    const users = await db.query.usersTable.findMany({
      where: ne(usersTable.email, session.user.email)
    });
    return users;
  } catch (error) {
    return [];
  }
}
