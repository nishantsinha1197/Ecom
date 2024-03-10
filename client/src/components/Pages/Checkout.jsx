import React, { useEffect, useState } from "react";
import Layout from '../Layout/Layout'
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";
import { Container, Typography, Grid, Button, Card, CardContent, CardActions } from "@material-ui/core";
import useCart from "../../hook/useCart";
import { useAuth } from "../../context/AuthContext";

function Checkout() {
  let [auth] = useAuth();
  let [cart, setCart] = useCart();
  let navigate = useNavigate();
  let [clientToken, setClientToken] = useState("");
  let [instance, setIntance] = useState("");

  function totalPriceHandler() {
    return cart.reduce((acc, item) => {
        if (item && item.price != null) {
            return acc + item.price;
        } else {
            return acc;
        }
    }, 0);
  }

  function loginHandler() {
    navigate("/signin", { state: "/cart" });
  }

  async function tokenHandler() {
    let { data } = await axios.get("/api/v1/braintree/token");
    setClientToken(data.clientToken);
  }

  useEffect(() => {
    tokenHandler();
  }, []);

  async function paymentHandler() {
    const { nonce } = await instance.requestPaymentMethod();
    let { data } = await axios.post('/api/v1/braintree/payment', { cart, nonce }, { headers: { "Authorization": auth.token } })
    if (data.ok) {
      setCart([]);
      toast('Order Successful');
      navigate('/dashboard/user/order')
    }
  }

  return (
    <Layout title={"Add To Cart || Checkout - ecomm"}>
      <Container>
        <div className="m-3 p-2 ">
          <Typography variant="h4" align="center">
            Hello {auth?.user?.name ? auth?.user?.name : "Unknown"}
          </Typography>
          <Typography variant="body1" align="center">
            You Have <strong>{cart.length}</strong> items in your cart
          </Typography>
        </div>
        <Grid container spacing={2}>
          <Grid item md={7}>
            <Grid container spacing={2}>
              {cart.map((item, i) => (
                <Grid item key={i} xs={12}>
                  <Card variant="outlined" style={{border:'1px black solid', margin:"10px"}}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid item xs={5}>
                          <img
                            src={item?.images[0]?.url}
                            className="img-fluid"
                            style={{height:'200px'}}
                          />
                        </Grid>
                        <Grid item xs={7}>
                          <Typography variant="h6">{item?.name}</Typography>
                          <Typography variant="body2">{item?.description}</Typography>
                          <Typography>Price: {item?.price}</Typography>
                        </Grid>
                      </Grid>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="secondary" variant='contained'>REMOVE</Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item md={5}>
            <Typography variant="h4" align="center" gutterBottom>Cart Summary</Typography>
            <Typography align="center"> Total | Checkout | Payment</Typography>
            <hr />
            <Typography variant="h5" align="center" gutterBottom>Total: {totalPriceHandler()}</Typography>
            <Grid container spacing={2} justify="center" alignItems="center" direction="column">
              {!auth?.token && (
                <Button variant="contained" color="warning" onClick={loginHandler}>Please Login to Checkout</Button>
              )}
              {auth?.token && (
                auth?.user.address ? (
                  <>
                    <Typography variant="body1" align="center">Current Address</Typography>
                    <Typography variant="body1" align="center"><strong>{auth?.user?.address}</strong></Typography>
                    <Button variant="contained" color="warning">Update Address</Button>
                  </>
                ) : (
                  <Button variant="contained" color="warning">Update Address</Button>
                )
              )}
              {clientToken && (
                <Grid item>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: { flow: "vault" },
                    }}
                    onInstance={(instance) => {
                      setIntance(instance);
                    }}
                  />
                  <Button
                    variant="contained"
                    color="warning"
                    onClick={paymentHandler}
                    disabled={!instance || !auth.user.address}
                  >
                    Make Payment
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default Checkout;
