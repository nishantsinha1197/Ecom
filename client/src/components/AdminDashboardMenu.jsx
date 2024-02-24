import * as React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@mui/material';
import { Link } from 'react-router-dom';
import CategoryIcon from '@mui/icons-material/Category';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import AssignmentIcon from '@mui/icons-material/Assignment';

const AdminDashboardMenu = () => {
  const listItemStyle = {
    height: 'auto', // Set height to auto for dynamic height based on content
    padding: '8px 16px', // Adjust padding as needed
    textDecoration: 'none',
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          height:'auto',
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
        <ListItem button component={Link} to="/dashboard/admin/create-category" sx={listItemStyle}>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Create-Category" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/admin/create-product" sx={listItemStyle}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Create-Product" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/admin/products" sx={listItemStyle}>
          <ListItemIcon>
            <ShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Products" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/admin/users" sx={listItemStyle}>
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItem>
        <ListItem button component={Link} to="/dashboard/admin/all-orders" sx={listItemStyle}>
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
