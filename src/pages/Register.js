import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../initFirebase";
import {Link, useNavigate} from "react-router-dom";
import {User} from "../objects/User";
import {CreateDocUser, CreateDocUserInResultat} from "../objects_managers/UserManager";
import "@fontsource/lexend-deca";
import "./pages.css";
import "../App.css";
import docs from "./img/login2.png";
import RegisterForm from "../components/RegisterForm";
import {useState} from "react";
import {ThemeContext, themes} from "../Context";
import {useContext} from "react";
import {InformationMessage} from "./Login";

export default function Register() {
    const navigate = useNavigate();
    let [message, setmessage] = useState("")
    let themeContext = useContext(ThemeContext);

    const handleRegister = async (e, email, password) => {

        try {
            await createUserWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    setmessage("REGISTER_SUCCESS")

            }).catch((error) => {
                setmessage(error.message)
            });
            let user = new User(auth.currentUser.uid, email, "", 0, null, false,null, '','');
            //To create the user document in Firestore with the id created by Auth
            await CreateDocUser(user);

            await CreateDocUserInResultat(user);
            navigate("/account");

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <div className="container right" style={{
                backgroundColor: themes[themeContext.theme].background,
                color: themes[themeContext.theme].foreground,
            }}>
                <h2 className="page_name"
                    style={{
                        color: themes[themeContext.theme].textcolor,
                    }}
                >
                    S'inscrire</h2>
                <p className="click_here"
                   style={{
                       color: themes[themeContext.theme].textcolor,
                   }}
                >
                    Enregistrez-vous pour en savoir plus sur votre santé!{" "}
                </p>
                {InformationMessage(message)}
                <RegisterForm handleSubmit={handleRegister}/>
                
                <p className="click_here" style={{fontSize: 14, color: themes[themeContext.theme].textcolor}}>
                    Vous avez déjà un compte ? <Link to="/Login">Aller au login</Link>{" "}
                </p>
                <img className="docs_pics" src={docs} alt="docs_pics"
                     style={{width: "200px", float: "right", marginTop: "-100px", position: "relative"}}></img>
            </div>
        </>
    );
}
