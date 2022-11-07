import "../App.css";
import { Slider, Box } from "@mui/material";
import CircularProgressBar from "./CircularProgessBar";
import { ResultatContext, ThemeContext, themes  } from "../Context";
import React, { useState, useContext, useEffect } from "react";
import avatar1 from "../pages/img/avatar1.png";
import avatar5 from "../pages/img/avatar5.png";

export default function BoxResultat(props) {
  let resultatContext = useContext(ResultatContext);

  function valuetext(value) {
    return `${value}%`;
  }
  console.log("Value inside resultat : ", props.resultat);
  console.log("Value inside maladie : ", props.maladies);

    const [resultsInfarctus, setImgInfarctus] = useState(props.maladies.infarctus);
    const resultsSmoke = resultatContext.resultat.fume;
    const [resultsAlim, setImgAlim] = useState(resultatContext.resultat.alim);
    const [resultsAlco, setImgAlco] = useState(resultatContext.resultat.alcool);


  // useEffect(() => {
  //   setImgInfarctus(resultatContext.resultat.inf);
  //     if(setImgInfarctus==0){
  //      <img src={avatar1}></img>
  //      console.log("ok bg");
  //     }else{
  //       <img src={avatar5}></img>
  //       console.log("not ok bg");
  //     }
  // }, [resultatContext.resultat.inf]);
  
  return (
    <div>
      <h2 className="survey_title">Your results</h2>
      <img className="avatar1"
      src={resultsInfarctus}></img>
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
