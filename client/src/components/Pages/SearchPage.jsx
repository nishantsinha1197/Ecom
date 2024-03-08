import React from "react";
import Layout from '../Layout/Layout';
import { useNavigate } from "react-router-dom";
import { Typography, Button, Grid, Card, CardContent, CardMedia } from "@mui/material";
import useSearch from "../../hook/useSearch";
import MoreDetails from "../form/MoreDetails";
import AddToCart from "../form/AddToCart";

function SearchPage() {
  const { search } = useSearch();
  const navigate = useNavigate();

  const singlePageHandler = (id) => {
    navigate(`/product-details/${id}`);
  };

  return (
    <Layout title={"Search Result -ecom"}>
      <Grid container justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Search Result
          </Typography>
          <Typography variant="body1" align="center">
          <b>{search.result.length}</b> products found 
          </Typography>
          {search.result.length === 0 && (
            <div>
              <Typography variant="h5" align="center">
                No Result
              </Typography>
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  GO BACK TO HOME
                </Button>
              </div>
            </div>
          )}
          {search.result.length > 0 && (
            <Grid container spacing={3}>
              {search.result.map((item) => 
                {
                    return  <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                    <Card>
                      <CardMedia
                        component="img"
                        image={item?.images[0]?.url}
                        alt={item?.images[0]?.url}
                      />
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {item?.name}
                        </Typography>
                        <Typography variant="body2" paragraph>
                          {item?.description}
                        </Typography>
                        <Typography variant="body2">{item?.brand}</Typography>
                        <MoreDetails p_id={item._id} singlePageHandler={singlePageHandler} />
                        <AddToCart prod={item} />
                      </CardContent>
                    </Card>
                  </Grid>     
                }
              )}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default SearchPage;
