import React from "react";
import { useState } from "react";


export function BoxQuestion(props) {
  console.log("BoxQuestion", props.resultat);

  return (
    <div>
      <form onSubmit={props.handleFormSubmit}>

        <div className="boxQuiz">
          <h2 className="survey_title">Title</h2>
          {props.questions.map(q =>
            <div key={q.id}>
              {/* <h3 className="questions">{q.question}</h3> */}
              {q.typeAnswer === 'textbox' && <FormInput
                id={q.id}
                name={q.resName}
                value={q.value}
                ques={q.question}
                onChange={props.handleFormInputChange}
              />}

              {q.typeAnswer === 'checkbox' && <CheckBoxForm
                id={q.id}
                name={q.resName}
                value={q.value}
                handleFormInputChange={props.handleFormInputChange}
                ques={q.question}
              />}
              {q.typeAnswer === 'select-one' && <Dropdown
                id={q.id}
                type="select-one"
                name={q.resName}
                ques={q.question}
                question={q}
                value={q.value}
                handleFormInputChange={props.handleFormInputChange}
              />}
              {q.typeAnswer === 'range' &&
                <div>
                  <Range
                    id={q.id}
                    name={q.resName}
                    question={q}
                    ques={q.question}
                    value={q.value}
                    handleFormInputChange={props.handleFormInputChange}
                  />
                </div>

              }
            </div>
          )}
          <button className="btn_previous" onClick={props.handlePreviousQuestionnaire}>
            back
          </button>
          <button className="btn_next" onClick={props.handleNextQuestionnaire}>
            next
          </button>
        </div>
        {props.index === props.numberOfQues && <button className="btn btnQuiz" type="submit" onClick={props.handleFormSubmit}>
          Save Modifications
        </button>}
      </form>
    </div>
  );
}

function Range(props) {

  const [slideValue, setSlideValue] = useState(100);
  const handleChange = (event) => {
    setSlideValue(event.target.value);
  };

  return (
    <div>
      <h3 className="questions">{props.ques}
        <input className="answers_type"
          type="range"
          name={props.question.resName}
          min={props.question.min}
          max={props.question.max}
          value={props.value}
          onChange={props.handleFormInputChange}
          onInput={handleChange}
          step="1"

        />
        <output className="rangevalue">{slideValue}</output>
      </h3>
    </div>
  )
}

function Dropdown(props) {
  return (
    <div>
      <h3 className="questions">{props.ques}
        <select className="dropdown" name={props.name} onChange={props.handleFormInputChange}>
          <option className="options" value={getObjKey(props.question.valeurs_possibles, props.question.valeurs_possibles[0])}>
            {props.question.valeurs_possibles[0]}
          </option>
          <option className="options" value={getObjKey(props.question.valeurs_possibles, props.question.valeurs_possibles[1])}>
            {props.question.valeurs_possibles[1]}
          </option>
        </select>
      </h3>
    </div>
  );
};

export function getObjKey(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value);
}

function CheckBoxForm(props) {
  return (
    <div>
      <h3 className="questions">{props.ques}
        <input className="answers_type"
          id={props.id}
          name={props.name}
          type="checkbox"
          checked={props.value}
          onChange={props.handleFormInputChange}
        />
      </h3>
    </div>
  )
}

function FormInput({
  id,
  name,
  value,
  onChange,
  placeholder,
  min,
  max,
  props,
}) {
  return (
    <div>
      <h3 className="questions">{props.ques}
        <input
          id={id}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
        />
      </h3>
    </div>
  );
}

export function Loader() {
  return (
    <p>
      ...
    </p>
  );
}