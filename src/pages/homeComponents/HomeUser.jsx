import { useContext } from "react";
import { ThemeContext, ResultatContext, themes } from "../../Context";
import { Link } from "react-router-dom";
import survey_pic from "../img/survey_pic.png"
import Resultats from "../Resultats";

export default function HomeUser(props) {
    let themeContext = useContext(ThemeContext);
    let resultatContext = useContext(ResultatContext);
  
    return (
      <div
        className="container"
        style={{
          backgroundColor: themes[themeContext.theme].background,
          color: themes[themeContext.theme].foreground,
        }}
      >
        <h2
          className="center hi"
          style={{
            color: themes[themeContext.theme].textcolor,
          }}
        >
          Hi, welcome back{" "}
          {props.currentUser.nom !== ""
            ? props.currentUser.nom
            : props.currentUser.email}
        </h2>
        <Link to="/survey1">
          <button
            className="btn"
            style={{backgroundColor: themes[themeContext.theme].button,
              color: themes[themeContext.theme].textcolorbtn,}}>
            Take a survey
          </button>
        </Link>
        <br />
        <br />
        <div className="center">
          {/* Show nothing if the result in context is "null" */}
          {resultatContext.resultat.age !== 0 &&
          resultatContext.resultat.taille !== 0 &&
          resultatContext.resultat.poids !== 0 ? (
            <Resultats currentUser={props.currentUser} />
          ) : (
            <div>
              <h4
                style={{
                  color: themes[themeContext.theme].textcolor,
                }}
              >
                {" "}
                Please complete a survey to see some results
              </h4>
              <img
                src={survey_pic}
                alt="survey_pic"
                style={{ height: "300px" }}
              ></img>
            </div>
          )}
        </div>
      </div>
    );
  }

