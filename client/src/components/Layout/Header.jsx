// // import React from "react";
// // import {Link,NavLink} from 'react-router-dom'
// // function Header() {
// //   return (
// //     <nav className="navbar navbar-expand-lg navbar-light bg-light">
// //       <div className="container-fluid">
// //         <a className="navbar-brand" href="#">
// //           🛒ECOM
// //         </a>
// //         <button
// //           className="navbar-toggler"
// //           type="button"
// //           data-bs-toggle="collapse"
// //           data-bs-target="#navbarSupportedContent"
// //           aria-controls="navbarSupportedContent"
// //           aria-expanded="false"
// //           aria-label="Toggle navigation"
// //         >
// //           <span className="navbar-toggler-icon" />
// //         </button>

// //         <div className="collapse navbar-collapse" id="navbarSupportedContent">
// //           <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
// //             <li className="nav-item">
// //               <Link className="nav-link active" aria-current="page" to="/">
// //                 Home
// //               </Link>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink className="nav-link" to="/category">
// //                 CATEGORY
// //               </NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink className="nav-link" to="/register">
// //                 REGISTER
// //               </NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink className="nav-link" to="/signin">
// //                 LOGIN
// //               </NavLink>
// //             </li>
// //             <li className="nav-item">
// //               <NavLink className="nav-link" to="/cart">
// //                 CART(0)
// //               </NavLink>
// //             </li>
// //           </ul>
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // }

// // export default Header;


// import * as React from 'react';
// import PropTypes from 'prop-types';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import CssBaseline from '@mui/material/CssBaseline';
// import Divider from '@mui/material/Divider';
// import Drawer from '@mui/material/Drawer';
// import IconButton from '@mui/material/IconButton';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemText from '@mui/material/ListItemText';
// import MenuIcon from '@mui/icons-material/Menu';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import {Link,NavLink} from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext';

// const drawerWidth = 240;
// const navItems = ['HOME', 'CATEGORY', 'LOGOUT','REGISTER','LOGIN','CART(0)'];
// const routeMapping = {
//   HOME: '/',
//   CATEGORY: '/category',
//   REGISTER: '/signup',
//   LOGIN: '/signin',
//   'CART(0)': '/cart'
// };

// function Header(props) {
//   let [auth,setAuth]=useAuth()
//   function logoutHandler()
//   {
//     setAuth({"user":'',"token":null})
//   }
//   const { window } = props;
//   const [mobileOpen, setMobileOpen] = React.useState(false);

//   const handleDrawerToggle = () => {
//     setMobileOpen((prevState) => !prevState);
//   };

//   const drawer = (
//     <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center'}}>
//       <Typography variant="h6" sx={{ my: 2 }}>
//         🛒ECOM
//       </Typography>
//       <Divider />
//       <List>
//       {navItems.map((item) => (
//           <ListItem key={item} disablePadding>
//             <ListItemButton sx={{ textAlign: 'center' }}>
//               <ListItemText primary={item} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   const container = window !== undefined ? () => window().document.body : undefined;

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <CssBaseline />
//       <AppBar component="nav">
//         <Toolbar>
//           <IconButton
//             color="inherit"
//             aria-label="open drawer"
//             edge="start"
//             onClick={handleDrawerToggle}
//             sx={{ mr: 2, display: { sm: 'none' } }}
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography
//             variant="h6"
//             component="div"
//             sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
//           >
//             🛒ECOM
//           </Typography>
//           <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
//             {navItems.map((item,index) => (
//                <NavLink
//                key={index}
//                to={routeMapping[item]}
//                activeClassName="active"
//              >
//               <Button key={item} sx={{ color: '#fff' }}>
//                 {item}
//               </Button>
//               </NavLink>
//             ))}

//               {auth?.token ? ( <li className="nav-item">
//                     < Link className="nav-link" onClick={logoutHandler}>
//                         LOGOUT
//                     </Link>
//                   </li>):(<>
//                     <li className="nav-item">
//                     <NavLink className="nav-link" to="/signup">
//                        REGISTER
//                     </NavLink>
//                   </li>
//                   <li className="nav-item">
//                     <NavLink className="nav-link" to="/signin">
//                      LOGIN
//                     </NavLink>
//                   </li>
//                   </>)}
//           </Box>
          
