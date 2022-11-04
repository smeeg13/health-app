import "../App.css";
import React, { useContext} from "react";
import { ResultatContext } from "../Context";
import { Slider, Box } from "@mui/material";

export default function BoxResultat(props) {
    let resultatContext = useContext(ResultatContext);
    console.log("Resultat : ", resultatContext.resultat);
    console.log("Maladies : ", resultatContext.maladies);

    const marksDiab = [
    
      {
        value: 60,
        label: '60',
      },
    ];
    const marksCancer = [
    
      {
        value: 20,
        label: '20',
      },
    ];
    const marksInf = [
    
      {
        value: 3,
        label: '3',
      },
    ];
    const marksNInf = [
    
      {
        value: 10,
        label: '10',
      },
    ];

    function valuetext(value) {
      return `${value}%`;
    }
  
    return (
      <>
        
          <Box sx={{ width: 150, marginLeft:10 }}>
            <span>Diabete : </span>
      <Slider
      min="0"
      max="100"
        aria-label="Custom marks"
        value={props.maladies.diabete}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="on"
        marks={marksDiab}
        disabled
         size="medium"
      />
    </Box>
    <Box sx={{ width: 150, marginLeft:10 , marginTop:3 }}>
            <span>Cancer : </span>
      <Slider
      min="0"
      max="100"
        aria-label="Custom marks"
        value={props.maladies.cancer}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="on"
        marks={marksCancer}
        disabled
         size="medium"
      />
    </Box>  
    <Box sx={{ width: 150, marginLeft:10 , marginTop:3 }}>
            <span>Infarctus :</span>
      <Slider
      min="0"
      max="100"
        aria-label="Custom marks"
        value={props.maladies.infarctus}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="on"
        marks={marksInf}
        disabled
         size="medium"
      />
    </Box>
    <Box sx={{ width: 150, marginLeft:10, marginTop:3  }}>
            <label>Non - Infarctus :</label>
      <Slider
      min="0"
      max="100"
        aria-label="Custom marks"
        value={props.maladies.nonInfarctus}
        getAriaValueText={valuetext}
        step={1}
        valueLabelDisplay="on"
        marks={marksNInf}
        disabled
         size="medium"
      />
    </Box>

      </>
    );
  }