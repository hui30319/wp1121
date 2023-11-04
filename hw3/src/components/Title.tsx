import Link from "next/link";

// import { MessageCircle, Repeat2, Share } from "lucide-react";
import { Check } from "lucide-react";
// import { Separator } from "@/components/ui/separator";
// import { getAvatar } from "@/lib/utils";
// import { Button } from "@/components/ui/button"

// import ParticipateButton from "./ParticipateButton";
// import TimeText from "./TimeText";

type TitleProps = {
  username?: string;
  id: number;
  authorName: string;
  title: string;
  participates: number;
  createdAt: Date;
  participated: boolean;
};

// note that the Tweet component is also a server component
// all client side things are abstracted away in other components
export default function Title({
  username,
  id,
  // authorName,
  title,
  participates,
  // createdAt,
  participated,
}: TitleProps) {
  return (
    <>
      <Link
        className="w-full px-4 pt-3 transition-colors hover:bg-gray-50 items-center"
        href={{
          pathname: `/title/${id}`,
          query: {
            username,
          },
        }}
      >
        <div className="flex gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {/* <img
            src={getAvatar(authorName)}
            alt="avatar"
            className="h-12 w-12 rounded-full"
          /> */} 
          <div className="flex grow rounded-md bg-gray-200 h-fit justify-between">
            <p className="my-2.5 mx-5 whitespace-pre-wrap font-bold inline-flex">{title}</p>
            <div className="flex mx-8">
              {participated &&
                <Check className="my-2.5 mx-5 text-green-500"/>
              }
              <p className="my-2.5 text-right">{participates}人參加</p>
            </div>
            {/* <div className="my-2 flex items-center justify-between gap-4 text-gray-400">
              <ParticipateButton
                initialParticipates={participates}
                initialParticipated={participated}
                titleId={id}
                username={username}
              />
            </div> */}
          </div>
        </div>
      </Link>
      {/* <Separator /> */}
    </>
  );
}
