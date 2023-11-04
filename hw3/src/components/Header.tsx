"use client"

// import Image from "next/image";
// import Link from "next/link";

import useUserInfo from "@/hooks/useUserInfo";
import UsernameButton from "@/components/UsernameButton"

// import larry from "@/assets/larry.png";
// import { cn } from "@/lib/utils";

// import ProfileButton from "./ProfileButton";
// import NewButton from "./NewButton";

export default function Header() {
  const { username } = useUserInfo();

  return (
    // aside is a semantic html tag for side content
    // <aside className="flex h-screen flex-col justify-between px-6 py-6">
      // <div className="flex-col gap-2">
      <div className="flex w-full px-4 pt-3">
        <h1 className="mb-2 bg-white px-4 text-xl font-bold min-w-max">{username ?? "..."} (使用者名稱)</h1>
        <UsernameButton />
      </div>
    // </aside>
  );
}

// type HeaderButtonProps = {
//   // allow size, and strokeWidth to be string to match lucide-react's size prop
//   // this is basically a interface so that we can pass in custom component if we need to
//   Icon: React.ComponentType<{
//     size?: number | string;
//     strokeWidth?: number | string;
//   }>;
//   text: string;
//   active?: boolean;
// };

// function HeaderButton({ Icon, text, active }: HeaderButtonProps) {
//   return (
//     <button className="group w-full">
//       <div
//         // prefix a class with hover: to make it only apply when the element is hovered
//         className="flex w-fit items-center gap-4 rounded-full p-2 transition-colors duration-300 group-hover:bg-gray-200 lg:pr-4"
//       >
//         <div className="grid h-[40px] w-[40px] place-items-center">
//           <Icon
//             // now that we defined the interface for Icon, we can pass in the size and strokeWidth props safely
//             size={26}
//             strokeWidth={active ? 3 : 2}
//           />
//         </div>
//         <span
//           // the `cn` helper function basically concatenate your tailwind classes in a safe way
//           // on the surface, it will remove any falsy values from the array, it also remove any redundant classes
//           // this is useful for conditional classes
//           // prefixing a class with max-lg: makes it only apply to screen size below lg, this is the tailwind way of media queries
//           // likewise, prefixing a class with lg: makes it only apply to screen size above lg
//           // read more about tailwind responsive design here: https://tailwindcss.com/docs/responsive-design
//           className={cn("text-xl max-lg:hidden", active && "font-bold")}
//         >
//           {text}
//         </span>
//       </div>
//     </button>
//   );
// }
