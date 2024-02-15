import * as React from 'react';
import { Box, Grid, Link, Typography, Container, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const socialMediaLinks = {
  facebook: '#',
  twitter: '#',
  instagram: '#',
};

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'black',
        color: 'text.secondary',
        py: 1,
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth={false} >
        <Grid container spacing={2} justifyContent="space-between">
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" color="white" gutterBottom>
              ECOM
            </Typography>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="white" gutterBottom>
              PRODUCT
            </Typography>
            <Link href="#" style={{color:'white', textDecoration:"none"}} display="block">Features</Link>
            <Link href="#" style={{color:'white', textDecoration:"none"}} display="block">Integrations</Link>
            <Link href="#" style={{color:'white', textDecoration:"none"}} display="block">Pricing</Link>
            <Link href="#" style={{color:'white', textDecoration:"none"}} display="block">FAQ</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="white" gutterBottom>
              COMPANY
            </Typography>
            <Link href="/about" style={{color:'white', textDecoration:"none"}} display="block">About Us</Link>
            <Link href="/contact" style={{color:'white', textDecoration:"none"}} display="block">Contact Us</Link>
            <Link href="/policy" style={{color:'white', textDecoration:"none"}} display="block">Privacy Policy</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="white" gutterBottom>
              DEVELOPERS
            </Typography>
            <Link href="#" style={{color:'white', textDecoration:"none"}} display="block">Public API</Link>
            <Link href="#" style={{color:'white', textDecoration:"none"}} display="block">Documentation</Link>
            <Link href="#" style={{color:'white', textDecoration:"none"}} display="block">Guides</Link>
          </Grid>
          <Grid item xs={6} sm={3} md={2}>
            <Typography variant="subtitle1" color="white" gutterBottom>
              SOCIAL MEDIA
            </Typography>
            <IconButton aria-label="Facebook" style={{color:'white', textDecoration:"none"}} component="a" href={socialMediaLinks.facebook}>
              <FacebookIcon />
            </IconButton>
            <IconButton aria-label="Twitter" style={{color:'white', textDecoration:"none"}} component="a" href={socialMediaLinks.twitter}>
              <TwitterIcon />
            </IconButton>
            <IconButton aria-label="Instagram" style={{color:'white', textDecoration:"none"}} component="a" href={socialMediaLinks.instagram}>
              <InstagramIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Typography variant="body2" color="white" align="center" sx={{ pt: 4 }}>
          © {new Date().getFullYear()} Company Co. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;