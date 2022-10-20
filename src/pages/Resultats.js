import "../App.css";
import { db } from "../initFirebase";
import React, { useContext, useState, useEffect } from "react";
import { ResultatContext } from "../Context";
import my_avatar from "./img/avatar5.png";
import { getDocs, collection } from "firebase/firestore";
import { questionConverter } from "../objects/Question";
export default function Resultats(props) {
  //User data and avatar  from props
  //Resultat object coming from the context
  let resultatContext = useContext(ResultatContext);
  let [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestionnaireById(quesId) {
      const refQuestionnaire = collection(
        db,
        "Questionnaires/" + quesId + "/Questions"
      ).withConverter(questionConverter);

      const roleSnapshot = await getDocs(refQuestionnaire);

      const questionList = roleSnapshot.docs.map((doc) => doc.data());
      if(questions.length<16){
              setQuestions((prevQuestions) => [...prevQuestions, ...questionList]);
      }
    }

    
    getQuestionnaireById(1);
    getQuestionnaireById(2);
    getQuestionnaireById(3);
  }, []);

  const handleFormInputChange = (event) => {
    resultatContext.updateResultatField(event);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    //TODO :: Calcul for Diabete, cancer, infarctus, non-infarctus
    //For each updateResultatField

    resultatContext.updateResultatAll(event);
  };

  console.log("Resultat", resultatContext.resultat);
  return (
    //TODO :: DISPLAY is moreless ok, Doesn't save the state into context when leave */

    <div className="wrapper">
      <div className="box1">
        {/* Box for data questionnaire 1-2  */}
        <div className="container result1">
          <TitleBox title="Vous" my_avatar={props.currentUser.avatar} />
          <BoxQuestionnaire1_2
            resultat={resultatContext.resultat}
            handleFormInputChange={handleFormInputChange}
            handleFormSubmit={handleFormSubmit}
            questions={questions}
          />
        </div>

        {/* Box for data questionnaire 3 */}
        <div className="container result2">
          <TitleBox
            title="Famille - Habitudes "
            my_avatar={props.currentUser.avatar}
          />
          <BoxQuestionnaire3
            resultat={resultatContext.resultat}
            handleFormInputChange={handleFormInputChange}
            handleFormSubmit={handleFormSubmit}
            questions={questions}
          />
        </div>

        {/* Box for Resultat  */}
        <div className="container result3">
          <TitleBox title="Resultats" my_avatar={props.currentUser.avatar} />
          <BoxResultat resultat={resultatContext.resultat} />
        </div>
      </div>

      <br />
      <div className="box2">
        {/* Button for saving into db changes */}
        <button className="btn" type="submit" onClick={handleFormSubmit}>
          Save Modifications
        </button>
      </div>
    </div>
  );
}

function TitleBox(props) {
  return (
    <div>
      {/* Need the title of the questionnaire
          Need the avatar of the user */}
      <h2>{props.title}</h2>
      <div>
        {/* //TODO :: Put the avatar of the current user or a default according to sexe */}
        <img className="my_avatar" src={my_avatar} />
      </div>
    </div>
  );
}
function BoxQuestionnaire1_2(props) {
  //Need type - min - max from Questionnaire into props.questions
  //for each input, take back the type corresponding to the question characteristics
  console.log('QuestionList in resultat : ', props.questions);

  return (
    <div>
      <form onSubmit={props.handleFormSubmit}>
        <div>
          <label>Age : </label>
          <FormInput
            type="number"
            name="age"
            placeholder="Age"
            value={props.resultat.age}
            onChange={props.handleFormInputChange}
          />
        </div>
        <div>
          <label>Sexe : </label>
          <FormInput
            type="text" //TODO:: Should be a toggle
            name="sexe"
            placeholder="Sexe"
            value={props.resultat.sexe}
            onChange={props.handleFormInputChange}
          />
        </div>

        <div>
          <label>Poids : </label>
          <FormInput
            type="number"
            name="poids"
            placeholder="Poids"
            value={props.resultat.poids}
            onChange={props.handleFormInputChange}
          />
        </div>

        <div>
          <label>Taille : </label>
          <FormInput
            type="number"
            name="taille"
            placeholder="Taille"
            value={props.resultat.taille}
            onChange={props.handleFormInputChange}
          />
        </div>
        <div>
          <label>Tension Elevée : </label>
          <FormInput
            type="number" //TODO:: Should be a toggle ; if yes put the predefined value
            name="tension"
            placeholder="Tension"
            value={props.resultat.syst}
            onChange={props.handleFormInputChange}
          />
        </div>
        <div>
          <label>Sucre Sanguin Elevée : </label>
          <FormInput
            type="number" //TODO:: Should be a toggle ; if yes put the predefined value
            name="glyc"
            placeholder="Glycolyc"
            value={props.resultat.glyc}
            onChange={props.handleFormInputChange}
          />
        </div>
        <div>
          <label>Cholesterol Elevée : </label>
          <FormInput
            type="number" //TODO:: Should be a toggle ; if yes put the 2 predefined value
            name="chol"
            placeholder="Cholesterol"
            value={props.resultat.chol}
            onChange={props.handleFormInputChange}
          />
        </div>
        <div>
          <label>Diabétique : </label>
          <FormInput
            type="number" //TODO:: Should be a toggle ; if yes put the predefined value
            name="diab"
            placeholder="Diabète"
            value={props.resultat.diab}
            onChange={props.handleFormInputChange}
          />
        </div>
      </form>
    </div>
  );
}

