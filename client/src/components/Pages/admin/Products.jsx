import React from "react";
import Layout from "../../Layout/Layout";
import AdminDashboardMenu from "../../AdminDashboardMenu";
import { Container, Grid, Card, CardContent, Typography } from "@mui/material";
import useProduct from "../../../hook/useProduct";
import { Link } from "react-router-dom";
function Products() {
  let { error, loading, products } = useProduct();
  return (
    <Layout title="All Products-Ecom">
      <Container>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={2}>
            <AdminDashboardMenu />
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
                      console.log(item);
                      return (
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                          <Link
                            to={`/dashboard/admin/products/${_id}`}
                            style={{ textDecoration: "none", color: "black" }}
                          >
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
                                    src={
                                      images.length === 0 ? "" : images[0].url
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
                                <Typography variant="body1">
                                  $ {price}
                                </Typography>
                              </CardContent>
                            </Card>
                          </Link>
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

export default Products;
