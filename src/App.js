import "./App.css";

import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login, { CheckRole } from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Layout from "./pages/Layout";
import Survey from "./pages/Survey";
import Registration from "./pages/Registration";
import Results from "./pages/Results";
import { ThemeContext, themes } from "./ThemeContext";
import { NavbarNotLogged } from "./pages/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./initFirebase";
import { useContext, useEffect, useState } from "react";
import Logout from "./pages/Logout";
import { GetUserById } from "./objects_managers/UserManager";
import { User } from "./objects/User";
import {GetQuestionnaireById} from "./objects_managers/QuestionnaireManager";

export default function App() {
  /* Current user state */
  const [currentAuthUser, setCurrentAuthUser] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [questionnaire1, setQuestionnaire1] = useState([]);
  const [questionnaire2, setQuestionnaire2] = useState([]);
  const [questionnaire3, setQuestionnaire3] = useState([]);
  let themeContext = useContext(ThemeContext);
  /* Watch for authentication state changes */


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentAuthUser(user);
      if (user != null) {
        const myUser = await GetUserById(user.uid);
        myUser.setNomRole(await CheckRole(myUser));
        setCurrentUser(myUser);
      } else {
        setCurrentUser(null);
      }
      console.log("User Connected : ", currentUser);
    });
    // Unsubscribe from changes when App is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(function effectFunction() {
    async function fetchQuestionnaire1() {
        const questionnaire = await GetQuestionnaireById(1);
        setQuestionnaire1(questionnaire);
    }
    fetchQuestionnaire1();
}, []);



  if (currentAuthUser === undefined) {
    return (
      <div className="App">
        <header
          className="App-header"
          style={{
            backgroundColor: themes[themeContext.theme].background,
            color: themes[themeContext.theme].foreground,
          }}
        >
          <h1>Loading...</h1>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header>{!currentAuthUser ? <NavbarNotLogged /> : <Navbar />}</header>
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/results" element={<Results />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </div>
  );
}
