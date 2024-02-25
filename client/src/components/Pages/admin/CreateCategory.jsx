import React, { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableRow,
  Button,
} from "@mui/material";
import AdminDashboardMenu from "../../AdminDashboardMenu";
import Layout from "../../Layout/Layout";
import useCategory from "../../../hook/useCategory";
import CategoryForm from "../../form/CategoryForm";
import toast from "react-hot-toast";
import { useAuth } from "../../../context/AuthContext";
import axios from "axios";
import { Modal } from "antd";

function CreateCategory() {
  let { categories, setChangeCategory, changeCategory } = useCategory();
  console.log(categories);
  let [category, setCategory] = useState("");
  let [auth] = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  let [categoryId, setCategoryId] = useState("");
  //For setting the input field
  function setInputHandler(e) {
    setCategory(e.target.value);
  }
  //For adding category
  async function sumbmitCategoryHandler() {
    try {
      let result = await axios.post(
        "/api/v1/create-category",
        { name: category },
        { headers: { Authorization: auth.token } }
      );
      console.log(result);
      if (result.data.success) {
        toast(result.data.message);
        setChangeCategory(!changeCategory);
      } else {
        toast(result.data.message);
      }
    } catch (err) {
      console.log(err);
      toast(err.message);
    }
  }
  //For deleting category
  async function deleteCategoryHandler(id) {
    try {
      let result = await axios.delete(`/api/v1/delete-category/${id}`, {
        headers: { Authorization: auth.token },
      });
      if (result.data.success) {
        toast(result.data.message);
        setChangeCategory(!changeCategory);
      } else {
        toast(result.data.message);
      }
    } catch (err) {
      console.log(err);
      toast(err.data.message);
    }
  }
  //For updating category
  const handleOk = async () => {
    try {
      let { data } = await axios.put(
        `/api/v1/update-category/${categoryId}`,
        { name: category },
        { headers: { Authorization: auth.token } }
      );
      if (data.success) {
        toast(data.message);
        setChangeCategory(!changeCategory);
      } else {
        toast(data.message);
      }
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      toast(err.message);
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <Layout title={"Create Category -Ecomm"}>
      <Container>
        <Typography
          variant="h1"
          align="center"
          className="mt-3 mb-2"
          style={{ fontSize: "50px" }}
        >
          Admin Dashboard
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <AdminDashboardMenu />
          </Grid>
          <Grid item xs={12} md={9}>
            <Typography variant="h6" align="center" className="m-3">
              Manage Category
            </Typography>
            <CategoryForm
              category={category}
              setInputHandler={setInputHandler}
              sumbmitCategoryHandler={sumbmitCategoryHandler}
            />
            <hr />
            {categories.length === 0 && (
              <Typography variant="h5" align="center">
                Loading...
              </Typography>
            )}
            <TableContainer>
              <Table className="table">
                <TableHead>
                  <TableCell style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell style={{ fontSize: "20px", fontWeight: "bold" }}>
                    Action
                  </TableCell>
                </TableHead>
                <TableBody>
                  {categories.length > 0 && (
                    <>
                      {categories.map((item, i) => {
                        let { _id, name, slug } = item;
                        return (
                          <>
                            <TableRow key={i}>
                              <TableCell>{name}</TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    setIsModalOpen(true);
                                    setCategoryId(_id);
                                    setCategory(name);
                                  }}
                                >
                                  edit
                                </Button>
                                <Button
                                  variant="contained"
                                  className="ms-3"
                                  style={{backgroundColor:"red"}}
                                  onClick={() => {
                                    deleteCategoryHandler(_id);
                                  }}
                                >
                                  delete
                                </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        );
                      })}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <CategoryForm
            category={category}
            setInputHandler={setInputHandler}
            sumbmitCategoryHandler={handleOk}
          />
        </Modal>
      </Container>
    </Layout>
  );
}

export default CreateCategory;
