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

  const handleFormInputChangeQues = (event) => {
    resultatContext.updateResultatField(event, resultatContext.resultat);
    console.log("Survey",resultatContext.resultat);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="box1">
      {/* Box for data questionnaire 1-2  */}
      <div className="container result1" >
        {/* <TitleBox title="Vous" my_avatar={props.currentUser.avatar} /> */}
        {isBusy ? <Loader /> : 
        <BoxQuestion
          resultat={resultatContext.resultat}
          handleFormInputChangeQues={handleFormInputChangeQues}
          handleFormSubmit={handleSubmit}
          questions={questions}
          isBusy={isBusy}
        />
        }
      </div>
  </div>
  )
}

export default Survey;