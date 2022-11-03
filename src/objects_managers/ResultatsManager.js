import { db } from "../initFirebase";
import {Timestamp,collection,doc,setDoc,getDoc,getDocs,updateDoc,} from "firebase/firestore";
import {resultatsConverter } from "../objects/Resultats";


export async function CreateDocGuestInResultat() {
  // Add a new document with a generated id
  const refDoc = doc(collection(db, "Resultat"));

  await setDoc(refDoc, {
    CreatedDate: Timestamp.fromDate(new Date()),
  });

  console.log("New Doc For Guest in Resultat : ", refDoc.id);
  return refDoc.id;
}

export async function CreateDocResultats(id_doc,dataFinal) {
  let refDoc = doc(
    db,
    "Resultat",
    id_doc,
    "Resultats",
    dataFinal.id.toString() //doesnt appear the date
  );

  // Add a new document with today's date as the id
  await setDoc(refDoc, dataFinal);
  console.log("Doc in Resultat : ", id_doc);
  console.log("Document in Resultats written with ID: ", dataFinal.id);
}



//Get all resultats of one user
export async function GetAllResultatsByUser(id_user) {
  let refCollection = collection(
    db,
    "Resultat",
    id_user,
    "Resultats"
  ).withConverter(resultatsConverter);

  const resultatsSnapshot = await getDocs(refCollection);
  const resList = resultatsSnapshot.docs.map((doc) => doc.data());
  return resList;
}

//Get one resultat of one user on a precise date
export async function GetResultatsByDate(id_user, id_resultats) {
  let refCollection = db
    .collection("Resultat")
    .doc(id_user)
    .collection("Resultats")
    .withConverter(resultatsConverter);

  const ref = doc(db, refCollection, id_resultats).withConverter(
    resultatsConverter
  );
  const docSnap = await getDoc(ref);
  if (docSnap.exists()) {
    // Convert to Resultat object
    const resultat = docSnap.data();
    // Use a Resultat instance method
    console.log(resultat.toString());
    return resultat;
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function GetLastResultats(id_user) {
  let resList =  [];
  resList = await GetAllResultatsByUser(id_user);
  console.log("List result : ",resList )
  if(resList !== []){
    let sortedList = resList.sort((a, b) => new Date(...a.id_resultats.split('-').reverse()) - new Date(...b.id_resultats.split('-').reverse()));
  console.log("Sorted list result : ",sortedList )

  let lastRes = sortedList.find(sortedList.length-1);
  console.log("Last result : ",lastRes )
  return lastRes;
  }
  else{
return null;
  }

  
  
}

//Update one specific Resultats Document
export async function UpdateResultatsData(id_user, res) {
  let refCollection = db
    .collection("Resultat")
    .doc(id_user)
    .collection("Resultats")
    .doc(res.id_resultats)
    .withConverter(resultatsConverter);

  const ref = doc(refCollection, res.id_resultats);
  await updateDoc(ref, ...res);
}
//console.log(UpdateResultatData(new Resultats(12,13,14,15)));
