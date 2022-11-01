import React, { useEffect, useState, useContext } from "react";
import { db } from "../initFirebase";
import { ResultatContext } from "../Context";
import { getDocs, collection, getCountFromServer } from "firebase/firestore";
import { questionConverter } from "../objects/Question";
import { BoxQuestion, Loader } from "../components/QuestionForm";
import { BouncingDotsLoader } from "../utils/tools";

function Survey(props) {
  const [questions, setQuestions] = useState([]);
  const [isBusy, setBusy] = useState(true)
  const resultatContext = useContext(ResultatContext);
  const [numberOfQues, setNumberOfQues] = useState(0);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    setTimeout(() => {
      setBusy(false);
      console.log('isBusy',isBusy)
    }, 2000);

    async function getQuestionnaireById(index) {
      const refQuestionnaire = collection(
        db,
        "Questionnaires/" + index + "/Questions"
      ).withConverter(questionConverter);

      const roleSnapshot = await getDocs(refQuestionnaire);

      const questionList = roleSnapshot.docs.map((doc) => doc.data());
      setQuestions(questionList);
      // setBusy(false);
    }

    getQuestionnaireById(index);
  }, [index]);

  useEffect(() => {
    async function getNumberOfQuestionnaire() {
      const coll = collection(db, "Questionnaires");
      const snapshot = await getCountFromServer(coll);
      const size = snapshot.data().count;
      setNumberOfQues(size);
    }
    getNumberOfQuestionnaire()
  },[])

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
      setIndex(index -1);
  }

  const handleFormInputChange = (event) => {
    resultatContext.updateResultatField(event);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Save modif clicked !, current user id : ", props.currentUser.id_user)
    resultatContext.updateInDb(props.currentUser.id_user);
  };

  return (
    <div className="containerSurvey">
      {/* Box for data questionnaire 1-2  */}
      {/* <TitleBox title="Vous" my_avatar={props.currentUser.avatar} /> */}
      {isBusy ? <BouncingDotsLoader /> :
        <BoxQuestion
          resultat={resultatContext.resultat}
          handleFormInputChange={handleFormInputChange}
          handleFormSubmit={handleFormSubmit}
          questions={questions}
          index={index}
          numberOfQues={numberOfQues}
          isBusy={isBusy}
        />
      }
      <button className="btn_previous" onClick={handlePreviousQuestionnaire}>
        back
      </button>
      <button className="btn_next" onClick={handleNextQuestionnaire}>
        next
      </button>
    </div>
  )
}

export default Survey;