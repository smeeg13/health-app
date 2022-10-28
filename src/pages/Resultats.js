import "../App.css";
import { db } from "../initFirebase";
import React, { useContext, useState, useEffect } from "react";
import { ResultatContext } from "../Context";
import { getDocs, collection } from "firebase/firestore";
import { questionConverter } from "../objects/Question";
import Account from './Account';
import { Loader } from "../components/QuestionForm";

export default function Resultats(props) {
  let resultatContext = useContext(ResultatContext);

  let [questions, setQuestions] = useState([]);
  const [isBusy, setBusy] = useState(true);

  {props.currentUser.avatar === "avatar" && <Account />}

  useEffect(() => {
    async function getQuestionnaireById(quesId) {
      const refQuestionnaire = collection(
        db,
        "Questionnaires/" + quesId + "/Questions"
      ).withConverter(questionConverter);
      const roleSnapshot = await getDocs(refQuestionnaire);
      const questionList = roleSnapshot.docs.map((doc) => doc.data());
      return questionList;
    }

    async function fetchAllQuestionaires() {
      let questions1 = await getQuestionnaireById(1);
      let questions2 = await getQuestionnaireById(2);
      let questions3 = await getQuestionnaireById(3);

      setQuestions((prevQuestions) => [
        ...prevQuestions,
        ...questions1,
        ...questions2,
        ...questions3,
      ]);
      setBusy(false);
    }

    fetchAllQuestionaires();
  }, []);

  useEffect(() => {
    resultatContext.calculateMaladies(resultatContext.resultat);
  }, [resultatContext.resultat]);

  const handleFormInputChange = (event) => {
    resultatContext.updateResultatField(event, resultatContext.resultat);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    //TODO :: save into db
    // resultatContext.updateResultatAll(event);
  };
  return (
    <div className="wrapper">
      <div className="box1">
        {/* Box for data questionnaire 1-2  */}
        <div className="container result1">
          <TitleBox title="Votre Situation" my_avatar={props.currentUser.avatar} />
          <BoxRes1
            handleFormInputChange={handleFormInputChange}
            handleFormSubmit={handleFormSubmit}
            questions={questions}
            isBusy={isBusy}
          />
        </div>
        {/* Box for data questionnaire 3 */}
        <div className="container result2">
          <TitleBox
            title="Votre Rythme "
            my_avatar={props.currentUser.avatar}
          />
          <BoxRes2
            handleFormInputChange={handleFormInputChange}
            handleFormSubmit={handleFormSubmit}
            questions={questions}
            isBusy={isBusy}
          />
        </div>
        {/* Box for Resultat  */}
        <div className="container result3">
          <TitleBox title="Vos Risques" my_avatar={props.currentUser.avatar} />
          <BoxResultat maladies={resultatContext.maladies} />
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
        <img className="my_avatar" src={my_avatar} alt="AvatarUser" />
      </div>
    </div>
  );
}
function BoxRes1(props) {
  let resultatContext = useContext(ResultatContext);

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
            <label htmlFor="sexe">Sexe : </label>
            <select
            disabled
              name="sexe"
              id="sexe"
              value={resultatContext.resultat.sexe}
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
            <label htmlFor="age">Age : </label>
            <FormInput
            disabled = {true}
              id="age"
              type="number"
              name="age"
              min={props.questions[2].min}
              max={props.questions[2].max}
              placeholder="Age"
              value={resultatContext.resultat.age}
              onChange={props.handleFormInputChange}
            />
          </div>

          <div>
            <label htmlFor="taille">Taille : </label>
            <FormInput
              disabled
              id="taille"
              type="number"
              name="taille"
              placeholder="Taille"
              value={resultatContext.resultat.taille}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="yesSyst">Tension Elevée : </label>
            <FormInput
            disabled
              id="yesSyst"
              type="number" //TODO:: Should be a toggle ; if yes put the predefined value
              name="yesSyst"
              placeholder="Tension"
              value={resultatContext.resultat.yesSyst}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="yesGlyc">Sucre Sanguin Elevée : </label>
            <FormInput
            disabled
              id="yesGlyc"
              type="number" //TODO:: Should be a toggle ; if yes put the predefined value
              name="yesGlyc"
              placeholder="Glycolyc"
              value={resultatContext.resultat.yesGlyc}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="yesChol">Cholesterol Elevée : </label>
            <FormInput
            disabled
              id="yesChol"
              type="number" //TODO:: Should be a toggle ; if yes put the 2 predefined value
              name="yesChol"
              placeholder="Cholesterol"
              value={resultatContext.resultat.yesChol}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="diab">Diabétique : </label>
            <FormInput
            disabled
              id="diab"
              type="number" //TODO:: Should be a toggle ; if yes put the predefined value
              name="diab"
              placeholder="Diabète"
              value={resultatContext.resultat.diab}
              onChange={props.handleFormInputChange}
            />
          </div>

          <div>
            <label htmlFor="inf">Déjà eu un Infarctus : </label>
            <FormInput
              id="inf"
              type="text" //TODO:: Should be a toggle
              name="inf"
              placeholder="Inf"
              value={resultatContext.resultat.inf}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="avc">Déjà eu une Attaque cérébrale : </label>
            <FormInput
              id="avc"
              type="text" //TODO:: Should be a toggle
              name="avc"
              placeholder="AVC"
              value={resultatContext.resultat.avc}
              onChange={props.handleFormInputChange}
            />
          </div>
          <hr />

          <div>
            <label htmlFor="afinf">Parent ayant eu un Infarctus : </label>
            <FormInput
              id="afinf"
              type="text" //TODO:: Should be a toggle
              name="afinf"
              placeholder="AfInf"
              value={resultatContext.resultat.afinf}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="afcancer">Parent ayant eu un Cancer : </label>
            <FormInput
              id="afcancer"
              type="text" //TODO:: Should be a toggle
              name="afcancer"
              placeholder="AfCancer"
              value={resultatContext.resultat.afcancer}
              onChange={props.handleFormInputChange}
            />
          </div>
        </form>
      )}
    </div>
  );
}
function BoxRes2(props) {
  let resultatContext = useContext(ResultatContext);

  //Need type - min - max from Questionnaire into props.questions
  //for each input, take back the type corresponding to the question characteristics
  return (
    <>
      {props.isBusy ? (
        <Loader />
      ) : (
        <form onSubmit={props.handleFormSubmit}>
                   <div>
            <label htmlFor="poids">Poids : </label>
            <FormInput
              id="poids"
              type="number"
              name="poids"
              placeholder="Poids"
              value={resultatContext.resultat.poids}
              onChange={props.handleFormInputChange}
            />
          </div>
          <hr/>

          <br />
          <div>
            <label htmlFor="fume">Fumeur : </label>
            <FormInput
              id="fume"
              type="number" //TODO:: Should be a toggle
              name="fume"
              min={props.questions[1].min}
              placeholder="Fumeur"
              value={resultatContext.resultat.fume}
              onChange={props.handleFormInputChange}
            />
          </div>
          <div>
            <label htmlFor="alim">Alimentation : </label>
            <select
              name="alim"
              id="alim"
              value={resultatContext.resultat.alim}
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
              value={resultatContext.resultat.sport}
              onChange={props.handleFormInputChange}
            >
              <option value={getObjKey(props.questions[14].valeurs_possibles,props.questions[14].valeurs_possibles[0])}>
                {props.questions[14].valeurs_possibles[0]}
              </option>
              <option value={getObjKey(props.questions[14].valeurs_possibles,props.questions[14].valeurs_possibles[1])}>
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
              value={resultatContext.resultat.alcool}
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
  let resultatContext = useContext(ResultatContext);
  console.log("Resultat : ", resultatContext.resultat);

  console.log("Maladies : ", resultatContext.maladies);

  return (
    <>
      <div>
        <span>Diabete : </span>
        <br />
        <input
          disabled
          type="range"
          min={0}
          max={100}
          step={1}
          list="tickmarks"
          value={props.maladies.diabete}
          className="custom-slider"
        />
        <datalist id="tickmarks">
          <option value="50"></option>
        </datalist>
      </div>
      <br />
      <div>
        <label>Cancer : </label>
        <br />
        <input
          disabled
          type="range"
          min={0}
          max={100}
          step={1}
          value={props.maladies.cancer}
          className="custom-slider"
        />
      </div>
      <br />
      <div>
        <label>Infarctus : </label>
        <br />
        <input
          disabled
          type="range"
          min={0}
          max={100}
          step={1}
          value={props.maladies.infarctus}
          className="custom-slider"
        />
        <label>{props.maladies.infarctus} </label>
      </div>
      <br />
      <div>
        <label>Non - Infarctus : </label>
        <br />
        <input
          disabled
          type="range"
          min={0}
          max={100}
          step={1}
          value={props.maladies.nonInfarctus}
          className="custom-slider"
        />
      </div>
    </>
  );
}
function FormInput({
  disabled,
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
      disabled={disabled}
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

export function getObjKey(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value);
}