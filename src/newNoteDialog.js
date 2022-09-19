import React from 'react';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';



function NewNoteDialog(props) {

    return(
        <Dialog onClose={props.handleNewNoteClose} open={props.newNoteScreen}>
        <DialogContent>
          <DialogContentText>
          <Typography gutterBottom variant="h5" component="div">
            Create New Note
          </Typography><br />
          <TextField id="outlined-basic" variant="outlined" multiline rows={4} onChange={props.handleNewNoteText}/><br /><br />
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Current Related Notes:
          </Typography>
            {props.newNoteRelated.map((relatedID) => {
              return (
               <Chip label={relatedID} sx={{m: 1 }}/>
            )})}
          <br /><br />
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel>Related Notes:</InputLabel>
            <Select onChange={props.handleRelatedSelect}>
            {props.notes.map((note) => {
              return (
              <MenuItem value={note.id}>{note.id}</MenuItem>
              )})}
            </Select>
          </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleNewNoteClose}>Cancel</Button>
          <Button onClick={props.handleNewNoteSubmit} autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default NewNoteDialog;