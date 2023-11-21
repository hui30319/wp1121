// import type { User } from "@/lib/types/db"
"use client"
// import { useParams } from "next/navigation";
// import { MdOutlineGroupAdd } from 'react-icons/md';
import ConversationBox from "./ConversationBox"
// import AddDialog from "./AddDialog";
// import UserBox from "./UserBox";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";

type conversation = {
  id: string;
};

export default function ConversationList({
  initState
}: {
  initState: conversation[],
}) {

  // const router = useRouter();
  // const { conversationId } = useParams();
  // const docId = Array.isArray(conversationId) ? conversationId[0] : conversationId;
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-rborder-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800 py-4">
            Messages  
          </div>
          <div className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition">
            {/* <MdOutlineGroupAdd size={20} /> */}
            {/* <Dialog>
              <DialogTrigger asChild>
                <Button variant={"outline"}>Share</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Share the document</DialogTitle>
                  <DialogDescription>Share the doc with other users.</DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog> */}
            {/* <AddDialog docId={docId}/> */}
          </div>
        </div>
        {initState.map((item) => (
          <ConversationBox
            key={item.id}
            data={item}
            // selected={conversationId === item.id}
          />
        ))}
      </div>
    </aside>
  );
}