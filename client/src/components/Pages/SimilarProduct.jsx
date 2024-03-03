import React from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MoreDetails from '../form/MoreDetails';
import AddToCart from '../form/AddToCart';

function SimilarProduct({ product }) {
    const navigate = useNavigate();

    const singlePageHandler = (id) => {
        navigate(`/product-details/${id}`);
    };

    return (
        <Grid container justifyContent="center" spacing={3}>
            {product.length === 0 && <Typography variant="h4">Loading...</Typography>}
            {product.length > 0 &&
                product.map((item) => (
                    <Grid item key={item._id} xs={12} md={3}>
                    <Card style={{ maxWidth: 300, maxHeight: 400 , border:"1px black solid"}}>
                        <CardMedia component="img" src={item?.images[0]?.url} alt={item?.images[0]?.url} style={{ height: 200 }} />
                        <CardContent>
                            <Typography variant="h6">{item?.name}</Typography>
                            <Typography>{item?.description}</Typography>
                            <Typography>{item?.brand}</Typography>
                            <MoreDetails p_id={item._id} singlePageHandler={singlePageHandler}/>
                            <AddToCart/>
                        </CardContent>
                    </Card>
                </Grid>
                ))}
        </Grid>
    );
}

export default SimilarProduct;
