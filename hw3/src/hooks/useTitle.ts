import { useState } from "react";

import { useRouter } from "next/navigation";
// import { string } from "zod";

export default function useTitle() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const postTitle = async ({
    username,
    title,
    titleFromTime,
    titleToTime,
    replyToTitleId,
  }: {
    username: string | null;
    title: string;
    titleFromTime?: string;
    titleToTime?: string;
    replyToTitleId?: number;
  }) => {
    setLoading(true);

    const res = await fetch("/api/titles", {
      method: "POST",
      body: JSON.stringify({
        username,
        title,
        titleFromTime,
        titleToTime,
        replyToTitleId,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    // router.refresh() is a Next.js function that refreshes the page without
    // reloading the page. This is useful for when we want to update the UI
    // from server components.
    router.refresh();
    setLoading(false);
  };

  return {
    postTitle,
    loading,
  };
}
