import React from 'react';
import useSearch from '../../hook/useSearch';
import toast from 'react-hot-toast';
import axios from 'axios';
import { TextField, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Search() {
  const { search, setSearch } = useSearch();
  const navigate = useNavigate();

  // This is for search
  const searchHandler = (e) => {
    setSearch({ ...search, keyword: e.target.value });
  };

  // This is for search submit Handler
  const searchSubmitHandler = async () => {
    try {
      const { data } = await axios.get(`/api/v1/search-product/${search.keyword}`);
      if (data.success) {
        setSearch({ ...search, result: data.products });
        navigate('/search');
      } else {
        toast(data.message);
        return;
      }
    } catch (err) {
      toast(err.message);
    }
  };

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item xs={12} sm={3}>
        <TextField
          variant="outlined"
          placeholder="Search..."
          width='400px'
          value={search.keyword}
          onChange={searchHandler}
          style={{backgroundColor:"white", marginTop:"10px", marginBottom:"10px"}}
        />
      </Grid>
      <Grid item xs={12} sm={9}>
        <Button variant="contained" onClick={searchSubmitHandler} style={{backgroundColor:'yellow', color:"black"}}>
          Search
        </Button>
      </Grid>
    </Grid>
  );
}

export default Search;
