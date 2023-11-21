"use client"
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import Avatar from "@/components/Avatar";
type conversation = {
  id: string;
};

export default function UserBox({
  data
}: {
  data: conversation,
}) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push(`/conversations/${data.id}`);
  }, [data, router]);


  return (
    <div 
      onClick={handleClick}
      className={"w-full relative flex items-center space-x-3 p-3 hover:bg-neutral-100 rounded-lg transition cursor-pointer"}
    >
      <Avatar />
      <div className="min-w-0 flex-1">
        <div className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <div className="flex justify-between items-center mb-1">
            <p className="text-md font-medium text-gray-900">
              {data.id}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}