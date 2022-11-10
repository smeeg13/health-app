import "../App.css";
import { db } from "../initFirebase";
import React, { useContext, useState, useEffect } from "react";
import { ResultatContext, ThemeContext, themes } from "../Context";
import { getDocs, collection } from "firebase/firestore";
import { questionConverter } from "../objects/Question";
import BoxRes1 from "../components/BoxRes1";
import BoxRes2 from "../components/BoxRes2";
import BoxResultat from "../components/BoxResultat";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function Resultats(props) {
  let resultatContext = useContext(ResultatContext);
  let themeContext = useContext(ThemeContext);
  let [questions, setQuestions] = useState([]);
  const [isBusy, setBusy] = useState(true);
  const [confirmSave, setConfirmSave] = useState("");

  useEffect(() => {
    async function getQuestionnaireById(quesId) {
      const refQuestionnaire = collection(
        db,
        "Questionnaires/" + quesId + "/Questions"
      ).withConverter(questionConverter);
      const roleSnapshot = await getDocs(refQuestionnaire);
      const questionList = roleSnapshot.docs.map((doc) => doc.data());
      return questionList;
    }

    async function fetchAllQuestionaires() {
      let questions1 = await getQuestionnaireById(1);
      let questions2 = await getQuestionnaireById(2);
      let questions3 = await getQuestionnaireById(3);

      setQuestions((prevQuestions) => [
        ...prevQuestions,
        ...questions1,
        ...questions2,
        ...questions3,
      ]);
      setBusy(false);
    }

    fetchAllQuestionaires();
  }, []);

  useEffect(() => {
    resultatContext.calculateMaladies(resultatContext.resultat);
  }, [resultatContext.resultat]);

  useEffect(() => {
    setTimeout(() => {
      setConfirmSave("");
    }, 4000);
  }, [confirmSave]);

  const handleFormInputChange = (event) => {
    resultatContext.updateResultatField(event, resultatContext.resultat);
  };

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
  return (
    <>
      {props.last && (
        <h3 style={{ marginTop: "1px", color: themes[themeContext.theme].textcolor }}>Your lasts responses of {resultatContext.resultat.id_resultats}</h3>
      )}
      {props.fromHistoric && (
        <div>
          <Button
            startIcon={<ArrowBackIcon />}
            name="BackToList"
            type="submit"
            className="btn"
            style={{
              marginTop: "15px",
              backgroundColor: themes[themeContext.theme].button,
              color: themes[themeContext.theme].textcolorbtn,
            }}
            onClick={props.closeDetails}
          >
            Close details
          </Button>{" "}
          <br />
          <h3 style={{ color: themes[themeContext.theme].textcolor }}>Responses of the {resultatContext.resultat.id_resultats}</h3>
        </div>
      )}
      <div className="wrapper" style={{ color: themes[themeContext.theme].textcolor }} >
        <div className="box1" style={{ margin: -10 }}>
          {/* Box for data questionnaire 1-2  */}
          <div className="container result1" style={{
            backgroundColor: themes[themeContext.theme].background_quiz,
            color: themes[themeContext.theme].foreground,
          }}>
            <TitleBox
              title="Your situation"
              my_avatar={props.currentUser.avatar}
            />
            <BoxRes1
              handleFormInputChange={handleFormInputChange}
              handleFormSubmit={handleFormSubmit}
              questions={questions}
              isBusy={isBusy}
            />
          </div>
          {/* Box for data questionnaire 3 */}
          <div className="container result2" style={{
            backgroundColor: themes[themeContext.theme].background_quiz,
            color: themes[themeContext.theme].foreground,
          }}>
            <TitleBox
              title="Your rhythm "
              my_avatar={props.currentUser.avatar}
            />
            <BoxRes2
              handleFormInputChange={handleFormInputChange}
              handleFormSubmit={handleFormSubmit}
              questions={questions}
              isBusy={isBusy}
            />
          </div>
          {/* Box for Resultat  */}
          <div className="container result3" style={{
            backgroundColor: themes[themeContext.theme].background_quiz,
            color: themes[themeContext.theme].foreground,
          }}>

            <BoxResultat maladies={resultatContext.maladies} resultat={resultatContext.resultat} currentUser={props.currentUser} />
          </div>
        </div>


        {props.fromHistoric === false &&
          <div className="box2">
            {/* Button for saving into db changes */}
            {confirmSave === "Changes Saved" ? (
              <span style={{ color: "#00A36C", marginRight: 40 }}>
                {confirmSave}
              </span>
            ) : (
              <span style={{ color: "#FF2400", marginRight: 40 }}>
                {confirmSave}
              </span>
            )}
          </div>}

      </div>
    </>
  );
}

function TitleBox(props) {

  return (
    <div className="results_upper">
      <h2 className="survey_title">{props.title}</h2>
      <div>
        {/* //TODO :: Put the avatar of the current user or a default according to sexe */}
        <img className="my_avatar" src={props.my_avatar} alt="AvatarUser" />
      </div>
    </div>
  );
}


