import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { NavLink,Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { FormControl } from "@mui/material";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const navItems = ["HOME", "CATEGORY", "CART(0)"];
const routeMapping = {
  HOME: "/",
  CATEGORY: "/category",
  REGISTER: "/signup",
  LOGIN: "/signin",
  "CART(0)": "/cart",
};

function Header() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({ user: "", token: null });
  };
  console.log(auth);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          🛒ECOM
        </Typography>
        {navItems.map((item) => (
          <NavLink
            to={routeMapping[item]}
            key={item}
            style={{ textDecoration: "none", color: "#fff" }}
          >
            <Button color="inherit">{item}</Button>
          </NavLink>
        ))}
        {auth?.token ? (
          // <Button color="inherit" onClick={handleLogout}>LOGOUT</Button>
          <FormControl>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue={auth.user.name ? auth.user.name : ''}
            sx={{ color: 'white' }}
          >
            <MenuItem value={auth.user.name ? auth.user.name : ''} >
              <Link to='/' style={{ textDecoration: 'none', color: 'inherit' }}>{auth.user.name}</Link>
            </MenuItem>
            <MenuItem value={'DASHBOARD'} >
              <Link to={auth.user.role==true?"/dashboard/admin":"/dashboard/user"} style={{ textDecoration: 'none', color: 'inherit' }}>DASHBOARD</Link>
            </MenuItem>
            <MenuItem value={'LOGOUT'} onClick={handleLogout}>LOGOUT</MenuItem>
          </Select>
        </FormControl>
        ) : (
          <>
            <NavLink
              to="/signup"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <Button color="inherit">REGISTER</Button>
            </NavLink>
            <NavLink
              to="/signin"
              style={{ textDecoration: "none", color: "#fff" }}
            >
              <Button color="inherit">LOGIN</Button>
            </NavLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;
