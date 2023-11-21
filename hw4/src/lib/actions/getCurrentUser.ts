import { auth } from "@/app/api/auth/[...nextauth]/route"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { usersTable } from "@/db/schema"

const getCurrentUser = async () => {
  try {
    const session = await auth();

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await db.selectDistinct({
      id: usersTable.displayId,
      username: usersTable.username,
      email: usersTable.email,
      image: usersTable.image,
      provider: usersTable.provider,
    }).from(usersTable).
      where(
        eq(usersTable.email, session.user.email))

    return currentUser;
  } catch (error) {
    return null;
  }
};

export default getCurrentUser;
