import React from "react";
import { useState, useContext } from "react";
import { ThemeContext, themes } from "../Context";
import { ResultatContext } from "../Context";
import { getObjKey } from "../utils/tools";


/**
 * Function to display all the informations about a question
 * the title of the question and how you can answer to it
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
          }}>{props.titles[props.index - 1]}
          </h2>
          {props.questions.map(q =>
            <div key={q.resName} style={{
              color: themes[themeContext.theme].textcolor,
            }}>
              {q.typeAnswer === 'checkbox' && <CheckBoxForm
                name={q.resName}
                value={resultatContext.resultat[q.resName]}
                handleFormInputChange={props.handleFormInputChange}
                ques={q.question}
                question={q}
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

          {/* Here, we manage when we display which button to navigate between the different survey*/}
          {props.index === 1 &&
            <button className="btn_next" onClick={props.handleNextQuestionnaire} style={{
              backgroundColor: themes[themeContext.theme].button,
              color: themes[themeContext.theme].textcolorbtn,
            }}>
              next
            </button>
          }

          {/* Display when you are are at the end of the survey */}
          {props.index === props.totalQues &&
            <>
              <div>
                <button className="btn_previous" onClick={props.handlePreviousQuestionnaire} style={{
                  backgroundColor: themes[themeContext.theme].button,
                  color: themes[themeContext.theme].textcolorbtn,
                }}>
                  back
                </button>
              </div>
              <button className="btn btnQuiz" type="submit" onClick={props.handleFormSubmit}>
                Save survey
              </button>

            </>
          }
          {/* Display when you stand in the middel of the survey */}
          {props.index !== 1 && props.index !== props.totalQues &&
            <>
              <button className="btn_previous" onClick={props.handlePreviousQuestionnaire} style={{
                backgroundColor: themes[themeContext.theme].button,
                color: themes[themeContext.theme].textcolorbtn,
              }}>
                back
              </button>
              <button className="btn_next" onClick={props.handleNextQuestionnaire} style={{
                backgroundColor: themes[themeContext.theme].button,
                color: themes[themeContext.theme].textcolorbtn,
              }}>
                next
              </button>
            </>
          }
        </div>
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
  const themeContext = useContext(ThemeContext);

  return (
    <div >
      <h3 className="questions" >{props.ques}
        {props.question.resName !== 'yesChol' ?
          <div>
            <input style={{ background: themes[themeContext.theme].rangeColor }}
              type="range"
              name={props.question.resName}
              min={props.question.min}
              max={props.question.max}
              value={props.value}
              onChange={props.handleFormInputChange}
              step={props.question.step}
            />
            <output className="rangevalue" style={{ backgroundColor: themes[themeContext.theme].rangeColor, color: themes[themeContext.theme].textcolorbtn }} >
              {resultatContext.resultat[props.question.resName]}
              {props.question.unites}
            </output>
          </div>
          :
          <div>
            <input style={{ background: themes[themeContext.theme].rangeColor }}
              type="range"
              name={props.question.resName}
              min={props.question.min}
              max={props.question.max}
              value={props.value}
              onChange={props.handleFormInputChange}
              step={props.question.step}
            />
            <output className="rangevalue" style={{ backgroundColor: themes[themeContext.theme].rangeColor, color: themes[themeContext.theme].textcolorbtn }} >
              {resultatContext.resultat[props.question.resName]}
              Chol {props.question.unites}
            </output>
            <input style={{ background: themes[themeContext.theme].rangeColor }}
              type="range"
              name={props.question.resName2}
              min={props.question.min2}
              max={props.question.max2}
              value={props.value2}
              onChange={props.handleFormInputChange}
              step={props.question.step}
            />
            <output className="rangevalue" style={{ backgroundColor: themes[themeContext.theme].rangeColor, color: themes[themeContext.theme].textcolorbtn }} >
              {resultatContext.resultat[props.question.resName2]}
              Hdl {props.question.unites}
            </output>
          </div>
        }
      </h3>
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
      <h3 className="questions">{props.ques}
        <select
          value={resultatContext.resultat[props.question.resName]}
          className="dropdown" name={props.name}
          onChange={props.handleFormInputChange}
          style={{ backgroundColor: themes[themeContext.theme].rangeColor, color: themes[themeContext.theme].textcolorbtn }}>
          {
            vp.map((value, index) => (
              /*The getObjKey allows us to retrieve the value with a given key in a list on firestore */
              <option key={index} value={getObjKey(props.question.valeurs_possibles, props.question.valeurs_possibles[index])}>
                {value}
              </option>
            ))
          }
        </select>
      </h3>
    </div>
  );
};

/**
 * This function allow us to display a checkbox and save the answer in the resultatContext
 * @param  {} props
 */
function CheckBoxForm(props) {
  const resultatContext = useContext(ResultatContext);
  const [isShown, setIsShown] = useState(props.value);
  const listSecondChoice = ['yesSyst', 'yesGlyc', 'yesChol']
  
  const handleClick = () => {
    setIsShown(current => !current);
  };

  return (
    <div>
      <h3 className="questions">{props.ques}
        <input className="answers_type"
          id={props.id}
          name={props.name}
          type="checkbox"
          checked={props.value}
          onChange={props.handleFormInputChange}
          onClick={handleClick}
        />
        {((isShown && listSecondChoice.includes(props.name)) || resultatContext.resultat[props.question.resName] > 1) && (
          <>
            <div>
              <Range
                question={props.question}
                handleFormInputChange={props.handleFormInputChange}
              />
            </div>
          </>
        )
        }
      </h3>
    </div>
  )
}