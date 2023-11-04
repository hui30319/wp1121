"use client";

// import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
// import { MoreHorizontal } from "lucide-react";

// import UserAvatar from "@/components/UserAvatar";
import useUserInfo from "@/hooks/useUserInfo";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogFooter,
  // DialogHeader,
  // DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useTitle from "@/hooks/useTitle";
// import useParticipate from "@/hooks/useParticipate";
import dayjs from "dayjs";

export default function NewButton() {
  const { username } = useUserInfo();
  // const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const timeFromInputRef = useRef<HTMLInputElement>(null);
  const timeToInputRef = useRef<HTMLInputElement>(null);
  const { postTitle, loading } = useTitle();
  // const { participateTitle } = useParticipate();
  
  const openDialog = () => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (open) {
      setDialogOpen(true);
    } else {
      // If handleSave returns false, it means that the input is invalid, so we
      // don't want to close the dialog
      setDialogOpen(false);
    }
  };
  const inputTimeFormat = /^\d{4}-\d{2}-\d{2} \d{2}$/;

  const titleSave = async () => {
    const title = titleInputRef.current?.value;
    const titleFromTime = timeFromInputRef.current?.value;
    const titleToTime = timeToInputRef.current?.value;
    if (!title) return alert("沒有填寫標題");
    if (!titleFromTime || !titleToTime) return alert("沒有填寫開始或結束時間");
    if (!inputTimeFormat.test(titleFromTime) || !inputTimeFormat.test(titleToTime)) return alert("開始或結束時間格式錯誤");
    if (dayjs(titleToTime).diff(dayjs(titleFromTime)) <= 0) return alert("開始時間早於結束時間");
    if (dayjs(titleToTime).diff(dayjs(titleFromTime)) > 7*24*60*60*1000) return alert("開始與結束時間相差最多 7 天");

    try {
      await postTitle({
        username,
        title,
        titleFromTime,
        titleToTime,
      });
      titleInputRef.current.value = "";
      timeFromInputRef.current.value = "";
      timeToInputRef.current.value = "";
      // this triggers the onInput event on the growing textarea
      // thus triggering the resize
      // for more info, see: https://developer.mozilla.org/en-US/docs/Web/API/Event
      titleInputRef.current.dispatchEvent(
        new Event("input", { bubbles: true, composed: true }),
      );
      closeDialog();
    } catch (e) {
      console.error(e);
      alert("Error posting title");
    }
  };
  
  return (
    <>
      <Button
        // className="flex items-center gap-2 rounded-full p-3 text-start transition-colors duration-300 hover:bg-gray-200"
        // go to home page without any query params to allow the user to change their username and handle
        // see src/components/NameDialog.tsx for more details
        onClick={openDialog}
      >
        <p className="text-sm font-bold bg-center">新增</p>
      </Button>
      <Dialog open={dialogOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          {/* <div className="grid gap-4 py-4">
            <Input
              placeholder="標題"
              // defaultValue={searchParams.get("username") ?? ""}
              // className={cn(usernameError && "border-red-500", "col-span-3")}
              ref={titleInputRef}
            />
          </div> */}
          <div className="grid gap-4 py-4">
            <div className="col-span-3 flex items-center gap-2">
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  placeholder="標題"
                  // defaultValue={searchParams.get("username") ?? ""}
                  // className={cn(usernameError && "border-red-500", "col-span-3")}
                  ref={titleInputRef}
                />
              </div>
            </div>
            <div className="grid grid-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                From
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  placeholder="YYYY:MM:DD HH"
                  // defaultValue={new Date().toISOString().replac  e(/T|Z|\.\d{3}/g, ' ').slice(0,13)}
                  defaultValue={new Date(new Date().getTime()-new Date().getTimezoneOffset()*60*1000).toISOString().replace(/T/, ' ').slice(0,13)}
                  // defaultValue={searchParams.get("username") ?? ""}
                  // className={cn(usernameError && "border-red-500", "col-span-3")}
                  ref={timeFromInputRef}
                />
              </div>
            </div>
            <div className="grid grid-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                To
              </Label>
              <div className="col-span-3 flex items-center gap-2">
                <Input
                  placeholder="YYYY-MM-DD HH"
                  // defaultValue={searchParams.get("handle") ?? ""}
                  // className={cn(handleError && "border-red-500")}
                  ref={timeToInputRef}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={titleSave} disabled={loading}>新增</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
