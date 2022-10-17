import { db } from "../initFirebase";
import { doc, getDoc } from "firebase/firestore";
import { refQuestionnaire } from "../initFirebase";


//Get one user by id
export async function GetQuestionnaireById(quesId) {
    const ref = doc(db, "Questionnaires", quesId);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
      // Convert to User object
      const user = docSnap.data();
      // Use a User instance method
      console.log(user.toString());
      return user;
    } else {
      console.log("No such document!");
      return null;
    }
  }

  // console.log(GetQuestionnaireById(1))


//Get all three questionnaires
// export async function getQuestionnaires() {
//     const ref = doc(db, "Questionnaires", quesId);
//     const docSnap = await getDoc(ref);
//     if (docSnap.exists()) {
//       // Convert to User object
//       const user = docSnap.data();
//       // Use a User instance method
//       console.log(user.toString());
//       return user;
//     } else {
//       console.log("No such document!");
//       return null;
//     }
//   }
