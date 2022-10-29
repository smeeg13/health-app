import "../App.css";
import { FormInput } from "../components/FormInput";
import React, { useContext} from "react";
import { ResultatContext } from "../Context";
import { Loader } from "../components/QuestionForm";
import { ToggleButton } from "../components/ToggleButton";
import { getObjKey } from "../components/QuestionForm";

export default function BoxRes1(props) {
    let resultatContext = useContext(ResultatContext);
  
    //Need type - min - max from Questionnaire into props.questions
    //TODO :: for each input, take back the type corresponding to the question characteristics
    //console.log("QuestionList in resultat : ", props.questions);
    console.log('boxquestionnaire1_2',props.questions)
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
                name={props.questions[0].resName}
                id={props.questions[0].resName}
                value={resultatContext.resultat.sexe}
                onChange={props.handleFormInputChange}
              >
                <option value={getObjKey(props.questions[0].valeurs_possibles,props.questions[0].valeurs_possibles[0])}>
                  {props.questions[0].valeurs_possibles[0]}
                </option>
                <option value={getObjKey(props.questions[0].valeurs_possibles,props.questions[0].valeurs_possibles[1])}>
                  {props.questions[0].valeurs_possibles[1]}
                </option>
              </select>
            </div>
            <div>
              <label htmlFor="age">Age : </label>
              <FormInput
              disabled
                id={props.questions[2].resName}
                type="number"
                name={props.questions[2].resName}
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
                id={props.questions[4].resName}
                type="number"
                name={props.questions[4].resName}
                placeholder="Taille"
                value={resultatContext.resultat.taille}
                onChange={props.handleFormInputChange}
              />
            </div>
            <div>
              <ToggleButton name="yesSyst" checked={resultatContext.resultat.yesSyst} onChange={props.handleFormInputChange}
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
              disabled
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
              disabled
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
              disabled
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
              disabled
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