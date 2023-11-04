"use client";

import { useRef } from "react";

// import GrowingTextarea from "@/components/GrowingTextarea";
// import UserAvatar from "@/components/UserAvatar";
// import useTweet from "@/hooks/useTweet";
import useTitle from "@/hooks/useTitle";
import useUserInfo from "@/hooks/useUserInfo";
// import { Input } from "@/components/ui/input";
// import { cn } from "@/lib/utils";

type ReplyInputProps = {
  replyToTitleId: number;
  replyToUsername: string;
  participated: boolean;
};

export default function ReplyInput({
  replyToTitleId,
  // replyToUsername,
  participated,
}: ReplyInputProps) {
  const { username } = useUserInfo();
  const replyTitleRef = useRef<HTMLInputElement>(null);
  const { postTitle, loading } = useTitle();
  // const [participated, setParticipated] = useState(initialParticipated);

  const handleReply = async () => {
    const title = replyTitleRef.current?.value;
    if (!username) return;
    if (!title) return;

    try {
      await postTitle({
        username,
        title,
        
        replyToTitleId,
      });
      replyTitleRef.current.value = "";
      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
      replyTitleRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
    } catch (e) {
      console.error(e);
      alert("Error posting reply");
    }
  };
  
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleReply()
    }
  };

  return (
    // this allows us to focus (put the cursor in) the textarea when the user
    // clicks anywhere on the div
    <div onClick={() => replyTitleRef.current?.focus()}>
      <div className="grid gap-4 px-4 pt-20 pb-5 text-xs flex-col w-full">
        { participated &&
          <input
            placeholder={`${username} 留下你的想法`}
            // defaultValue={searchParams.get("username") ?? ""}
            className="rounded bg-orange-100 border border-orange-300 h-6 px-1 py-1"
            ref={replyTitleRef}
            onKeyDown={handleKeyDown}
            disabled={loading}
          /> }

        { !participated &&
          <div className="rounded bg-orange-100 border border-orange-300 h-6 px-1 py-1">
            參加活動來加入討論吧
          </div> }
      </div>
        {/* <GrowingTextarea
          ref={textareaRef}
          wrapperClassName="col-start-2 row-start-2"
          className="bg-transparent text-xl outline-none placeholder:text-gray-500"
          placeholder="留下你的想法"
        /> */}

      {/* // <div className="p-4 text-end">
      //   <button
      //     className={cn(
      //       "my-2 rounded-full bg-brand px-4 py-2 text-white transition-colors hover:bg-brand/70",
      //       "disabled:cursor-not-allowed disabled:bg-brand/40 disabled:hover:bg-brand/40",
      //     )}
      //     onClick={handleReply}
      //     disabled={loading}
      //   >
      //     Reply
      //   </button>
      // </div>
      // </> } */}



    </div>
  );
}
