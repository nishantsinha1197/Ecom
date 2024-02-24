import axios from 'axios'
import React, { createContext, useEffect, useReducer } from 'react'
import reducer from "../Reducers/ProductReducers";
import { errorWhileProductApi, fetchedData, initialData } from '../Action/ActionCreator';
export let productContext = createContext()
let initialState = {
    loading:"false",
    products:[],
    product:{},
    error:''
}
// function reducer(){
//     return 'abc'
// }

function ProductContext({children}) {
    let [state,dispatch]=useReducer(reducer,initialState)
    async function getAllProduct(){
        try {
            dispatch(initialData());
            let { data } = await axios.get("/api/v1/products");
            dispatch(fetchedData(data.products));
          } catch (err) {
            console.log(err);
            dispatch(errorWhileProductApi(err.message));
          }
    }
    useEffect(()=>{
        getAllProduct()
    },[])
  return (
    <productContext.Provider value={{...state}}>{children}</productContext.Provider>
  )
}

export default ProductContext