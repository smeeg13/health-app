import React, { useEffect, useState, useContext } from "react";
import { db } from "../initFirebase";
import { getDocs, collection } from "firebase/firestore";
import { Loader } from "../components/QuestionForm";
import { ThemeContext, themes } from "../Context";

export default function Historic(props) {
  let themeContext = useContext(ThemeContext);

  const [resultats, setResultats] = useState([]);
  const [isBusy, setBusy] = useState(true);
  // const [selectedResult, setSelectedResult] = useState(undefined);

  useEffect(() => {
    async function getResultats(userId) {
      const refResultat = collection(db, "Resultat/" + userId + "/Resultats");

      const roleSnapshot = await getDocs(refResultat);

      const resultatsList = roleSnapshot.docs.map((doc) => doc.data());
      setResultats(resultatsList);
      setBusy(false);
    }

    getResultats(props.currentUser.id_user);
  }, [props.currentUser.id_user]);
  console.log("Resultats : ", resultats);

  const HandleDetailsClick = (event, res) => {
    console.log("event : ", event.target.name);

    console.log("Click sees details on res : ", res.id);
  };

  return (
    <>
      <h1>
        {" "}
        {props.currentUser.nom !== ""
          ? props.currentUser.nom
          : props.currentUser.email}
        's Historic
      </h1>

      <>
        {isBusy ? (
          <Loader />
        ) : (
          <div className="container_list_patient">
            {resultats.length === 0 ? (
              <div>
                <span style={{ fontWeight: "bold" }}>
                  No previous results found
                </span>
              </div>
            ) : (
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {resultats.map((res) => (
                  <li key={res.id}>
                    <hr className="my_hr" />

                    <div className="row  center">
                      <div className="column_list center">
                        <p className="center"> Resultat du : {res.id}</p>
                      </div>
                      <div className="column_list center">
                        <button
                          name="Details"
                          type="submit"
                          className="btn"
                          style={{
                            backgroundColor: themes[themeContext.theme].button,
                            color: themes[themeContext.theme].textcolorbtn,
                            width: 170,
                            marginTop: 0,
                            marginBottom: 10,
                          }}
                          onClick={(event) => HandleDetailsClick(event, res)}
                        >
                          See Details
                        </button>
                      </div>
                      <p></p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </>
    </>
  );
}
