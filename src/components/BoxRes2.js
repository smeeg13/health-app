import "../App.css";
import React, { useContext, useState } from "react";
import { ResultatContext } from "../Context";
import { ToggleButton } from "../components/ToggleButton";
import { getObjKey } from "../utils/tools";
import { BouncingDotsLoader } from "../utils/tools";

export default function BoxRes2(props) {
  let resultatContext = useContext(ResultatContext);
  const [slideValue, setSlideValue] = useState(resultatContext.resultat.poids);

  const handleChange = (event) => {
    setSlideValue(event.target.value);
  };
  return (
    <>
      {props.isBusy ? (
        <BouncingDotsLoader />
      ) : (
        <form onSubmit={props.handleFormSubmit}>
          <div>
            <label htmlFor="poids">Poids : </label>
            <input
              className="answers_type"
              type="range"
              id={props.questions[3].resName}
              name={props.questions[3].resName}
              min={props.questions[3].min}
              max={props.questions[3].max}
              value={resultatContext.resultat.poids}
              onChange={props.handleFormInputChange}
              onInput={handleChange}
              step="1"
            />
            <output className="rangevalue">{slideValue}</output>
          </div>
          <hr />
          <br />
          <div>
            <label htmlFor="fume">Fumeur : </label>
            <ToggleButton
              name="fume"
              checked={resultatContext.resultat.fume}
              onChange={props.handleFormInputChange}
              disabled={false}
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
              <option
                value={getObjKey(
                  props.questions[13].valeurs_possibles,
                  props.questions[13].valeurs_possibles[0]
                )}
              >
                {props.questions[13].valeurs_possibles[0]}
              </option>
              <option
                value={getObjKey(
                  props.questions[13].valeurs_possibles,
                  props.questions[13].valeurs_possibles[1]
                )}
              >
                {props.questions[13].valeurs_possibles[1]}
              </option>
              <option
                value={getObjKey(
                  props.questions[13].valeurs_possibles,
                  props.questions[13].valeurs_possibles[2]
                )}
              >
                {props.questions[13].valeurs_possibles[2]}
              </option>
              <option
                value={getObjKey(
                  props.questions[13].valeurs_possibles,
                  props.questions[13].valeurs_possibles[3]
                )}
              >
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
              <option
                value={getObjKey(
                  props.questions[14].valeurs_possibles,
                  props.questions[14].valeurs_possibles[0]
                )}
              >
                {props.questions[14].valeurs_possibles[0]}
              </option>
              <option
                value={getObjKey(
                  props.questions[14].valeurs_possibles,
                  props.questions[14].valeurs_possibles[1]
                )}
              >
                {props.questions[14].valeurs_possibles[1]}
              </option>
              <option
                value={getObjKey(
                  props.questions[14].valeurs_possibles,
                  props.questions[14].valeurs_possibles[2]
                )}
              >
                {props.questions[14].valeurs_possibles[2]}
              </option>
              <option
                value={getObjKey(
                  props.questions[14].valeurs_possibles,
                  props.questions[14].valeurs_possibles[3]
                )}
              >
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
              <option
                value={getObjKey(
                  props.questions[15].valeurs_possibles,
                  props.questions[15].valeurs_possibles[0]
                )}
              >
                {props.questions[15].valeurs_possibles[0]}
              </option>
              <option
                value={getObjKey(
                  props.questions[15].valeurs_possibles,
                  props.questions[15].valeurs_possibles[1]
                )}
              >
                {props.questions[15].valeurs_possibles[1]}
              </option>
              <option
                value={getObjKey(
                  props.questions[15].valeurs_possibles,
                  props.questions[15].valeurs_possibles[2]
                )}
              >
                {props.questions[15].valeurs_possibles[2]}
              </option>
              <option
                value={getObjKey(
                  props.questions[15].valeurs_possibles,
                  props.questions[15].valeurs_possibles[3]
                )}
              >
                {props.questions[15].valeurs_possibles[3]}
              </option>
              <option
                value={getObjKey(
                  props.questions[15].valeurs_possibles,
                  props.questions[15].valeurs_possibles[4]
                )}
              >
                {props.questions[15].valeurs_possibles[4]}
              </option>
            </select>
          </div>
        </form>
      )}
    </>
  );
}
