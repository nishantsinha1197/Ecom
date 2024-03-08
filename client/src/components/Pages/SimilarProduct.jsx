import React, { useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography, IconButton } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import AddToCart from '../form/AddToCart';
import MoreDetails from '../form/MoreDetails';

function SimilarProduct({ product }) {
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState(false);

    const singlePageHandler = (id) => {
        navigate(`/product-details/${id}`);
    };

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Grid container justifyContent="center" spacing={3}>
            {product.length === 0 && <Typography variant="h4">Loading...</Typography>}
            {product.length > 0 &&
                product.map((item) => (
                    <Grid item key={item._id} xs={12} md={3}>
                        <Card style={{ maxWidth: 300 }}>
                            <CardMedia component="img" src={item?.images[0]?.url} alt={item?.images[0]?.url} style={{ height: 200 }} />
                            <CardContent>
                                <Typography variant="h6">{item?.name}</Typography>
                                <Typography>
                                    {expanded ? item?.description : `${item?.description.substring(0, 100)}...`}
                                    {!expanded && item?.description.length > 100 && (
                                        <IconButton onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
                                            <ExpandMoreIcon />
                                        </IconButton>
                                    )}
                                </Typography>
                                <Typography>{item?.brand}</Typography>
                                <MoreDetails p_id={item._id} singlePageHandler={singlePageHandler}/>
                                <AddToCart prod={item}/>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
        </Grid>
    );
}

export default SimilarProduct;
