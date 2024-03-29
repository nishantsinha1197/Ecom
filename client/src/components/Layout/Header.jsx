import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Search from "../form/Search";
import useCategory from "../../hook/useCategory.js";
import { useAuth } from "../../context/AuthContext";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import useCart from "../../hook/useCart.js";

const navItems = ["HOME", "CATEGORY"];
const routeMapping = {
  HOME: "/",
  CATEGORY: "/category",
  REGISTER: "/signup",
  LOGIN: "/signin",
  CART: "/cart",
};

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [auth, setAuth] = useAuth();
  const { categories } = useCategory();
  let [cart] = useCart()
  let navigate = useNavigate()
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAuth({ user: "", token: null });
    navigate('/signin')
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} style={{ width: "200px" }}>
          🛒Shop-Mart
        </Typography>
        <Search />
        {navItems.map((item) => (
          <React.Fragment key={item}>
            {item !== "CATEGORY" ? (
              <NavLink to={routeMapping[item]} style={{ textDecoration: "none", color: "#fff" }}>
                <Button color="inherit">{item}</Button>
              </NavLink>
            ) : (
              <Button color="inherit" onClick={handleMenuOpen} aria-controls="simple-menu" aria-haspopup="true">
                {item}
              </Button>
            )}
          </React.Fragment>
        ))}
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            <Link to={"/all-category"} className="dropdown-item">
              All Category
            </Link>
          </MenuItem>
          {categories.map((item, i) => (
            <MenuItem key={i} onClick={handleMenuClose}>
              <Link to={`/all-category/${item.slug}`} className="dropdown-item">
                {item.name}
              </Link>
            </MenuItem>
          ))}
        </Menu>
        {auth?.token ? (
          <React.Fragment>
            <FormControl>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue={auth.user.name ? auth.user.name : ""}
                sx={{ color: "white" }}
              >
                <MenuItem value={auth.user.name ? auth.user.name : ""}>
                  <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                    {auth.user.name}
                  </Link>
                </MenuItem>
                <MenuItem value={"DASHBOARD"}>
                  <Link
                    to={auth.user.role == true ? "/dashboard/admin" : "/dashboard/user"}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    DASHBOARD
                  </Link>
                </MenuItem>
                <MenuItem value={"LOGOUT"} onClick={handleLogout}>
                  LOGOUT
                </MenuItem>
              </Select>
            </FormControl>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <NavLink to="/signup" style={{ textDecoration: "none", color: "#fff" }}>
              <Button color="inherit">REGISTER</Button>
            </NavLink>
            <NavLink to="/signin" style={{ textDecoration: "none", color: "#fff" }}>
              <Button color="inherit">LOGIN</Button>
            </NavLink>
          </React.Fragment>
        )}
        <NavLink to={routeMapping["CART"]} style={{ textDecoration: "none", color: "#fff" }}>
          <Badge badgeContent={cart.length} color="secondary">
            <Avatar>
              <ShoppingCartIcon />
            </Avatar>
          </Badge>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
