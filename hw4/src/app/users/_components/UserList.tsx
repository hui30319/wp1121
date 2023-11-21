import type { User } from "@/lib/types/db"
import UserBox from "./UserBox";

export default function UserList({
  users
}: {
  users: User[],
}) {
  return (
    <aside className="fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block overflow-y-auto border-rborder-gray-200 block w-full left-0">
      <div className="px-5">
        <div className="flex justify-between mb-4 pt-4">
          <div className="text-2xl font-bold text-neutral-800 py-4">
            Chat
          </div>
        </div>
        {users.map((user) => (
          <UserBox
            key={user.id}
            user={user}
          />
        ))}
      </div>
    </aside>
  );
}