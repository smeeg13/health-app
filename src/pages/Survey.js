import React, { useEffect, useState, useContext } from "react";
import { db } from "../initFirebase";
import { ResultatContext } from "../Context";
import { getDocs, collection, getCountFromServer } from "firebase/firestore";
import { questionConverter } from "../objects/Question";
import { BoxQuestion } from "../components/QuestionForm";
import { BouncingDotsLoader } from "../utils/tools";
import {useNavigate} from "react-router-dom";

/**
 * function to render the box where the question are shown
 * @param  {} props
 */
function Survey(props) {
  const [questions, setQuestions] = useState([]);
  const [isBusy, setBusy] = useState(true)
  const resultatContext = useContext(ResultatContext);
  const [numberOfQues, setNumberOfQues] = useState(0);
  const [index, setIndex] = useState(1);
  const [titles] = useState([]);
  const navigate = useNavigate();

  /* 
    setTimeout to let the time to retrieve the question
  */
  useEffect(() => {
    setTimeout(() => {
      setBusy(false);
    }, 2000);

    async function getQuestionnaireById(index) {
      const refQuestionnaire = collection(
        db,
        "Questionnaires/" + index + "/Questions"
      ).withConverter(questionConverter);

      const roleSnapshot = await getDocs(refQuestionnaire);
      const questionList = roleSnapshot.docs.map((doc) => doc.data());
      setQuestions(questionList);
      /* 
        setBusy is a trigger who help to wait until the promise arrived
        from the async function getQuestionnaireById
        setBusy(false);
      */
    }

    getQuestionnaireById(index);
  }, [index]);

  useEffect(() => {
    async function getNumberOfQuestionnaire() {
      const coll = collection(db, "Questionnaires");
      const snapshot = await getCountFromServer(coll);
      const size = snapshot.data().count;
      
      const snapshotColl = await getDocs(coll);
      const titleList = snapshotColl.docs.map((doc) => doc.data());
      titleList.forEach(element => {
        titles.push(element.name);
      });
      setNumberOfQues(size);
    }
    getNumberOfQuestionnaire()
  }, [])

  useEffect(() => {
    resultatContext.calculateMaladies(resultatContext.resultat);
  }, [resultatContext.resultat]);

  const handleNextQuestionnaire = () => {
    if (index >= numberOfQues)
      setIndex(1);
    else
      setIndex(index + 1);
  }

  const handlePreviousQuestionnaire = () => {
    if (index <= 1)
      setIndex(3);
    else
      setIndex(index - 1);
  }

  const handleFormInputChange = (event) => {
    resultatContext.updateResultatField(event);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    resultatContext.updateInDb(props.currentUser.id_user);
    props.currentUser.nom_role === "Invite" && navigate("/resultats");
    props.currentUser.nom_role === "Patient" && navigate("/");
    console.log("Resultat : ", resultatContext.resetResultat)
  };

console.log("resultat: ", resultatContext.resultat);
  return (
    <div>
      {isBusy ? <BouncingDotsLoader /> :
        <BoxQuestion
          handleFormInputChange={handleFormInputChange}
          handleFormSubmit={handleFormSubmit}
          questions={questions}
          index={index}
          totalQues={numberOfQues}
          isBusy={isBusy}
          titles={titles}
          handlePreviousQuestionnaire={handlePreviousQuestionnaire}
          handleNextQuestionnaire={handleNextQuestionnaire}
        />
      }
    </div>
  )
}

export default Survey;