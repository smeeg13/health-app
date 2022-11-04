import React from "react";
import "@fontsource/lexend-deca";
import HomeGuest from "./homeComponents/HomeGuest";
import HomeUser from "./homeComponents/HomeUser";
import HomeAdmin from "./homeComponents/HomeAdmin";
import HomeDocteur from "./homeComponents/HomeDocteur";

export default function Home(props) {
  return (
    <React.Fragment>
      <div className="container">
        {props.currentUser.nom_role === "Invite" && <HomeGuest />}
        {props.currentUser.nom_role === "Patient" && (
          <HomeUser currentUser={props.currentUser} />
        )}
        {props.currentUser.nom_role === "Admin" && <HomeAdmin />}
        {props.currentUser.nom_role === "Docteur" && (
          <HomeDocteur currentUser={props.currentUser} />
        )}
      </div>
    </React.Fragment>
  );
}



