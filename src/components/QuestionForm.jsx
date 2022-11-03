import React from "react";
import { useState, useContext } from "react";
import { ThemeContext, themes } from "../Context";
import survey_pic from "../pages/img/survey_pic.png"



export function BoxQuestion(props) {
  console.log("BoxQuestion", props.resultat);

  let themeContext = useContext(ThemeContext);

  return (
    <div className="container" style={{
      backgroundColor: themes[themeContext.theme].background
    }}>
      <form onSubmit={props.handleFormSubmit}>

        <div className="boxQuiz" style={{
          backgroundColor: themes[themeContext.theme].background_quiz,
          color: themes[themeContext.theme].foreground,
        }}>
          <h2 className="survey_title" style={{
            color: themes[themeContext.theme].textcolor
          }}>Title</h2>

          {props.questions.map(q =>
            <div key={q.id} style={{
              color: themes[themeContext.theme].textcolor
            }}>
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
          <button className="btn_previous" onClick={props.handlePreviousQuestionnaire} style={{
            backgroundColor: themes[themeContext.theme].button,
            color: themes[themeContext.theme].textcolorbtn,
          }}>
            retour
          </button>
          <button className="btn_next" onClick={props.handleNextQuestionnaire} style={{
            backgroundColor: themes[themeContext.theme].button,
            color: themes[themeContext.theme].textcolorbtn,
          }}>
            suivant
          </button>
          {props.index === props.numberOfQues && <button className="btn btnQuiz" type="submit" onClick={props.handleFormSubmit}>
          Save Modifications
        </button>}
        </div>
        <img
        src={survey_pic}
        alt="survey_pic"
        style={{ height: "300px", float:"right", marginTop:"280px" }}
      ></img>
      </form>
    </div>
  );
}

function Range(props) {

  const [slideValue, setSlideValue] = useState(100);
  const handleChange = (event) => {
    setSlideValue(event.target.value);
  };

  let themeContext = useContext(ThemeContext);

  return (
    <div>
      <h3 className="questions">{props.ques}
        <input className="answers_type" style={{ background: themes[themeContext.theme].rangeColor }}
          type="range"
          name={props.question.resName}
          min={props.question.min}
          max={props.question.max}
          value={props.value}
          onChange={props.handleFormInputChange}
          onInput={handleChange}
          step="1"

        />
        <output className="rangevalue" style={{ backgroundColor: themes[themeContext.theme].rangeColor, color: themes[themeContext.theme].textcolorbtn }} >{slideValue} {props.question.unites}</output>
      </h3>
    </div>
  )
}

function Dropdown(props) {

  let themeContext = useContext(ThemeContext);
  return (
    <div>
      <h3 className="questions">{props.ques}
        <select className="dropdown" name={props.name} onChange={props.handleFormInputChange} style={{ backgroundColor: themes[themeContext.theme].rangeColor, color: themes[themeContext.theme].textcolorbtn }}>
          <option className="options" value={getObjKey(props.question.valeurs_possibles, props.question.valeurs_possibles[0])} style={{ backgroundColor: themes[themeContext.theme].rangeColor }}>
            {props.question.valeurs_possibles[0]}
          </option>
          <option className="options" value={getObjKey(props.question.valeurs_possibles, props.question.valeurs_possibles[1])} style={{ backgroundColor: themes[themeContext.theme].rangeColor }}>
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

  let themeContext = useContext(ThemeContext);
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

  let themeContext = useContext(ThemeContext);
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

          style={{
            color: themes[themeContext.theme].rangeColor,
            color: themes[themeContext.theme].rangeToggle,
          }}
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