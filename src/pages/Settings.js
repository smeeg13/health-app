import React, {useEffect} from "react";
import {collection, setDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../initFirebase";
import {useState, useContext} from "react";
import {ThemeContext, themes} from "../Context";
// import settings from "./img/settingss.png";
import {useNavigate} from "react-router-dom";
import RedirectAlert from "../utils/RedirectAlert";

/**
 *
 * @param props - Take the current user as input, used to see if the user is allowed or not in the settings page
 * @returns {JSX.Element} - Return a list of VariableForm component for each variable
 */

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

            setVariables(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
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
            if (isInvite) {
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

/**
 *
 * @param data - Take one variable as an input, the variable is
 * then split into 3 parts (variable_predifinie,variable_limites,variable_normale)
 * The "api" ones are used to get the data from firebase during the loading of the page.
 * The display is updated locally
 * For the variable it is udpated with the API
 * @returns {JSX.Element}
 */

function VariablesForm({data}) {
    let [api_variable_predifinie, setApi_variable_predifinie] = useState("");
    let [api_variable_limites, setApi_variable_limites] = useState("");
    let [api_variable_normale, setApi_variable_normale] = useState("");

    let [variable_min, setVariable_min] = useState("");
    let [variable_max, setVariable_max] = useState("");

    let [api_variable_min, setApi_Variable_min] = useState("");
    let [api_variable_max, setApi_Variable_max] = useState("");

    let [variable_normale, setVariable_normale] = useState("");
    let [variable_predifinie, setVariable_predifinie] = useState("");
    let [variable_limites, setVariable_limites] = useState("");

    let themeContext = useContext(ThemeContext);

    useEffect(() => {
        setApi_variable_predifinie(data.val_predefinie);

        setApi_variable_normale(data.val_normale);
        transformationminMax(data.limites)

    }, []);

    /**
     * const used to transform the variable "limite" into 2 variable
     * the min and the max since it is stored in one variable ex : (1-3)
     * they will be stored into api_variable_min and api_variable_max
     * @param valeur_limite_input the input is the variable limite who contains the min and max
     */
    const transformationminMax = (valeur_limite_input) => {
        if (valeur_limite_input == "" || valeur_limite_input == null) {
            setApi_Variable_min("");
            setApi_Variable_max("");
        } else {

            setApi_Variable_min(valeur_limite_input.substring(0, valeur_limite_input.indexOf('-')));
            setApi_Variable_max(valeur_limite_input.substring(valeur_limite_input.indexOf('-') + 1));
        }
    }
    /**
     * const used to submit the modifed variables into firebase
     * @param event - used to prevent the Event interface's preventDefault() method tells the user agent
     * that if the event does not get explicitly handled, its default action should not be taken as it normally would be.
     */
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if ((variable_min != api_variable_min && variable_min != "") && (variable_max != api_variable_max && variable_max != "")) {
            // if its different than the api variable then :

            const variableRef = doc(db, "Variables", data.id);
            setDoc(variableRef, {limites: variable_min + "-" + variable_max}, {merge: true}).then(
                (r) => console.log("Update limites min max done")
            );
            setApi_Variable_min(variable_min);
            setApi_Variable_max(variable_max);

        } else if (api_variable_predifinie !== variable_predifinie && variable_predifinie !== "") {
            const variableRef = doc(db, "Variables", data.id);
            setDoc(
                variableRef,
                {val_predefinie: variable_predifinie},
                {merge: true}
            ).then((r) => console.log("Update val predifinie done"));
            setApi_variable_predifinie(variable_predifinie);
        } else if (
            api_variable_normale !== variable_normale &&
            variable_normale !== ""
        ) {
            const variableRef = doc(db, "Variables", data.id);
            setDoc(
                variableRef,
                {val_normale: variable_normale},
                {merge: true}
            ).then((r) => console.log("Update val predifinie done"));
            setApi_variable_normale(variable_normale);
        } else {
            console.log("Settings info : Nothing to update.. ");
        }

        setVariable_normale("");
        setVariable_limites("");
        setVariable_predifinie("");
        setVariable_min("");
        setVariable_max("")
    };

    return (
        <div className="settings_container" style={{alignItems: "center"}}>
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
                    <div>
                        <h3 className="settings_label" style={{textDecoration: "none"}}>
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
                            placeholder=".."
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
                            min ({api_variable_min}) max ({api_variable_max})
                        </h3>
                        <input
                            className="settings_input"
                            type="number"
                            maxLength={3}
                            name="variable_min"
                            value={variable_min}
                            onChange={(e) => setVariable_min(e.target.value)}
                        />
                        <input
                            className="settings_input"
                            type="number"
                            maxLength={3}
                            name="variable_max"
                            value={variable_max}
                            onChange={(e) => setVariable_max(e.target.value)}
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
