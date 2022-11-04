import React from "react";
import { Link } from "react-router-dom";
import "@fontsource/lexend-deca";
import { useContext } from "react";
import home_pic from "../img/home.png";
import { ThemeContext, themes } from "../../Context";

export default function HomeGuest() {
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
          Bienvenue chez HealthApp
        </h2>
        <p
          className="center text"
          style={{
            color: themes[themeContext.theme].textcolor,
          }}
        >
          Health Prevention est une application développée par <br></br>
          Mégane, Emilie, Thomas et Abdullah.
          <br></br>
          Vous devez remplir un questionnaire de santé et selon vos réponses 
          <br></br>
          nous vous fournirons le résultats de votre état de santé. 
        </p>
  
        <Link to="/survey">
          <button
            className="btn"
            style={{
              backgroundColor: themes[themeContext.theme].button,
              color: themes[themeContext.theme].textcolorbtn,
            }}
          >
            Remplir un questionnaire
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
            S'inscrire
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
  