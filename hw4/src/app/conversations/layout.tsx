import Navbar from "@/components/Navbar"
// import UsersList from "./_components/UserList"
// import { getCurrentUser } from "./_components/actions"
// import getCurrentUser from "@/lib/actions/getCurrentUser";
// import getConversationMore from "@/lib/actions/getConversationMore"
import getConversations from "@/lib/actions/getConversations"
import ConversationList from "./_components/ConversationList";

// type conveion = {
//   id: string;
// };

export default async function ConversationsLayout({
  children
}: {
  children: React.ReactNode,
}) {
  const conversations = await getConversations();
  console.log(conversations);
  // const cc = conversations.map((e: conveion) => {
  //   const a = getConversationMore(e);
  //   console.log(a);
  // });
 
  // console.log(cc);
  // const users = await getUsers();
  // console.log(user)
  return (
    <main className="flex-rows fixed top-0 flex h-screen w-full overflow-hidden">
      {/* <div className="bg-blue-100 w-1/5"> */}
        <Navbar />
      {/* </div> */}
      <div className="flex w-2/5 flex-col pb-10">
        {/* <UsersList users={users} /> */}
        <ConversationList initState={conversations}/>
      </div>

      <div className="w-full bg-slate-100">
        {children}
      </div>
    </main>
  );
}
