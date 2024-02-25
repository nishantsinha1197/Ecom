import React, { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import useProduct from "../../../hook/useProduct";
import { singleFetchedProduct } from "../../../Action/ActionCreator";

function UpdateProduct() {
  let { id } = useParams();
  let {productChange,setProductChange} = useProduct()
  let { singleProduct, single_loader, single_error, product } = useProduct();
  console.log('singleProd',singleProduct);
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
  let navigate = useNavigate();
  console.log(product);
  function categoryChange(e) {
    setCategory(e.target.value);
  }
  async function updateProductHandler(){
    try {
      if(!name || !category || !description || !brand || !price || !shipping || !quantity ){
        toast('All fields are rqeuired')
      }
      let formData = new FormData()
      formData.append('name',name)
      formData.append('price',price)
      formData.append('quantity',quantity)
      formData.append('brand',brand)
      formData.append('description',description)
      formData.append('category',category)
      formData.append('shipping',shipping)
      for(let i=0;i<images.length;i++){
        formData.append('images',images[i].originFileObj)
      }
      let res = await axios.put(`/api/v1/update-product/${id}`,formData,{
        headers : {
          "Content-Type":'multipart/form-data',
          Authorization: auth.token,
        },
      })
      if(res.data.success){
        toast(res.data.message)
        setProductChange(!productChange)
        navigate('/dashboard/admin/products')
      }
      else{
        toast(res.data.message)
      }
    } catch (err) {
      console.log(err);
      toast(err.message)
    }
  }
  async function deleteProductHandler(){
    try {
      let res = await axios.delete(`/api/v1/delete-product/${id}`,{
        headers:{Authorization:auth.token}
      });
      if(res.data.success){
        toast(res.data.message)
        setProductChange(!productChange)
        navigate('/dashboard/admin/products')
      }
      else{
        toast(res.data.success)
      }
    } catch (err) {
      console.log(err);
      toast(err.message)
    }
  }
  useEffect(() => {
    console.log(id);
    singleProduct(`/api/v1/single-product/${id}`);
  }, []);
  useEffect(() => {
    if (Object.keys(product).length > 0) {
        console.log(product.category);
      setCategory(product?.category)
      setName(product?.name);
      setDescrition(product?.description);
      setPrice(product?.price);
      setBrand(product?.brand);
      setShipping(product?.shipping);
      setImages(product?.images);
      setQuantity(product?.quantity);
    }
  }, [single_loader]);

  return (
    <Layout title={"Update and Delete - Ecomm"}>
      <Container style={{ marginTop: "20px", width: "50%" }}>
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
          {single_loader && <h4>loading.....</h4>}
          {!single_loader && single_error && <h4>somthing wrong...</h4>}
          {!single_loader && Object.keys(product).length > 0 && (
            <>
              <Grid xs={12} md={9}>
                <Typography
                  variant="h4"
                  style={{
                    textAlign: "center",
                    marginTop: "30px",
                    marginBottom: "20px",
                  }}
                >
                  Update or Delete Product
                </Typography>
                <hr />
                <FormControl style={{ width: "100%" }}>
                  <InputLabel>Select a category</InputLabel>
                  <Select
                        value={category}
                        onChange={categoryChange}
                        fullWidth
                    >
                        {categories?.map((item, i) => (
                        <MenuItem key={i} value={item._id}>
                            {item.name}
                        </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <div className="mt-4" style={{ marginBottom: "20px" }}>
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
                    <Button
                      icon={<UploadOutlined />}
                      variant="contained"
                      color="secondary"
                    >
                      Upload Images
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
                    value={shipping}
                    onChange={(e) => {
                      setShipping(e.target.value);
                    }}
                  >
                    <MenuItem value="yes">YES</MenuItem>
                    <MenuItem value="no">NO</MenuItem>
                  </Select>
                </FormControl>
                <div style={{ marginBottom: "50px", display:'flex',justifyContent:"space-between"}}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={updateProductHandler}
                  >
                    Update Product
                  </Button>
                  <Button
                    variant="contained"
                    style={{backgroundColor:"red", color:"white"}}
                    onClick={deleteProductHandler}
                  >
                    Delete Product
                  </Button>
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Layout>
  );
}

export default UpdateProduct;
