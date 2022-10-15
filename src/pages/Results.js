import React from "react";
import docs from "./img/docs.jpg";
import Navbar from "./Navbar";
import styled from "styled-components";
import my_avatar from "./img/avatar5.png";
import { useContext, useEffect, useState } from "react";

function Resultats(props){
  //Need user data and avatar existant
  //need user response of the 3 questionnaires

  const [responseQ1, setResponseQ1] = useState(undefined);
  const [responseQ2, setResponseQ2] = useState(undefined);
  const [resultat, setResultat] = useState(undefined);

  let handleChangesQ1 = (e)=> {
    e.preventDefault();
    setResponseQ1(e.target.value);
  };
  let handleChangesQ2 = (e)=> {
    e.preventDefault();
    setResponseQ2(e.target.value);
  };
  let handleChangesRes = (e)=> {
    e.preventDefault();
    setResultat(e.target.value);
  };

  return(
    <>
    {/**Box for Title and Avatar */}

    {/* Box for data questionnaire  */}
    {/* <BoxQuestionnaire handleChanges={handleChangesQ1} data={responseQ1}/> */}
    
    {/* Box for data questionnaire  */}
    {/* <BoxQuestionnaire handleChanges={handleChangesQ2} data={responseQ2}/> */}

    {/* Box for Resultat  */}
    {/* <BoxResultat handleChanges={handleChangesRes} data={resultat}/> */}



    {/* Button for saving into db changes */}


    </>
  );
}

function TitleBox(props){
  <div>
      {/* 
    Need the title of the questionnaire
    Need the avatar of the user */}
  </div>
}

function DataBox(props){
  // Need the response of questionnaire 
  //Inserted into a form, to be able to transform them
}



export default function Results() {
  return (
    <>
      <Navbar />
      <div className="container result1">
        <img className="my_avatar" src={my_avatar} />
      </div>

      <div className="container result2">
        <img className="my_avatar" src={my_avatar} />
      </div>

      <div className="container result3">
        <img className="my_avatar" src={my_avatar} />
      </div>
    </>
  );
}


// const Container2 = styled.div`

// .container {
//   margin-left: auto;
//   margin-right: auto;
//   height: 100%;
//   width: 100%;
//   position: fixed;
//   z-index: 1;
//   top: 10%;
//   overflow-x: hidden;
// }

// .my_avatar{
//   height:100px;
//   width:100px;
// }

// .left {
//   width: 33%;
//   left: 0;
//   background-color: pink;
// }

// .right {
//   width: 33%;
//   right: -15px;
//   background-color: #BBF3DD;
//   transform: translateZ(0);
//   z-index: -1;
// }

// .middle {
//   width: 33%;
//   align-items: center;
//   color: blueviolet;

// }

// /* .quiz3{
//     right:0;
//     width: 33%;
//     background-color:blueviolet;
// } */

// `
