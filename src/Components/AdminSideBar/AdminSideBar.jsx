import AddIcon from '@mui/icons-material/Add';
import AppsIcon from '@mui/icons-material/Apps';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import * as React from 'react';
import { useNavigate } from 'react-router';

const drawerWidth = 200;

const DrawerHeader = styled('div')(({ theme }) => ({
  //   display: "",
  alignItems: 'center',
  padding: theme.spacing(2, 5),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Sidebar() {
  const navigate = useNavigate();

  const doLogout = () => {
    localStorage.removeItem('admin');
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant='persistent'
        anchor='left'
        open={true}
      >
        <DrawerHeader>
          <h3 className='logo'>FOOD APP.</h3>
        </DrawerHeader>
        <List className='mt-5'>
          <ListItem
            button
            key={'Dashboard'}
            onClick={() => {
              navigate('/');
            }}
          >
            <ListItemIcon>
              <AppsIcon />
            </ListItemIcon>
            <ListItemText primary={'All items'} />
          </ListItem>
          <ListItem
            button
            key={'Teachers'}
            onClick={() => {
              navigate('/categories');
            }}
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary={'Categories'} />
          </ListItem>
          <ListItem
            button
            key={'Batches'}
            onClick={() => {
              navigate('/add-ons');
            }}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary={'Modifiers'} />
          </ListItem>
          <ListItem
            button
            key={'Logout'}
            className={''}
            onClick={() => {
              doLogout();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
}
