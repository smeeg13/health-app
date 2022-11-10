import React, { useEffect } from "react";
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../initFirebase";
import { useState, useContext } from "react";
import { ThemeContext, themes } from "../Context";
// import settings from "./img/settingss.png";
import { useNavigate } from "react-router-dom";
import RedirectAlert from "../components/RedirectAlert";

export default function Settings(props) {
  let themeContext = useContext(ThemeContext);
  const navigate = useNavigate();

  //get the collection of variables
  const [variables, setVariables] = useState([]);
  const [isInvite, setIsInvite] = useState(undefined);

  useEffect(() => {
    const getVariables = async () => {
      const collectionVariablesRef = collection(db, "Variables");
      let data = await getDocs(collectionVariablesRef);

      setVariables(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log("Get api call");
      /*   return new Promise((resolve, reject) => {
                   resolve( setVariables(data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                   console.log("Get api call")
               })*/
    };

    getVariables();
  }, []);

  useEffect(() => {
    if (props.currentUser.nom_role !== "Admin") {
      setIsInvite(true);
    } else {
      setIsInvite(false);
    }
  }, [props.currentUser.nom_role]);

  useEffect(() => {
    setTimeout(() => {
      if(isInvite){
        return navigate("/");
        }
    }, 5000);
  }, [isInvite, navigate]);

  return (
    <>
      {isInvite ? (
        <RedirectAlert IsAdmin={true}/>
      ) : (
        <div
          className="settings_page"
          style={{
            backgroundColor: themes[themeContext.theme].background_right,
            color: themes[themeContext.theme].foreground,
          }}
        >
          <h1
            className="settings_title"
            style={{
              color: themes[themeContext.theme].textcolor,
              textAlign: "center",
            }}
          >
            Settings
          </h1>

          {/* <img src={settings} style={{height:"350px", float:"right", paddingRight:"100px", position:"relative"}}></img> */}
          {variables.map((variable) => {
            return (
              <div key={variable.id}>
                <li
                  style={{
                    color: themes[themeContext.theme].textcolor,
                  }}
                >
                  <VariablesForm data={variable}></VariablesForm>
                </li>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

function VariablesForm({ data }) {
  let [api_variable_predifinie, setApi_variable_predifinie] = useState("");
  let [api_variable_limites, setApi_variable_limites] = useState("");
  let [api_variable_normale, setApi_variable_normale] = useState("");

  let [variable_normale, setVariable_normale] = useState("");
  let [variable_predifinie, setVariable_predifinie] = useState("");
  let [variable_limites, setVariable_limites] = useState("");

  let themeContext = useContext(ThemeContext);

  useEffect(() => {
    setApi_variable_predifinie(data.val_predefinie);
    setApi_variable_limites(data.limites);
    setApi_variable_normale(data.val_normale);
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (api_variable_limites !== variable_limites && variable_limites !== "") {
      const variableRef = doc(db, "Variables", data.id);
      setDoc(variableRef, { limites: variable_limites }, { merge: true }).then(
        (r) => console.log("Update limites done")
      );
      setApi_variable_limites(variable_limites);
    } else if (
      api_variable_predifinie !== variable_predifinie &&
      variable_predifinie !== ""
    ) {
      const variableRef = doc(db, "Variables", data.id);
      setDoc(
        variableRef,
        { val_predefinie: variable_predifinie },
        { merge: true }
      ).then((r) => console.log("Update val predifinie done"));
      setApi_variable_predifinie(variable_predifinie);
    } else if (
      api_variable_normale !== variable_normale &&
      variable_normale !== ""
    ) {
      const variableRef = doc(db, "Variables", data.id);
      setDoc(
        variableRef,
        { val_normale: variable_normale },
        { merge: true }
      ).then((r) => console.log("Update val predifinie done"));
      setApi_variable_normale(variable_normale);
    } else {
      console.log("Settings info : Nothing to update.. ");
    }

    setVariable_normale("");
    setVariable_limites("");
    setVariable_predifinie("");
  };

  return (
    <div className="settings_container" style={{ alignItems: "center" }}>
      <h4
        className="variable_text"
        style={{
          color: themes[themeContext.theme].textcolor,
          textDecoration: "none",
        }}
      >
        {data.nom}{" "}
      </h4>
      <form onSubmit={handleFormSubmit}>
        <div>
          {/*  {data.val_predefinie !== null && data.val_predefinie !== undefined ? (
                            <div>
                                Valeur prédifinies {api_variable_predifinie} =>
                                <input
                                    type="text"
                                    name="val_predifinie"
                                    value={variable_predifinie}
                                    onChange={(e) => setVariable_predifinie(e.target.value)}
                                    placeholder="type your new value.."/>
                                <button type="submit">save</button>
                            </div>)
                        :
                        ("")
                    }*/}
          <div>
            <h3 className="settings_label" style={{ textDecoration: "none" }}>
              {" "}
              Valeur normale {api_variable_normale}
            </h3>
            <input
              className="settings_input"
              type="number"
              maxLength={3}
              name="val_normale"
              value={variable_normale}
              onChange={(e) => setVariable_normale(e.target.value)}
              // placeholder="type your new value.."
            />
            <button
              className=" btn settings_save_btn"
              type="submit"
              style={{
                backgroundColor: themes[themeContext.theme].button,
                color: themes[themeContext.theme].textcolorbtn,
              }}
            >
              save
            </button>
          </div>
          <div>
            <h3 className="settings_label">
              {" "}
              Valeur prédifinies {api_variable_predifinie}
            </h3>
            <input
              className="settings_input"
              type="number"
              maxLength={3}
              name="val_predifinie"
              value={variable_predifinie}
              onChange={(e) => setVariable_predifinie(e.target.value)}
              // placeholder="type your new value.."
            />
            <button
              className=" btn settings_save_btn"
              type="submit"
              style={{
                backgroundColor: themes[themeContext.theme].button,
                color: themes[themeContext.theme].textcolorbtn,
              }}
            >
              save
            </button>
          </div>
          <div>
            <h3 className="settings_label">
              Valeur limites ({api_variable_limites})
            </h3>
            <input
              className="settings_input"
              type="number"
              maxLength={3}
              name="limites"
              value={variable_limites}
              onChange={(e) => setVariable_limites(e.target.value)}
              // placeholder="type your new value.."
            />
            <button
              className=" btn settings_save_btn"
              type="submit"
              style={{
                backgroundColor: themes[themeContext.theme].button,
                color: themes[themeContext.theme].textcolorbtn,
              }}
            >
              save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
