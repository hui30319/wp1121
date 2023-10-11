// import { useRef, useState } from "react";
import { useState } from "react";
import reactLogo from '../assets/react.svg'
// import AddIcon from "@mui/icons-material/Add";
// import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
// import Button from "@mui/material/Button";
// import ClickAwayListener from "@mui/material/ClickAwayListener";
// import Divider from "@mui/material/Divider";
// import IconButton from "@mui/material/IconButton";
// import Input from "@mui/material/Input";
import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

import useCards from "@/hooks/useCards";
import CardListDialog from "@/components/CardListDialog";
// import { deleteList, updateList } from "@/utils/client";
import { deleteList } from "@/utils/client";
// import Card from "./Card";
import type { CardProps } from "./Card";
// import CardDialog from "./CardDialog";

export type CardListProps = {
  id: string;
  name: string;
  description: string;
  cards: CardProps[];
};

// type BotoonCheck = {
//   del:boolean;
// }
type DeleteDoneBotton = {
  done: boolean;
  onDone: () => void;
};
type AssembleProps = CardListProps & DeleteDoneBotton;


// export default function CardList({ id, name, cards, del }: CardListPropss) {
// export default function CardList({ id, name, cards }: CardListProps, del: boolean) {
export default function CardList({ id, name, description, cards, done }: AssembleProps) {
  // console.log(del);  
  // const { id, name, cards, done, onDone } = props;
  // console.log(cards.length);
  const [cardListDialogOpen, setCardListDialogOpen] = useState(false);
  // const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  // const [editingName, setEditingName] = useState(false);
  const { fetchLists } = useCards();
  // const inputRef = useRef<HTMLInputElement>(null);
  // const handleUpdateName = async () => {
  //   if (!inputRef.current) return;

  //   const newName = inputRef.current.value;
  //   if (newName !== name) {
  //     try {
  //       await updateList(id, { name: newName });
  //       fetchLists();
  //     } catch (error) {
  //       alert("Error: Failed to update playlist name");
  //     }
  //   }
  //   setEditingName(false);
  // };

  const handleDelete = async () => {
    try {
      await deleteList(id);
      fetchLists();
    } catch (error) {
      alert("Error: Failed to delete playlist");
    }
  };

  return (
    <>
      <Paper 
        className="w-80 p-6"
        sx={{borderRadius: 4}}
        >

        {done && (
          <IconButton
            color="error" 
            className="grid place-items-center"
            sx={{ maxWidth: "0px", maxHeight: "0px"}} 
            onClick={handleDelete}>
            <CancelRoundedIcon />
          </IconButton>
        )}

        <img src={reactLogo} width={150} className="mr: 2" onClick={() => setCardListDialogOpen(true)}/>
        <br></br>
        <div>{cards.length} {"songs"}</div>
        <div>{name}</div>
        <CardListDialog
          id={id}
          name={name}
          description={description}
          cards={cards}
          open={cardListDialogOpen}
          onClose={() => setCardListDialogOpen(false)}
        />
      </Paper>
    </>
  );
}
