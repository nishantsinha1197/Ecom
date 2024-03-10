import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import UserDashboardMenu from '../../UsersDashboardMenu'
import { Container, Typography, Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
import { useAuth } from '../../../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

function Order() {
  let [auth] = useAuth();
  let [orders, setOrders] = useState([]);
  async function getOrder() {
    try {
      let { data } = await axios("/api/v1/order", {
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
      console.log(err);
      toast(err.message);
    }
  }
  useEffect(() => {
    getOrder();
  }, []);
  
  return (
    <Layout title={"All Order - Ecomm"}>
      <Container>
        <Typography variant="h1" align="center" gutterBottom>All Orders</Typography>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <UserDashboardMenu />
          </div>
          <div style={{ flex: 3 }}>
            <Typography variant="h6" align="center" gutterBottom>All Orders</Typography>
            <hr />
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
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography variant="h6">No Orders Placed</Typography>
                    </TableCell>
                  </TableRow>
                )}
                {orders.map((item, index) => (
                  <React.Fragment key={index}>
                    <TableRow>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.status}</TableCell>
                      <TableCell>{item.buyer.name}</TableCell>
                      <TableCell>2/3/2024</TableCell>
                      <TableCell>{item.payment && item.payment.success ? "Success" : "Fail"}</TableCell>
                      <TableCell>{item.products.length}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell colSpan={6}>
                        <div style={{ display: "flex", flexDirection: "column" }}>
                          {item.products.map((product, i) => (
                            <div key={i} style={{ border: "1px solid black", padding: "10px", marginBottom: "10px" }}>
                              <div style={{ display: "flex" }}>
                                <div style={{ flex: 1 }}>
                                  <img src={product.images[0].url}  className="img-fluid" />
                                </div>
                                <div style={{ flex: 3 }}>
                                  <Typography variant="h6">{product.name}</Typography>
                                  <Typography>{product.description}</Typography>
                                  <Typography>Price: {product.price}</Typography>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default Order