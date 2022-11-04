import "../App.css";
import React, { useContext } from "react";
import { ResultatContext } from "../Context";
import { Slider, Box } from "@mui/material";

export default function BoxResultat(props) {
  let resultatContext = useContext(ResultatContext);
  console.log("Resultat : ", resultatContext.resultat);
  console.log("Maladies : ", resultatContext.maladies);

  const marksDiab = [
    {
      value: 60,
      label: "60",
    },
  ];
  const marksCancer = [
    {
      value: 20,
      label: "20",
    },
  ];
  const marksInf = [
    {
      value: 3,
      label: "3",
    },
  ];
  const marksNInf = [
    {
      value: 10,
      label: "10",
    },
  ];

  function valuetext(value) {
    return `${value}%`;
  }

  return (
    <div>
      <div className="container_label3">
        <label className="label_results">Diabete : </label>
        <br></br>
        <label className="label_results">Cancer : </label>
        <br></br>
        <label className="label_results">Infarctus :</label>
        <br></br>
        <label className="label_results">Non-infarctus :</label>
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
          // valueLabelDisplay="on"
          marks={marksDiab}
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
          // valueLabelDisplay="on"
          marks={marksCancer}
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
          // valueLabelDisplay="on"
          marks={marksInf}
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
          // valueLabelDisplay="on"
          marks={marksNInf}
          disabled
          size="medium"
        />
      </Box>

      </div>
    </div>
  );
}
