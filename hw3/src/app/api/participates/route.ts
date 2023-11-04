import { NextResponse, type NextRequest } from "next/server";

import { and, eq, sql } from "drizzle-orm";
import { z } from "zod";

import { db } from "@/db";
import { participatesTable } from "@/db/schema";

const participateTitleRequestSchema = z.object({
  titleId: z.number().positive(),
  usersUsername: z.string().min(1).max(50),
});

type participateTitleRequest = z.infer<typeof participateTitleRequestSchema>;

export async function GET(request: NextRequest) {
  const data = await request.json();

  try {
    participateTitleRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // Now we can safely use the data from the request body
  // the `as` keyword is a type assertion, this tells typescript
  // that we know what we're doing and that the data is of type LikeTweetRequest.
  // This is safe now because we've already validated the data with zod.
  const { titleId, usersUsername } = data as participateTitleRequest;

  try {
    // This is a common pattern to check if a row exists
    // if the query returns a row with a dummy column of value 1
    // then the row which satisfies the condition exists.
    // You can also select any column here, but since we don't need
    // any of those data, we just select a dummy column of constant value 1,
    // this saves us from copying any data from the disk to the memory.
    //
    // You can also do this with count(*) and check if the count is greater than 0.
    const [exist] = await db
      .select({ dummy: sql`1` })
      .from(participatesTable)
      .where(
        and(
          eq(participatesTable.titleId, titleId),
          eq(participatesTable.usersUsername, usersUsername),
        ),
      )
      .execute();
    // The NextResponse object is a easy to use API to handle responses.
    // IMHO, it's more concise than the express API.
    return NextResponse.json({ participated: Boolean(exist) }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const data = await request.json();

  try {
    participateTitleRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { titleId, usersUsername } = data as participateTitleRequest;

  try {
    await db
      .insert(participatesTable)
      .values({
        titleId,
        usersUsername,
      })
      .onConflictDoNothing()
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}

export async function DELETE(request: NextRequest) {
  const data = await request.json();

  try {
    participateTitleRequestSchema.parse(data);
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { titleId, usersUsername } = data as participateTitleRequest;

  try {
    await db
      .delete(participatesTable)
      .where(
        and(
          eq(participatesTable.titleId, titleId),
          eq(participatesTable.usersUsername, usersUsername),
        ),
      )
      .execute();
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }

  return new NextResponse("OK", { status: 200 });
}
