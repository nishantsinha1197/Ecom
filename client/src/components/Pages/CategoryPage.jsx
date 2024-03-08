import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import MoreDetails from '../form/MoreDetails'
import AddToCart from '../form/AddToCart'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

function CategoryPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    async function getDataBySlug() {
        try {
            const { data } = await axios.get(`/api/v1/product-category/${slug}`);
            setProduct(data.product);
        } catch (err) {
            console.log(err);
            toast(err.message);
        }
    }

    function singlePageHandler(id) {
        navigate(`/product-details/${id}`);
    }

    useEffect(() => {
        getDataBySlug();
    }, [slug]);

    return (
        <Layout title={"Category Page:Ecom"}>
            <Grid container spacing={2} justifyContent="center" >
                {product.length === 0 && <Typography variant="h4">Loading...</Typography>}
                {product.map((item) => (
                    <Grid item key={item._id} xs={12} sm={6} md={3} >
                        <Card style={{border:"1px black solid", margin:"20px"}}>
                            <CardMedia
                                component="img"
                                image={item?.images[0]?.url}
                                alt={item?.images[0]?.url}         
                            />
                            <CardContent>
                                <Typography variant="h6" component="h2">{item?.name}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">{item?.description}</Typography>
                                <Typography variant="body2" color="textSecondary" component="p">{item?.brand}</Typography>
                                <MoreDetails p_id={item._id} singlePageHandler={singlePageHandler} />
                                <AddToCart />
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    );
}

export default CategoryPage;
