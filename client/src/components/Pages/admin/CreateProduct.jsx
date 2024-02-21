import React, { useState } from "react";
import Layout from "../../Layout/Layout";
import AdminDashboardMenu from "../../AdminDashboardMenu";
import {
  Button,
  Select,
  TextField,
  Grid,
  Container,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
// import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import useCategory from "../../../hook/useCategory";

function CreateProduct() {
  let { categories } = useCategory();
  let [category, setCategory] = useState();
  let [images, setImages] = useState([]);
  let [name, setName] = useState("");
  let [brand, setBrand] = useState("");
  let [price, setPrice] = useState("");
  let [description, setDescrition] = useState("");
  let [shipping, setShipping] = useState("");
  let [quantity, setQuantity] = useState("");

  function categoryChange(value) {
    setCategory(value);
  }
  function fileChangeHandler({ fileList }) {
    setImages(fileList);
  }
  return (
    <Layout title={"Create Product - Ecomm"}>
      <Container style={{ marginTop: "20px" }}>
        <Typography
          variant="h1"
          style={{
            textAlign: "center",
            marginTop: "30px",
            marginBottom: "20px",
            fontSize: "50px",
          }}
        >
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid xs={12} md={3}>
            <AdminDashboardMenu />
          </Grid>
          <Grid xs={12} md={9}>
            <Typography
              variant="h4"
              style={{
                textAlign: "center",
                marginTop: "30px",
                marginBottom: "20px",
              }}
            >
              Create Product
            </Typography>
            <hr />
            <FormControl style={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel>Select a category</InputLabel>
              <Select value={category} onChange={categoryChange} fullWidth>
                {categories?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div style={{ marginBottom: "30px" }}>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="upload-image"
                multiple
                type="file"
                onChange={fileChangeHandler}
              />
              <label htmlFor="upload-image">
                <Button variant="contained" color="secondary" component="span">
                  Upload
                </Button>
              </label>
            </div>
            <TextField
              variant="outlined"
              label="Product Name"
              type="text"
              fullWidth
              style={{ marginBottom: "30px" }}
            />
            <TextField
              variant="outlined"
              label="Description"
              type="text"
              fullWidth
              style={{ marginBottom: "30px" }}
            />
            <TextField
              variant="outlined"
              label="Brand"
              type="text"
              fullWidth
              style={{ marginBottom: "30px" }}
            />
            <TextField
              variant="outlined"
              label="Price"
              type="text"
              fullWidth
              style={{ marginBottom: "30px" }}
            />
            <TextField
              variant="outlined"
              label="Quantity"
              type="number"
              fullWidth
              style={{ marginBottom: "30px" }}
            />
            <FormControl style={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel>Shipping</InputLabel>
              <Select fullWidth defaultValue="">
                <MenuItem value="yes">YES</MenuItem>
                <MenuItem value="no">NO</MenuItem>
              </Select>
            </FormControl>
            <div style={{ marginBottom: "50px" }}>
              <Button variant="contained" color="primary">
                Create Product
              </Button>
            </div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}

export default CreateProduct;
