import React from 'react';
// import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { TextField } from '@mui/material';
function CategoryForm({ category, setInputHandler, sumbmitCategoryHandler }) {
  return (
    <div className='d-flex'>
      <TextField
        variant="outlined"
        label="Enter new Category"
        className='p-1'
        value={category}
        onChange={(e) => {
          setInputHandler(e);
        }}
        style={{ height: '100%' }}
      />
      <Button
        variant="contained"
        color="primary"
        className='ms-3'
        onClick={sumbmitCategoryHandler}
        style={{margin:"5px"}}
      >
        Submit
      </Button>
    </div>
  );
}

export default CategoryForm;
