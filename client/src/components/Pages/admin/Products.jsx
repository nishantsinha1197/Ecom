import React from "react";
import Layout from "../../Layout/Layout";
import AdminDashboardMenu from "../../AdminDashboardMenu";

function Products() {
  return (
    <Layout title="All Products-Ecom">
      <div className="container">
        <div className="row mt-4 d-flex justify-content-start">
          <div className="col-md-3">
            <AdminDashboardMenu/>
          </div>
          <div className="col-md-9">
            <h1>hello All product</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Products;
