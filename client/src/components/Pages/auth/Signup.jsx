import React, { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from "@mui/material";

function Signup() {
  const [formData, setFormData] = useState(
    {
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
    },
  );
  let navigate = useNavigate();
  function formDataHandler(e) {
    setFormData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  }
  async function submitHandler(e) {
    try {
      e.preventDefault();
      //inline validation
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.phone ||
        !formData.address
      ) {
        console.log("all  field are required *");
      } else {
        console.log(formData);
        //api hitting
        let res= await axios.post(`/api/v1/register`,{...formData})
        let data=res.data
        if(data.success)
        {
          //console.log(data.message)
          toast(data.message)
          navigate('/signin')
        }
        else{
          //console.log(data.message)
          toast(data.message)
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Layout title="Registration - ecom">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <FormControl>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <FormLabel>Name</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ maxWidth: "220px", margin: "0" }}
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={formDataHandler}
            />
            <FormLabel>Email</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ maxWidth: "220px", margin: "0" }}
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={formDataHandler}
            />
            <FormLabel>Password</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ maxWidth: "220px", margin: "0" }}
              name="password"
              placeholder="Enter your Password"
              value={formData.password}
              onChange={formDataHandler}
            />
            <FormLabel>Phone</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ maxWidth: "220px", margin: "0" }}
              name="phone"
              placeholder="Enter your Mobile No."
              value={formData.phone}
              onChange={formDataHandler}
            />
            <FormLabel>Address</FormLabel>
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              sx={{ maxWidth: "220px", margin: "0" }}
              name="address"
              placeholder="Enter your address"
              value={formData.address}
              onChange={formDataHandler}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </FormControl>
      </div>
    </Layout>
  );
}

export default Signup;
