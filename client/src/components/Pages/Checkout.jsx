import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import { Container, Grid, Typography, Button } from "@material-ui/core";
import Layout from "../Layout/Layout";
import { makeStyles } from "@material-ui/core/styles";
import toast from "react-hot-toast";
import useCart from "../../hook/useCart";
import { useAuth } from "../../context/AuthContext";
import { Margin } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(2),
  },
  itemContainer: {
    border: "1px solid black",
    padding: theme.spacing(2),
    marginTop: theme.spacing(3),
    display: "flex",
    alignItems: "center",
  },
  image: {
    maxWidth: "100%",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function Checkout() {
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();
  const [clientToken, setClientToken] = useState("");
  const [instance, setInstance] = useState();
  const classes = useStyles();

  //Total price handler
  function totalPriceHandler() {
    return cart.reduce((acc, item) => {
      if (item && item.price) {
        return acc + item.price;
      } else {
        return acc; // If item is undefined or price is missing, return acc without adding anything
      }
    }, 0);
  }

  function loginHandler() {
    navigate("/signin", { state: "/cart" });
  }

//   async function tokenHandler() {
//     //let { data } = await axios.get("/api/v1/braintree/token");
//     //setClientToken(data.clientToken);
//   }

//   useEffect(() => {
//     tokenHandler();
//   }, []);

  async function paymentHandler() {
    const { nonce } = await instance.requestPaymentMethod();
    let { data } = await axios.post(
      "/api/v1/braintree/payment",
      { cart, nonce },
      { headers: { Authorization: auth.token } }
    );
    if (data.ok) {
      setCart([]);
      toast("Order Successful");
    }
  }

  return (
    <Layout title={"Add To Cart || Checkout - ecomm"}>
      <Container className={classes.container}>
        <div className="m-3 p-2 ">
          <Typography variant="h4" align="center">
            Hello {auth?.user?.name ? auth?.user?.name : "Unknown"}
          </Typography>
          <Typography variant="body1" align="center">
            You Have <strong>{cart.length}</strong> items in your cart
          </Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} md={7}>
            <Grid container>
              {cart.map((item, i) => (
                <Grid item xs={12} key={i}>
                  <div className={classes.itemContainer} style={{margin:"10px"}}>
                    <div>
                      <img
                        src={item?.images[0]?.url}
                        // alt={item?.images[0]?.url}
                        className={classes.image}
                        height={'250px'}
                      />
                    </div>
                    <div>
                      <Typography variant="h6">{item?.name}</Typography>
                      <Typography variant="body1">
                        {item?.description}
                      </Typography>
                      <Typography variant="body1">Price: $ {item?.price}</Typography>
                      <Button variant="contained" color="secondary">
                        REMOVE
                      </Button>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={5}>
            <Typography variant="h4" align="center" className={classes.button}>
              Cart Summary
            </Typography>
            <Typography variant="body1" align="center">
              Total | Checkout | Payment
            </Typography>
            <hr />
            <Typography variant="h5" align="center">
              Total: {totalPriceHandler()}
            </Typography>
            <Grid container justify="center" className={classes.button}>
              {!auth?.token && (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={loginHandler}
                >
                  Please Login to Checkout
                </Button>
              )}
            </Grid>
            <Grid
              container
              justify="center"
              alignItems="center"
              direction="column"
              className={classes.button}
            >
              {auth?.token && (
                auth?.user.address ? (
                  <>
                    <Typography variant="body1">Current Address</Typography>
                    <Typography variant="body1">
                      <strong>{auth?.user?.address}</strong>
                    </Typography>
                    <Button variant="contained" color="warning">
                      Update Address
                    </Button>
                  </>
                ) : (
                  <Button variant="contained" color="warning">
                    Update Address
                  </Button>
                )
              )}
            </Grid>
            <Grid container>
              <Grid item xs={12}>
                {clientToken && (
                  <>
                    {/* <DropIn
                      options={{
                        authorization: clientToken,
                        paypal: { flow: "vault" },
                      }}
                      onInstance={(instance) => {
                        setInstance(instance);
                      }}
                    /> */}
                    <Button
                      onClick={paymentHandler}
                      //disabled={!instance || !auth.user.address}
                      variant="contained"
                      color="warning"
                      className={classes.button}
                    >
                      Make Payment
                    </Button>
                  </>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default Checkout;
