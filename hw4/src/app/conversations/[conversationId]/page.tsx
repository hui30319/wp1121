// import { getConversationUsers } from "@/lib/actions/getConversationUsers"
// import Avatar from "@/components/Avatar";
// import { useParams } from "next/navigation";
// interface IParams {
//   conversationId: string;
// }

const ConversationPage = async () => {
  // const { conversationId } = useParams();
  // const docId = Array.isArray(conversationId) ? conversationId[0] : conversationId;
  // const users = getConversationUsers(params.conversationId);

  return ( 
    <div className="lg:pl-80 h-full">
      {/* {users.map((user, index) => (
        <form key={index} className="flex w-full items-center gap-2">
          <Avatar />
          <div className="flex grow flex-col ">
            <h2 className="text-sm font-semibold">{user.username}</h2>
            <p className="text-xs text-gray-600">{user.email}</p>
          </div>
        </form>
      ))} */}
      asd
    </div>
  );
}

export default ConversationPage;