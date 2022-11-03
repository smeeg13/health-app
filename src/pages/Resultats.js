import "../App.css";
import { db } from "../initFirebase";
import React, { useContext, useState, useEffect } from "react";
import { ResultatContext } from "../Context";
import { getDocs, collection } from "firebase/firestore";
import { questionConverter } from "../objects/Question";
import { FormInput } from "../components/FormInput";
import Account from "../pages/Account";
import BoxRes1 from "../components/BoxRes1";
import BoxRes2 from "../components/BoxRes2";
import BoxResultat from "../components/BoxResultat";

export default function Resultats(props) {
  let resultatContext = useContext(ResultatContext);

  let [resultatToDisplay, setResultatToDisplay] = useState(undefined);
  let [questions, setQuestions] = useState([]);
  const [isBusy, setBusy] = useState(true);
  

  {props.currentUser.avatar === "avatarIcon" && <Account />}

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

  const handleFormInputChange = (event) => {
    resultatContext.updateResultatField(event, resultatContext.resultat);
    
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(
      "Save modif clicked !, current user id : ",
      props.currentUser.id_user
    );
    resultatContext.updateInDb(props.currentUser.id_user);
  };
  return (
    <div className="wrapper">
      <div className="box1">
        {/* Box for data questionnaire 1-2  */}
        <div className="container result1">
          <TitleBox title="Votre Situation" my_avatar={props.currentUser.avatar}/>
          <BoxRes1
            handleFormInputChange={handleFormInputChange}
            handleFormSubmit={handleFormSubmit}
            questions={questions}
            isBusy={isBusy}
          />
        </div>
        {/* Box for data questionnaire 3 */}
        <div className="container result2">
          <TitleBox
            title="Votre Rythme "
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
        <div className="container result3">
          <TitleBox title="Vos Risques" my_avatar={props.currentUser.avatar} />
          <BoxResultat maladies={resultatContext.maladies} />
        </div>
      </div>

      <br />

      <div className="box2">
        {/* Button for saving into db changes */}
        <button className="btn" type="submit" onClick={handleFormSubmit}>
          Save Modifications
        </button>
      </div>
    </div>
  );
}

function TitleBox(props) {
  return (
    <div>
      <h2>{props.title}</h2>
      <div>
        {/* //TODO :: Put the avatar of the current user or a default according to sexe */}
        <img className="my_avatar" src={props.my_avatar} alt="AvatarUser" />
      </div>
    </div>
  );
}


export function getObjKey(obj, value) {
  return Object.keys(obj).find(key => obj[key] === value);
}