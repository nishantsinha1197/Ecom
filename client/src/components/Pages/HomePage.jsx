import React, { useState } from "react";
import Layout from "../Layout/Layout";
import { useAuth } from "../../context/AuthContext";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import { Checkbox, Radio } from "antd";
import useProduct from "../../hook/useProduct";
import useCategory from "../../hook/useCategory";
import Price from "../../components/Price.js";
function HomePage() {
  let [auth] = useAuth();
  let { error, loading, products } = useProduct();
  let { categories } = useCategory();
  let [selectedCategory, setSelectedCategory] = useState([]);
  let [price, setPrice] = useState("");

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
  function priceHandler(e) {
    setPrice(e.target.value);
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
          </Grid>
          <Grid item xs={12} md={10}>
            <Typography variant="h4" align="center" mt={2}>
              All Product List
            </Typography>
            <hr />
            <Container>
              <Grid container spacing={2} justifyContent="center">
                {loading && <h4>loading...</h4>}
                {!loading && error && <h1>Something went wrong....</h1>}
                {!loading && products.length > 0 && (
                  <>
                    {products?.map((item, i) => {
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
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Card
                            key={i}
                            variant="outlined"
                            style={{
                              height: "400px",
                              marginBottom: "20px",
                              border: "1px black solid",
                            }}
                          >
                            <CardContent>
                              <div>
                                <img
                                  src={images.length === 0 ? "" : images[0].url}
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
                            </CardContent>
                          </Card>
                        </Grid>
                      );
                    })}
                  </>
                )}
              </Grid>
            </Container>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default HomePage;
