import React from 'react';
import { Container, Typography, Grid, TableContainer,Table, TableHead, TableCell, TableBody, TableRow, Button } from '@mui/material';
import AdminDashboardMenu from '../../AdminDashboardMenu';
import Layout from '../../Layout/Layout';
import useCategory from '../../../hook/useCategory';

function CreateCategory() {
    let categories = useCategory()
    console.log(categories);
    return (
        <Layout title={"Create Category -Ecomm"}>
            <Container>
                <Typography variant="h1" align="center" className='mt-3 mb-2' style={{fontSize:"50px"}}>Admin Dashboard</Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={3}>
                        <AdminDashboardMenu />
                    </Grid>
                    <Grid item xs={12} md={9}>
                    <Typography variant="h6" align="center" className="m-3">Manage Category</Typography>
                    <hr/>
                    {categories.length=== 0 && <Typography variant='h5' align='center'>Loading...</Typography>}
                       <TableContainer>
                            <Table className="table" >
                                <TableHead>
                                    <TableCell style={{fontSize:"20px",fontWeight:'bold'}}>Name</TableCell>
                                    <TableCell style={{fontSize:"20px",fontWeight:'bold'}}>Action</TableCell>
                                </TableHead>
                                <TableBody>
                                {categories.length > 0 && (
                                <>
                                    {categories.map((item,i)=>{
                                        let {_id,name,slug} = item
                                        return <>
                                        <TableRow key={i} >
                                         <TableCell>{name}</TableCell>
                                         <TableCell>
                                             <Button variant="contained" color="primary" >edit</Button>
                                             <Button variant="contained" color="error" className="ms-3" >delete</Button>
                                         </TableCell>
                                     </TableRow>
                                        </>
                                    })}
                                </>)}
                                </TableBody>
                            </Table>
                       </TableContainer>
                    </Grid>
                </Grid>
            </Container>
        </Layout>
    );
}

export default CreateCategory;
