import React from 'react';

import './VerticalNavBar.scss';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import NoteIcon from '@mui/icons-material/Note';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';

export default function VerticalNavBar({
  setPage,
}) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        id='side-bar-drawer'
        variant="permanent"
      >
        <Divider />
        <List>
          <ListItem button onClick={() => setPage('feed')}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary='Feed' />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setPage('recommendations')}>
            <ListItemIcon>
              <NoteIcon />
            </ListItemIcon>
            <ListItemText primary='Recommendations' />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setPage('friends')}>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <ListItemText primary='Friends' />
          </ListItem>
          <Divider />
          <ListItem button onClick={() => setPage('settings')}>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary='Settings' />
          </ListItem>
          <Divider />
        </List>
      </Drawer>
    </Box>
  );
}
