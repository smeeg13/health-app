import "../App.css";
import React from "react";
import { Slider, Box } from "@mui/material";
import CircularProgressBar from "./CircularProgessBar";
export default function BoxResultat(props) {
  function valuetext(value) {
    return `${value}%`;
  }
  console.log("Value inside maladie : ", props.maladies);
  return (
    <div>
      <div className="container_label3">
        <label style={{ marginTop: "10px" }} className="label_results">
          Diabete :{" "}
        </label>
        <br></br>
        <label style={{ marginTop: "30px" }} className="label_results">
          Cancer :{" "}
        </label>
        <br></br>
        <label style={{ marginTop: "30px" }} className="label_results">
          Infarctus :
        </label>
        <br></br>
        <label style={{ marginTop: "30px" }} className="label_results">
          Non-infarctus :
        </label>
      </div>

      <div className="container_results">
        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px",
          }}
        >
          <CircularProgressBar progress={props.maladies.diabete} />

          {/* <Slider
          min="0"
          max="100"
          aria-label="Custom marks"
          value={props.maladies.diabete}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="on"
          disabled
          size="medium"
        /> */}
        </Box>

        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px",
          }}
        >
          <CircularProgressBar progress={props.maladies.cancer} />

          {/* <Slider
          min="0"
          max="100"
          aria-label="Custom marks"
          value={props.maladies.cancer}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="on"
          disabled
          size="medium"
        /> */}
        </Box>

        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px",
          }}
        >
          <CircularProgressBar progress={props.maladies.infarctus} />

          {/* <Slider
          min="0"
          max="100"
          aria-label="Custom marks"
          value={props.maladies.infarctus}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="on"
          disabled
          size="medium"
        /> */}
        </Box>

        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px",
          }}
        >
          <CircularProgressBar progress={props.maladies.nonInfarctus} />
          {/* <Slider
          min="0"
          max="100"
          aria-label="Custom marks"
          value={props.maladies.nonInfarctus}
          getAriaValueText={valuetext}
          step={1}
          valueLabelDisplay="on"
          disabled
          size="medium"
        /> */}
        </Box>
      </div>
    </div>
  );
}
