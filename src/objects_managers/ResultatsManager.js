import { db } from "../initFirebase";
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  where,
} from "firebase/firestore";
import { resultatsConverter, Resultats } from "../objects/Resultats";
import { async } from "@firebase/util";

export async function CreateDocResultats(id_user, resultat) {
  const refDoc = doc(
    db,
    "Resultat",
    id_user,
    "Resultats",
    resultat.id_resultats
  ).withConverter(resultatsConverter);

  // Add a new document with today's date as the id
  await setDoc(refDoc, resultat);
  console.log("Auth User ID: ", id_user);
  console.log("Document Resultat written with ID: ", resultat.id_resultats);
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
  let resList = await GetAllResultatsByUser(id_user);
  var diffdate = new Date();

  resList = resList.sort(function (a, b) {
    var distancea = Math.abs(diffdate - a.id_resultats);
    var distanceb = Math.abs(diffdate - b.id_resultats);
    return distancea - distanceb; // sort a before b when the distance is smaller
  });
  console.log("resultat list sorted : ", resList);

  var beforedates = resList.filter(function (d) {
    return d - diffdate < 0;
  });

  console.log("resultat list filtered : ", beforedates);
  return beforedates.findIndex(0);
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
