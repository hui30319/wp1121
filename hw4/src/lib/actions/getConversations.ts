import { auth } from "@/app/api/auth/[...nextauth]/route"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { usersToConversationsTable } from "@/db/schema"

const getConversations = async () => {
  const session = await auth();
  // console.log("1")
  if (!session?.user?.email) {
    return [];
  }
  // console.log("2")
  console.log(session.user.id)
  try {
    const dbConversations = await db.query.usersToConversationsTable.findMany({
      where: eq(usersToConversationsTable.userId, session.user.id),
      // with:{
      //   usersToConversationsTable: true 
        // {s
        //   // where: eq(usersToConversationsTable.userId, session.user.id),
        // }
      // }
    })
    // console.log(dbConversations);
    // console.log("3");
    // const conversations = dbConversations.map(async (conversation) => {
    //   // const [a] = await db.select().from(conversationsTable)
    //   //   .where(
    //   //     eq(conversationsTable.displayId, conversation.conversationId))
    //   // return {
    //   //   id: a.displayId,
    //   //   title: a.title,
    //   // };
    // });
    const conversations = dbConversations.map((conversation) => {
      return {
        id: conversation.conversationId,
      };
    });
    // const conversations = dbConversations.filter((conversation) => {
    //   return {
    //     id: conversation.conversationId,
    //   };
    // });
    return conversations
  } catch (error) {
      return [];
  }
}

export default getConversations;
