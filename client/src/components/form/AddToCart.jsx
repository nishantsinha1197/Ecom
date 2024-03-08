import React from "react";
import { Button } from "@mui/material";
import toast from "react-hot-toast";
import useCart from "../../hook/useCart";

function AddToCart({prod}) {
  let [cart,setCart] = useCart()
  function setCartHandler(){
    setCart([prod,...cart])
    toast('Items added in cart')
  }
  return (
    <Button variant="contained" color="primary" size="small" onClick={setCartHandler}>
      ADD TO CART
    </Button>
  );
}

export default AddToCart;
