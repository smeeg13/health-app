import "./App.css";

import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login, { CheckRole } from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Layout from "./pages/Layout";
import Survey from "./pages/Survey";
import Registration from "./pages/Registration";
import { ThemeContext, themes } from "./ThemeContext";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./initFirebase";
import { useContext, useEffect, useState } from "react";
import Logout from "./pages/Logout";
import { GetUserById } from "./objects_managers/UserManager";
import { User } from "./objects/User";
import Settings from "./pages/Settings";

export default function App() {
  /* Base Invite User */
  const guestUser = new User(null,'','',0,0,0,0);
  guestUser.setNomRole('Invite');
  guestUser.setIdRole('wfprGThk63ZrRRjRh1np');  

  let themeContext = useContext(ThemeContext);
  /* Current user state */
  const [currentAuthUser, setCurrentAuthUser] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(guestUser);

  /* Watch for authentication state changes */
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentAuthUser(user);
      if (user != null) {
        const myUser = await GetUserById(user.uid);
        myUser.setNomRole(await CheckRole(myUser));
        setCurrentUser(myUser);
      } else {
        setCurrentUser(guestUser);
      }
    });
    // Unsubscribe from changes when App is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  console.log("User Connected : ", currentUser);

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
      <header>
        <Navbar currentUser={currentUser} />
      </header>
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/layout" element={<Layout />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        {/* <Route path="/settings" element={<Settings currentUser={currentUser}/>} /> */}
        {/* <Route path="/survey" element={<Survey />} /> */}
        {/* <Route path="/results" element={<Results />} /> */}
        <Route path="/registration" element={<Registration />} />
        {/* <Route path="/settings" element={<Settings/>}/> */}
        <Route path="/survey1" element={<Survey quesId="1"/>} />
        <Route path="/survey2" element={<Survey quesId="2"/>} />
        <Route path="/survey3" element={<Survey quesId="3"/>} />
      </Routes>
    </div>
  );
}
