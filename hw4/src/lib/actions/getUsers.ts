import { auth } from "@/app/api/auth/[...nextauth]/route"

import { ne } from "drizzle-orm";
import { db } from "@/db"
import { usersTable } from "@/db/schema";

const getUsers = async () => {
  const session = await auth();

  if (!session?.user?.email) {
    return [];
  }

  try {
    const dbUsers = await db.query.usersTable.findMany({
      where:
        ne(usersTable.email, session.user.email)
    });
    const users = dbUsers.map((user) => {
      return {
        id: user.displayId,
        username: user.username,
        email: user.email,
        image: user.image,
        provider: user.provider,
      };
    });
    return users;
  } catch (error) {
    return [];
  }
};

export default getUsers;
