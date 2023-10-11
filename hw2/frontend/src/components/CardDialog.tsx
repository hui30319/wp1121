import { useRef, useState } from "react";

import { Delete as DeleteIcon } from "@mui/icons-material";
// import { Paper } from "@mui/material";
// import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
// import MenuItem from "@mui/material/MenuItem";
// import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { createCard, deleteCard, updateCard } from "@/utils/client";

// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types
type NewCardDialogProps = {
  variant: "new";
  open: boolean;
  onClose: () => void;
  // onOpen: () => void;
  listId: string;
};

type EditCardDialogProps = {
  variant: "edit";
  open: boolean;
  onClose: () => void;
  // onOpen: () => void;
  listId: string;
  cardId: string;
  song: string;
  singer: string;
  link: string;
};

type CardDialogProps = NewCardDialogProps | EditCardDialogProps;

export default function CardDialog(props: CardDialogProps) {
  const { variant, open, onClose, listId } = props;
  const song = variant === "edit" ? props.song : "";
  const singer = variant === "edit" ? props.singer : "";
  const link = variant === "edit" ? props.link : "";
  
  const [editingSong, setEditingSong] = useState(variant === "new");
  const [editingSinger, setEditingSinger] = useState(variant === "new");
  const [editingLink, setEditingLink] = useState(variant === "new");
  const songRef = useRef<HTMLInputElement>(null);
  const singerRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);


  // using a state variable to store the value of the input, and update it on change is another way to get the value of a input
  // however, this method is not recommended for large forms, as it will cause a re-render on every change
  // you can read more about it here: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
  const [newSong, setNewSong] = useState(song);
  const [newSinger, setNewSinger] = useState(singer);
  const [newLink, setNewLink] = useState(link);
  const [newListId, setNewListId] = useState(listId);
  const [updateCards, setUpdateCards] = useState(false);
  const { lists, fetchCards } = useCards();

  const handleClose = () => {
    onClose();
  };

  const handleSave = async () => {
    try {
      if (variant === "new") {
        await createCard({
          song: songRef.current?.value ?? "" ,
          singer: singerRef.current?.value ?? "",
          link: linkRef.current?.value ?? "",
          // song: newSong,
          // singer: newSinger,
          // link: newLink,
          list_id: listId,
        });
      } else {
        if (
          newSong === song &&
          newSinger === singer &&
          newLink === link &&
          newListId === listId
        ) {
          return;
        }
        // typescript is smart enough to know that if variant is not "new", then it must be "edit"
        // therefore props.cardId is a valid value
        await updateCard(props.cardId, {
          song: newSong,
          singer: newSinger,
          link: newLink,
          list_id: newListId,
        });
      }
      fetchCards();
    } catch (error) {
      alert("Error: Failed to save song");
    } finally {
      handleClose();
      setUpdateCards(true);
    }
  };

  const handleDelete = async () => {
    if (variant !== "edit") {
      return;
    }
    try {
      await deleteCard(props.cardId);
      fetchCards();
    } catch (error) {
      alert("Error: Failed to delete song");
    } finally {
      handleClose();
    }
  };

  return (
    <>
    {/* <button onClick={onOpen} className="text-start">
      <Paper className="flex w-full flex-col p-2" elevation={6}>
        <Stack direction="row" spacing="10" width={"80%"}>
          {editingSong ? (
            <div>
              <Input disableUnderline={true} defaultValue={song} />
              <Input disableUnderline={true} defaultValue={singer} />
              <Input disableUnderline={true} defaultValue={link} />
            </div>

          ) : (
            <div>
              <Input disableUnderline={true} defaultValue={newSong} />
              <Input disableUnderline={true} defaultValue={newSinger} />
              <Input disableUnderline={true} defaultValue={newLink} />
            </div>
          )
          }
        </Stack>
      </Paper>
    </button> */}
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="flex gap-4">
        {editingSong ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingSong(false);
              }
            }}
          >
            <Input
              autoFocus
              inputRef={songRef}
              defaultValue={song}
              onChange={(e) => setNewSong(e.target.value)}
              className="grow"
              placeholder="Song..."
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingSong(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newSong}</Typography>
          </button>
        )}
        {/* <Select
          value={newListId}
          onChange={(e) => setNewListId(e.target.value)}
        >
          {lists.map((list) => (
            <MenuItem value={list.id} key={list.id}>
              {list.name}
            </MenuItem>
          ))}
        </Select> */}
        {variant === "edit" && (
          <IconButton color="error" onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        )}
      </DialogTitle>
      {/* <DialogContent className="w-[600px]"> */}
      <DialogContent className="flex gap-4">
        {editingSinger ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingSinger(false);
              }
            }}
          >
            <Input
              autoFocus
              inputRef={singerRef}
              defaultValue={singer}
              onChange={(e) => setNewSinger(e.target.value)}
              className="grow"
              placeholder="Singer..."
            />
            {/* <textarea
              className="bg-white/0 p-2"
              autoFocus
              defaultValue={singer}
              placeholder="Add a description..."
              onChange={(e) => setNewSinger(e.target.value)}
            /> */}
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingSinger(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newSinger}</Typography>
          </button>
        )}
      </DialogContent>
      {/* <DialogContent className="w-[600px]"> */}
      <DialogContent className="flex gap-4">
        {editingLink ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEditingLink(false);
              }
            }}
          >
            <Input
              autoFocus
              inputRef={linkRef}
              defaultValue={link}
              onChange={(e) => setNewLink(e.target.value)}
              className="grow"
              placeholder="Link..."
            />
            {/* <textarea
              className="bg-white/0 p-2"
              autoFocus
              defaultValue={link}
              placeholder="Add a description..."
              onChange={(e) => setNewLink(e.target.value)}
            /> */}
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEditingLink(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newLink}</Typography>
          </button>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSave}>save</Button>
        <Button onClick={handleClose}>close</Button>
      </DialogActions>
    </Dialog> 
    </>
  );
}
