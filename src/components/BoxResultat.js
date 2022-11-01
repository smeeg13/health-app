import "../App.css";
import React, { useContext} from "react";
import { ResultatContext } from "../Context";

export default function BoxResultat(props) {
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