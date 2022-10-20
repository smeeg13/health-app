import "./App.css";

import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login, { CheckRole } from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Survey from "./pages/Survey";
import Account from "./pages/Account";
import Results from "./pages/Results";
import { createContext, useContext, useEffect, useState } from "react";
import { ThemeContext, ResultatContext } from "./Context";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./initFirebase";
import Logout from "./pages/Logout";
import { GetUserById } from "./objects_managers/UserManager";
import { User } from "./objects/User";
import Settings from "./pages/Settings";


// export const ThemeContext = createContext(null);

export default function App() {
  /* Base Invite User */
  const guestUser = new User(null,'','',0,0,0,0);
  guestUser.setNomRole('Invite');
  guestUser.setIdRole('wfprGThk63ZrRRjRh1np');  

  let themeContext = useContext(ThemeContext);


  /* Current user state */
  const [currentAuthUser, setCurrentAuthUser] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(guestUser);

  // let themeContext = useContext(ThemeContext);
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
          // style={{
          //   backgroundColor: themes[themeContext.theme].background,
          //   color: themes[themeContext.theme].foreground,
          // }}
        >
          <h1>Loading...</h1>
        </header>
      </div>
    );
  }

  return (

    
    <div className="container">
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route path="/" element={<Home currentUser={currentUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/settings" element={<Settings currentUser={currentUser}/>} />
        {/* <Route path="/survey" element={<Survey/>} /> */}
        {/* <Route path="/results" element={<Results />} /> */}
        <Route path="/account" element={<Account />} />
        <Route path="/survey1" element={<Survey quesId="1" />} />
        <Route path="/survey2" element={<Survey quesId="2"/>} />
        <Route path="/survey3" element={<Survey quesId="3"/>} />
      </Routes>
    </div>
  );
}
