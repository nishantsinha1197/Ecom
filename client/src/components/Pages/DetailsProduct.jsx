// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import AddToCart from "../form/AddToCart";
// import useProduct from "../../hook/useProduct";
// import Layout from "../Layout/Layout";
// import { Grid, Typography, CircularProgress, Card, CardContent, CardMedia } from "@mui/material";
// function DeatailsProduct() {
//   let { id } = useParams();
//   let [count, setCount] = useState(0);
//   let { product, single_loader, single_error, singleProduct } = useProduct();
//   console.log("hello i am singleproduct", product);
//   useEffect(() => {
//     singleProduct(`/api/v1/single-product/${id}`);
//   }, []);
//  // async function similarProductHandler()
// //   {
// //     let {data}= await axios.get(`/api/v1/similar-product/${singleProduct?._id}/${singleProduct.category?._id}`)
// //     console.log('xyz',data)
// //   }
// //   useEffect(()=>{
// //     if(Object.keys(product).length>0) {
// //         similarProductHandler()
// //         console.log('hello devdfdfd')
// //     }
// //   },[single_loader])
//   return (
//     <Layout title={"Details Product-ecom"}>
//       <Grid container justifyContent="center" spacing={3}>
//         <Grid item xs={12}>
//           <Typography variant="h4" align="center" gutterBottom>
//             Product Details
//           </Typography>
//         </Grid>
//         {single_loader && (
//           <Grid item xs={12}>
//             <Typography variant="h5" align="center">
//               Loading...
//             </Typography>
//           </Grid>
//         )}
//         {!single_loader && !single_error && Object.keys(product).length > 0 && (
//           <>
//             <Grid item xs={12} md={6}>
//               <Grid container spacing={1}>
//                 {product?.images?.map((item, i) => (
//                   <Grid item key={i} onClick={() => setCount(i)}>
//                     <CardMedia
//                       component="img"
//                       src={item.url}
//                       alt={item.url}
//                       style={{ height: "45px", width: "45px", cursor: "pointer" }}
//                     />
//                   </Grid>
//                 ))}
//               </Grid>
//               <CardMedia
//                 component="img"
//                 src={product?.images[count]?.url}
//                 alt={product?.images[count]?.url}
//                 style={{ height: "300px", width: "auto" }}
//               />
//             </Grid>
//             <Grid item xs={12} md={6}>
//               <CardContent>
//                 <Typography variant="h4" gutterBottom>
//                   {product?.name}
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                   Brand : {product?.brand}
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                   Quantity : {product?.quantity ? "In Stock" : "Out of Stock"}
//                 </Typography>
//                 <Typography variant="body1" gutterBottom>
//                   Availability : {product?.shipping === "yes" ? "Available" : "Not Available"}
//                 </Typography>

//                 <AddToCart />
//                 <Typography variant="body1" gutterBottom>
//                     {product?.description }
//                 </Typography>
//               </CardContent>
//             </Grid>
//           </>
//         )}
//         <Grid item xs={12}>
//           <Typography variant="h4" align="start" gutterBottom>
//             Similar Product
//           </Typography>
//         </Grid>
//       </Grid>
//     </Layout>
//   );
// }

// export default DeatailsProduct;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import AddToCart from "../form/AddToCart";
import useProduct from "../../hook/useProduct";
import Layout from "../Layout/Layout";
import {
  Grid,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import SimilarProduct from "./SimilarProduct";

function DeatailsProduct() {
  let { id } = useParams();
  let [count, setCount] = useState(0);
  let { product, single_loader, single_error, singleProduct } = useProduct();
  let [similarProduct, setSimilarProduct] = useState([])

  useEffect(() => {
    singleProduct(`/api/v1/single-product/${id}`);
  }, [id]);
  async function similarProductHandler(){
    let {data}= await axios.get(`/api/v1/similar-product/${product?._id}/${product.category?._id}`)
    setSimilarProduct(data.products)
  }
  useEffect(()=>{
    if(Object.keys(product).length>0){
      similarProductHandler()
      console.log('These are similar products');
    }
  },[single_loader])
  return (
    <Layout title={"Details Product-ecom"}>
      <Grid container justifyContent="center" spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Product Details
          </Typography>
        </Grid>
        {single_loader && (
          <Grid item xs={12}>
            <Typography variant="h5" align="center">
              Loading...
            </Typography>
          </Grid>
        )}
        {!single_loader && !single_error && Object.keys(product).length > 0 && (
          <>
            <Grid item xs={12} md={2}>
              <Grid container spacing={1} direction="column">
                {product?.images?.map((item, i) => (
                  <Grid item key={i} onClick={() => setCount(i)}>
                    <CardMedia
                      component="img"
                      src={item.url}
                      alt={item.url}
                      style={{
                        height: "80px",
                        width: "80px",
                        cursor: "pointer",
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} md={10}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <CardMedia
                    component="img"
                    src={product?.images[count]?.url}
                    alt={product?.images[count]?.url}
                    style={{ height: "300px", width: "auto" }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <CardContent>
                    <Typography variant="h4" gutterBottom>
                      {product?.name}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Brand : </strong>
                      {product?.brand}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Quantity : </strong>
                      {product?.quantity ? "In Stock" : "Out of Stock"}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>Availability : </strong>
                      {product?.shipping === "yes"
                        ? "Available"
                        : "Not Available"}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      <strong>MRP : </strong>${product?.price}
                    </Typography>
                    <AddToCart />
                    <Typography
                      variant="body1"
                      gutterBottom
                      style={{ marginTop: "20px" }}
                    >
                      <strong>Description</strong>
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {product?.description}
                    </Typography>
                  </CardContent>
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
        <Grid item xs={12}>
          <Typography variant="h4" align="start" gutterBottom>
             Similar Products
             <SimilarProduct product={similarProduct} />
          </Typography>
        </Grid>
      </Grid>
    </Layout>
  );
}

export default DeatailsProduct;
