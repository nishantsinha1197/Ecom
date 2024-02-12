import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Layout from '../Layout/Layout';
import policy from '../assets/policy.jpg'
function Policy() {
  return (
    <Layout title="Policy --ecom">
       <Container maxWidth="md" style={{ marginTop: 20 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <img src={policy} alt="Privacy Policy" style={{ maxWidth: '100%', height: '100%' }} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            Privacy Policy
          </Typography>
          <Typography variant="body1" paragraph>
          At our website, we are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy outlines the types of personal information we collect, how we use it, and the measures we take to safeguard your information.
          </Typography>
          <Typography variant="body1" paragraph>
          Personal Information: When you create an account, make a purchase, or interact with our website, we may collect personal information such as your name, email address, shipping address, billing information, and phone number.
          </Typography>
          <Typography variant="body1" paragraph>
          Transaction Information: We collect information about your purchases, including the products you buy, payment methods, and transaction details.
          </Typography>
          <Typography>
          Usage Data: We may collect information about how you interact with our website, such as your browsing history, pages visited, and preferences.
          </Typography>
        </Grid>

      </Grid>
    </Container>
    </Layout>
  )
}

export default Policy