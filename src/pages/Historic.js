import React, { useEffect, useState } from "react";
import { db } from "../initFirebase";
import { getDocs, collection } from "firebase/firestore";
import { Loader } from "../components/QuestionForm";

export default function Historic(props) {
  const [resultats, setResultats] = useState([]);
  const [isBusy, setBusy] = useState(true);

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

  const HandleDetailsClick = (id) => {

    console.log("Click sees details on res : ", id);

  }

  return (
    <>
      <h1>
        {" "}
        {props.currentUser.nom !== ""
          ? props.currentUser.nom
          : props.currentUser.email}
        's Historic
      </h1>

      <div className="box1">
        {isBusy ? (
          <Loader />
        ) : (
            <div className="container">
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {resultats.map((res) => (
                <li key={res.id}>
                  <div>
                    <p>
                      Resultat du :{res.id}
                      <button type="submit" className="btn" onClick={HandleDetailsClick(res.id)}>
                        See Details
                      </button>
                    </p>
                    <hr />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

