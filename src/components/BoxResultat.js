import "../App.css";
import React from "react";
import { Slider, Box } from "@mui/material";

export default function BoxResultat(props) {

  function valuetext(value) {
    return `${value}%`;
  }

  return (
    <div>
      <div className="container_label3">
        <label style={{marginTop:"10px"}}  className="label_results">Diabete : </label>
        <br></br>
        <label style={{marginTop:"30px"}}  className="label_results">Cancer : </label>
        <br></br>
        <label style={{marginTop:"30px"}}  className="label_results">Heart attack :</label>
        <br></br>
        <label style={{marginTop:"30px"}}  className="label_results">No heart attack :</label>
      </div>

      <div className="container_results">
      <Box sx={{ width: 150, marginLeft: 10, float:"right", marginRight:"30px"}}>
        <Slider
          min="0"
          max="100"
          aria-label="Custom marks"
          value={props.maladies.diabete}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="on"
          disabled
          size="medium"
        />
      </Box>

      <Box  sx={{ width: 150, marginLeft: 10, float:"right", marginRight:"30px"}}>
        <Slider
          min="0"
          max="100"
          aria-label="Custom marks"
          value={props.maladies.cancer}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="on"
          disabled
          size="medium"
        />
      </Box>

      <Box sx={{ width: 150, marginLeft: 10, float:"right", marginRight:"30px" }}>
        <Slider
          min="0"
          max="100"
          aria-label="Custom marks"
          value={props.maladies.infarctus}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="on"
          disabled
          size="medium"
        />
      </Box>

      <Box sx={{ width: 150, marginLeft: 10, float:"right", marginRight:"30px" }}>
        <Slider
          min="0"
          max="100"
          aria-label="Custom marks"
          value={props.maladies.nonInfarctus}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="on"
          disabled
          size="medium"
        />
      </Box>

      </div>
    </div>
  );
}
