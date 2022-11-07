import React from "react";
import { useState, useContext } from "react";
import { ThemeContext, themes } from "../Context";
import survey_pic from "../pages/img/survey_pic.png"
import { ResultatContext } from "../Context";
import { getObjKey } from "../utils/tools";


/**
 * function to display all the informations about a question
 * the title of the question, how you can answer it
 * @param  {} props
 */
export function BoxQuestion(props) {
  const themeContext = useContext(ThemeContext);
  const resultatContext = useContext(ResultatContext);

  return (
    <div className="container" style={{
      backgroundColor: themes[themeContext.theme].background,
    }}>
      <div>
        <div className="boxQuiz" style={{
          backgroundColor: themes[themeContext.theme].background_quiz,
          color: themes[themeContext.theme].foreground,
        }}>
          <h2 className="survey_title" style={{
            color: themes[themeContext.theme].textcolor,
          }}>{props.titles[props.index - 1]}</h2>

          {props.questions.map(q =>
            <div key={q.resName} style={{
              color: themes[themeContext.theme].textcolor,
            }}>
              {q.typeAnswer === 'textbox' && <FormInput
                name={q.resName}
                value={resultatContext.resultat[q.resName]}
                ques={q.question}
                onChange={props.handleFormInputChange}
              />}

              {q.typeAnswer === 'checkbox' && <CheckBoxForm
                name={q.resName}
                value={resultatContext.resultat[q.resName]}
                handleFormInputChange={props.handleFormInputChange}
                ques={q.question}
              />}

              {q.typeAnswer === 'select-one' && <Dropdown
                type="select-one"
                name={q.resName}
                ques={q.question}
                question={q}
                value={resultatContext.resultat[q.resName]}
                handleFormInputChange={props.handleFormInputChange}
              />}

              {q.typeAnswer === 'range' &&
                <div>
                  <Range
                    name={q.resName}
                    question={q}
                    ques={q.question}
                    value={resultatContext.resultat[q.resName]}
                    handleFormInputChange={props.handleFormInputChange}
                  />
                </div>
              }
            </div>
          )}

          {/* Here, we manage when we display which button to
                navigate between the different survey
            */}
          {props.index === 1 &&
            <button className="btn_next" onClick={props.handleNextQuestionnaire} style={{
              backgroundColor: themes[themeContext.theme].button,
              color: themes[themeContext.theme].textcolorbtn,
            }}>
              next
            </button>
          }
          {props.index === props.totalQues &&
            <>{

            }
              <div>
                <button className="btn btnQuiz" type="submit" onClick={props.handleFormSubmit}>
                  Save Modifications
                </button>
                
              </div>

              <button className="btn_previous" onClick={props.handlePreviousQuestionnaire} style={{
                backgroundColor: themes[themeContext.theme].button,
                color: themes[themeContext.theme].textcolorbtn,
              }}>
                back
              </button>
            </>
          }
          {props.index !== 1 && props.index !== props.totalQues &&
            <>
              <button className="btn_next" onClick={props.handleNextQuestionnaire} style={{
                backgroundColor: themes[themeContext.theme].button,
                color: themes[themeContext.theme].textcolorbtn,
              }}>
                next
              </button>
              <button className="btn_previous" onClick={props.handlePreviousQuestionnaire} style={{
                backgroundColor: themes[themeContext.theme].button,
                color: themes[themeContext.theme].textcolorbtn,
              }}>
                back
              </button>
            </>
          }
        </div>
        <img
          src={survey_pic}
          alt="survey_pic"
          style={{ height: "300px", float: "right", marginTop: "280px" }}
        />
      </div>
    </div>
  );
}

/**
 * This function allow us to display a slider and show a live parameter change
 * @param  {} props
 */
function Range(props) {
  const resultatContext = useContext(ResultatContext);
  const [slideValue, setSlideValue] = useState(resultatContext.resultat[props.question.resName]);
  const themeContext = useContext(ThemeContext);

  const handleChange = (event) => {
    setSlideValue(event.target.value);
  };

  return (
    <div>
      <h3 className="questions" style={{marginTop:"30px"}}>{props.ques}</h3>
      <div className="container_answers" style={{float:"right"}}>
        <input style={{ background: themes[themeContext.theme].rangeColor }}
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
        </div>
    </div>
  )
}

/**
 * This function allow us to display a list where the user can choose between different answer
 * @param  {} props
 */
function Dropdown(props) {
  const resultatContext = useContext(ResultatContext);
  let themeContext = useContext(ThemeContext);
  let vp = props.question.valeurs_possibles;

  return (
    <div>
      <h3 className="questions">{props.ques}</h3>
      <div className="container_answers" style={{float:"right"}}>
        <select value={resultatContext.resultat[props.question.resName]} className="dropdown" name={props.name} onChange={props.handleFormInputChange} style={{ backgroundColor: themes[themeContext.theme].rangeColor, color: themes[themeContext.theme].textcolorbtn }}>
          {
            vp.map((value, index) => (
              <option key={index} value={getObjKey(props.question.valeurs_possibles, props.question.valeurs_possibles[index])}>
                {value}
              </option>
            ))
          }
        </select>
        </div>
    </div>
  );
};

/**
 * This function allow us to display a checkbox and save the answer in the resultatContext
 * @param  {} props
 */
function CheckBoxForm(props) {
  return (
    <div>
      <h3 className="questions">{props.ques}</h3>
      <div className="container_answers" style={{float:"right"}}>
        <input className="answers_type"
          id={props.id}
          name={props.name}
          type="checkbox"
          checked={props.value}
          onChange={props.handleFormInputChange}
        />
    </div>
    </div>
  )
}
/**
 * This function allow us to display a textbox and save the answer in the resultatContext
 * @param  {} props
 */
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

  const themeContext = useContext(ThemeContext);
  return (
    <div>
      <h3 className="questions">{props.ques}</h3>
      <div className="container_answers" style={{float:"right"}}>
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
        </div>
    </div>
  );
}