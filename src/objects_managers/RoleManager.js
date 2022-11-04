import { db } from "../initFirebase";
import {
  doc,
  getDoc,
} from "firebase/firestore";
import { roleConverter } from "../objects/Role";



//Get one user by id
export async function getRoleById(roleId) {
  const ref = doc(db, "Roles", roleId.toString()).withConverter(roleConverter);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    const role = docSnap.data();
    return role;
  } else {
    console.log("No such role document!");
    return null;
  }
}
