import "../App.css";
import React, { useContext } from "react";
import { ResultatContext, ThemeContext, themes  } from "../Context";
import { ToggleButton } from "../components/ToggleButton";
import { getObjKey } from "../utils/tools";
import { BouncingDotsLoader, FormInput } from "../utils/tools";

export default function BoxRes1(props) {
  let resultatContext = useContext(ResultatContext);
  let themeContext = useContext(ThemeContext);

  return (
    <div>
      {props.isBusy ? (
        <BouncingDotsLoader />
      ) : (
        <form onSubmit={props.handleFormSubmit}>
          <div>
            <label className="label_results" htmlFor="sexe">
              Sexe :{" "}
           
            <select className="dropdown_results" style={{ color: themes[themeContext.theme].textcolor}}
              name={props.questions[0].resName}
              id={props.questions[0].resName}
              value={resultatContext.resultat.sexe}
              onChange={props.handleFormInputChange}
              disabled
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
            </label>
          </div>
          <div>
            <label className="label_results" htmlFor="age">
              Age :{" "}
            
            <FormInput
              id={props.questions[2].resName}
              type="number"
              name={props.questions[2].resName}
              min={props.questions[2].min}
              max={props.questions[2].max}
              placeholder="Age"
              value={resultatContext.resultat.age}
              onChange={props.handleFormInputChange}
              disabled
            />
            </label>
          </div>

          <div>
            <label className="label_results" htmlFor="taille">
              Taille :{" "}     
            <FormInput
              disabled
              id={props.questions[4].resName}
              type="number"
              name={props.questions[4].resName}
              placeholder="Taille"
              value={resultatContext.resultat.taille}
              onChange={props.handleFormInputChange}
            />
             </label>
          </div>



          <div className="container_label">
            <label className="label_results" htmlFor="yesSyst">
              High tension :{" "}
              </label>
              <br></br>
              <label className="label_results" htmlFor="yesGlyc">
              High blood sugar :{" "}
              </label>
              <br></br>
              <label className="label_results" htmlFor="yesChol">
              High cholesterol:{" "}
            </label>
            <br></br>
            <label className="label_results" htmlFor="diab">
            High level of glucose  :{" "}
            </label>
            <br></br>
            <label className="label_results" htmlFor="inf">
            Ever had a heart attack :{" "}
            </label>
            <br></br>
            <label className="label_results" htmlFor="avc">
            Ever had a stroke :{" "}
            </label>
            <br></br>
            <label className="label_results" htmlFor="afinf">
            Parent who had a heart-attack :{" "}
            </label>
            <br></br>
            <label className="label_results" htmlFor="afcancer">
              Parent who had cancer :{" "}
            </label>  
          </div>

        <div className="container_results">
          <ToggleButton
              className="toogle_results"
              name="yesSyst"
              checked={resultatContext.resultat.yesSyst}
              onChange={props.handleFormInputChange}
              disabled={true}
            />

            <ToggleButton
              className="toogle_results"
              name="yesGlyc"
              checked={resultatContext.resultat.yesGlyc}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
         
            <ToggleButton
              name="yesChol"
              checked={resultatContext.resultat.yesChol}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
        
            <ToggleButton
              name="diab"
              checked={resultatContext.resultat.diab}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
       
            <ToggleButton
              name="inf"
              checked={resultatContext.resultat.inf}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
         
            <ToggleButton
              name="avc"
              checked={resultatContext.resultat.avc}
              onChange={props.handleFormInputChange}
              disabled={true}
            />
            <ToggleButton
              name="afinf"
              checked={resultatContext.resultat.afinf}
              onChange={props.handleFormInputChange}
              disabled={true}
            />  
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
