import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "./img/logo.png";
import exit from "./img/exit.png";
import night from "./img/night.png";
import day from "./img/day.png";
import { ThemeContext, themes } from "../Context";

export default class Navbar extends React.Component {

  render() {
    return (
      <Container>
        <div className="navbar" style={{backgroundColor: themes[this.context.theme].background, color: themes[this.context.theme].textcolor}}>
          <Link to="/">
            <img className="logo_app" src={logo} alt="logo_app" />
          </Link>
          <ul>
            {/* if user.nom_role != invite : USER CONNECTED */}
            {this.props.currentUser.nom_role !== "Invite" && (
              <Link to="/logout" style={{ textDecoration: "none" }}>
                <button className="btn btn_logout" title="Logout">
                  <img className="logo_logout" src={exit}  alt="logout"/>
                </button>
              </Link>
            )}

            <button
              className="btn btn_logout"
              title="Switch Theme"
              onClick={this.context.toggleTheme}
            >
           {this.context.theme === "dark" ? (
                <img className="logo_theme" src={night} alt="dark mode"/>
              ) : (
                <img className="logo_theme" src={day} alt="light mode" />
              )}   
            </button>

            {/* if user.nom_role = Patient  */}
            {this.props.currentUser.nom_role === "Patient" && (
              <>
                <li>
                  <Link to="/account" style={{ textDecoration: "none" }}>
                    Mon compte
                  </Link>
                </li>
                <li>
                  <Link to="/historic" style={{ textDecoration: "none" }}>
                    Historique
                  </Link>
                </li>
                <li>
                  <Link to="/survey" style={{ textDecoration: "none" }}>
                    Questionnaire
                  </Link>
                </li>
                <li>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
              </>
            )}

            {/* if user.nom_role = Admin  */}
            {this.props.currentUser.nom_role === "Admin" && (
              <>
                <li>
                  <Link to="/settings" style={{ textDecoration: "none" }}>
                    Settings
                  </Link>
                </li>
                <li>
                  <Link to="/" style={{ textDecoration: "none" }}>
                    Home
                  </Link>
                </li>
              </>
            )}

            {/* if user.nom_role = Docteur  */}
            {this.props.currentUser.nom_role === "Docteur" && (
              <>
                <li>
                  <Link to="/account" style={{ textDecoration: "none" }}>
                    My Account
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </Container>
    );
  }
}
Navbar.contextType = ThemeContext;


const Container = styled.div`
  padding: 0;
  margin: 0;
  display: flex;


  .navbar {
    height: 70px;
    width: 100%;
    text-decoration: none !important;
    background-color: white;
    /*margin-bottom: 20px;*/
  }

  .navbar ul li {
    float: right;
    display: inline;
    background-size: cover;
    background-blend-mode: darken;
    text-decoration: none !important;
    margin-top: 13px;
    line-height: 30px;
    padding: 0px 20px;
    background: linear-gradient(currentColor, currentColor) bottom / 0 0.1em
      no-repeat;
    font-size: 1rem;
    font-family: "Lexend Deca";
    font-weight: 800;
    white-space: nowrap;
    -webkit-text-fill-color: #77c5a6;
    text-transform: uppercase;
    transition: 0.5s background-size;
  }

  .navbar ul li:hover {
    background-size: 75% 0.1em;
    color: #444;
    text-transform: uppercase;
  }

  .logo_app {
    padding-left: 10px;
    padding-right: 10px;
    float: left;
    width: 50px;
    margin-top: 13px;
  }
  .logo_logout {
    padding-top: -10px;
    float: left;
    width: 20px;
    height: 20px;
    margin: -4px;
    margin-left: -10px;
    margin-right: -12px;
  }
  .logo_theme {
    padding-top: -5px;
    float: left;
    width: 20px;
    height: 20px;
    margin: -4px;
    margin-left: -10px;
    margin-right: -12px;
  }
  .app_title {
    padding-left: 10px;
    padding-right: 10px;
    float: left;
    margin-below: 20px;
  }


`;
