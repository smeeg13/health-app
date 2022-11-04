import { db } from "../initFirebase";
import {
  Timestamp,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { refUser } from "../initFirebase";

export async function CreateDocUser(user) {
  //By default : the constructor put the patient id as the id_role
  // Add a new document with the id of the auth user created.
  await setDoc(doc(refUser, user.id_user), user);
}

export async function CreateDocUserInResultat(user) {
  await setDoc(doc(db, "Resultat", user.id_user), {
    CreatedDate: Timestamp.fromDate(new Date()),
  });
}

export async function UpdateUserSexe(id_user, sexe) {
  const userRef = doc(db, "User", id_user);
await updateDoc(userRef, {
  sexe: sexe
});
}

//Get data once
//Get all users
export async function GetUsers() {
  const userSnapshot = await getDocs(refUser);
  const userList = userSnapshot.docs.map((doc) => doc.data());
  return userList;
}

//Get one user by id
export async function GetUserById(userId) {
  const ref = doc(refUser, userId);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const user = docSnap.data();
    return user;
  } else {
    console.log("No such User document!");
    return null;
  }
}

//Get one user by id
export async function GetUserByEmail(userEmail) {
  const q = query(refUser, where("email", "==", userEmail));
  let user;
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    user = doc.data();
  });
  if (user === null) {
    console.log("No such User document!");
    return null;
  }
  return user;
}

