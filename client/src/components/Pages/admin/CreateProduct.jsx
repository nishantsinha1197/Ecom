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
import { UploadOutlined } from "@ant-design/icons";
import { Upload } from "antd";
import useCategory from "../../../hook/useCategory";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

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

  let [auth] = useAuth();
  let navigate = useNavigate()
  function categoryChange(value) {
    setCategory(value);
  }
  // function fileChangeHandler({ fileList }) {
  //   setImages(fileList);
  // }
  async function submitProductHandler(e) {
    try {
      if (
        !category ||
        !name ||
        !description ||
        !brand ||
        !price ||
        !quantity ||
        !shipping
      ) {
        toast("All fields are required");
      }
      if (images.length === 0) {
        toast("Please upload images");
      }
      let formData = new FormData();
      formData.append("name", name);
      formData.append("category", category.target.value);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("price", price);
      formData.append("quantity", quantity);
      formData.append("shipping", shipping.target.value);
      console.log(formData);
      for (let i = 0; i < images.length; i++) {
        formData.append("images", images[i].originFileObj);
      }
      let res= await axios.post('/api/v1/create-product',formData,{headers:{"Content-Type":"multipart/form-data",Authorization:auth.token,}})
      if(res.data.success)
      {
         toast(res.data.message)
         navigate('/dashboard/admin/products')
      }
    } catch (err) {
      console.log(err);
    }
    e.preventDefault();
    console.log(name, price, brand, description, images, shipping, quantity,category);
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
                {categories?.map((item,i) => (
                  <MenuItem key={i} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="mt-4">
              <Upload
                listType="picture"
                onChange={({ fileList }) => {
                  setImages(fileList);
                }}
                customRequest={() => false}
                beforeUpload={() => false}
                maxCount={4}
                multiple
                accept="image/*"
              >
                <Button icon={<UploadOutlined />} style={{ color: "red" }}>
                  Upload
                </Button>
              </Upload>
            </div>
            <TextField
              variant="outlined"
              label="Product Name"
              type="text"
              fullWidth
              style={{ marginBottom: "30px" }}
              onChange={(e) => {
                setName(e.target.value);
              }}
              value={name}
            />
            <TextField
              variant="outlined"
              label="Description"
              type="text"
              fullWidth
              style={{ marginBottom: "30px" }}
              onChange={(e) => {
                setDescrition(e.target.value);
              }}
              value={description}
            />
            <TextField
              variant="outlined"
              label="Brand"
              type="text"
              fullWidth
              style={{ marginBottom: "30px" }}
              onChange={(e) => {
                setBrand(e.target.value);
              }}
              value={brand}
            />
            <TextField
              variant="outlined"
              label="Price"
              type="text"
              fullWidth
              style={{ marginBottom: "30px" }}
              onChange={(e) => {
                setPrice(e.target.value);
              }}
              value={price}
            />
            <TextField
              variant="outlined"
              label="Quantity"
              type="number"
              fullWidth
              style={{ marginBottom: "30px" }}
              onChange={(e) => {
                setQuantity(e.target.value);
              }}
              value={quantity}
            />
            <FormControl style={{ width: "100%", marginBottom: "30px" }}>
              <InputLabel>Shipping</InputLabel>
              <Select
                fullWidth
                defaultValue=""
                onChange={(value) => {
                  setShipping(value);
                }}
              >
                <MenuItem value="yes">YES</MenuItem>
                <MenuItem value="no">NO</MenuItem>
              </Select>
            </FormControl>
            <div style={{ marginBottom: "50px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={submitProductHandler}
              >
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
