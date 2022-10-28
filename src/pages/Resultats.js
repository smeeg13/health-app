import "../App.css";
import { db } from "../initFirebase";
import React, { useContext, useState, useEffect } from "react";
import { ResultatContext } from "../Context";
import my_avatar from "./img/avatar5.png";
import { getDocs, collection } from "firebase/firestore";
import { questionConverter } from "../objects/Question";
import { Loader } from "../components/QuestionForm";

export default function Resultats(props) {
  let resultatContext = useContext(ResultatContext);
  let [questions, setQuestions] = useState([]);
  const [isBusy, setBusy] = useState(true);

  useEffect(() => {
    async function getQuestionnaireById(quesId) {
      const refQuestionnaire = collection(
        db,
        "Questionnaires/" + quesId + "/Questions"
      ).withConverter(questionConverter);
      const roleSnapshot = await getDocs(refQuestionnaire);
      const questionList = roleSnapshot.docs.map((doc) => doc.data());
      if (questions.length < 16)
        setQuestions((prevQuestions) => [...prevQuestions, ...questionList]);
      setBusy(false);
    }
    getQuestionnaireById(1);
    getQuestionnaireById(2);
    getQuestionnaireById(3);
  }, []);

  const handleFormInputChange = (event) => {
    resultatContext.updateResultatField(event, resultatContext.resultat);
    resultatContext.calculateRes(resultatContext.resultat);
    console.log('ResHandleForm', resultatContext.resultat)
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //TODO :: save into db
    // resultatContext.updateResultatAll(event);
  };
  return (
    //TODO :: display ok, but if tension 1 it update field yesSyst but don't update syst to 150 same for all yes fields */
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
            isBusy={isBusy}
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
            isBusy={isBusy}
          />
        </div>
        {/* Box for Resultat  */}
        <div className="container result3">
          <TitleBox title="Vos Risques" my_avatar={props.currentUser.avatar} />
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
  //TODO :: for each input, take back the type corresponding to the question characteristics
  //console.log("QuestionList in resultat : ", props.questions);
  console.log('boxquestionnaire1_2',props.resultat)
  return (
    <div>
      {props.isBusy ? (
        <Loader />
      ) : (
        <form onSubmit={props.handleFormSubmit}>
          <div>
            <label htmlFor="age">Age : </label>
            <FormInput
              id="age"
              type="number"
              name="age"
              min={props.questions[2].min}
              placeholder="Age"
              value={props.resultat.age}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="sexe">Sexe : </label>
            <select
              name="sexe"
              id="sexe"
              value={props.resultat.sexe}
              onChange={props.handleFormInputChange}
            >
              <option value="0">
                {props.questions[0].valeurs_possibles[0]}
              </option>
              <option value="1">
                {props.questions[0].valeurs_possibles[1]}
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="poids">Poids : </label>
            <FormInput
              id="poids"
              type="number"
              name="poids"
              placeholder="Poids"
              value={props.resultat.poids}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="taille">Taille : </label>
            <FormInput
              id="taille"
              type="number"
              name="taille"
              placeholder="Taille"
              value={props.resultat.taille}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="yesSyst">Tension Elevée : </label>
            <FormInput
              id="yesSyst"
              type="number" //TODO:: Should be a toggle ; if yes put the predefined value
              name="yesSyst"
              placeholder="Tension"
              value={props.resultat.yesSyst}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="yesGlyc">Sucre Sanguin Elevée : </label>
            <FormInput
              id="yesGlyc"
              type="number" //TODO:: Should be a toggle ; if yes put the predefined value
              name="yesGlyc"
              placeholder="Glycolyc"
              value={props.resultat.yesGlyc}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="yesChol">Cholesterol Elevée : </label>
            <FormInput
              id="yesChol"
              type="number" //TODO:: Should be a toggle ; if yes put the 2 predefined value
              name="yesChol"
              placeholder="Cholesterol"
              value={props.resultat.yesChol}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="diab">Diabétique : </label>
            <FormInput
              id="diab"
              type="number" //TODO:: Should be a toggle ; if yes put the predefined value
              name="diab"
              placeholder="Diabète"
              value={props.resultat.diab}
              onChange={props.handleFormInputChange}
            />
          </div>
        </form>
      )}
    </div>
  );
}
function BoxQuestionnaire3(props) {
  //Need type - min - max from Questionnaire into props.questions
  //for each input, take back the type corresponding to the question characteristics
  return (
    <>
      {props.isBusy ? (
        <Loader />
      ) : (
        <form onSubmit={props.handleFormSubmit}>
          <div>
            <label htmlFor="afcancer">Parent ayant eu un Cancer : </label>
            <FormInput
              id="afcancer"
              type="text" //TODO:: Should be a toggle
              name="afcancer"
              placeholder="AfCancer"
              value={props.resultat.afcancer}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="afinf">Parent ayant eu un Infarctus : </label>
            <FormInput
              id="afinf"
              type="text" //TODO:: Should be a toggle
              name="afinf"
              placeholder="AfInf"
              value={props.resultat.afinf}
              onChange={props.handleFormInputChange}
            />
          </div>
          <hr />

          <br />
          <div>
            <label htmlFor="fume">Fumeur : </label>
            <FormInput
              id="fume"
              type="number" //TODO:: Should be a toggle
              name="fume"
              min={props.questions[1].min}
              placeholder="Fumeur"
              value={props.resultat.fume}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="alim">Alimentation : </label>
            <select
              name="alim"
              id="alim"
              value={props.resultat.alim}
              onChange={props.handleFormInputChange}
            >
              <option value={0}>
                {props.questions[13].valeurs_possibles[0]}
              </option>
              <option value={1}>
                {props.questions[13].valeurs_possibles[1]}
              </option>
              <option value={2}>
                {props.questions[13].valeurs_possibles[2]}
              </option>
              <option value={3}>
                {props.questions[13].valeurs_possibles[3]}
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="sport">Sport : </label>
            <select
              name="sport"
              id="sport"
              value={props.resultat.sport}
              onChange={props.handleFormInputChange}
            >
              <option value="0">
                {props.questions[14].valeurs_possibles[0]}
              </option>
              <option value="1">
                {props.questions[14].valeurs_possibles[1]}
              </option>
              <option value="2">
                {props.questions[14].valeurs_possibles[2]}
              </option>
              <option value="3">
                {props.questions[14].valeurs_possibles[3]}
              </option>
            </select>
          </div>

          <div>
            <label>Alcool : </label>
            <select
              name="alcool"
              id="alcool"
              value={props.resultat.alcool}
              onChange={props.handleFormInputChange}
            >
              <option value="0">
                {props.questions[15].valeurs_possibles[0]}
              </option>
              <option value="1">
                {props.questions[15].valeurs_possibles[1]}
              </option>
              <option value="2">
                {props.questions[15].valeurs_possibles[2]}
              </option>
              <option value="3">
                {props.questions[15].valeurs_possibles[3]}
              </option>
              <option value="4">
                {props.questions[15].valeurs_possibles[4]}
              </option>
            </select>
          </div>
        </form>
      )}
    </>
  );
}
function BoxResultat(props) {
  console.log("in Box resultat : ", props.resultat);

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
        <label>{props.resultat.infarctus} </label>
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
  id,
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
        id={id}
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
