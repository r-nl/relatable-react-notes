import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function RelatableMenuBar(props) {

    return (
        <AppBar position="static">
        <Toolbar>
          <StickyNote2Icon /> &nbsp;&nbsp;&nbsp;
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            React Relatable Notes
          </Typography>
          <FormControl sx={{ m: 1, minWidth: 200 }}>
            <InputLabel>Sort Notes By...</InputLabel>
            <Select 
              label="Sort Notes By..."
              value={props.sortingMethod}
              onChange={props.handleSortSelect}
            >
              <MenuItem value="content">Alphabetical</MenuItem>
              <MenuItem value="date">Creation Time</MenuItem>
              <MenuItem value="related_note_ids">Number of Related Notes</MenuItem>
            </Select>
          </FormControl>
        </Toolbar>
      </AppBar>
    );
};

export default RelatableMenuBar;