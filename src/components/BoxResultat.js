import "../App.css";
import React from "react";
import { Slider, Box } from "@mui/material";

export default function BoxResultat(props) {
  function valuetext(value) {
    return `${value}%`;
  }

  return (
    <>
      <Box sx={{ width: 150, marginLeft: 10 }}>
        <span>Diabete : </span>
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
      <Box sx={{ width: 150, marginLeft: 10, marginTop: 3 }}>
        <span>Cancer : </span>
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
      <Box sx={{ width: 150, marginLeft: 10, marginTop: 3 }}>
        <span>Infarctus :</span>
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
      <Box sx={{ width: 150, marginLeft: 10, marginTop: 3 }}>
        <label>Non - Infarctus :</label>
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
    </>
  );
}
