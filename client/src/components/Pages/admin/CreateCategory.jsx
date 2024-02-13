import React from 'react'
import AdminDashboardMenu from '../../AdminDashboardMenu'
import Layout from '../../Layout/Layout'

function CreateCategory() {
    return (
        <Layout title={"Create Category -Ecomm"}>
          <div className="container">
           <h1 className='text-center mt-3 mb-2'>Admin Dashboard</h1>
           <div className="row">
               <div className="col-md-3">
                   <AdminDashboardMenu/>
               </div>
               <div className="col-md-9">
                  // category mangement
               </div>
           </div>
          </div>
        </Layout>
     )
}

export default CreateCategory