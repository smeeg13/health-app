import "../App.css";
import React from "react";
import { Slider, Box } from "@mui/material";
import CircularProgressBar from "./CircularProgessBar";
export default function BoxResultat(props) {
  function valuetext(value) {
    return `${value}%`;
  }
  console.log("Value inside resultat : ", props.resultat);

  console.log("Value inside maladie : ", props.maladies);
  return (
    <div>
      <h2>Vos Resultats</h2>
    {/* Avataaar ici */}

      <div className="container_label3">
        <label style={{ marginTop: "10px" }} className="label_results">
          Diabete :{" "}
        </label>
        <br></br>
        <label style={{ marginTop: "35px" }} className="label_results">
          Cancer :{" "}
        </label>
        <br></br>
        <label style={{marginTop:"45px"}}  className="label_results">Heart attack :</label>
        <br></br>
        <label style={{marginTop:"50px"}}  className="label_results">No heart attack :</label>
      </div>

      <div className="container_results">
        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px", marginTop:"10px",
          }}
        >
          <CircularProgressBar progress={props.maladies.diabete} />

          
        </Box>

        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px", marginTop:"10px",
          }}
        >
          <CircularProgressBar progress={props.maladies.cancer} />

         
        </Box>

        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px", marginTop:"20px",
          }}
        >
          <CircularProgressBar progress={props.maladies.infarctus} />

         
        </Box>

        <Box
          sx={{
            width: 150,
            marginLeft: 10,
            float: "right",
            marginRight: "30px", marginTop:"15px",
          }}
        >
          <CircularProgressBar progress={props.maladies.nonInfarctus} />
      
        </Box>
      </div>
    </div>
  );
}
