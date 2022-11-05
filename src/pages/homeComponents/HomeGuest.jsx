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
          Welcome in HealthApp
        </h2>
        <p
          className="center text"
          style={{
            color: themes[themeContext.theme].textcolor,
          }}
        >
          Health Prevention is an application developped by <br></br>
          Mégane, Emilie, Thomas and Abdullah.
          <br></br>
          You must fill a health survey and regarding your answers 
          <br></br>
          we will provide you your health condition result. 
        </p>
  
        <Link to="/survey">
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
  