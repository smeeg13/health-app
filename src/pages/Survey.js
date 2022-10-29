import React, { useEffect, useState, useContext } from "react";
import { db } from "../initFirebase";
import { ResultatContext } from "../Context";
import { getDocs, collection } from "firebase/firestore";
import { questionConverter } from "../objects/Question";
import { BoxQuestion, Loader } from "../components/QuestionForm";

function Survey(props) {
  const [questions, setQuestions] = useState([]);
  const [isBusy, setBusy] = useState(true)
  const resultatContext = useContext(ResultatContext);


  useEffect(() => {
    async function getQuestionnaireById(quesId) {
      const refQuestionnaire = collection(
        db,
        "Questionnaires/" + quesId + "/Questions"
      ).withConverter(questionConverter);

      const roleSnapshot = await getDocs(refQuestionnaire);

      const questionList = roleSnapshot.docs.map((doc) => doc.data());
      setQuestions(questionList);
      setBusy(false);
    }
    
    getQuestionnaireById(props.quesId);
  }, []);

  useEffect(() => {
    resultatContext.calculateMaladies(resultatContext.resultat);
  }, [resultatContext.resultat]);

  const handleFormInputChange = (event) => {
    resultatContext.updateResultatField(event);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log("Save modif clicked !, current user id : ", props.currentUser.id_user)
    resultatContext.updateInDb(props.currentUser.id_user);
  };

  return (
    <div className="box1">
      {/* Box for data questionnaire 1-2  */}
        {/* <TitleBox title="Vous" my_avatar={props.currentUser.avatar} /> */}
        {isBusy ? <Loader /> : 
        <BoxQuestion
          resultat={resultatContext.resultat}
          handleFormInputChange={handleFormInputChange}
          handleFormSubmit={handleFormSubmit}
          questions={questions}
          isBusy={isBusy}
        />
        }
  </div>
  )
}

export default Survey;