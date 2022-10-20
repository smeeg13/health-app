// import React, {useEffect} from "react";

// import {collection, setDoc, doc, getDocs} from "firebase/firestore";

// import {db} from "../initFirebase";
// import {useState} from "react";
// import {useCollectionData} from "react-firebase-hooks/firestore";

// export default function Settings() {
//     //get the collection of variables
//     const [variables, setVariables] = useState([]);
//     const collectionVariablesRef = collection(db, "Variables");
//     let data = [];

//     const getVariables = async () => {
//         data = await getDocs(collectionVariablesRef);
//         setVariables(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
//     }
//     getVariables();

//     return (

//         <div className="settings_page">
//             <h1 className="settings_title">Settings</h1>
//             {variables.map((variable) => {
//                 return <div>
//                     <li style={{listStyleType: "none", padding: 0}} key={variable.id}>
//                         <VariablesForm data={variable}></VariablesForm>
//                     </li>
//                 </div>
//             })}
//         </div>

//     )
// }


// function VariablesForm({data}) {
//     let [variable_predifinie, setVariable_predifinie] = useState("");
//     let [variable_limites, setVariable_limites] = useState("");

//     const handleFormSubmitLimite = async (event) => {
//         event.preventDefault();
//         const variableRef = doc(db, 'Variables', data.id);
//         setDoc(variableRef, {limites: variable_limites}, {merge: true}).then(r => console.log("Update done"));
//         console.log("var limite " + variable_limites.toString())
//     }

//     const handleFormSubmitPrefinie = async (event) => {
//         event.preventDefault();
//         const variableRef = doc(db, 'Variables', data.id);
//         setDoc(variableRef, {val_predefinie: variable_predifinie}, {merge: true}).then(r => console.log("Update done"));
//     }



//     return (
//         <div className="settings_container">
//             <h4 className="variable_text">
//                 {data.nom}
//             </h4>
//                 Valeur normale {data.val_normale}
//             <form onSubmit={handleFormSubmitPrefinie}>
//                 <div>
//                     {data.val_predefinie !== null && data.val_predefinie !== undefined ? (
//                             <div>
//                                 Valeur prédifinies {data.val_predefinie} =>
//                                 <input 
//                                     type="text"
//                                     name="val_predifinie"
//                                     value={variable_predifinie}
//                                     onChange={(e) => setVariable_predifinie(e.target.value)}
//                                     placeholder="type your new value.."/>
//                                 <button type="submit">save</button>
//                             </div>)
//                         :
//                         ("")
//                     }
//                 </div>
//             </form>
//             <form onSubmit={handleFormSubmitLimite}>
//                 <div>
//                     Valeur limites ({data.limites}) =>
//                     <input
//                         type="text"
//                         name="limites"
//                         value={variable_limites}
//                         onChange={(e) => setVariable_limites(e.target.value)}
//                         placeholder="type your new value.."/>
//                     <button type="submit">save</button>
//                 </div>
//             </form>
//         </div>
//     )


// }


