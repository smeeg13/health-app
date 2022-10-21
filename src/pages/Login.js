import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, getAuthCurrentUserId } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import "@fontsource/lexend-deca";
import { getRoleById } from "../objects_managers/RoleManager";
import { getDocteurById } from "../objects_managers/DocteurManager";
import { GetUserById } from "../objects_managers/UserManager";
import LoginForm from "../components/LoginForm";
import login from "./img/login2.png";
import { ThemeContext, themes } from "../Context";
import { useContext } from "react";

export default function Login() {
  const navigate = useNavigate();
  let themeContext = useContext(ThemeContext);

  const handleLogin = async (e, email, password) => {
    //e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      let roleOfUser = await CheckRole(null);
      console.log("Role of the User Returned :  ", roleOfUser);

      if (roleOfUser === "Admin") {
        console.log("Nav to Admin Portal");
        //navigate("/admin");
      }

      if (roleOfUser === "Docteur") {
        console.log("Nav to Docteur Portal");
        // navigate("/registration");
      }
      if (roleOfUser === "Patient") {
        console.log("Nav to Patient Portal (Home)");
        return navigate("/");
      } else {
        console.log("Nav to Invite Portal");
        return navigate("/survey");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      className="container"
      style={{
        backgroundColor: themes[themeContext.theme].background,
        color: themes[themeContext.theme].foreground,
      }}
    >
      <div
        className="container login_left"
        style={{
          backgroundColor: themes[themeContext.theme].background_right,
          color: themes[themeContext.theme].foreground,
        }}
      >
        <h2
          className="page_name"
          style={{
            color: themes[themeContext.theme].textcolor,
          }}
        >
          Login
        </h2>
        <span>
          <p
            className="click_here"
            style={{
              color: themes[themeContext.theme].textcolor,
            }}
          >
            You're new here ?{" "}
            <Link
              to="/Register"
              style={{
                color: themes[themeContext.theme].textcolor,
              }}
            >
              Click here to register
            </Link>{" "}
          </p>
        </span>
        <LoginForm handleSubmit={handleLogin} />
      </div>

      <div
        className="container login_right"
        style={{
          backgroundColor: themes[themeContext.theme].background_left,
          color: themes[themeContext.theme].foreground,
        }}
      >
        <h2
          className="page_name"
          style={{
            color: themes[themeContext.theme].textcolor,
          }}
        >
          Welcome
        </h2>
        <img src={login} style={{ width: "250px" }}></img>
      </div>
    </div>
  );
}

export async function CheckRole(myUser) {
  if (myUser === null) {
    const userid = await getAuthCurrentUserId();
    //Get the user
    myUser = await GetUserById(userid);
  }
  if (myUser === null) {
    myUser = getDocteurById();
  }
  if (myUser === null) {
    //By Default it is a Guest if no user nor doctor was found
    return "Invite";
  }
  //Get all role existing
  let role = await getRoleById(myUser.id_role);
  return role.nom_role;
}
