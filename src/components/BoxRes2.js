import "../App.css";
import { FormInput } from "../components/FormInput";
import React, { useContext} from "react";
import { ResultatContext } from "../Context";
import { Loader } from "../components/QuestionForm";
import { ToggleButton } from "../components/ToggleButton";
import { getObjKey } from "../components/QuestionForm";


export default function BoxRes2(props) {
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
              name={props.questions[13].resName}
              id={props.questions[13].resName}
              value={resultatContext.resultat.alim}
              onChange={props.handleFormInputChange}
            >
              <option value={getObjKey(props.questions[13].valeurs_possibles,props.questions[13].valeurs_possibles[0])}>
                {props.questions[13].valeurs_possibles[0]}
              </option>
              <option value={getObjKey(props.questions[13].valeurs_possibles,props.questions[13].valeurs_possibles[1])}>
                {props.questions[13].valeurs_possibles[1]}
              </option>
              <option value={getObjKey(props.questions[13].valeurs_possibles,props.questions[13].valeurs_possibles[2])}>
                {props.questions[13].valeurs_possibles[2]}
              </option>
              <option value={getObjKey(props.questions[13].valeurs_possibles,props.questions[13].valeurs_possibles[3])}>
                {props.questions[13].valeurs_possibles[3]}
              </option>
            </select>
          </div>
          <div>
            <label htmlFor="sport">Sport : </label>
            <select
              name={props.questions[14].resName}
              id={props.questions[14].resName}
              value={resultatContext.resultat.sport}
              onChange={props.handleFormInputChange}
            >
              <option value={getObjKey(props.questions[14].valeurs_possibles,props.questions[14].valeurs_possibles[0])}>
                {props.questions[14].valeurs_possibles[0]}
              </option>
              <option value={getObjKey(props.questions[14].valeurs_possibles,props.questions[14].valeurs_possibles[1])}>
                {props.questions[14].valeurs_possibles[1]}
              </option>
              <option value={getObjKey(props.questions[14].valeurs_possibles,props.questions[14].valeurs_possibles[2])}>
                {props.questions[14].valeurs_possibles[2]}
              </option>
              <option value={getObjKey(props.questions[14].valeurs_possibles,props.questions[14].valeurs_possibles[3])}>
                {props.questions[14].valeurs_possibles[3]}
              </option>
            </select>
          </div>

          <div>
            <label>Alcool : </label>
            <select
              name={props.questions[15].resName}
              id={props.questions[15].resName}
              value={resultatContext.resultat.alcool}
              onChange={props.handleFormInputChange}
            >
              <option value={getObjKey(props.questions[15].valeurs_possibles,props.questions[15].valeurs_possibles[0])}>
                {props.questions[15].valeurs_possibles[0]}
              </option>
              <option value={getObjKey(props.questions[15].valeurs_possibles,props.questions[15].valeurs_possibles[1])}>
                {props.questions[15].valeurs_possibles[1]}
              </option>
              <option value={getObjKey(props.questions[15].valeurs_possibles,props.questions[15].valeurs_possibles[2])}>
                {props.questions[15].valeurs_possibles[2]}
              </option>
              <option value={getObjKey(props.questions[15].valeurs_possibles,props.questions[15].valeurs_possibles[3])}>
                {props.questions[15].valeurs_possibles[3]}
              </option>
              <option value={getObjKey(props.questions[15].valeurs_possibles,props.questions[15].valeurs_possibles[4])}>
                {props.questions[15].valeurs_possibles[4]}
              </option>
            </select>
          </div>
        </form>
      )}
    </>
  );
}