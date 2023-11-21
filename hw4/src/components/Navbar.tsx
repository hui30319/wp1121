"use client"

import { signOut } from "next-auth/react"

// import { Avatar } from "@/components/ui/avatar"
// import type { User } from "@/lib/types/db"
// import { publicEnv } from "@/lib/env/public";
import Link from "next/link"
import { RxAvatar, RxChatBubble, RxExit } from "react-icons/rx"
import Avatar from "@/components/Avatar"

// export default function Navbar({
//   user,
// }: {
//   user: User[] | null,
// }) {
export default function Navbar() {
  // console.log(user);
  return (
    <>
      <div className="lg:inset-y-0 lg:left-0 lg:z-40 lg:w-30 xl:px-6 lg:overflow-y-auto lg:bg-white lg:border-r-[1px] lg:pb-4 lg:flex lg:flex-col justify-between">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center space-y-1">
            <li>
              <Link
                href="/users"
                className={"first-line:group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semiboldtext-gray-500 hover:text-black hover:bg-gray-100"}
              >
                <RxAvatar className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="sr-only">users</span>
              </Link>
            </li>
            <li>
              <Link
                href="/conversations"
                className={"first-line:group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semiboldtext-gray-500 hover:text-black hover:bg-gray-100"}
              >
                <RxChatBubble className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="sr-only">conversations</span>
              </Link>
            </li>
            <li onClick={() => signOut()}>
              <Link
                href="/"
                className={"first-line:group flex gap-x-3 rounded-md p-3 text-sm leading-6 font-semiboldtext-gray-500 hover:text-black hover:bg-gray-100"}
              >
                <RxExit className="h-6 w-6 shrink-0" aria-hidden="true" />
                <span className="sr-only">logout</span>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div className="cursor-pointer hover:opacity-75 transition">
            <Avatar />
            {/* {user} */}
          </div>
        </nav>       
      </div>
    </>
  )
}

