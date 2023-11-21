import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersToConversationsTable } from "@/db/schema";

export async function getConversationUsers(conversationId: string) {
  const dbUsers = await db.query.usersToConversationsTable.findMany({
    where: eq(usersToConversationsTable.conversationId, conversationId),
    with: {
      user: {
        columns: {
          displayId: true,
          username: true,
          email: true,
        },
      },
    },
    columns: {},
  });

  const users = dbUsers.map((dbUser) => {
    const user = dbUser.user;
    return {
      id: user.displayId,
      username: user.username,
      email: user.email,
    };
  });

  return users;
}