import { useRef, useState, forwardRef } from "react";
import reactLogo from '../assets/react.svg'
// import reactLogo from '../assets/react.svg'
// import AddIcon from "@mui/icons-material/Add";
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CloseIcon from '@mui/icons-material/Close';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
// import Paper from "@mui/material/Paper";

import Dialog from "@mui/material/Dialog";


import useCards from "@/hooks/useCards";
import { deleteList, updateList } from "@/utils/client";

import Card from "./Card";
import type { CardProps } from "./Card";
import CardDialog from "./CardDialog";
import { CheckBox, NestCamWiredStand } from "@mui/icons-material";

export type CardListProps = {
  id: string;
  name: string;
  description: string;
  cards: CardProps[];
};

type BoxCheck = {
  isChecked: boolean;
}
type BoxListPropss = CardListProps & BoxCheck;

type CardListDialogProps = {
  open: boolean;
  onClose: () => void;
} & CardListProps;

// const Checkbox = ({ id, name, cards, isChecked }: <Omit<BoxListPropss, "id">>) => {
//   return (
//     <input
//       id={id}
//       name={name}
//     />
//   );
// };

// export default function CardList({ id, name, cards, del }: CardListPropss) {
// export default function CardList({ id, name, cards }: CardListProps, del: boolean) {
export default function CardListDialog({ id, name, description, cards, open, onClose }: CardListDialogProps) {
  // const { id, name, cards, open } = props;
  // const { id, name, cards, open, onClose } = props;
  // console.log(open);
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [editingListName, setEditingListName] = useState(false);
  const [editingListDescription, setEditingListDescription] = useState(false);
  // const [editingListName, setEditingListDe] = useState(false);
  const { fetchLists } = useCards();
  const inputRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const handleUpdateName = async () => {
    if (!inputRef.current) return;
    // if (!descriptionRef.current) return;
    const newName = inputRef.current.value;
    // const newDescription = descriptionRef.current.value;
    if (newName !== name) {
      try {
        await updateList(id, { name: newName });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update playlist name");
      }
    }
    setEditingListName(false);
  };

  const handleUpdateDescription = async () => {
    if (!descriptionRef.current) return;
    // const newName = inputRef.current.value;
    const newDescription = descriptionRef.current.value;
    if (newDescription !== description) {
      try {
        await updateList(id, { description:  newDescription });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update playlist name");
      }
    }
    setEditingListDescription(false);
  };
  // const handleDelete = async () => {
  //   try {
  //     await deleteList(id);
  //     fetchLists();
  //   } catch (error) {
  //     alert("Error: Failed to delete playlist");
  //   }
  // };
 

  return (
    <>
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ flex: 1 }} variant="h5" component="div" fontWeight="bold">
              WP Music
            </Typography>
            <IconButton
              edge="start"
              // color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <div className="flex gap-2">
          <img src={reactLogo} width={"150"} className="p-1" />
          <div>
          {editingListName ? (
            <ClickAwayListener onClickAway={handleUpdateName}>
              <Input 
                autoFocus
                defaultValue={name}
                className="grow"
                placeholder="Enter a name for this playlist..."
                sx={{ fontSize: "2rem", flex: 1, margin: 1,  width:"80%"}}
                multiline
                inputRef={inputRef}
                disableUnderline={true}
              />
            </ClickAwayListener>
          ) : (
            <Typography 
              style={{ wordWrap: "break-word" }}
              variant="h4" 
              sx={{ fontSize: "2rem", flex: 1, margin: 1, width:"80%"}} 
              className="leading-8" 
              onClick={() => setEditingListName(true)}
              >
                {name}
            </Typography>
            // <TextField
            //   hiddenLabel
            //   id="filled-hidden-label-small"
            //   defaultValue={name}
            //   variant="filled"
            //   size="small"
            //   onClick={() => setEditingName(true)}
            // />
            // <TextField
            //   onClick={() => setEditingName(true)}
            //   className="w-full rounded-md p-2 hover:bg-white/10"
            // />
            //   <Typography className="text-start" variant="h4">
            //     {name}
            //   </Typography>
            // </button>
          )}
          {editingListDescription ? (
            <ClickAwayListener onClickAway={handleUpdateDescription}>
              {/* <Input
                autoFocus
                defaultValue={description}
                className="grow"
                // placeholder="Enter a name for this playlist description..."
                // sx={{ fontSize: "2em" }}
                inputRef={descriptionRef}
              /> */}
              <Input
                // id="filled-multiline-static"
                inputRef={descriptionRef}
                defaultValue={description}
                sx={{fontSize: "1rem", flex: 1, margin: 1, width:"80%"}}
                multiline
                disableUnderline={true}
                fullWidth={true}
                // rows={4}
              />
            </ClickAwayListener>
          ) : (
            <Typography 
              style={{ wordWrap: "break-word" }}
              sx={{fontSize: "1rem", flex: 1, margin: 1, width:"80%"}}
              // variant="h6" 
              onClick={() => setEditingListDescription(true)}
              >
              {description}
            </Typography>
          )}
          </div>
        </div>
          {/* {del && (
            <div className="grid place-items-center">
            <IconButton color="error" onClick={handleDelete}>
              <CancelRoundedIcon />
            </IconButton>
          </div>
          )} */}
        <div className="mx-auto flex max-h-full flex-row gap-6 px-24 py-12">
          <Button
            className="w-30"
            color="success"
            variant="contained"
            onClick={() => setOpenNewCardDialog(true)}
          >
            Add
          </Button>
          <Button
            className="w-30"
            color="success"
            variant="contained"
            onClick={() => setOpenNewCardDialog(true)}
          >
            Delete
          </Button>
        </div>
        <br></br>
        <Divider variant="middle" sx={{ mt: 1, mb: 2 }} />
        <div className="flex flex-col gap-4">
          {cards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>

      </Dialog>
      <CardDialog
        variant="new"
        open={openNewCardDialog}
        onClose={() => setOpenNewCardDialog(false)}
        listId={id}
      />
    </>
  );
}
