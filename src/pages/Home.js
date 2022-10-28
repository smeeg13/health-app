import React from "react";

import { Link } from "react-router-dom";
import "@fontsource/lexend-deca";
import { useContext } from "react";
import home_pic from "./img/home.png";
import { ThemeContext, ResultatContext, themes } from "../Context";
import Resultats from "./Resultats";
import survey_pic from "./img/survey_pic.png";

export default function Home(props) {
  return (
    <React.Fragment>
      <div className="container">
        {props.currentUser.nom_role === "Invite" && <HomeGuest />}
        {props.currentUser.nom_role === "Patient" && (
          <HomeUser currentUser={props.currentUser} />
        )}
        {props.currentUser.nom_role === "Admin" && <HomeAdmin />}
        {props.currentUser.nom_role === "Docteur" && <HomeDocteur />}
      </div>
    </React.Fragment>
  );
}

function HomeGuest() {

  let themeContext = useContext(ThemeContext);

  return (
    <div
      className="container"
      style={{
        backgroundColor: themes[themeContext.theme].background,
        color: themes[themeContext.theme].foreground,
      }}
    >
      <h2
        className="center welcome"
        style={{
          color: themes[themeContext.theme].textcolor,
        }}
      >
        Welcome in HealthApp
      </h2>
      <p
        className="center text"
        style={{
          color: themes[themeContext.theme].textcolor,
        }}
      >
        Health Prevention is an application developed by <br></br>
        Mégane, Emilie, Thomas and Abdullah.
        <br></br>
        You must take an health survey and regarding your answers it will
        <br></br>
        provide you the result of your health condition.
      </p>

      <Link to="/survey1">
        <button
          className="btn"
          style={{
            backgroundColor: themes[themeContext.theme].button,
            color: themes[themeContext.theme].textcolorbtn,
          }}
        >
          Take a survey
        </button>
      </Link>
      <br />
      <br />
      <Link to="/register" className="App-link">
        <button
          className="btn"
          style={{
            backgroundColor: themes[themeContext.theme].button,
            color: themes[themeContext.theme].textcolorbtn,
          }}
        >
          Register
        </button>
      </Link>
      <span> </span>
      <Link to="/login" className="App-link">
        <button
          className=" btn"
          style={{
            backgroundColor: themes[themeContext.theme].button,
            color: themes[themeContext.theme].textcolorbtn,
          }}
        >
          Login
        </button>
      </Link>
      <br />
      <img
        src={home_pic}
        alt="HomePics"
        style={{ height: "300px", marginTop: "-100px", float: "right" }}
      ></img>
    </div>
  );
}

function HomeUser(props) {
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
          style={{
            backgroundColor: themes[themeContext.theme].button,
            color: themes[themeContext.theme].textcolorbtn,
          }}
        >
          Take a survey
        </button>
      </Link>
      <br />
      <br />
      <div className="center">
        {/* Show nothing if the result in context is "null" */}
        {resultatContext.resultat.age !== 0 && resultatContext.resultat.taille !== 0 &&
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
            <img src={survey_pic} style={{height:"300px"}}></img>
          </div>
        )}
      </div>
    </div>
  );
}

function HomeAdmin() {
  let themeContext = useContext(ThemeContext);

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
        Hi, welcome back Admin
      </h2>
      <Link to="/settings">
        <button
          className="btn"
          style={{
            backgroundColor: themes[themeContext.theme].button,
            color: themes[themeContext.theme].textcolorbtn,
          }}
        >
          Modify Variables
        </button>
      </Link>

      {/* Button to Add a New doctor */}
      {/* <Link to="/settings">
    <button
      className="btn"
      style={{
        backgroundColor: themes[themeContext.theme].button,
        color: themes[themeContext.theme].textcolorbtn,
      }}
    >
      Modify Variables
    </button>
  </Link> */}
      <br />
      <br />
    </div>
  );
}

function HomeDocteur() {
  return <></>;
}
