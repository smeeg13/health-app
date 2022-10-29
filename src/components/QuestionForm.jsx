import React from "react";
// import Slider from "../components/Slider"
import ReactSlider from "react-slider";
import { useState } from "react";


export function BoxQuestion(props) {
  console.log("BoxQuestion", props.resultat);

  return (
    <div>
      <form onSubmit={props.handleFormSubmit}>
        <div>
          {props.questions.map(q =>
            <li key={q.id}>
              <label> {q.question} </label>
              {q.typeAnswer === 'textbox' && <FormInput
                id={q.id}
                name={q.resName}
                value={q.value}
                onChange={props.handleFormInputChange}
              />}
              {q.typeAnswer === 'checkbox' && <CheckBoxForm
                id={q.id}
                name={q.resName}
                value={q.value}
                handleFormInputChange={props.handleFormInputChange}
              />}
              {q.typeAnswer === 'dropdown' && <Dropdown
                id={q.id}
                name={q.resName}
                question={q}
                value={q.value}
                handleFormInputChange={props.handleFormInputChange}
              />}
              {q.typeAnswer === 'slider' &&
                <Range 
                  id={q.id}
                  name={q.resName}
                  question={q}
                  value={q.value}
                  handleFormInputChange={props.handleFormInputChange}
                />
              }
            </li>
          )}
        </div>
      </form>
    </div>
  );
}

function Range(props) {
    
  return (
    <div>
      <input
        type="range"
        name={props.question.resName}
        min={props.question.min} max={props.question.max}
        value={props.question}
        onChange={props.handleFormInputChange}
        step="1" />
    </div>
  )
}

function Dropdown(props) {
  return (
    <div>
      <label className="label">Sex</label>
      <br />
      <select name={props.name} onChange={props.handleFormInputChange}>
        <option value={getObjKey(props.question.valeurs_possibles, props.question.valeurs_possibles[0])}>
          {props.question.valeurs_possibles[0]}
        </option>
        <option value={getObjKey(props.question.valeurs_possibles, props.question.valeurs_possibles[1])}>
          {props.question.valeurs_possibles[1]}
        </option>
      </select>
    </div>
  );
};

export function getObjKey(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value);
}

function CheckBoxForm(props) {
  return (
    <div>
      <input
        id={props.id}
        name={props.name}
        type="checkbox"
        checked={props.value}
        onChange={props.handleFormInputChange}
      />
    </div>
  )
}

function FormInput({
  id,
  label,
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
      <input
        id={id}
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

export function Loader() {
  return (
    <p>
      ...
    </p>
  );
}