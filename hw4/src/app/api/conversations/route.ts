import { NextResponse, type NextRequest } from "next/server";

import { eq, or } from "drizzle-orm";


import { db } from "@/db";
import { conversationsTable, usersToConversationsTable } from "@/db/schema";
import { auth } from "@/app/api/auth/[...nextauth]/route";


// POST /api/users/:documentId
export async function POST(
  req: NextRequest
) {
  try {
    // Get user from session
    const session = await auth();
    const reqBody = await req.json();
    console.log(reqBody);
    if (!session || !session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const currentUserId = session.user.id;
    const { userId } = reqBody;

    const existedConversation= await db.select().from(conversationsTable)
      .where(
        or(
          eq(conversationsTable.userIds, [currentUserId, userId]),
          eq(conversationsTable.userIds, [userId, currentUserId])
      ));
    console.log(existedConversation)
    // const existed_B = await db.query.usersToConversationsTable.findMany({
    //   where: 
    //   eq(usersToConversationsTable.userId, userId),
    // });
    // console.log(existed_A[0].conversationId);
    // console.log(existed_B[0].conversationId);
    // if (existedConversation[0].conversationId) {
    //   return NextResponse.json(existedConversation[0].conversationId);
    // };
    console.log(existedConversation.length)
    if (existedConversation.length > 0) {
    // if (existed_A[0].conversationId === existed_B[0].conversationId) { //!!!!!
      // console.log("DONE!");
      // console.log(existed_A[0]);
      // console.log(NextResponse.json(existedConversation[0]));
      return NextResponse.json(
        { id: existedConversation[0].displayId},
        { status: 200 });
    };
    console.log("NEW")
    const newConversation = await db.insert(conversationsTable).values({
      title: "New Conversation!",
      userIds: [currentUserId, userId],
    }).returning();
  
    const newConversationId = newConversation[0].displayId
    // console.log(newConversationId);
    await db.insert(usersToConversationsTable).values({
      userId: userId,
      conversationId: newConversationId,
    });
    await db.insert(usersToConversationsTable).values({
      userId:currentUserId,
      conversationId: newConversationId,
    });

    return NextResponse.json(
      { id: newConversationId },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        error: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}


export async function GET() {
  return NextResponse.json({count: 100});
}
