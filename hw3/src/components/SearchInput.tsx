"use client";

import { useRef } from "react";

// import { ChevronDown } from "lucide-react";

// import GrowingTextarea from "@/components/GrowingTextarea";
// import UserAvatar from "@/components/UserAvatar";
// import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
// import useTitle from "@/hooks/useTitle";
// import useUserInfo from "@/hooks/useUserInfo";
// import { cn } from "@/lib/utils";


export default function SearchInput() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex gap-4" onClick={() => textareaRef.current?.focus()}>
      <div className="flex gap-4 w-full px-2">
          <Input
            className="w-96"
            placeholder="搜尋想參加的活動"
            ref={searchInputRef}
          />
        </div>
    </div>
  );
}
