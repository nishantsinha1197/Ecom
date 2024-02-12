import React, { useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Layout/Layout";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { FormControl, FormLabel } from "@mui/material";
import { useAuth } from "../../../context/AuthContext";

function SignIn() {
  let [auth,setAuth] = useAuth()
  let location = useLocation()
  console.log(location);
  //env way
  //console.log(process.env.REACT_APP_PROXY)
  const [formData, setFormData] = useState(
    {
      email: "",
      password: "",
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
        !formData.email ||
        !formData.password 
      ) {
        console.log("all  field are required *");
      } else {
        console.log(formData);
        //api hitting
        let res= await axios.post(`/api/v1/login`,{...formData})
        let data=res.data
        if(data.success)
        {
          toast(data.message)
          setAuth(data)
          console.log(location);

          navigate(location.state||"/");
        }
        else{
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

export default SignIn;
