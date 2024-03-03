import React, { useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { Checkbox, Radio } from "antd";
import useCategory from "../../hook/useCategory";
import Price from "../../components/Price.js";
import {Button,Box} from "@mui/material";
import axios from "axios";
import AddToCart from "../form/AddToCart.jsx";
import MoreDetails from "../form/MoreDetails.jsx";
import { useNavigate } from "react-router-dom";
function HomePage() {
  let navigate = useNavigate()
  let { categories } = useCategory();
  let [selectedCategory, setSelectedCategory] = useState([]);
  let [price, setPrice] = useState("");
  let [filterData, setFilterData] = useState([]);
  let [limitProduct, setLimitProduct] = useState([]);
  //product count
  let [productCount, setProductCount] = useState("");
  //pageCount
  let [pageCount, setPageCount] = useState(1);
  //this is for handling category
  function changeCategoryHandler(e, id) {
    let all = [...selectedCategory];
    let checked = e.target.checked;
    if (checked) {
      all.push(id);
    } else {
      all = all.filter((data) => {
        return data != id;
      });
    }
    setSelectedCategory([...all]);
  }
  //this is for price handler
  function priceHandler(e) {
    setPrice(e.target.value);
  }
  //this is filteration
  async function filterHandler() {
    let res = await axios.post("/api/v1/filter-product", {
      price,
      checked: selectedCategory,
    });
    setFilterData(res.data.products);
  }
  //this is for product count
  async function totalCount(){
   try {
      let {data} = await axios.get('/api/v1/totalProduct')
      setProductCount(data.total)
   } catch (err) {
    console.log(err);
   } 
  }
  //this is for product-list
  async function productList() {
    let { data } = await axios.get(`/api/v1/product-list/${pageCount}`);

    setLimitProduct([...data.products, ...limitProduct]);
  }
  useEffect(() => {
    productList();
  }, [pageCount]);
  //this useEffect for total count
  useEffect(()=>{
    totalCount()
  })
  useEffect(() => {
    filterHandler();
  }, [price, selectedCategory]);
  //this is for single page handler
  function singlePageHandler(id){
    navigate(`/product-details/${id}`)
  }
  return (
    <Layout title="Best Offer -ecomm">
      {/* {JSON.stringify(auth,9,null)} */}
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={2}>
            <Typography variant="h6" mt={2} fontSize="26px">
              All Category
            </Typography>
            <hr />
            <div className="mt-1">
              {categories.map((item) => {
                return (
                  <div key={item._id}>
                    <Checkbox
                      value={item._id}
                      className="p-2"
                      style={{ fontSize: "16px" }}
                      onChange={(e) => {
                        changeCategoryHandler(e, item._id);
                      }}
                    >
                      {item.name}
                    </Checkbox>
                  </div>
                );
              })}
            </div>
            <div className="mt-4">
              <Typography variant="h6" mt={2} fontSize="26px">
                Filter By Price
              </Typography>
              <hr />
              <Radio.Group onChange={priceHandler}>
                {Price.map((item) => {
                  return (
                    <div key={item._id} className="p-2">
                      <Radio value={item.array}>{item.name}</Radio>
                    </div>
                  );
                })}
              </Radio.Group>
            </div>
            <div className="mt-2">
              <Button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  marginBottom: "20px",
                }}
                onClick={() => {
                  window.location.reload();
                }}
              >
                CLEAR ALL
              </Button>
            </div>
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography variant="h4" align="center" mt={2}>
              All Product List
            </Typography>
            <hr />
            <Typography style={{ textAlign: "end", marginBottom: "10px" }}>
              {price || selectedCategory.length > 0 ? (
                <Typography>
                  {filterData.length}/{productCount} results found
                </Typography>
              ) : (
                `${productCount} results found`
              )}
            </Typography>
              <Grid container spacing={2} justifyContent="center">
              {limitProduct.length == 0 && <Typography>loading....</Typography>}
              {limitProduct.length > 0 &&  (
                    (selectedCategory.length > 0 || price? filterData :limitProduct)?.map((item, i) => {
                      let {
                        name = "unknown",
                        description = "content will load",
                        brand = "unknown",
                        shipping = "No",
                        images = [],
                        price = 0,
                        _id,
                      } = item;
                      return (
                        <Grid item xs={12} sm={6} md={4} key={i}>
                          <Card variant="outlined" style={{ height: "100%" }}>
                            <CardContent>
                              <div style={{ marginBottom: "20px" }}>
                                <img
                                  src={
                                    item.images.length === 0
                                      ? ""
                                      : item.images[0].url
                                  }
                                  alt="something"
                                  className="img-fluid"
                                  style={{ width: "100%" }}
                                />
                              </div>
                              <Typography variant="h6">{name}</Typography>
                              <Typography variant="body1">
                                {description}
                              </Typography>
                              <Typography variant="body1">$ {price}</Typography>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  marginTop: "20px",
                                }}
                              >
                                <MoreDetails p_id={item._id} singlePageHandler={singlePageHandler}/>
                                <AddToCart/>
                              </div>
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    }))}
              </Grid>
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "center", margin: 3 }}>
          {productCount > limitProduct.length && (
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setPageCount((prevPageCount) => prevPageCount + 1);
              }}
            >
              LOAD MORE
              {console.log('count',limitProduct.length)}
            </Button>
          )}
        </Box>
      </Container>
    </Layout>
  );
}

export default HomePage;
