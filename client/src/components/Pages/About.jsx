import React from 'react'
import Layout from '../Layout/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import ecom from '../assets/ecom.jpg'
function About() {
  return (
    <Layout title="About --ecom">
        <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img src={ecom} alt="About Us" style={{ maxWidth: '100%', height: '90%' }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            About Us
          </Typography>
          <Typography variant="body1" paragraph>
          Welcome to our e-commerce store! We are dedicated to providing you with the best online shopping experience.
        </Typography>
        <Typography variant="body1" paragraph>
          Our mission is to offer a wide range of high-quality products at affordable prices, along with excellent customer service.
        </Typography>
        <Typography variant="body1" paragraph>
          At our store, you'll find a diverse selection of products including electronics, fashion, home goods, and more.
        </Typography>
        <Typography variant="body1" paragraph>
          Thank you for choosing us for your online shopping needs. We look forward to serving you!
        </Typography>
        </Grid>
      </Grid>
    </Container>
    </Layout>
  )
}

export default About