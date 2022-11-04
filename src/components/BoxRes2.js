import "../App.css";
import React, { useContext, useState } from "react";
import { ResultatContext, ThemeContext, themes  } from "../Context";
import { ToggleButton } from "../components/ToggleButton";
import { getObjKey } from "../utils/tools";
import { BouncingDotsLoader } from "../utils/tools";

export default function BoxRes2(props) {
  let resultatContext = useContext(ResultatContext);
  const [slideValue, setSlideValue] = useState(resultatContext.resultat.poids);
  let themeContext = useContext(ThemeContext);

  const handleChange = (event) => {
    setSlideValue(event.target.value);
  };
 return (
    <>
      {props.isBusy ? (
        <BouncingDotsLoader />
      ) : (
        <form onSubmit={props.handleFormSubmit}>
          <div className="container_label2">
            <label className="label_results" htmlFor="poids">Poids : 

            {/* <output className="rangevalue">{slideValue}</output> */}
            </label>
            <br />
            <label className="label_results" htmlFor="fume">Fumeur : </label>
            <br />
            <label className="label_results" htmlFor="alim">Alimentation : </label>
            <br />
            <label className="label_results" htmlFor="sport">Sport : </label>
            <br />
            <label className="label_results">Alcool : </label>
          </div>

          <div className="container_results2"> 

          <input className="answers_type" style={{marginTop:"30px", float:"right", marginRight:"70px", background: themes[themeContext.theme].rangeColor }}
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
            <br></br>
            <br></br>
            <ToggleButton
              name="fume"
              checked={resultatContext.resultat.fume}
              onChange={props.handleFormInputChange}
              disabled={false}
            />

            <select className="dropdown" style={{width:"300px", height:"30px", marginTop:"10px", float:"right", marginRight:"10px", color: themes[themeContext.theme].textcolor, backgroundColor:themes[themeContext.theme].dropdown_results}}
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
        
            <select className="dropdown" style={{width:"300px", height:"30px", marginTop:"10px", float:"right", marginRight:"10px", color: themes[themeContext.theme].textcolor, backgroundColor:themes[themeContext.theme].dropdown_results}}
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
        
            <select className="dropdown" style={{width:"300px", height:"30px", marginTop:"10px", float:"right", marginRight:"10px", color: themes[themeContext.theme].textcolor, backgroundColor:themes[themeContext.theme].dropdown_results}}
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
