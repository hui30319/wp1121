import Navbar from "@/components/Navbar"
import UsersList from "./_components/UserList"
// import { getCurrentUser } from "./_components/actions"
// import getCurrentUser from "@/lib/actions/getCurrentUser";
import getUsers from "@/lib/actions/getUsers"
export default async function UsersLayout({
  children
}: {
  children: React.ReactNode,
}) {
  // const user = await getCurrentUser();
  const users = await getUsers();
  // console.log(user)
  return (
    <main className="flex-rows fixed top-0 flex h-screen w-full overflow-hidden">
      {/* <div className="bg-blue-100 w-1/5"> */}
        <Navbar />
      {/* </div> */}
      <div className="flex w-2/5 flex-col pb-10">
        <UsersList users={users} />
      </div>

      <div className="w-full bg-slate-100">
        {children}
      </div>
    </main>
  );
}
