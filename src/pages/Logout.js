import { useEffect, useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../initFirebase";
import { useNavigate } from "react-router-dom";
import { ResultatContext } from "../Context";

export default function Logout() {
  const navigate = useNavigate();
  let resultatContext = useContext(ResultatContext);

  useEffect(() => {
    async function logout() {
      await signOut(auth);
      resultatContext.resetResultat();
      navigate("/");
    }

    logout();
  }, [navigate, resultatContext]);

  return <h1>Logging out...</h1>;
}