function BoxQuestionnaire3(props) {
  //Need type - min - max from Questionnaire into props.questions
  //for each input, take back the type corresponding to the question characteristics

  return (
    <>
      <form onSubmit={props.handleFormSubmit}>
        <label>Parent ayant eu un Cancer : </label>
        <FormInput
          type="text" //TODO:: Should be a toggle
          name="afcancer"
          placeholder="AfCancer"
          value={props.resultat.afcancer}
          onChange={props.handleFormInputChange}
        />
        <label>Parent ayant eu un Infarctus : </label>
        <FormInput
          type="text" //TODO:: Should be a toggle
          name="afinf"
          placeholder="AfInf"
          value={props.resultat.afinf}
          onChange={props.handleFormInputChange}
        />
        <hr />
        <br />
        <label>Fumeur : </label>
        <FormInput
          type="number" //TODO:: Should be a toggle
          name="fume"
          placeholder="Fumeur"
          value={props.resultat.fume}
          onChange={props.handleFormInputChange}
        />
        <label>Alimentation : </label>
        <FormInput
          type="text" //TODO:: Should be a drop down list
          name="alim"
          placeholder="Alimentation"
          value={props.resultat.alim}
          onChange={props.handleFormInputChange}
        />
        <label>Sport : </label>
        <FormInput
          type="number"
          name="sport"
          placeholder="Sport"
          value={props.resultat.sport}
          onChange={props.handleFormInputChange}
        />
        <label>Alcool : </label>
        <FormInput
          type="number" //TODO:: Should be a drop down list
          name="alcool"
          placeholder="Alcool"
          value={props.resultat.alcool}
          onChange={props.handleFormInputChange}
        />
      </form>
    </>
  );
}

function BoxResultat(props) {
  return (
    <>
      <div>
        <span>Diabete : </span>
        <input
          disabled
          type="range"
          min={1}
          max={10}
          step={1}
          value={props.resultat.diabete}
          className="custom-slider"
        />
      </div>
      <br />
      <div>
        <label>Cancer : </label>
        <input
          disabled
          type="range"
          min={1}
          max={10}
          step={1}
          value={props.resultat.cancer}
          className="custom-slider"
        />
      </div>

      <br />
      <div>
        <label>Infarctus : </label>
        <input
          disabled
          type="range"
          min={1}
          max={10}
          step={1}
          value={props.resultat.infarctus}
          className="custom-slider"
        />
      </div>
      <br />
      <div>
        <label>Non - Infarctus : </label>
        <input
          disabled
          type="range"
          min={1}
          max={10}
          step={1}
          value={props.resultat.nonInfarctus}
          className="custom-slider"
        />
      </div>
    </>
  );
}

function FormInput({
  label,
  type,
  name,
  value,
  onChange,
  placeholder,
  min,
  max,
  range,
}) {
  return (
    <>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
      <br />
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