//         </Toolbar>
//       </AppBar>
//       <nav>
//         <Drawer
//           container={container}
//           variant="temporary"
//           open={mobileOpen}
//           onClose={handleDrawerToggle}
//           ModalProps={{
//             keepMounted: true, // Better open performance on mobile.
//           }}
//           sx={{
//             display: { xs: 'block', sm: 'none' },
//             '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
//           }}
//         >
//           {drawer}
//         </Drawer>
//       </nav>
//       <Box component="main" sx={{ p: 3 }}>
//         <Toolbar />
//         {/* <Typography>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique unde
//           fugit veniam eius, perspiciatis sunt? Corporis qui ducimus quibusdam,
//           aliquam dolore excepturi quae. Distinctio enim at eligendi perferendis in
//           cum quibusdam sed quae, accusantium et aperiam? Quod itaque exercitationem,
//           at ab sequi qui modi delectus quia corrupti alias distinctio nostrum.
//           Minima ex dolor modi inventore sapiente necessitatibus aliquam fuga et. Sed
//           numquam quibusdam at officia sapiente porro maxime corrupti perspiciatis
//           asperiores, exercitationem eius nostrum consequuntur iure aliquam itaque,
//           assumenda et! Quibusdam temporibus beatae doloremque voluptatum doloribus
//           soluta accusamus porro reprehenderit eos inventore facere, fugit, molestiae
//           ab officiis illo voluptates recusandae. Vel dolor nobis eius, ratione atque
//           soluta, aliquam fugit qui iste architecto perspiciatis. Nobis, voluptatem!
//           Cumque, eligendi unde aliquid minus quis sit debitis obcaecati error,
//           delectus quo eius exercitationem tempore. Delectus sapiente, provident
//           corporis dolorum quibusdam aut beatae repellendus est labore quisquam
//           praesentium repudiandae non vel laboriosam quo ab perferendis velit ipsa
//           deleniti modi! Ipsam, illo quod. Nesciunt commodi nihil corrupti cum non
//           fugiat praesentium doloremque architecto laborum aliquid. Quae, maxime
//           recusandae? Eveniet dolore molestiae dicta blanditiis est expedita eius
//           debitis cupiditate porro sed aspernatur quidem, repellat nihil quasi
//           praesentium quia eos, quibusdam provident. Incidunt tempore vel placeat
//           voluptate iure labore, repellendus beatae quia unde est aliquid dolor
//           molestias libero. Reiciendis similique exercitationem consequatur, nobis
//           placeat illo laudantium! Enim perferendis nulla soluta magni error,
//           provident repellat similique cupiditate ipsam, et tempore cumque quod! Qui,
//           iure suscipit tempora unde rerum autem saepe nisi vel cupiditate iusto.
//           Illum, corrupti? Fugiat quidem accusantium nulla. Aliquid inventore commodi
//           reprehenderit rerum reiciendis! Quidem alias repudiandae eaque eveniet
//           cumque nihil aliquam in expedita, impedit quas ipsum nesciunt ipsa ullam
//           consequuntur dignissimos numquam at nisi porro a, quaerat rem repellendus.
//           Voluptates perspiciatis, in pariatur impedit, nam facilis libero dolorem
//           dolores sunt inventore perferendis, aut sapiente modi nesciunt.
//         </Typography> */}
//       </Box>
//     </Box>
//   );
// }

// Header.propTypes = {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window: PropTypes.func,
// };

// export default Header;


import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = ['HOME', 'CATEGORY', 'CART(0)'];
const routeMapping = {
  HOME: '/',
  CATEGORY: '/category',
  REGISTER: '/signup',
  LOGIN: '/signin',
  'CART(0)': '/cart'
};

function Header() {
  const [auth, setAuth] = useAuth();

  const handleLogout = () => {
    setAuth({ user: '', token: null });
  };
console.log(auth);
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          🛒ECOM
        </Typography>
        {navItems.map(item => (
          <NavLink to={routeMapping[item]} key={item} style={{ textDecoration: 'none', color: '#fff' }}>
            <Button color="inherit">{item}</Button>
          </NavLink>
        ))}
        {auth?.token ? (
          <Button color="inherit" onClick={handleLogout}>LOGOUT</Button>
        ) : (
          <>
            <NavLink to="/signup" style={{ textDecoration: 'none', color: '#fff' }}>
              <Button color="inherit">REGISTER</Button>
            </NavLink>
            <NavLink to="/signin" style={{ textDecoration: 'none', color: '#fff' }}>
              <Button color="inherit">LOGIN</Button>
            </NavLink>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Header;

