import React from "react";
import { Link } from "react-router-dom";
import "@fontsource/lexend-deca";
import my_avatar from "./img/avatar5.png";
import { useContext } from "react";
import home_pic from "./img/home.png";
import { ResultatContext } from "../Context";
import { ThemeContext, themes } from "../Context";
import Resultats from "./Resultats";

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
        style={{ height: "300px", marginTop: "-100px", float: "right" }}
      ></img>
    </div>
  );
}

function HomeUser(props) {
  let themeContext = useContext(ThemeContext);
  let resultatContext = useContext(ResultatContext);

  // // the width of the box
  // const [smoke, setSmoke] = useState(10);
  // const [weight, setWeight] = useState(10);
  // // This function is called when the first range slider changes
  // const changeSmoke = (event) => {
  //   setSmoke(event.target.value);
  // };
  // const changeWeight = (event) => {
  //   setWeight(event.target.value);
  // };

  return (
    <div className="container" 
      style={{
        backgroundColor: themes[themeContext.theme].background,
        color: themes[themeContext.theme].foreground,
      }}
    >
      <h2 className="center hi"
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
        <button className="btn" style={{
            backgroundColor: themes[themeContext.theme].button,
            color: themes[themeContext.theme].textcolorbtn,
          }}>Take a survey</button>
      </Link>
      <br />
      <br />
      <div className="center">
        {/* Show nothing if the result in context is "null" */}
        {resultatContext.resultat.poids !== 0 || resultatContext.resultat.taille !== 0 
          ? <Resultats currentUser={props.currentUser}/> 
          : <div>
            <h4> Please complete a survey to see some results</h4>
            </div>
        }
      </div>

      {/* <div className="container result3"   style={{
          backgroundColor: themes[themeContext.theme].backgroundresult,
          color: themes[themeContext.theme].foreground,
        }}
      >
        <h2 className="quiz_title">[insert quiz title]</h2>
        <img className="my_avatar" src={my_avatar} />
        <div className="category3">
          <h3>Fumeur:</h3>
          <h3>Alimentation:</h3>
          <h3>Activité physique:</h3>
          <h3>Poids: {weight}kg</h3>
          <h3>Alcools:</h3>
        </div>
        <div className="response3">
          <input
            type="range"
            onChange={changeSmoke}
            min={1}
            max={10}
            step={1}
            value={smoke}
            className="custom-slider"
          ></input>
          <br></br>
          <input
            style={{ backgroundColor: "blueviolet" }}
            type="range"
            onChange={changeWeight}
            min={1}
            max={10}
            step={1}
            value={weight}
            className="custom-slider"
          ></input>
          <br></br>
          <input
            type="range"
            onChange={changeSmoke}
            min={1}
            max={10}
            step={1}
            value={smoke}
            className="custom-slider"
          ></input>
          <br></br>
          <input
            type="range"
            onChange={changeSmoke}
            min={1}
            max={10}
            step={1}
            value={smoke}
            className="custom-slider"
          ></input>
          <br></br>
          <input
            type="range"
            onChange={changeSmoke}
            min={1}
            max={10}
            step={1}
            value={smoke}
            className="custom-slider"
          ></input>
        </div>
      </div> */}
    </div>
  );
}

function HomeAdmin() {
  return <></>;
}

function HomeDocteur() {
  return <></>;
}
