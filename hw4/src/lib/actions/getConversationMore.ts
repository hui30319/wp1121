// import { auth } from "@/app/api/auth/[...nextauth]/route"

import { eq } from "drizzle-orm"
import { db } from "@/db"
import { conversationsTable } from "@/db/schema"

type conveion = {
  id: string;
};
const getConversationMore = async (e: conveion) => {
  try {
    const dbConversations = await db.query.conversationsTable.findMany({
      where: eq(conversationsTable.displayId, e.id),
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
        id: conversation.displayId,
        title: conversation.title,
      };
    });
    // const conversations = dbConversations.filter((conversation) => {
    //   return {
    //     id: conversation.conversationId,
    //   };
    // });
    return conversations;
  } catch (error) {
      return [];
  }
}
export default getConversationMore;
