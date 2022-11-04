import "../App.css";
import React, { useContext } from "react";
import { ResultatContext } from "../Context";
import { ToggleButton } from "../components/ToggleButton";
import { getObjKey } from "../utils/tools";
import { BouncingDotsLoader, FormInput } from "../utils/tools";

export default function BoxRes1(props) {
  let resultatContext = useContext(ResultatContext);
  return (
    <div>
      {props.isBusy ? (
        <BouncingDotsLoader />
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
              <option
                value={getObjKey(
                  props.questions[0].valeurs_possibles,
                  props.questions[0].valeurs_possibles[0]
                )}
              >
                {props.questions[0].valeurs_possibles[0]}
              </option>
              <option
                value={getObjKey(
                  props.questions[0].valeurs_possibles,
                  props.questions[0].valeurs_possibles[1]
                )}
              >
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
            <label htmlFor="yesSyst">Tension Elevée : </label>
            <ToggleButton
              name="yesSyst"
              checked={resultatContext.resultat.yesSyst}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="yesGlyc">Sucre Sanguin Elevée : </label>
            <ToggleButton
              name="yesGlyc"
              checked={resultatContext.resultat.yesGlyc}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="yesChol">Cholesterol Elevée : </label>
            <ToggleButton
              name="yesChol"
              checked={resultatContext.resultat.yesChol}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="diab">Diabétique : </label>
            <ToggleButton
              name="diab"
              checked={resultatContext.resultat.diab}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="inf">Déjà eu un Infarctus : </label>
            <ToggleButton
              name="inf"
              checked={resultatContext.resultat.inf}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="avc">Déjà eu une Attaque cérébrale : </label>
            <ToggleButton
              name="avc"
              checked={resultatContext.resultat.avc}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
          </div>
          <hr />
          <div>
            <label htmlFor="afinf">Parent ayant eu un Infarctus : </label>
            <ToggleButton
              name="afinf"
              checked={resultatContext.resultat.afinf}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
          </div>
          <div>
            <label htmlFor="afcancer">Parent ayant eu un Cancer : </label>
            <ToggleButton
              name="afcancer"
              checked={resultatContext.resultat.afcancer}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
          </div>
        </form>
      )}
    </div>
  );
}
