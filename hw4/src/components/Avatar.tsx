'use client';

import * as React from "react"
// import type { User } from "@/lib/types/db"
import Image from "next/image";

function Avatar() {
  return (
    <div className="relative inline-block rounded-full overflow-hidden h-9 w-9 md:h-11 md:w-11">
      <Image
        fill
        src={'/image.jpg'}
        alt="Avatar"
      />
    </div>
  );
}

export default Avatar;
