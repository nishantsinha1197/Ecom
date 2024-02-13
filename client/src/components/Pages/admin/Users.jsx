import React from 'react'
import AdminDashboardMenu from '../../AdminDashboardMenu'
import Layout from '../../Layout/Layout'

function Users() {
    return (
        <Layout  title={"All Users -Ecomm"}>
          <div className="container">
           <h1 className='text-center mt-3 mb-2'>Admin Dashboard</h1>
           <div className="row">
               <div className="col-md-3">
                   <AdminDashboardMenu/>
               </div>
               <div className="col-md-9">
                   //User mangement from admin
               </div>
           </div>
          </div>
        </Layout>
     )
}

export default Users