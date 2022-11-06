import { db } from "../initFirebase";
import { doc, updateDoc } from "firebase/firestore";
import styled from "styled-components";
import { ThemeContext, themes } from "../Context";
import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { GetAllDocteurs, NewRequest } from "../objects_managers/DocteurManager";
import { BouncingDotsLoader } from "../utils/tools";
import Alert from "@mui/material/Alert";
import { AlertTitle } from "@mui/material";
import Stack from "@mui/material/Stack";

function Account(props) {
  const avatar1 = "/img/avatar1.png";
  const avatarr = "/img/avatar_roux.png";
  const avatar3 = "/img/avatar3.png";
  const avatar4 = "/img/avatar4.png";
  const avatar5 = "/img/avatar5.png";
  const avatar6 = "/img/avatar6.png";

  let themeContext = useContext(ThemeContext);
  const navigate = useNavigate();
  const [avatarSelected, setAvatar] = useState(props.currentUser.avatar);
  const [nameEntered, setNameEntered] = useState(props.currentUser.nom);
  const [remarks, setRemarks] = useState(props.currentUser.remarks);
  const [confirmSave, setConfirmSave] = useState("");

  const [docteurs, setDocteurs] = useState([]);
  const [docteurSelectForRequest, setDocteurSelectForRequest] =
    useState(undefined);
  const [docteurAssigned, setDocteurAssigned] = useState(
    props.currentUser.docteur_assigned
  );

  const [isBusy, setBusy] = useState(true);
  const [confirmRequest, setConfirmRequest] = useState("");

  const [isInvite, setIsInvite] = useState(undefined);

  /** Get all docteurs available */
  useEffect(() => {
    const fetchDocteurs = async () => {
      const result = await GetAllDocteurs();
      setDocteurs(result);
      setBusy(false);
    };
    if (props.currentUser.nom_role === "Patient") {
      fetchDocteurs();
    } else {
      setBusy(false);
    }
  }, [props.currentUser.nom_role]);

  /** Retrieve the name of the Doctor assigned to User */
  useEffect(() => {
    const GetNameDocteurAssigned = () => {
      if (props.currentUser.docteur_assigned !== "") {
        if (docteurs.length > 0) {
          let filteredArray = docteurs.filter(
            (item) => item.id_user === props.currentUser.docteur_assigned
          );
          setDocteurAssigned(filteredArray[0].nom);
        }
      }
    };
    if (props.currentUser.nom_role === "Patient") {
      GetNameDocteurAssigned();
    } else {
      setBusy(false);
    }
  }, [
    props.currentUser.docteur_assigned,
    docteurs,
    props.currentUser.nom_role,
  ]);

  useEffect(() => {
    setAvatar(props.currentUser.avatar);
  }, [props.currentUser.avatar]);

  useEffect(() => {
    setNameEntered(props.currentUser.nom);
  }, [props.currentUser.nom]);

  useEffect(() => {
    setRemarks(props.currentUser.remarks);
  }, [props.currentUser.remarks]);

  useEffect(() => {
    setTimeout(() => {
      setConfirmSave("");
    }, 4000);
  }, [confirmSave]);

  useEffect(() => {
    setTimeout(() => {
      setConfirmRequest("");
    }, 4000);
  }, [confirmRequest]);

  const HandleAvatar = (order) => {
    const str = order.target.src;
    const after_ = str.split("/").pop();
    let newStrg = "/img/" + after_;
    setAvatar(newStrg);
  };

  const HandleName = (event) => {
    setNameEntered(event.target.value);
  };

  const HandleDocteurSelect = (event) => {
    setDocteurSelectForRequest(event.target.value);
  };

  const SendRequest = async () => {
    if (docteurSelectForRequest !== "") {
      let docteur = docteurs.filter(
        (doc) => doc.id_user === docteurSelectForRequest
      );
      await NewRequest(
        docteur[0],
        props.currentUser.id_user,
        setConfirmRequest,
        setRemarks
      );
    }
  };

  const HandleSubmit = async (event) => {
    props.setUser((prevState) => {
      const clonedUser = _.clone(prevState);
      clonedUser.avatar = avatarSelected;
      clonedUser.nom = nameEntered;

      return clonedUser;
    });

    try {
      let Ref;
      if (props.currentUser.nom_role === "Patient") {
        //Save into DB
        Ref = doc(db, "User", props.currentUser.id_user);
      } else {
        Ref = doc(db, "Docteur", props.currentUser.id_user);
      }
      await updateDoc(Ref, {
        avatar: avatarSelected,
        nom: nameEntered,
      });
      setConfirmSave("Changements Sauvegardés");
    } catch (e) {
      setConfirmSave("Erreur, merci de réessayer plus tard");
    }
  };

  useEffect(() => {
    if (props.currentUser.nom_role === "Invite") {
      setIsInvite(true);
    } else {
      setIsInvite(false);
    }
  }, [props.currentUser.nom_role]);

  useEffect(() => {
    setTimeout(() => {
      return navigate("/");
    }, 5000);
  }, [isInvite]);

  return (
    <Container2>
      {isBusy ? (
        <BouncingDotsLoader />
      ) : (
        <>
          {props.currentUser.nom_role === "Invite" ? (
            <div className="center">
              <Stack sx={{ width: "100%" }} spacing={2} padding={1}>
                <Alert severity="warning">
                  <AlertTitle>
                    <strong>You aren't logged in</strong>
                  </AlertTitle>
                  Please log in before acessing this page, —
                  <strong>You will be redirected in 5 seconds</strong>
                </Alert>
              </Stack>
            </div>
          ) : (
            <>
              <div
                className="container left"
                style={{
                  backgroundColor: themes[themeContext.theme].background,
                  color: themes[themeContext.theme].foreground,
                }}
              >
                <div className=" center">
                  <h1
                    className="choose_avatar center"
                    style={{
                      marginLeft: 20,
                      color: themes[themeContext.theme].textcolor,
                    }}
                  >
                    Entrer vos informations personnelles
                  </h1>
                </div>

                <div className="center " style={{ marginBottom: -10 }}>
                  <label>Nom Complet : {"  "}</label>
                  <input
                    name="nom"
                    className="text_input"
                    type="text"
                    maxLength={30}
                    value={nameEntered}
                    required
                    onChange={HandleName}
                    style={{ margin: 0 }}
                  />
                </div>

                <div className="center" style={{ marginTop: -30 }}>
                  <h3
                    className="choose_avatar"
                    style={{
                      color: themes[themeContext.theme].textcolor,
                      marginTop: "50px",
                    }}
                  >
                    Chosen avatar{" "}
                  </h3>
                  <img
                    className="avatar1"
                    src={avatarSelected}
                    defaultValue={avatar1}
                    alt="avatar"
                  ></img>
                </div>

                <div className="center">
                  <button
                    className="btn"
                    style={{
                      margin: 0,
                      width: 120,
                      backgroundColor: themes[themeContext.theme].button,
                      color: themes[themeContext.theme].textcolorbtn,
                      fontSize: 14,
                    }}
                    onClick={HandleSubmit}
                  >
                    Save
                  </button>

                  <div>
                    {confirmSave === "Changements Sauvegardés" ? (
                      <span style={{ color: "#00A36C", marginRight: 3 }}>
                        {confirmSave}
                      </span>
                    ) : (
                      <span style={{ color: "#FF2400", marginRight: 3 }}>
                        {confirmSave}
                      </span>
                    )}
                  </div>
                </div>
                <br />

                {props.currentUser.nom_role === "Patient" && (
                  <div>
                    {props.currentUser.docteur_assigned !== "" ? (
                      <div
                        className="center"
                        style={{ margin: 0, marginTop: -50 }}
                      >
                        <h1 className="choose_avatar">Votre docteur </h1>
                        <input
                          disabled
                          name="docteur_assigned"
                          className="text_input"
                          type="text"
                          maxLength={30}
                          value={docteurAssigned}
                        />
                      </div>
                    ) : (
                      <p style={{ color: "#FF2400", fontWeight: 600 }}>
                        Vous n'avez aucun docteur assigné pour le moment
                      </p>
                    )}
                    {remarks !== "" && (
                      <p
                        style={{
                          color: themes[themeContext.theme].textcolor,
                          fontWeight: 400,
                          fontStyle: "italic",
                        }}
                      >
                        Remarques : {remarks}
                      </p>
                    )}

                    <div className=" center">
                      {props.currentUser.docteur_assigned === "" ? (
                        <h1
                          className="choose_avatar"
                          style={{
                            margin: 15,
                            color: themes[themeContext.theme].textcolor,
                          }}
                        >
                          Faire une demande au près d'un docteur
                        </h1>
                      ) : (
                        <h1
                          className="choose_avatar"
                          style={{
                            margin: 15,
                            color: themes[themeContext.theme].textcolor,
                          }}
                        >
                          Faire une demande au près d'un autre docteur
                        </h1>
                      )}

                      <div className="row center" style={{ margin: 0 }}>
                        <div className="column_list center" style={{ margin: 0 }}>
                          <div>
                            <select
                              className="dropdown"
                              name="docteur_requested"
                              id="docteur_requested"
                              value={docteurSelectForRequest}
                              onChange={(event) => HandleDocteurSelect(event)}
                              style={{ minWidth: 200 }}
                            >
                              <option key={0} value={"Select a doctor"}>
                                Choisir un docteur
                              </option>
                              {props.currentUser.docteur_assigned !== ""
                                ? docteurs
                                  .filter(
                                    (item) =>
                                      item.id_user !==
                                      props.currentUser.docteur_assigned
                                  )
                                  .map((value) => (
                                    <option
                                      key={value.id_user}
                                      value={value.id_user}
                                    >
                                      {value.nom}
                                    </option>
                                  ))
                                : docteurs.map((value) => (
                                  <option
                                    key={value.id_user}
                                    value={value.id_user}
                                  >
                                    {value.nom}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className="column_list center">
                          <button
                            className="btn"
                            style={{
                              margin: 0,
                              width: 180,
                              backgroundColor: themes[themeContext.theme].button,
                              color: themes[themeContext.theme].textcolorbtn,
                              fontSize: 14,
                            }}
                            onClick={SendRequest}
                          >
                            Envoyer une demande
                          </button>
                          <div>
                            {confirmRequest === "Demande Envoyée" ? (
                              <span style={{ color: "#00A36C", marginRight: 3 }}>
                                {confirmRequest}
                              </span>
                            ) : (
                              <span style={{ color: "#FF2400", marginRight: 3 }}>
                                {confirmRequest}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div
                className="container rightt"
                style={{
                  backgroundColor: themes[themeContext.theme].background_right,
                  color: themes[themeContext.theme].foreground,
                }}
              >
                <div className="flex-container">
                  <h1
                    className="choose_avatar"
                    style={{
                      color: themes[themeContext.theme].textcolor,
                    }}
                  >
                    Choisissez votre avatar{" "}
                  </h1>
                  <div className="avatar">
                    <img
                      className="avatar1"
                      alt="avatar1"
                      src={avatar1}
                      onClick={HandleAvatar}
                    ></img>
                    <img
                      className="avatar2"
                      alt="avatarr"
                      src={avatarr}
                      onClick={HandleAvatar}
                    ></img>
                    <img
                      className="avatar1"
                      alt="avatar3"
                      src={avatar3}
                      onClick={HandleAvatar}
                    ></img>
                  </div>
                  <div className="avatar">
                    <img
                      className="avatar1"
                      alt="avatar4"
                      src={avatar4}
                      onClick={HandleAvatar}
                    ></img>
                    <img
                      className="avatar1"
                      alt="avatar5"
                      src={avatar5}
                      onClick={HandleAvatar}
                    ></img>
                    <img
                      className="avatar1"
                      alt="avatar6"
                      src={avatar6}
                      onClick={HandleAvatar}
                    ></img>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </Container2>
  );
}

const Container2 = styled.div`
  body {
    background: #bdc3c7; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #2c3e50,
      #bdc3c7
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #2c3e50,
      #bdc3c7
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  }

  .container {
    margin-left: auto;
    margin-right: auto;
    height: 100%;
    width: 100%;
  }

  .left {
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 50%;
    left: 0;
  }

  .rightt {
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 50%;
    right: 0;
    background-color: #eafaf1;
    z-index: 1;
    overflow-x: hidden;
  }
  .label {
    align-items: center;
    font-size: 1em;
    text-align: center;
    color: #224957;
    font-size: 1em;
    font-weight: bold;
  }

  .logo {
    margin-top: 10px;
  }


  select {
    position: relative;
    display: inline-block;
    color: pointer;
    margin-left: 15px;
    text-align: left;
    border: 1px solid;
    margin-bottom: 10px;
    height: 40px;
    width: 100px;
    margin-right: 10px;
    border-radius: 2px;
    border: 1px solid #77c5a6;
    background-color: white;
    cursor: pointer;
  }

  input {
    text-align: left;
    box-sizing: border-box;
    border-radius: 4px;
    outline: none;
    border: 1.5px solid #77c5a6;
    padding: 10px;
  }

  input:hover {
    background-color: #f2f3f4;
  }

  input:focus {
    border-color: #64b5f6;
  }

  .form_input {
    margin-left: 90px;
  }

  .avatar {
    margin-top: 20px;
    margin-left: 0px;
  }

  .choose_avatar {
    margin-top: 30px;
    margin-bottom: 20px;
    text-align: center;
    color: #224957;
    font-size: 1.2em;
  }

  .avatar1,
  .avatar2 {
    width: 90px;
    height: 110px;
  }

  .btn {
    margin-top: 20px;
    margin-left: 220px;
    display: inline-block;
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    z-index: 1;
    font-weight: bold;
    color: #ffff;
    padding: 0.7em 1.7em;
    font-size: 18px;
    border-radius: 0.5em; /*to round the corner of the shape */
    background: #77c5a6;
    border: 1px solid #77c5a6;
    /* box-shadow: 6px 6px 12px #c5c5c5,
             -6px -6px 12px #ffffff; */
  }

  .btn:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
  }

  .btn:before {
    content: "";
    position: absolute;
    left: 50%;
    transform: translateX(-50%) scaleY(1) scaleX(1.25);
    top: 100%;
    width: 140%;
    height: 180%;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  .btn:after {
    content: "";
    position: absolute;
    left: 55%;
    transform: translateX(-50%) scaleY(1) scaleX(1.45);
    top: 180%;
    width: 160%;
    height: 190%;
    background-color: #e8e8e8;
    border-radius: 50%;
    display: block;
    transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
    z-index: -1;
  }

  .btn:hover {
    color: #093545;
    border: 1px solid #e8e8e8;
  }

  .btn:hover:before {
    top: -35%;
    background-color: #e8e8e8;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }

  .btn:hover:after {
    top: -45%;
    background-color: #e8e8e8;
    transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
  }
`;
