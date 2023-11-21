"use client"

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/lib/types/db"

import Avatar from "@/components/Avatar";

export default function UserBox({
  user
}: {
  user: User,
}) {
  const router = useRouter();

  const handleClick = useCallback( async() => {
    // console.log(user.id);
    const res = await fetch(`/api/conversations`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user.id,
      })})
    if (!res.ok) {
      return;
    } 
    const data = await res.json();
    console.log(data);
    router.push(`/conversations/${data.id}`);
      // console.log(data);
    
  }, [user.id, router]);

  return (
    <>
      <div
        onClick={handleClick}
        className="w-full relative flex 
          items-center 
          space-x-3 
          bg-white 
          p-3 
          hover:bg-neutral-100
          rounded-lg
          transition
          cursor-pointer
        "
      >
        <Avatar />
        <div className="min-w-0 flex-1">
          <div className="focus:outline-none">
            <span className="absolute inset-0" aria-hidden="true" />
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm font-medium text-gray-900">
                {user.username}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

