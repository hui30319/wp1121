import { eq } from "drizzle-orm";

import { db } from "@/db";
import { usersTable, usersToConversationsTable } from "@/db/schema";

export const addDocumentAuthor = async (docId: string, email: string) => {
  // Find the user by email
  const [user] = await db
    .select({
      displayId: usersTable.displayId,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));
  if (!user) {
    return false;
  }

  await db.insert(usersToConversationsTable).values({
    userId: user.displayId,
    conversationId: docId,
  });
};
