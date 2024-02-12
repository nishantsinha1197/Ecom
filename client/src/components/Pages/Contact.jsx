import React from 'react'
import Layout from '../Layout/Layout'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import contact from '../assets/contact.avif'
function Contact() {
  return (
    <Layout title="Contact - ecom">
       <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img src={contact} alt="Contact Us" style={{ maxWidth: '100%', height: '95%' }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Contact Us
          </Typography>
          <Typography variant="body1" paragraph>
            For any inquiries or assistance, feel free to reach out to us using the contact information provided below:
          </Typography>
          <Typography variant="body1" paragraph>
            Email: ecomstore@gmail.com
          </Typography>
          <Typography variant="body1" paragraph>
            Phone: +91 8654123908
          </Typography>
          <Typography variant="body1" paragraph>
            Address: Market City, Benagluru, India
          </Typography>
        </Grid>
      </Grid>
    </Container>
    </Layout>
  )
}

export default Contact