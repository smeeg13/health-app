import { createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { Link } from "react-router-dom";
import { Docteur } from "../objects/Docteur";
import { firebaseConfig } from "../initFirebase";
import NewDocteurForm from "../components/NewDocteurForm";
import { CreateDocDocteur } from "../objects_managers/DocteurManager";
import "@fontsource/lexend-deca";
import "./pages.css";
import "../App.css";
import docs from "./img/login2.png";
import {  useState } from "react";
import { ThemeContext, themes } from "../Context";
import { useContext } from "react";
import { InformationMessage } from "./Login";

export default function RegisterDocteur() {
  let [message, setmessage] = useState("");
  let themeContext = useContext(ThemeContext);

  const handleSubmit = async (values) => {
    try {
      var secondaryApp = initializeApp(firebaseConfig, "Secondary");

      await createUserWithEmailAndPassword(
        getAuth(secondaryApp),
        values.email,
        values.password
      )
        .then((response) => {
          let docuser = response.user;

          setmessage("REGISTER_SUCCESS");
          console.log("User id : " + docuser.uid + ", created successfully!");
      let doc = new Docteur(docuser.uid,values.email, values.nom,  [], [], null);

       CreateDocDocteur(doc).then((val) => {
        console.log("Document Docteur created : ", val.uid);
        getAuth(secondaryApp).signOut();
      });
        })
        .catch((err) => {
          setmessage(err.message);
        });
      
    } catch (e) {
      setmessage(e.message);
    }
  };

  return (
    <>
      <div
        className="container right"
        style={{
          backgroundColor: themes[themeContext.theme].background,
          color: themes[themeContext.theme].foreground,
        }}
      >
        <h2
          className="page_name"
          style={{
            color: themes[themeContext.theme].textcolor,
          }}
        >
          Register a Doctor
        </h2>
        <p
          className="click_here"
          style={{
            color: themes[themeContext.theme].textcolor,
          }}
        >
          Register a new Doctor to take care of patients{" "}
        </p>
        {InformationMessage(message)}
        <NewDocteurForm handleSubmit={handleSubmit} />
        <p
          className="click_here"
          style={{  color: themes[themeContext.theme].textcolor }}
        >
          <Link to="/">Back to Home</Link>{" "}
        </p>
        <img
        alt="docs_pics"
          className="docs_pics"
          src={docs}
          style={{
            width: "200px",
            float: "right",
            marginTop: "-100px",
            position: "relative",
          }}
        ></img>
      </div>
    </>
  );
}
