import React from 'react'
import Layout from '../../Layout/Layout'
import UserDashboardMenu from '../../UsersDashboardMenu'
import { Typography } from '@mui/material'

function Profile() {
  return (
     <Layout title={"User Profile -Ecomm"}>
        <div className="container">
        <Typography  style={{textAlign:'center', fontWeight: 'bold', fontSize:'50px'}}>
        User Profile
        </Typography>
            <div className="row">
                <div className="col-md-3">
                    <UserDashboardMenu/>
                </div>
                <div className="col-md-9">
                    <h6>User Profile</h6>
                </div>
            </div>
        </div>

     </Layout>
  )
}

export default Profile