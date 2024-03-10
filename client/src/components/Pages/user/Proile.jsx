import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { TextField, Button, Grid, Typography } from "@material-ui/core";
import Layout from "../../Layout/Layout";
import { useAuth } from "../../../context/AuthContext";
import UserDashboardMenu from "../../UsersDashboardMenu";

function Profile() {
  const [auth, setAuth] = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  async function updateUserProfile() {
    try {
      if (!name || !address || !phone) {
        toast.error("All fields are required *");
        return;
      }

      const { data } = await axios.put(
        "/api/v1/profile-update",
        {
          name,
          phone,
          address,
          password: password ? password : "",
        },
        { headers: { Authorization: auth.token } }
      );

      toast.success(data.message);
      setAuth({ user: data.user, token: auth.token });
      navigate(location.state || "/");
    } catch (err) {
      console.error(err.message);
      toast.error(err.message);
    }
  }

  useEffect(() => {
    setName(auth.user.name);
    setEmail(auth.user.email);
    setAddress(auth.user.address);
    setPhone(auth.user.phone);
  }, []);

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <UserDashboardMenu />
          </div>
          <Grid item md={9}>
            <Typography variant="h4" align="center" gutterBottom>
              Update Profile
            </Typography>
            <hr />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  value={email}
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={updateUserProfile}
                >
                  Update User
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
