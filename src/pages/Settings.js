import React, {useEffect} from "react";
import {collection, setDoc, doc, getDocs} from "firebase/firestore";
import {db} from "../initFirebase";
import {useState} from "react";

export default function Settings() {
    //get the collection of variables
    const [variables, setVariables] = useState([]);

    useEffect(() => {
        const getVariables = async () => {
            const collectionVariablesRef = collection(db, "Variables");
            let data = await getDocs(collectionVariablesRef);

            setVariables(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
            console.log("Get api call")
            /*   return new Promise((resolve, reject) => {
                   resolve( setVariables(data.docs.map((doc) => ({...doc.data(), id: doc.id}))))
                   console.log("Get api call")
               })*/
        }

        getVariables();
    }, []);


    return (
        <div className="settings_page">
            <h1 className="settings_title">Settings</h1>
            {variables.map((variable) => {
                return <div key={variable.id}>
                    <li style={{listStyleType: "none", padding: 0}}>
                        <VariablesForm data={variable}></VariablesForm>
                    </li>
                </div>
            })}
        </div>
    )
}


function VariablesForm({data}) {

    let [api_variable_predifinie, setApi_variable_predifinie] = useState("");
    let [api_variable_limites, setApi_variable_limites] = useState("");
    let [api_variable_normale, setApi_variable_normale] = useState("");

    let [variable_normale, setVariable_normale] = useState("");
    let [variable_predifinie, setVariable_predifinie] = useState("");
    let [variable_limites, setVariable_limites] = useState("");

    useEffect(() => {
        setApi_variable_predifinie(data.val_predefinie);
        setApi_variable_limites(data.limites);
        setApi_variable_normale(data.val_normale)
    }, []);

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (api_variable_limites !== variable_limites && variable_limites !== "") {
            const variableRef = doc(db, 'Variables', data.id);
            setDoc(variableRef, {limites: variable_limites}, {merge: true}).then(r => console.log("Update limites done"));
            setApi_variable_limites(variable_limites)
        } else if (api_variable_predifinie !== variable_predifinie && variable_predifinie !== "") {
            const variableRef = doc(db, 'Variables', data.id);
            setDoc(variableRef, {val_predefinie: variable_predifinie}, {merge: true}).then(r => console.log("Update val predifinie done"));
            setApi_variable_predifinie(variable_predifinie)
        } else if (api_variable_normale !== variable_normale && variable_normale !== "") {
            const variableRef = doc(db, 'Variables', data.id);
            setDoc(variableRef, {val_normale: variable_normale}, {merge: true}).then(r => console.log("Update val predifinie done"));
            setApi_variable_normale(variable_normale)
        } else {
            console.log("Settings info : Nothing to update.. ")
        }

        setVariable_normale("");
        setVariable_limites("");
        setVariable_predifinie("");
    }

    return (
        <div className="settings_container">
            <h4 className="variable_text">
                {data.nom}
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
                        Valeur normale {api_variable_normale}
                        <input
                            type="text"
                            name="val_normale"
                            value={variable_normale}
                            onChange={(e) => setVariable_normale(e.target.value)}
                            placeholder="type your new value.."/>
                        <button type="submit">save</button>
                    </div>
                    <div>
                        Valeur prédifinies {api_variable_predifinie} 
                        <input
                            type="text"
                            name="val_predifinie"
                            value={variable_predifinie}
                            onChange={(e) => setVariable_predifinie(e.target.value)}
                            placeholder="type your new value.."/>
                        <button type="submit">save</button>
                    </div>
                    <div>
                        Valeur limites ({api_variable_limites}) 
                        <input
                            type="text"
                            name="limites"
                            value={variable_limites}
                            onChange={(e) => setVariable_limites(e.target.value)}
                            placeholder="type your new value.."/>
                        <button type="submit">save</button>
                    </div>
                </div>
            </form>
        </div>
    )



                }
