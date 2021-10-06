import * as React from 'react';

import './VerticalNavBar.scss';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

const drawerWidth = 240;

export default function VerticalNavBar() {
  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
      id='side-bar-drawer'
        variant="permanent"
        //anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {['Home', 'My Recommendations', 'Friends', 'Settings'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon color="blue">
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
