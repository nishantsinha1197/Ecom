import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

function UserDashboardMenu() {
  let navStyle = { textDecoration: "none", color: "black" };

  return (
    <>
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <Link style={navStyle} to="/dashboard/user/profile">
              <ListItemText primary="Profile" />
            </Link>
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton component="a" href="#simple-list">
            <Link style={navStyle} to="/dashboard/user/order">
              <ListItemText primary="Orders" />
            </Link>
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}

export default UserDashboardMenu;
