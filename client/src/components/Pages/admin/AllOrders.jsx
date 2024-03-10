import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@material-ui/core";
import Layout from "../../Layout/Layout";
import AdminDashboardMenu from "../../AdminDashboardMenu";
import { useAuth } from "../../../context/AuthContext";

function AllOrders() {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const enums = ["Not Process", "Processing", "Shipped", "Delivered", "Cancel"];
  const [status, setStatus] = useState(false);

  async function getOrder() {
    try {
      const { data } = await axios("/api/v1/all-order", {
        headers: { Authorization: auth.token },
      });
      if (data.success) {
        console.log(data.orders);
        setOrders(data.orders);
      } else {
        toast(data.message);
        return;
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  }

  async function statusHandler(value, id) {
    try {
      const { data } = await axios.put(`/api/v1/update-order/${id}`, { status: value }, { headers: { "Authorization": auth.token } });
      if (data.success) {
        toast.success(data.message);
        setStatus(!status);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  }

  useEffect(() => {
    getOrder();
  }, [status]);

  return (
    <Layout title={"All Order -Ecomm"} >
      <div className="container">
        <h1 className="text-center m-3">All Orders</h1>
        <div className="row">
          <div className="col-md-3">
            <AdminDashboardMenu />
          </div>
          <div className="col-md-9">
            <h6 className="text-center m-3"> All Orders</h6>
            <hr />
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>S.No</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Buyer</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Payment</strong></TableCell>
                    <TableCell><strong>Quantity</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((item, index) => (
                    <React.Fragment key={index}>
                      <TableRow>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          <Select
                            style={{ width: "100px" }}
                            value={item.status}
                            onChange={(e) => {
                              statusHandler(e.target.value, item._id);
                            }}
                          >
                            {enums.map((status, i) => (
                              <option key={i} value={status}>{status}</option>
                            ))}
                          </Select>
                        </TableCell>
                        <TableCell>{item.buyer.name}</TableCell>
                        <TableCell>{"2/3/2023"}</TableCell>
                        <TableCell>{item.payment.success ? "Success" : "Fail"}</TableCell>
                        <TableCell>{item.products.length}</TableCell>
                      </TableRow>
                      {item.products.map((product, i) => (
                        <TableRow key={`${index}-${i}`}>
                          <TableCell colSpan={6}>
                            <div className="container">
                              <div className="row m-2" style={{ border: "1px solid black" }}>
                                <div className="col-md-6">
                                  <img src={product.images[0].url} className="img-fluid" style={{height:'100px'}} />
                                </div>
                                <div className="col-md-6">
                                  <h6>{product.name}</h6>
                                  <p>{product.description}</p>
                                  <p>Price: {product.price}</p>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AllOrders;
