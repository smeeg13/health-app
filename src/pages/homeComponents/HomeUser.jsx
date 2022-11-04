import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../initFirebase";
import { getDocs, collection } from "firebase/firestore";
import { ThemeContext, ResultatContext, themes } from "../../Context";
import survey_pic from "../img/survey_pic.png";
import Resultats from "../Resultats";
import { BouncingDotsLoader } from "../../utils/tools";

export default function HomeUser(props) {
  let themeContext = useContext(ThemeContext);
  let resultatContext = useContext(ResultatContext);
  const navigate = useNavigate();

  const [LastRes, setLastRes] = useState(undefined);
  const [isBusy, setBusy] = useState(false);
  const [isLastRetrieved, setIsLastRetrieved] = useState(false);
  const [confirmSave, setConfirmSave] = useState("");

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(
      "Save modif clicked !, current user id : ",
      props.currentUser.id_user
    );

    try {
      resultatContext.updateInDb(props.currentUser.id_user);
      setConfirmSave("Changes Saved");
    } catch (e) {
      setConfirmSave("Error When saving modifications, please try later");
    }
  };

  useEffect(() => {
    async function getLastRes(userId) {
      const refResultat = collection(db, "Resultat/" + userId + "/Resultats");
      const roleSnapshot = await getDocs(refResultat);
      const resultatsList = roleSnapshot.docs.map((doc) => doc.data());
      console.log("List result : ", resultatsList);

      if (resultatsList.lenght !== 0) {
        let sortedList = resultatsList.sort(
          (a, b) =>
            new Date(...a.id.split("-").reverse()) -
            new Date(...b.id.split("-").reverse())
        );
        console.log("Sorted list result : ", sortedList);
        setLastRes(sortedList[sortedList.length - 1]);
      }
    }

    getLastRes(props.currentUser.id_user);
  }, [props.currentUser.id_user]);
  console.log("Last Resultat Found : ", LastRes);

  useEffect(() => {
    if (LastRes !== undefined) {
      console.log("Last Resultat Found : ", LastRes);
      resultatContext.setResultat(LastRes);
      setIsLastRetrieved(true);
      setBusy(false);
    }
  }, [LastRes]);

  const GoToSurvey = () => {
    //Reset the result
    resultatContext.resetResultat();

    //Navigate to page survey
    navigate("/survey");
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: themes[themeContext.theme].background_quiz,
        color: themes[themeContext.theme].foreground,
      }}
    >
      {isBusy ? (
        <BouncingDotsLoader />
      ) : (
        <>
          <h2
            className="center hi"
            style={{
              color: themes[themeContext.theme].textcolor,
              marginBottom: "0px",
            }}
          >
            Salut, re-bonjour{" "}
            {props.currentUser.nom !== ""
              ? props.currentUser.nom
              : props.currentUser.email}
          </h2>
            
          <button
            className="btn"
            onClick={GoToSurvey}
            style={{
              margin: -8,
              backgroundColor: themes[themeContext.theme].button,
              color: themes[themeContext.theme].textcolorbtn,
            }}
          >
            Nouveau questionnaire
          </button>
          {resultatContext.resultat.id_resultats !== "" && (
            <button
              style={{
                marginLeft: "15px",
                width: "200px",
                backgroundColor: themes[themeContext.theme].button,
                color: themes[themeContext.theme].textcolorbtn,
              }}
              className="btn"
              type="submit"
              onClick={handleFormSubmit}
            >
              Sauvegarder
            </button>
          )}
          <br />
          <br />
          <div className="center">
            {/* Show nothing if the result in context is "null" */}
            {resultatContext.resultat.id_resultats === "" ? (
              <div>
                <h4
                  style={{
                    color: themes[themeContext.theme].textcolor,
                  }}
                >
                  {" "}
                  Please complete a survey to see some results
                </h4>
                <img
                  src={survey_pic}
                  alt="survey_pic"
                  style={{ height: "300px" }}
                ></img>
              </div>
            ) : (
              <Resultats
                currentUser={props.currentUser}
                last={isLastRetrieved}
                fromHistoric={false}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
}
