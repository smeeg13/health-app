import React, { useEffect, useState, useContext } from "react";
import { db } from "../initFirebase";
import { ResultatContext } from "../Context";
import { getDocs, collection } from "firebase/firestore";
import { questionConverter } from "../objects/Question";
import QuestionForm, { QuestionList, Loader } from "../components/QuestionForm";

function Survey(props) {

  const [questions, setQuestions] = useState([]);
  const [isBusy, setBusy] = useState(true)

  useEffect(() => {

    async function getQuestionnaireById() {

      const refQuestionnaire = collection(db, "Questionnaires/" + props.quesId + "/Questions").withConverter(questionConverter);

      const roleSnapshot = await getDocs(refQuestionnaire);

      const questionList = roleSnapshot.docs.map((doc) => doc.data());
      setQuestions(questionList);
      setBusy(false);
    }
    
    getQuestionnaireById(props.quesId);

  }, []);

  return (
    <>
      <h1>hi</h1>
      <div className="container center">
        <div className="container quiz">
          <h2 className="survey_title">[Survey name]</h2>
          <div> {isBusy ? <Loader /> : <QuestionList ques={questions}/>}
          </div>
        </div>
      </div>
    </>
  );
}

export default Survey;

// function Survey() {
//   return (
//     <>
//       <div className="container">
//         <div className="container_quiz">
//           <h2 className="survey_title">[Survey name]</h2>
//           <div className="container_left">
//             <h3 className="question">Question side</h3>
//             <h3 className="question">Question side</h3>
//             <h3 className="question">Question side</h3>
//             <h3 className="question">Question side</h3>
//             <h3 className="question">Question side</h3>
//             <h3 className="question">Question side</h3>
//             <h3 className="question">Question side</h3>
//             <h3 className="question">Question side</h3>
//             <h3 className="question">Question side</h3>
//             <h3 className="question">Avez-vous déjà fait un infarctus?</h3>
//           </div>
//           <div className="container_right">
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Male"
//               name="gender"
//             />{" "}
//             Male
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Female"
//               name="gender"
//             />{" "}
//             Female
//             <br></br>
//             <input
//               className="nb_input"
//               type="text"
//               maxLength={3}
//               // value={email}
//               // onChange={handleEmailChange}
//               required
//             />
//             <br></br>
//             <input
//               className="nb_input"
//               type="text"
//               maxLength={3}
//               // value={email}
//               // onChange={handleEmailChange}
//               required
//             />
//             <br></br>
//             <input
//               className="nb_input"
//               type="text"
//               maxLength={3}
//               // value={email}
//               // onChange={handleEmailChange}
//               required
//             />
//             <br></br>
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Male"
//               name="gender"
//             />{" "}
//             Yes
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Female"
//               name="gender"
//             />{" "}
//             No
//             <br></br>
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Male"
//               name="gender"
//             />{" "}
//             Yes
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Female"
//               name="gender"
//             />{" "}
//             No
//             <br></br>
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Male"
//               name="gender"
//             />{" "}
//             Yes
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Female"
//               name="gender"
//             />{" "}
//             No
//             <br></br>
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Male"
//               name="gender"
//             />{" "}
//             Yes
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Female"
//               name="gender"
//             />{" "}
//             No
//             <br></br>
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Male"
//               name="gender"
//             />{" "}
//             Yes
//             <input
//               className="radio_btn"
//               type="radio"
//               value="Female"
//               name="gender"
//             />{" "}
//             No
//             <br></br>
//             <Link>
//               <button className="next_btn"></button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
// export default Survey;


