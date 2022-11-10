import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import RegisterDocteur from "./pages/RegisterDocteur";
import Login, { CheckRole } from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Survey from "./pages/Survey";
import Resultats from "./pages/Resultats";
import { useEffect, useState, useContext } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./initFirebase";
import Logout from "./pages/Logout";
import { GetUserById } from "./objects_managers/UserManager";
import { GetDocteurById } from "./objects_managers/DocteurManager";
import { User } from "./objects/User";
import Settings from "./pages/Settings";
import Historic from "./pages/Historic";
import Account from "./pages/Account";
import NotFound from "./utils/NotFound";
import { ResultatContext } from "./Context";


import { db } from "./initFirebase";
import { getDocs, collection, getCountFromServer } from "firebase/firestore";
import { variableConverter } from "./objects/Variables";

export default function App() {
  /* Base Invite User */
  const guestUser = new User(null, "", "", 0, null, null, "/img/avatar1.png", "", "", "");
  guestUser.setNomRole("Invite");
  guestUser.setIdRole("wfprGThk63ZrRRjRh1np");

  /* Current user state */
  const [currentAuthUser, setCurrentAuthUser] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(guestUser);
  const [variables, setVariables] = useState([]);
  const [isBusy, setBusy] = useState(true)
  const resultatContext = useContext(ResultatContext);



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentAuthUser(user);
      if (user != null) {
        let myUser;
        myUser = await GetUserById(user.uid);
        if (myUser === null || myUser === undefined) {
          myUser = await GetDocteurById(user.uid);
        }
        myUser.setNomRole(await CheckRole(myUser));
        setCurrentUser(myUser);
      } else {
        setCurrentUser(guestUser);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function getVariables() {
      const refQuestionnaire = collection(
        db,
        "Variables/"
      ).withConverter(variableConverter);

      const roleSnapshot = await getDocs(refQuestionnaire);
      const variablesList = roleSnapshot.docs.map((doc) => doc.data());
      setVariables(variablesList);
      setBusy(false);
    }

    getVariables();
  }, []);

  useEffect(() => {
    if (variables.length > 0)
      resultatContext.calculateMaladies(resultatContext.resultat, variables);

  }, [resultatContext.resultat, variables]);

  if (currentAuthUser === undefined) {
    return (
      <div className="App">
        <header className="App-header"></header>
        <div className="center">
          {" "}
          <h1 className="center">Loading...</h1>
        </div>

      </div>
    );
  }

  return (
    <div className="container">
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/registerDocteur" element={<RegisterDocteur />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/settings" element={<Settings currentUser={currentUser} />} />
        <Route path="/resultats" element={<Resultats currentUser={currentUser} />} />
        <Route path="/account" element={<Account currentUser={currentUser} setUser={setCurrentUser} />} />
        <Route path="/survey" element={<Survey currentUser={currentUser} />} />
        <Route path="/historic" element={<Historic currentUser={currentUser} />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  );
}
