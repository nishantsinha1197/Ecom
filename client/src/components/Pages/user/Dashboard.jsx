import React from 'react'
import Layout from '../../Layout/Layout'
import { Typography } from '@mui/material'
import UserDashboardMenu from '../../UsersDashboardMenu'
function Dashbord() {
  return (
    <Layout>
       <div className="container">
          <Typography style={{textAlign:'center', fontWeight: 'bold', fontSize:'50px'}}> 
                User Dashboard
          </Typography>
          <div className="row d-flex justify-content-start">
             <div className="col-md-3">
               <UserDashboardMenu/>
             </div>
             <div className="col-md-9">
              //content
             </div>
          </div>
         </div>
    </Layout>
  )
}

export default Dashbord