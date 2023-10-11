import { useEffect, useState } from "react";

// import { Add as AddIcon } from "@mui/icons-material";
import { Button } from "@mui/material";

import CardList from "@/components/CardList";
import HeaderBar from "@/components/HeaderBar";
import Typography from "@mui/material/Typography";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";

function App() {
  const { lists, fetchLists, fetchCards } = useCards();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [buttonDelete, setButtonDelete] = useState(false);
  // const [isButtonVisible, setIsButtonVisible] = useState(false);
  // const toggleButtonVisibility = () => {
  //   setButtonDelete(!buttonDelete);
  // };

  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  return (
    <>
      <HeaderBar />
      <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
        <Typography sx={{ flex: 1 }} variant="h5" fontWeight="bold">
          My playlists
        </Typography>
        <div>
          <Button
            variant="contained"
            color="success"
            className="w-30"
            onClick={() => setNewListDialogOpen(true)}
          >
            {"Add"}
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            color="success"
            className="w-30"
            // onClick={onClose}
            onClick={() => {setButtonDelete(!buttonDelete)}}
          >
            {buttonDelete ? ("Done") : ("Delete")}
          </Button>
          {/* <Button
            variant="contained"
            color="success"
            className="w-30"
            onClick={() => setButtonDelete(!buttonDelete)}
          >
            {buttonDelete}
          </Button> */}
        </div>
        <NewListDialog
          open={newListDialogOpen}
          onClose={() => setNewListDialogOpen(false)}
        />
      </main>
      <main className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
        {lists.map((list) => (
          <CardList
            key={list.id} {...list}
            done={buttonDelete}
            onDone={() => setButtonDelete(false)}
          />
        ))}
      </main>
    </>
  );
}

export default App;
