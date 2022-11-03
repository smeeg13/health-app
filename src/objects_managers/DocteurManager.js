import { db, auth, refDocteur } from "../initFirebase";
import { doc, setDoc, getDoc,getDocs, updateDoc } from "firebase/firestore";
import { docteurConverter } from "../objects/Docteur";

export async function CreateDocDocteur(docteur) {
  const docRef = await setDoc(doc(refDocteur, docteur.id_user), docteur);
  console.log("Auth User ID: ", auth.currentUser.uid);
  console.log("Docteur ID: ", docteur.id_user);

  console.log("Document Docteur written with ID: ", docRef.uid);
}

export async function GetAllDocteurs() {
  const docteursSnapshot = await getDocs(refDocteur);
  const docteursList = docteursSnapshot.docs.map((doc) => doc.data());
  return docteursList;
}

//Get one user by id
export async function GetDocteurById(Id) {
  console.log("Docteur Id into function : ", Id);

  const ref = doc(db, "Docteur", Id).withConverter(docteurConverter);
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    // Convert to docteur object
    const docteur = docSnap.data();
    return docteur;
  } else {
    console.log("No such document!");
    return null;
  }
}

async function SaveOneFieldInDB(id_user,fieldNameToChange, newValue, saveInDocteur) {
  let Ref;
  if (saveInDocteur) {
    Ref = doc(db, "Docteur", id_user);
  } else {
    Ref = doc(db, "User", id_user);
  }

  // Set the "fieldNameToChange" field of the city 'DC'
  await updateDoc(Ref, {
    [fieldNameToChange]: newValue,
  });
}

export async function NewRequest(docteur, id_user, setMessage) {
  try{
 //Add the id_user into list_request_patient of docteur
  if(docteur.list_request_patient !== undefined){
    var newArray = docteur.list_request_patient.slice();    
  newArray.push(id_user);   

  docteur.list_request_patient = newArray;
  console.log("New list_request_patient : ", docteur.list_request_patient)

  }else{
    docteur.list_request_patient = new Array(id_user);
  }
  
  //Save into db the new state of Docteur's list
    await SaveOneFieldInDB(docteur.id_user, "list_request_patient", docteur.list_request_patient, true)

  //Add the docteur id into docteur_requested of User
    await SaveOneFieldInDB(id_user, "docteur_requested", docteur.id_user, false)
    setMessage("Request Sent")
  }catch(e){
    setMessage("Error when sending request, please try later")
  }
 }

export async function DealWithPatientRequest(docteur, id_user, isAccepted) {
  //Remove the user from the request list
    let filteredArray = docteur.list_request_patient.filter((item) => item !== id_user  );
    docteur.list_request_patient = filteredArray;
    console.log("New list_request_patient : ", docteur.list_request_patient)
    
  //Save into db the new state of  list_patient
     await SaveOneFieldInDB(docteur.id_user, "list_request_patient", docteur.list_request_patient, true)

  //Remove Docteur_requested into User
    await SaveOneFieldInDB(id_user, "docteur_requested", '', false)
    //TODO:: Add into remarks field that the docteur xxx requested couldn't take care of you

  if (isAccepted) {
    //Add the user into the list_patient
    var newArray = docteur.list_patient.slice();    
    newArray.push(id_user);   

    docteur.list_patient = newArray;
    console.log("New list_patient : ", docteur.list_patient)


    //Save into db the new state of  list_patient
      await SaveOneFieldInDB(docteur.id_user, "list_patient", docteur.list_patient, true)

    //Add the new Docteur into Docteur_assigned into User
      await SaveOneFieldInDB(id_user, "docteur_assigned", docteur.id_user, false)
  }
}

