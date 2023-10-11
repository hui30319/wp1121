import { useState } from "react";

import { Paper } from "@mui/material";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import CardDialog from "./CardDialog";


export type CardProps = {
  id: string;
  song: string;
  singer: string;
  link: string;
  listId: string;
};

export default function Card({ id, song, singer, link, listId }: CardProps) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <button onClick={handleClickOpen} className="text-start">
        <Paper className="flex w-full flex-col p-2" elevation={6}>
          {song}
          {singer}
        </Paper>
      </button>
      <CardDialog
        variant="edit"
        open={open}
        onClose={() => setOpen(false)}
        song={song}
        singer={singer}
        link={link}
        listId={listId}
        cardId={id}
      />
    </>
  );
}