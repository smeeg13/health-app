import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import RegisterDocteur from "./pages/RegisterDocteur";
import Login, { CheckRole } from "./pages/Login";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import Survey from "./pages/Survey";
import Account from "./pages/Account";
import Resultats from "./pages/Resultats";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./initFirebase";
import Logout from "./pages/Logout";
import { GetUserById } from "./objects_managers/UserManager";
import { GetDocteurById } from "./objects_managers/DocteurManager";
import { User } from "./objects/User";
import Settings from "./pages/Settings";
import Historic from "./pages/Historic";

export default function App() {
  /* Base Invite User */
  const guestUser = new User(null, "", "", 0, null,null,null, "", "");
  guestUser.setNomRole("Invite");
  guestUser.setIdRole("wfprGThk63ZrRRjRh1np");

  /* Current user state */
  const [currentAuthUser, setCurrentAuthUser] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(guestUser);

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
  console.log("User Connected : ", currentUser);

  if (currentAuthUser === undefined) {
    return (
      <div className="App">
        <header className="App-header"></header>
        <body>
          <div className="center">
            {" "}
          <h1 className="center">Loading...</h1>
          </div>
          
        </body>
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
        <Route path="/resultats" element={<Resultats currentUser={currentUser} />}/>
        <Route path="/account" element={<Account currentUser={currentUser} setUser={setCurrentUser} />}/>
        <Route path="/survey1" element={<Survey quesId="1" currentUser={currentUser} />}/>
        <Route path="/survey2" element={<Survey quesId="2" currentUser={currentUser} />}/>
        <Route path="/survey3" element={<Survey quesId="3" currentUser={currentUser} />}/>
        <Route path="/historic" element={<Historic currentUser={currentUser} />} />
      </Routes>
    </div>
  );
}
