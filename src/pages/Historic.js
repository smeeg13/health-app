import React, { useEffect, useState, useContext } from "react";
import { db } from "../initFirebase";
import { getDocs, collection } from "firebase/firestore";
import { ResultatContext, ThemeContext, themes } from "../Context";
import { BouncingDotsLoader } from "../utils/tools";
import Resultats from "./Resultats";
import { useNavigate } from "react-router-dom";
import RedirectAlert from "../components/RedirectAlert";

export default function Historic(props) {
  let themeContext = useContext(ThemeContext);
  let resultatContext = useContext(ResultatContext);
  const navigate = useNavigate();

  const [resultats, setResultats] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [isInvite, setIsInvite] = useState(undefined);

  /** Get All Resultats Save for one user */
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

  /** Close the display of a Particular Result */
  const closeDetails = () => {
    resultatContext.resetResultat();
    setShowDetails(false);
  };

  /** Open the display of a Particular Result */
  const openDetails = (event, res) => {
    resultatContext.setResultat(res);
    setShowDetails(true);
  };

  useEffect(() => {
    if (props.currentUser.nom_role === "Invite") {
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
    <div
      className="container"
      style={{
        backgroundColor: themes[themeContext.theme].background,
        color: themes[themeContext.theme].foreground,
      }}
    >
      {props.currentUser.nom_role === "Invite" ? (
        <RedirectAlert IsAdmin={false} />
      ) : (
        <>
          {showDetails ? (
            <Resultats
              currentUser={props.currentUser}
              fromHistoric={true}
              closeDetails={closeDetails}
            />
          ) : (
            <div
              style={{
                backgroundColor: themes[themeContext.theme].background,
                color: themes[themeContext.theme].foreground,
              }}
            >
              <h1
                style={{
                  backgroundColor: themes[themeContext.theme].background,
                  color: themes[themeContext.theme].textcolor,
                }}
              >
                {" "}
                {props.currentUser.nom !== ""
                  ? props.currentUser.nom
                  : props.currentUser.email}
                's Historic
              </h1>
              {isBusy ? (
                <BouncingDotsLoader />
              ) : (
                <div>
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
                          <div className="row  center">
                            <div className="column_list center">
                              <h3 className="text" style={{ color: themes[themeContext.theme].textcolor, marginLeft:"50px"}}> Résultat du : {res.id}</h3>
                            </div>
                              <button
                                name="Details"
                                type="submit"
                                className="btn"
                                style={{
                                  backgroundColor:
                                    themes[themeContext.theme].button,
                                  color:
                                    themes[themeContext.theme].textcolorbtn,
                                  width: 120,
                                  fontSize: "0.8em",
                                  marginTop: "10px",
                                  marginBottom: 10,
                                  marginRight:"100px",
                                }}
                                onClick={(event) => openDetails(event, res)}
                              >
                                Détails
                              </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
