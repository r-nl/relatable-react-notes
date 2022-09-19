import React, { useState, useEffect } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';

import axios from "axios";


import NewNoteDialog from './newNoteDialog'
import RelatableMenuBar from './RelatableMenuBar';

const AUTH_KEY = 'Api key goes here';
const NOTE_API = "Api URL goes here"

const fabstyle = {
  margin: 0,
  top: 'auto',
  right: 20,
  bottom: 20,
  left: 'auto',
  position: 'fixed',
};

const noteAPI = axios.create({
  baseURL: NOTE_API,
  headers: {
    common: {
      Authorization: AUTH_KEY
    }
  }
});

function App() {
  const mockNotes = [
    {date: "9/12/22", content: "C Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis mauris erat. Suspendisse ligula sapien, lobortis et efficitur a, varius quis felis. Sed in magna turpis. Duis finibus, massa vel malesuada sodales, eros lorem pulvinar dolor, vel imperdiet augue massa quis felis. Vestibulum hendrerit dapibus blandit. ", related_note_ids: [1], id:0},
    {date: "9/12/22", content: "B Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis mauris erat. Suspendisse ligula sapien, lobortis et efficitur a, varius quis felis. Sed in magna turpis. Duis finibus, massa vel malesuada sodales, eros lorem pulvinar dolor, vel imperdiet augue massa quis felis. Vestibulum hendrerit dapibus blandit. ", related_note_ids: [0, 2], id:1},
    {date: "9/12/22", content: "A Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis mauris erat. Suspendisse ligula sapien, lobortis et efficitur a, varius quis felis. Sed in magna turpis. Duis finibus, massa vel malesuada sodales, eros lorem pulvinar dolor, vel imperdiet augue massa quis felis. Vestibulum hendrerit dapibus blandit. ", related_note_ids: [], id:2},
    {date: "9/12/22", content: "D Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis mauris erat. Suspendisse ligula sapien, lobortis et efficitur a, varius quis felis. Sed in magna turpis. Duis finibus, massa vel malesuada sodales, eros lorem pulvinar dolor, vel imperdiet augue massa quis felis. Vestibulum hendrerit dapibus blandit. ", related_note_ids: [0, 1, 2], id:3}
  ]
  const [state, setState] = useState({notes: mockNotes, noteDetailScreen: false, activeNote: 0, newNoteScreen: false, newNoteText: "", newNoteRelated: []});

  useEffect(() => {
    noteAPI.get()
    .then((response) => {
     setState(prev => ({...state, notes: response.data}))
    })
    .catch((err) => {
       console.log(err.message);
    });
    // fetch(NOTE_API,
    // {headers: {
    //   authorization: "6b9b5a48-85f4-4d18-9118-877a366de95a"
    // }}
    // )
    //    .then((response) => response.json())
    //    .then((data) => {
    //     setState(prev => ({...state, notes: data}))
    //    })
    //    .catch((err) => {
    //       console.log(err.message);
    //    });
 }, []);

  const handleNewNoteOpen = () => {
    let newState = {notes: state.notes, noteDetailScreen: false, activeNote: state.activeNote, newNoteScreen: true, newNoteText: "", newNoteRelated: []};
    setState(newState)
  };

  const handleNewNoteClose = () => {
    setState(prev => ({...state, newNoteScreen:false}))
  };

  const handleNewNoteSubmit = () => {
    let newContent = state.newNoteText
    console.log(newContent)
    let message = JSON.stringify({
      content: newContent,
      related_note_ids: state.newNoteRelated,
    })
    addNote(message);

    setState(prev => ({...state, newNoteScreen:false}))
  };


  const handleRelatedSelect = (event) => {
    let newRelated = [...state.newNoteRelated, event.target.value];
    setState(prev => ({...state, newNoteRelated: newRelated}))
  };

  const handleNewNoteText = (event) => {
    let NewText = event.target.value;
    console.log(NewText);
    let newState = {notes: state.notes, noteDetailScreen: false, activeNote: state.activeNote, newNoteScreen: true, newNoteText: NewText, newNoteRelated: state.newNoteRelated};
    setState(newState);
  };

  const handleSelectOpen = (noteId) => {
    let noteList = [...state.notes]
    let activeIndex = noteList.findIndex(i => i.id === noteId);
    let newState = {notes: state.notes, noteDetailScreen: true, activeNote: activeIndex, newNoteScreen: false, newNoteText: "", newNoteRelated: []};
    setState(newState)
  };

  const handleSelectClose = () => {
    let newState = {notes: state.notes, noteDetailScreen: false, activeNote: state.activeNote, newNoteScreen: false, newNoteText: "", newNoteRelated: []};
    setState(newState)
  };

  const handleSelectDelete = () => {
    setState(prev => ({...state, noteDetailScreen: false}))
    removeNote(state.activeNote);
  };

  let sortingMethod = '';

  const handleSortSelect = (event) => {
    sortingMethod = event.target.value;
    let sortedNotes = [...state.notes]
    sortingMethod === "related_note_ids" ? sortedNotes.sort((a, b) => b.related_note_ids.length-a.related_note_ids.length) : sortedNotes.sort((a,b) => a.content > b.content ? 1 : -1)
    setState(prev => ({...state, notes: sortedNotes}))

  };

  const addNote = async (message) => {
    await fetch(NOTE_API, {
    method: 'POST',
    body: message,
    headers: {
       'Content-type': 'application/json; charset=UTF-8',
        authorization: "6b9b5a48-85f4-4d18-9118-877a366de95a"
    },
    })
    .then((response) => response.json())
    .then((data) => {
       console.log(data)
       let newNote = [...state.notes, data]
       setState(prev => ({...state, notes: newNote}))
    })
    .catch((err) => {
       console.log(err.message);
    });
    };

  const removeNote = async (id) => {
    await fetch(NOTE_API, {
      method: 'DELETE',
    }).then((response) => {
      if (response.status === 200) {
         //remove from ui
         console.log("successfully deleted");
      } else {
         return;
      }
   })
  };

  return (
    <div>


      <header>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      </header>


      <Dialog onClose={handleSelectClose} open={state.noteDetailScreen}>
        <DialogContent>
          <DialogContentText>
            {state.notes[state.activeNote].content}
          <br /><br />
          <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
            Related Notes (Click to view!):
          </Typography>
          {state.notes[state.activeNote].related_note_ids.map((relatedID) => {
            return (
               <Chip label={relatedID} onClick={() => handleSelectOpen(relatedID)} sx={{m: 1 }}/>
          )})}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSelectDelete}>Delete Note</Button>
          <Button onClick={handleSelectClose}>Close</Button>
        </DialogActions>
      </Dialog>

      <NewNoteDialog 
        handleNewNoteClose={handleNewNoteClose} 
        newNoteScreen={state.newNoteScreen}
        newNoteRelated={state.newNoteRelated}
        handleRelatedSelect={handleRelatedSelect}
        notes= {state.notes}
        handleNewNoteSubmit= {handleNewNoteSubmit}
      />

      <RelatableMenuBar sortingMethod={sortingMethod} handleSortSelect={handleSortSelect}/>

      <Grid container spacing={2}>
      {state.notes.map((note) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={note.id}>
            <Card sx={{ p: 1, m: 2 }}>
              <CardContent>
              <Typography sx={{ fontSize: 12 }} color="text.secondary" gutterBottom>
              <Chip label={note.id} size="small"/> &nbsp;&nbsp;&nbsp; {note.date} • {note.related_note_ids.length} Related Notes
              </Typography><br />
              <Typography variant="body2">
                {note.content}
              </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleSelectOpen(note.id)}>Select</Button>
              </CardActions>
            </Card>
          </Grid>
        )})}
      </Grid>


      <Fab color="primary" aria-label="add" onClick={handleNewNoteOpen} style={fabstyle}>
       <AddIcon />
      </Fab>


    </div>
  );
}

export default App;
