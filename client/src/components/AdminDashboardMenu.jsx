import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';

const AdminDashboardMenu = () => {
  let navStyle={textDecoration:"none"}
  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          marginTop: 10,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
        },
      }}
    >
      <Toolbar />
      <List style={{ flexGrow: 1 }}>
        <ListItem  sx={navStyle} button component={Link} to="/dashboard/admin/create-category">
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Create-Category" />
        </ListItem>
        <ListItem  sx={navStyle} button component={Link} to="/dashboard/admin/create-product">
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon> 
          <ListItemText primary="Create-Product" />
        </ListItem>
        <ListItem sx={navStyle} button component={Link} to="/dashboard/admin/users">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem  sx={navStyle} button component={Link} to="/dashboard/admin/all-orders">
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Orders" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default AdminDashboardMenu;
