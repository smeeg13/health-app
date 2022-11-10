import {Link} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth, getAuthCurrentUserId} from "../initFirebase";
import {useNavigate} from "react-router-dom";
import "@fontsource/lexend-deca";
import LoginForm from "../components/LoginForm";
import {getRoleById} from "../objects_managers/RoleManager";
import {GetDocteurById} from "../objects_managers/DocteurManager";
import {GetUserById} from "../objects_managers/UserManager";
import login from "./img/login2.png";
import {ThemeContext, themes} from "../Context";
import {useContext} from "react";
import React, {useState} from "react";
import "../App.css";


export default function Login() {
    const navigate = useNavigate();
    let themeContext = useContext(ThemeContext);
    let [message, setmessage] = useState("")
    const handleLogin = async (e, email, password) => {


        try {
            await signInWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    setmessage("LOGIN_SUCCESS")
                })
                .catch((error) => {
                    setmessage(error.message)
                    console.log("CATCHED " + error.message)
                });
            let roleOfUser = await CheckRole(null);
            console.log("Role of the User Returned :  ", roleOfUser);

            if (roleOfUser === "Admin") {
                console.log("Nav to Admin Portal");
                return navigate("/");
            }

            if (roleOfUser === "Docteur") {
                console.log("Nav to Docteur Portal");
                return navigate("/");
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
            You are new here ?{" "}
              <Link
                  to="/Register"
                  style={{
                      color: themes[themeContext.theme].textcolor,
                  }}
              >
              Click here to register !
            </Link>{" "}
          </p>
                    {InformationMessage(message)}
        </span>
                <LoginForm handleSubmit={handleLogin}/>
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
                <img src={login} alt="login" style={{width: "250px"}}></img>
            </div>
        </div>
    );
}

export async function CheckRole(myUser) {
            const userid = await getAuthCurrentUserId();

    if (myUser === null) {
        //Get the user
        myUser = await GetUserById(userid);
    }
    if (myUser === null) {
        //Get the doctor if no user found
        myUser = await GetDocteurById(userid);
    }
    if (myUser === null) {
        //By Default it is a Guest if no user nor doctor was found
        return "Invite";
    }
    //Get all role existing
    let role = await getRoleById(myUser.id_role);
    return role.nom_role;
}

export function InformationMessage(message) {

    switch (message) {
        case "Firebase: Error (auth/wrong-password).":
            return (
                <div>
                    <p>
                        <b style={{backgroundColor: "red"}}>
                            Wrong password
                        </b>
                    </p>
                </div>

            )

        case "LOGIN_SUCCESS" : {
            return (
                <div>
                    <p>
                        <b style={{backgroundColor: "lightgreen"}}>
                            Login correct
                        </b>
                    </p>
                </div>

            )
        }
        case "REGISTER_SUCCESS" : {
            return (
                <div>
                    <p>
                        <b style={{backgroundColor: "lightgreen"}}>
                            Account created
                        </b>
                    </p>
                </div>

            )
        }
        case "Firebase: Error (auth/email-already-in-use)." : {
            return (
                <div>
                    <p>
                        <b style={{backgroundColor: "red"}}>
                            Email already used
                        </b>
                    </p>
                </div>

            )
        }
        case "Firebase: Error (auth/user-not-found)." : {
            return (
                <div>
                    <p>
                        <b style={{backgroundColor: "orangered"}}>
                            The user doesn't exist, please register!
                        </b>
                    </p>
                </div>

            )
        }

        default  : {
            return (
                <div>
                </div>
            )
        }
    }
}

