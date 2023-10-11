import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Stack from '@mui/material/Stack';

import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  // const textfieldRef = useRef<HTMLInputElement>(null);
  const playlistRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const { fetchLists } = useCards();

  const handleAddList = async () => {
    try {
      await createList({ name: playlistRef.current?.value ?? "" , description: descriptionRef.current?.value ?? "" });
      fetchLists();
    } catch (error) {
      alert("Error: Failed to create list");
    } finally {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a playlist</DialogTitle>
      <DialogContent>
        <Stack
          component="form"
          // sx={{
          //   width: '50ch',
          // }}
          spacing={2}
          noValidate
          autoComplete="off"
        >                        
          <TextField
            inputRef={playlistRef}
            label="Playlist Name"
            variant="filled"
            sx={{ mt: 2 }}
            autoFocus
          />
          <TextField
            id="filled-multiline-static"
            inputRef={descriptionRef}
            label="Playlist Description"
            multiline
            rows={4}
            variant="filled"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddList}>add</Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
