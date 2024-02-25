import axios from "axios";
import React, { createContext, useEffect, useReducer, useState } from "react";
import reducer from "../Reducers/ProductReducers";
import {
  errorWhileProductApi,
  fetchedData,
  initialData,
  singlError,
  singleFetchedProduct,
  singleloading,
} from "../Action/ActionCreator";
export let productContext = createContext();
let initialState = {
  loading: "false",
  products: [],
  product: {},
  total:'',
  error: "",
  single_loader: false,
  single_error: "",
};
// function reducer(){
//     return 'abc'
// }

function ProductContext({ children }) {
  let [productChange,setProductChange] = useState(false)
  let [state, dispatch] = useReducer(reducer, initialState);
  async function getAllProduct() {
    try {
      dispatch(initialData());
      let { data } = await axios.get("/api/v1/products");
      dispatch(fetchedData(data.products));
    } catch (err) {
      console.log(err);
      dispatch(errorWhileProductApi(err.message));
    }
  }
  async function singleProduct(url) {
    try {
      dispatch(singleloading());
      let { data } = await axios.get(url);
      console.log(data.product);
      dispatch(singleFetchedProduct(data.product));
    } catch (err) {
      console.log(err);
      dispatch(singlError(err));
    }
  }
  useEffect(() => {
    getAllProduct();
  }, [productChange]);
  return (
    <productContext.Provider value={{ ...state, singleProduct, productChange, setProductChange }}>
      {" "}
      {children}{" "}
    </productContext.Provider>
  );
}

export default ProductContext;
