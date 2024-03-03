import React from "react";
import { Button } from "@mui/material";

function MoreDetails({p_id,singlePageHandler}) {
  console.log('hello pid',p_id)
  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      style={{ marginRight: "10px" }}
      onClick={()=>{singlePageHandler(p_id)}}
    >
      More Details
    </Button>
  );
}

export default MoreDetails;
