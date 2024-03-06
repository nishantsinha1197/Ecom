import React from 'react'
import Layout from '../Layout/Layout.jsx';
import { Link } from 'react-router-dom'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import useCategory from '../../hook/useCategory.js';


function AllCategory() {
  const { categories } = useCategory()
  return (
    <Layout title={"All Category-Ecom"}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h1" align="center" fontSize={'50px'}>All Categories</Typography>
        </Grid>
        <Grid item xs={12}>
          {categories.length === 0 ? (
            <Typography variant="h2" align="center">Wait...</Typography>
          ) : (
            <Grid container spacing={2} justifyContent="center">
              {categories.map((item) => (
                <Grid item key={item.id}>
                  <Button component={Link} to={`/all-category/${item.slug}`} variant="contained" color="primary">
                    {item.name}
                  </Button>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Layout>
  )
}

export default AllCategory
