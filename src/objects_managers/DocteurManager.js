import { db, refDocteur } from "../initFirebase";
import { doc, setDoc, getDoc, getDocs } from "firebase/firestore";
import { docteurConverter } from "../objects/Docteur";
import { SaveOneFieldInDB } from "../utils/tools";
export async function CreateDocDocteur(docteur) {
  await setDoc(doc(refDocteur, docteur.id_user), docteur);
}

export async function GetAllDocteurs() {
  const docteursSnapshot = await getDocs(refDocteur);
  const docteursList = docteursSnapshot.docs.map((doc) => doc.data());
  return docteursList;
}

//Get one user by id
export async function GetDocteurById(Id) {
  const ref = doc(db, "Docteur", Id).withConverter(docteurConverter);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    // Convert to docteur object
    const docteur = docSnap.data();
    return docteur;
  } else {
    return null;
  }
}

export async function NewRequest(docteur, id_user, setMessage, setRemarks) {
  try {
    //Add the id_user into list_request_patient of docteur
    if (docteur.list_request_patient !== undefined) {
      var newArray = docteur.list_request_patient.slice();
      newArray.push(id_user);

      docteur.list_request_patient = newArray;
    } else {
      docteur.list_request_patient = new Array(id_user);
    }

    //Save into db the new state of Docteur's list
    await SaveOneFieldInDB(
      docteur.id_user,
      "list_request_patient",
      docteur.list_request_patient,
      true
    );

    //Add the docteur id into docteur_requested of User
    await SaveOneFieldInDB(
      id_user,
      "docteur_requested",
      docteur.id_user,
      false
    );
    let remarkstrg = "A request has been sent to " + docteur.nom;
    await SaveOneFieldInDB(id_user, "remarks", remarkstrg, false);
    setRemarks(remarkstrg);

    setMessage("Request Sent");
  } catch (e) {
    setMessage("Error, please try again later");
  }
}

export async function DealWithPatientRequest(docteur, id_user, isAccepted) {
  //Remove the user from the request list
  let filteredArray = docteur.list_request_patient.filter(
    (item) => item !== id_user
  );
  docteur.list_request_patient = filteredArray;

  //Save into db the new state of  list_patient
  await SaveOneFieldInDB(
    docteur.id_user,
    "list_request_patient",
    docteur.list_request_patient,
    true
  );

  //Remove Docteur_requested into User
  await SaveOneFieldInDB(id_user, "docteur_requested", "", false);

  if (isAccepted) {
    //Add the user into the list_patient
    var newArray = docteur.list_patient.slice();
    newArray.push(id_user);
    docteur.list_patient = newArray;
    //Save into db the new state of  list_patient
    await SaveOneFieldInDB(
      docteur.id_user,
      "list_patient",
      docteur.list_patient,
      true
    );

    //Add the new Docteur into Docteur_assigned into User
    await SaveOneFieldInDB(id_user, "docteur_assigned", docteur.id_user, false);
    let remarkstrg = "";
    await SaveOneFieldInDB(id_user, "remarks", remarkstrg, false);
  } else {
    let remarkstrg =
      "Demande refusée par " + docteur.nom + ", demandez à un autre docteur";
    await SaveOneFieldInDB(id_user, "remarks", remarkstrg, false);
  }
}
