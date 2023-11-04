import { useState } from "react";

import { useRouter } from "next/navigation";

export default function useParticipate() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const participateTitle = async ({
    titleId,
    usersUsername,
  }: {
    titleId: number;
    usersUsername: string;
  }) => {
    if (loading) return;
    setLoading(true);

    const res = await fetch("/api/participates", {
      method: "POST",
      body: JSON.stringify({
        titleId,
        usersUsername,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  const unparticipateTitle = async ({
    titleId,
    usersUsername,
  }: {
    titleId: number;
    usersUsername: string;
  }) => {
    if (loading) return;

    setLoading(true);
    const res = await fetch("/api/participates", {
      method: "DELETE",
      body: JSON.stringify({
        titleId,
        usersUsername,
      }),
    });

    if (!res.ok) {
      const body = await res.json();
      throw new Error(body.error);
    }

    router.refresh();
    setLoading(false);
  };

  return {
    participateTitle,
    unparticipateTitle,
    loading,
  };
}
