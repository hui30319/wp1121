import Link from "next/link";
import { redirect } from "next/navigation";

import { eq, asc, sql, and } from "drizzle-orm";
import {
  ArrowLeft,
  // MessageCircle,
  // MoreHorizontal,
  // Repeat2,
  // Share,
} from "lucide-react";

import ParticipateButton from "@/components/ParticipateButton";
import ReplyInput from "@/components/ReplyInput";
// import TimeText from "@/components/TimeText";
// import Tweet from "@/components/Tweet";
// import ReplyTitle from "@/components/ReplyTitle"
// import { Separator } from "@/components/ui/separator";
import { db } from "@/db";
import { participatesTable, titlesTable, usersTable } from "@/db/schema";
// import { getAvatar } from "@/lib/utils";
// import { Title } from "@radix-ui/react-dialog";

type TweetPageProps = {
  params: {
    // this came from the file name: [tweet_id].tsx
    title_id: string;
  };
  searchParams: {
    // this came from the query string: ?username=madmaxieee
    username?: string;
    // handle?: string;
  };
};

// these two fields are always available in the props object of a page component
export default async function TweetPage({
  params: { title_id },
  searchParams: { username },
}: TweetPageProps) {
  // this function redirects to the home page when there is an error
  const errorRedirect = () => {
    const params = new URLSearchParams();
    username && params.set("username", username);
    // handle && params.set("handle", handle);
    redirect(`/?${params.toString()}`);
  };

  // if the tweet_id can not be turned into a number, redirect to the home page
  const title_id_num = parseInt(title_id);
  if (isNaN(title_id_num)) {
    errorRedirect();
  }

  // This is the easiest way to get the tweet data
  // you can run separate queries for the tweet data, likes, and liked
  // and then combine them in javascript.
  //
  // This gets things done for now, but it's not the best way to do it
  // relational databases are highly optimized for this kind of thing
  // we should always try to do as much as possible in the database.

  // This piece of code runs the following SQL query on the tweets table:
  // SELECT
  //   id,
  //   content,
  //   user_handle,
  //   created_at
  //   FROM tweets
  //   WHERE id = {tweet_id_num};
  const [titleData] = await db
    .select({
      id: titlesTable.id,
      title: titlesTable.title,
      titleFromTime: titlesTable.titleFromTime,
      titleToTime: titlesTable.titleToTime,
      usersUsername: titlesTable.usersUsername,
      createdAt: titlesTable.createdAt,
    })
    .from(titlesTable)
    .where(eq(titlesTable.id, title_id_num))
    .execute();

  // Although typescript thinks tweetData is not undefined, it is possible
  // that tweetData is undefined. This can happen if the tweet doesn't exist.
  // Thus the destructuring assignment above is not safe. We need to check
  // if tweetData is undefined before using it.
  if (!titleData) {
    errorRedirect();
  }

  // This piece of code runs the following SQL query on the tweets table:
  // SELECT
  //  id,
  //  FROM likes
  //  WHERE tweet_id = {tweet_id_num};
  // Since we only need the number of likes, we don't actually need to select
  // the id here, we can select a constant 1 instead. Or even better, we can
  // use the count aggregate function to count the number of rows in the table.
  // This is what we do in the next code block in likesSubquery.
  const participates = await db
    .select({
      id: participatesTable.id,
    })
    .from(participatesTable)
    .where(eq(participatesTable.titleId, title_id_num))
    .execute();

  const numParticipates = participates.length;

  const [participated] = await db
    .select({
      id: participatesTable.id,
    })
    .from(participatesTable)
    .where(
      and(
        eq(participatesTable.titleId, title_id_num),
        eq(participatesTable.usersUsername, username ?? ""),
      ),
    )
    .execute();

  const [user] = await db
    .select({
      username: usersTable.username,
    })
    .from(usersTable)
    .where(eq(usersTable.username, titleData.usersUsername))
    .execute();

  const title = {
    id: titleData.id,
    title: titleData.title,
    titlteFromTime: titleData.titleFromTime,
    titleToTime: titleData.titleToTime,
    username: user.username,
    participates: numParticipates,
    createdAt: titleData.createdAt,
    participated: Boolean(participated),
  };

  // The following code is almost identical to the code in src/app/page.tsx
  // read the comments there for more info.
  const participatesSubquery = db.$with("participates_count").as(
    db
      .select({
        titleId: participatesTable.titleId,
        participates: sql<number | null>`count(*)`.mapWith(Number).as("participates"),
      })
      .from(participatesTable)
      .groupBy(participatesTable.titleId),
  );

  const participatedSubquery = db.$with("participated").as(
    db
      .select({
        titleId: participatesTable.titleId,
        participated: sql<number>`1`.mapWith(Boolean).as("participated"),
      })
      .from(participatesTable)
      .where(eq(participatesTable.usersUsername, username ?? "")),
  );

  const replies = await db
    .with(participatesSubquery, participatedSubquery)
    .select({
      id: titlesTable.id,
      title: titlesTable.title,
      username: usersTable.username,
      participates: participatesSubquery.participates,
      createdAt: titlesTable.createdAt,
      participated: participatedSubquery.participated,
    })
    .from(titlesTable)
    .where(eq(titlesTable.replyToTitleId, title_id_num))
    // .orderBy(desc(titlesTable.createdAt))
    .orderBy(asc(titlesTable.createdAt))
    .innerJoin(usersTable, eq(titlesTable.usersUsername, usersTable.username))
    .leftJoin(participatesSubquery, eq(titlesTable.id, participatesSubquery.titleId))
    .leftJoin(participatedSubquery, eq(titlesTable.id, participatedSubquery.titleId))
    .execute();

  return (
    <>
      <div className="flex h-screen w-full max-w-2xl flex-col overflow-scroll pt-2">
        <div className="mb-2 flex items-center gap-8 px-4">
          <Link href={{ pathname: "/", query: { username } }}>
            <ArrowLeft size={18} />
          </Link>
          {/* <div className="flex grow justify-between">
            <div className="flex space-y-3 flex-col grow font-bold">
              <div className="flex rounded-md bg-gray-200 h-fit justify-between">
                <p className="my-1.5 mx-5 whitespace-pre-wrap font-bold inline-flex">{title.title}</p>
                <p className="my-1.5 mx-8 text-right">{title.participates}人參加</p>
              </div>
              <div className="flex grow rounded-md bg-gray-200 h-fit justify-between">
                <p className="mx-5 whitespace-pre-wrap font-bold inline-flex">From time to time</p>
              </div>
            </div> */}
            <ParticipateButton
              username={username}
              initialParticipates={title.participates}
              initialParticipated={title.participated}
              titleId={title.id}
              title={title.title}
              titleFromTime={title.titlteFromTime}
              titleToTime={title.titleToTime}
            />
          {/* </div> */}
        </div>
        {/* <div className="flex flex-col px-4 pt-3">
          <div className="flex justify-between">
            <div className="flex w-full gap-3">
              <div>
                <p className="font-bold">{title.username ?? "..."}</p>
              </div>
            </div>
            <button className="h-fit rounded-full p-2.5 text-gray-400 transition-colors duration-300 hover:bg-brand/10 hover:text-brand">
              <MoreHorizontal size={16} />
            </button>
          </div>
          <article className="mt-3 whitespace-pre-wrap text-xl">
            {title.title}
          </article>
          <time className="my-4 block text-sm text-gray-500">
            <TimeText date={title.createdAt} format="h:mm A · D MMM YYYY" />
          </time>
        </div> */}
        <ReplyInput replyToTitleId={title.id} replyToUsername={title.username} participated={title.participated}/>
        {/* <Separator /> */}
        {replies.map((reply) => (
          <div key={reply.id} className="grid gap-4 px-4 pt-2 text-xs flex-col w-full">
            <div className="rounded bg-gray-200 h-6 px-1 py-1">
              {`${reply.username}: ${reply.title}`}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
