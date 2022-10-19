import React from "react";
import { Link } from "react-router-dom";
import "@fontsource/lexend-deca";
import my_avatar from "./img/avatar5.png";

//TODO :: Modify the display of home page according to currentUser.nom_role
export default function Home(props  ) {
  return (
    <React.Fragment>
      <div className="container">
        {props.currentUser.nom_role === "Invite" && <HomeGuest />}
        {props.currentUser.nom_role === "Patient" && <HomeUser currentUser={props.currentUser}/>}
        {props.currentUser.nom_role === "Admin" && <HomeAdmin />}
        {props.currentUser.nom_role === "Docteur" && <HomeDocteur />}
      </div>
    </React.Fragment>
  );
}

function HomeGuest() {
  return (
    <>
      <h2 className="center welcome">Welcome in HealthApp</h2>
      <p className="center text">
        Lorem ipsum fjdskfjsdkfjdskfjsdfjdskfjfjdksfjdskfjsdkfjsdk <br></br>
        fjdsskfjdskfjdskfjdskfjdskfjdsklfjdskfjdskfjdkfljdkfjdklfjdsl
        <br></br>
        fjkdfjdksfjdksfjdksfjdksfj
      </p>
      <Link to="/survey">
        <button className="btn survey_btn">Take a survey</button>
      </Link>
      <br />
      <br />
      <Link to="/register" className="App-link">
        <button className="btn register_btn">Register</button>
      </Link>
      <span> </span>
      <Link to="/login" className="App-link">
        <button className=" btn login_btn">Login</button>
      </Link>
      <br />
    </>
  );
}

function HomeUser(props) {
  return (
    <>
      <div>
        <h2 className="center hi">
          Hi, welcome back{" "}
          {props.currentUser.nom != "" ? props.currentUser.nom : props.currentUser.email}
        </h2>
        <Link to="/survey">
          <button className="btn survey_btn">Take a survey</button>
        </Link>
        <br />
        <br />
        <div className="container result1">
          <h2 className="quiz_title">[insert quiz title]</h2>
          <img className="my_avatar" src={my_avatar} />
          <div className="category">
            <h3>Age:</h3>
            <h3>Sexe:</h3>
            <h3>Taille:</h3>
            <h3>Poids:</h3>
          </div>
          <div className="response">
            <h3>xx</h3>
            <h3>xx</h3>
            <h3>xx</h3>
            <h3>xx</h3>
          </div>
        </div>

        <div className="container result2">
          <h2 className="quiz_title">[insert quiz title]</h2>
          <img className="my_avatar" src={my_avatar} />
          <div className="category2">
            <h3>Age:</h3>
            <h3>Sex:</h3>
            <h3>Height:</h3>
            <h3>Weight:</h3>
          </div>
          <div className="response">
            <h3>xx</h3>
            <h3>xx</h3>
            <h3>xx</h3>
          </div>
        </div>

        <div className="container result3">
          <h2 className="quiz_title">[insert quiz title]</h2>
          <img className="my_avatar" src={my_avatar} />
          <div className="category3">
            <h3>Fumeur:</h3>
            <h3>Alimentation:</h3>
            <h3>Activité physique:</h3>
            <h3>Poids:</h3>
            <h3>Alcool:</h3>
          </div>
          <div className="response3">
            <h3>xx</h3>
            <h3>xx</h3>
            <h3>xx</h3>
            <h3>xx</h3>
          </div>
        </div>
      </div>
    </>
  );
}

function HomeAdmin() {
  return <></>;
}

function HomeDocteur() {
  return <></>;
}
