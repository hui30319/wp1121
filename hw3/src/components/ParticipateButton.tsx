"use client";

import { useState } from "react";
import type { EventHandler, MouseEvent } from "react";

// import { Heart } from "lucide-react";

// import TimeText from "@/components/TimeText";
import useParticipate from "@/hooks/useParticipate";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
type LikeButtonProps = {
  initialParticipates: number;
  initialParticipated?: boolean;
  titleId: number;
  title: string;
  titleFromTime: string | null;
  titleToTime: string | null;
  username?: string;
};

export default function ParticipateButton({
  initialParticipates,
  initialParticipated,
  titleId,
  title,
  titleFromTime,
  titleToTime,
  username,
}: LikeButtonProps) {
  const [participated, setParticipated] = useState(initialParticipated);
  const [participatesCount, setParticipatesCount] = useState(initialParticipates);
  const { participateTitle, unparticipateTitle, loading } = useParticipate();

  const handleClick: EventHandler<MouseEvent> = async (e) => {
    // since the parent node of the button is a Link, when we click on the
    // button, the Link will also be clicked, which will cause the page to
    // navigate to the tweet page, which is not what we want. So we stop the
    // event propagation and prevent the default behavior of the event.
    e.stopPropagation();
    e.preventDefault();
    if (!username) return;
    if (participated) {
      await unparticipateTitle({
        titleId,
        usersUsername: username,
      });
      setParticipatesCount((prev) => prev - 1);
      setParticipated(false);
    } else {
      await participateTitle({
        titleId,
        usersUsername: username,
      });
      setParticipatesCount((prev) => prev + 1);
      setParticipated(true);
    }
  };

  return (
    <div className="flex grow justify-between">
      <div className="flex space-y-3 flex-col grow font-bold">
        <div className="flex rounded-md bg-gray-200 h-fit justify-between">
          <p className="my-1.5 mx-5 whitespace-pre-wrap font-bold inline-flex">{title}</p>
          <p className="my-1.5 mx-8 text-right">{participatesCount}人參加</p>
        </div>
        <div className="flex grow rounded-md bg-gray-200 h-fit justify-between">
          <p className="mx-5 whitespace-pre-wrap font-bold inline-flex">
            { `From ${dayjs(titleFromTime).format("YYYY-MM-DD HH")} to ${dayjs(titleToTime).format("YYYY-MM-DD HH")}` } 
          </p>
          {/* <p>
            {`${dayjs("2020-01-02 00").diff(dayjs("2020-01-02 01"))}`}
          </p> */}
          {/* <TimeText date={"1980:12:22 9"} format="YYYY:MM:DD HH" /> */}
        </div>
      </div>
      <button
        className={cn(
          "mx-3 flex w-16 items-center gap-1 rounded-lg p-1.5 hover:bg-brand/10 border border-black", 
          participated && "bg-green-100 border-green-500")}
        // className={cn(
        //   "flex w-16 items-center gap-1 hover:text-brand",
        //   participated && "text-brand",
        // )}
        onClick={handleClick}
        disabled={loading}
      >
        {/* <div
          className={cn(
            "flex items-center gap-1 rounded-full p-1.5 transition-colors duration-300 hover:bg-brand/10",
            participated && "bg-brand/10",
          )}
        >
          <Heart size={18} />
        </div> */}
        {/* {participatesCount} */}
        {participated &&
        <p className="font-bold">我已 參加</p>}
        {!participated &&
        <p className="font-bold">我想 參加</p>}
        {/* {participatesCount}人參加 */}
        {/* {likesCount > 0 && likesCount} */}
      </button>
    </div>
  );
}
